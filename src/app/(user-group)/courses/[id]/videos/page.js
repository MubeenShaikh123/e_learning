"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto p-8 relative z-10">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                    Course Videos
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <div
                        key={video._id}
                        onClick={() => handleNavigate(video._id)}
                        className="group cursor-pointer backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80"
                    >
                        <div className="relative overflow-hidden">
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                width={400}
                                height={160}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
                            <span className="absolute bottom-4 right-4 backdrop-blur-sm bg-black/70 text-white text-sm font-medium px-3 py-1 rounded-full border border-white/20">
                                {video.duration}
                            </span>
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                                {video.title}
                            </h2>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigate(video._id);
                                }}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
