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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900">{video.title}</h1>
        <div className="relative overflow-hidden rounded-lg w-full aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
