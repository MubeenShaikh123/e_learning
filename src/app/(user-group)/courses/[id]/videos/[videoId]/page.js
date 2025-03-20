"use client";
import React from 'react';

const VideoPlayer = ({ params }) => {
  const { videoId } = params;

  // Dummy video data
  const videos = [
    {
      id: 1,
      title: "Introduction to Web Development",
      url: "https://www.youtube.com/embed/MBKgWORXkYk?si=-45y0_102mTuSIAV",
    },
    {
      id: 2,
      title: "HTML Basics",
      url: "https://www.youtube.com/embed/qz0aGYrrlhU",
    },
    {
      id: 3,
      title: "CSS Basics",
      url: "https://www.youtube.com/embed/1Rs2ND1ryYc",
    },
  ];

  // Find the video based on videoId
  const video = videos.find((v) => v.id.toString() === videoId);

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Video not found!</p>
      </div>
    );
  }

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
