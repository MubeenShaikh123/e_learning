"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Description from './description';
import Contents from './contents';
import Reviews from './reviews';

const Details = ({ course }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('description');
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  
  // Dummy enrollment check for now (replace with real check later)
  const isEnrolled = false; 

  const handleEnroll = () => {
    if (isEnrolled) {
      router.push(`/courses/${course._id}/videos`);
    } else {
      setShowModal(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userName && email) {
      setShowModal(false);
      alert('Enrollment successful!');
      // After enrollment, navigate to videos
      router.push(`/courses/${course._id}/videos`);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <span className="flex items-center">
            ★ {course.rating} ({course.reviews} reviews)
          </span>
          <span>•</span>
          <span>{course.totalDuration} Minutes</span>
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
        {activeTab === 'description' && <Description course={course} handleEnroll={handleEnroll} />}
        {activeTab === 'contents' && <Contents course={course} />}
        {activeTab === 'reviews' && <Reviews course={course} />}
      </div>

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Enroll in {course.title}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
