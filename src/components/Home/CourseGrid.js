'use client'

import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, Star, UserCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const CourseCard = ({ course, onSelectCourse }) => {
  return (
    <div className="group h-full">
      <div
        className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80 h-full flex flex-col cursor-pointer"
        onClick={onSelectCourse}
      >
        {course.image ? (
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <Image
              fill
              alt={course.title}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              src={course.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
          </div>
        ) : (
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white opacity-90" />
            </div>
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4 min-h-[3rem]">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1 mr-3 leading-tight">
              <Link href={`/courses/${course._id}`} className="hover:text-blue-600 transition-colors">
                {course.title}
              </Link>
            </h3>
            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-700 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 border border-blue-500/30">
              {course.category}
            </span>
          </div>

          <div className="flex-grow"></div>

          <div className="flex items-center justify-between mb-4 text-gray-600">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <UserCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm truncate">{course.instructor}</span>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm whitespace-nowrap">
                {course.rating} ({course.reviews})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">{course.totalDuration} min</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ${course.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchCourses = async () => {
  const response = await fetch("/api/courses/getall?limit=3");
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
};

const CoursesGrid = () => {
  const router = useRouter();
  const { data: courses = [], isLoading, isError, error } = useQuery({
    queryKey: ["courses", { limit: 3 }],
    queryFn: fetchCourses,
  });

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          Featured Courses
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover expert-led courses designed to accelerate your career growth
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="mt-6 text-center text-gray-600 font-medium">Loading amazing courses...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-red-600 text-lg font-medium">{error.message || "Something went wrong."}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onSelectCourse={() => router.push(`/courses/${course._id}`)}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => router.push('/courses')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-flex items-center"
            >
              Explore All Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesGrid;