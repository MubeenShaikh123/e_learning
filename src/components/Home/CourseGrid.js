'use client'

import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, Star, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CourseCard = ({ course, onSelectCourse }) => {
  return (
    <div
      className="group bg-white border border-gray-200 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer h-full flex flex-col"
      onClick={onSelectCourse}
    >
      {course.image ? (
        <div className="relative h-48 overflow-hidden rounded-t-xl flex-shrink-0">
          <Image
            fill
            alt={course.title}
            className="object-cover object-center"
            src={course.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>
      ) : (
        // Course Image Placeholder
        <div className="relative h-48 overflow-hidden rounded-t-xl flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-90" />
          </div>
        </div>
      )}

      {/* Course Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and Category - Fixed area */}
        <div className="flex justify-between items-start mb-3 min-h-[3rem]">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex-1 mr-3 leading-tight">
            <Link href={`/courses/${course._id}`} className="hover:text-indigo-600 transition-colors">
              {course.title}
            </Link>
          </h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0">
            {course.category}
          </span>
        </div>

        {/* Flexible spacer to push content to bottom */}
        <div className="flex-grow"></div>

        {/* Instructor and Rating - Always at same position */}
        <div className="flex items-center justify-between mb-4 text-gray-600">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <UserCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-sm truncate">{course.instructor}</span>
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm whitespace-nowrap">
              {course.rating} ({course.reviews})
            </span>
          </div>
        </div>

        {/* Duration and Price - Always at bottom */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-sm">{course.totalDuration} min</span>
          </div>
          <div className="text-xl font-bold text-indigo-600">
            ${course.price}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesGrid = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/getall?limit=3",{
                    cache: 'no-store'
                });
        const data = await response.json();
        setCourses(data.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Explore Our Courses
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover expert-led courses to boost your skills and achieve your goals.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="ml-4 text-center text-gray-500">Loading courses...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 text-lg">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => router.push('/courses')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold
               hover:bg-indigo-700 transition-colors duration-300
               shadow-md hover:shadow-lg transform hover:scale-105"
            >
              View All Courses
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesGrid;