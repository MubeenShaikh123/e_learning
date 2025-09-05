"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const VideoPlayer = ({ params }) => {
  const { id, videoId } = params;
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const verifyAndFetch = async () => {
      if (!user.email) {
        router.replace('/not-found');
        return;
      }

      try {
        // Step 1: Check Enrollment
        console.log(`id: ${id}\nvideoId: ${videoId}`);
        const enrollRes = await fetch(`/api/courses/enroll/${id}?userId=${user.email}`);
        const enrollData = await enrollRes.json();

        if (!enrollRes.ok || !enrollData.enrolled) {
          router.replace('/not-found');
          return;
        }

        // Step 2: Fetch Video
        const videoRes = await fetch(`/api/courses/videos/${id}/${videoId}`);
        const videoData = await videoRes.json();

        if (videoRes.ok && videoData?.video) {
          console.log(`videoRes ok`);
          setVideo(videoData.video);
        } else {
          console.log(`videoRes not ok`);
          router.replace('/not-found');
        }
      } catch (err) {
        console.error("Error:", err);
        router.replace('/not-found');
      } finally {
        setLoading(false);
      }
    };

    verifyAndFetch();
  }, [id, videoId, user.email, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            {video.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden p-8">
          <div className="relative overflow-hidden rounded-2xl w-full aspect-video shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
