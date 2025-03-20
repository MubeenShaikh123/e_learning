"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const CourseVideos = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  // Updated Dummy videos with thumbnail and duration
  const videos = [
    {
      id: 1,
      title: "Introduction to Web Development",
      url: "https://www.youtube.com/embed/MBKgWORXkYk?si=-45y0_102mTuSIAV",
      thumbnail: "https://img.youtube.com/vi/MBKgWORXkYk/hqdefault.jpg",
      duration: "10:30",
    },
    {
      id: 2,
      title: "HTML Basics",
      url: "https://www.youtube.com/embed/qz0aGYrrlhU",
      thumbnail: "https://img.youtube.com/vi/qz0aGYrrlhU/hqdefault.jpg",
      duration: "8:15",
    },
    {
      id: 3,
      title: "CSS Basics",
      url: "https://www.youtube.com/embed/1Rs2ND1ryYc",
      thumbnail: "https://img.youtube.com/vi/1Rs2ND1ryYc/hqdefault.jpg",
      duration: "12:45",
    },
  ];

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
              key={video.id} 
              onClick={() => handleNavigate(video.id)}
              className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-1 border border-gray-100"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                {/* Duration Overlay */}
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>

              {/* Title and Button */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent click
                    handleNavigate(video.id);
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
