"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Description = ({ course }) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const verifyEnrollment = async () => {
      try {
        if (!user.email) return;

        const response = await fetch(`/api/courses/enroll/${course._id}?userId=${user.email}`);
        const data = await response.json();
        setIsEnrolled(response.ok && data.enrolled);
        console.log(`data: ${JSON.stringify(data)}`)
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }
    };

    verifyEnrollment();
  }, [user.email, course._id]);

  const handleEnroll = async () => {
    if (!user.email) {
      alert('Please log in to enroll.');
      router.push(`/auth/login`);
      return;
    }

    if (isEnrolled) {
      router.push(`/courses/${course._id}/videos`);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/courses/enroll/${course._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsEnrolled(true);
        router.push(`/courses/${course._id}/videos`);
      } else {
        alert(data.message || 'Enrollment failed.');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="leading-relaxed text-gray-700 mb-8 text-lg">{course.description}</p>

      <div className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between py-4 border-b border-white/50">
          <span className="text-gray-600 font-medium">Duration</span>
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {course.duration || '1'} Month
          </span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-gray-600 font-medium">Starting From</span>
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {course.startingFrom || '1 Aug 2024'}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleEnroll}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:transform-none flex items-center justify-center"
          disabled={loading}
        >
          {isEnrolled ? 'Access Content' : loading ? 'Enrolling...' : 'Enroll Now'}
        </button>
        <button className="w-14 h-14 backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg rounded-2xl flex items-center justify-center text-blue-600 hover:bg-white/80 hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Description;
