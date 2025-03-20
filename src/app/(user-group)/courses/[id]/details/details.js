"use client";
import React, { useState } from 'react';
import Description from './description';
import Contents from './contents';
import Reviews from './reviews';

const Details = ({ course }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = () => {
    if (isEnrolled) {
      alert('Access granted to recorded videos!');
    } else {
      setIsEnrolled(true);
      alert('Enrollment successful!');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <span className="flex items-center">
            ★ {course.rating} ({course.reviews?.length} reviews)
          </span>
          <span>•</span>
          <span>{course.duration} Months</span>
          <span>•</span>
          <span>Instructor: {course.instructor}</span>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {['description', 'contents', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 border-b-2 font-medium ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        {activeTab === 'description' && <Description course={course} isEnrolled={isEnrolled} handleEnroll={handleEnroll} />}
        {activeTab === 'contents' && <Contents course={course} />}
        {activeTab === 'reviews' && <Reviews course={course} />}
      </div>
    </div>
  );
};

export default Details;
