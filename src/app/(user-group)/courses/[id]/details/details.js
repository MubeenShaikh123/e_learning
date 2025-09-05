"use client";
import React, { useState } from 'react';
import Description from './description';
import Contents from './contents';
import Reviews from './reviews';

const Details = ({ course }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
          {course.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <div className="flex items-center backdrop-blur-xl bg-white/60 border border-white/50 rounded-full px-4 py-2">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="font-semibold text-gray-700">{course.rating}</span>
            <span className="text-gray-500 ml-1">({course.reviews} reviews)</span>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/50 rounded-full px-4 py-2">
            <span className="font-medium text-gray-700">{course.totalDuration} Minutes</span>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/50 rounded-full px-4 py-2">
            <span className="font-medium text-gray-700">Instructor: {course.instructor}</span>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/50 border border-white/50 shadow-lg rounded-2xl p-2 mb-10">
        <nav className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
          {['description', 'contents', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base min-w-0 ${activeTab === tab
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-[1.02]'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white/60 hover:scale-[1.01]'
                }`}
            >
              <span className="block truncate">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        {activeTab === 'description' && <Description course={course} />}
        {activeTab === 'contents' && <Contents course={course} />}
        {activeTab === 'reviews' && <Reviews course={course} />}
      </div>
    </div>
  );
};

export default Details;
