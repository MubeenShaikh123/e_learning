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
      <p className="leading-relaxed mb-4">{course.description}</p>

      <div className="flex border-t border-gray-200 py-2">
        <span className="text-gray-500">Duration</span>
        <span className="ml-auto text-gray-900">{course.duration || '1'} Month</span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="text-gray-500">Starting From</span>
        <span className="ml-auto text-gray-900">{course.startingFrom || '1 Aug 2024'}</span>
      </div>

      <div className="flex">
        <button
          onClick={handleEnroll}
          className="flex ml-auto w-full text-white bg-gradient-to-br from-[#3442D2] to-[#B24EFF] border-0 py-2 px-6 focus:outline-none rounded justify-center disabled:opacity-50"
          disabled={loading}
        >
          {isEnrolled ? 'Access Content' : loading ? 'Enrolling...' : 'Enroll Now'}
        </button>
        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
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
