"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const CourseVideos = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchEnrollmentAndVideos = async () => {
      if (!user.email) {
        router.replace('/not-found');
        return;
      }

      try {
        const enrollRes = await fetch(`/api/courses/enroll/${id}?userId=${user.email}`);
        const enrollData = await enrollRes.json();

        if (!enrollRes.ok || !enrollData.enrolled) {
          router.replace('/not-found');
          return;
        }

        const videoRes = await fetch(`/api/courses/videos/${id}`);
        const videoData = await videoRes.json();

        if (videoRes.ok && videoData.videos) {
          setVideos(videoData.videos);
        } else {
          console.error("Video fetch failed");
        }
      } catch (error) {
        console.error("Error:", error);
        router.replace('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentAndVideos();
  }, [id, user.email, router]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!videos.length) return <p className="text-center mt-10 text-gray-500">No videos available.</p>;

  const handleNavigate = (videoId) => {
    router.push(`/courses/${id}/videos/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900 border-b border-indigo-200 pb-2">
          Course Videos
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video._id}
              onClick={() => handleNavigate(video._id)}
              className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-1 border border-gray-100"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(video._id);
                  }}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseVideos;
