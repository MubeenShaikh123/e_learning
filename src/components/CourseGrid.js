import React from 'react';
import { BookOpen, Clock, Star, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CourseCard = ({ course, onSelectCourse }) => {
  return (
    <div
      className="group bg-white border border-gray-200 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
      onClick={onSelectCourse}
    >
      {course.image ? (<div className="relative h-48 overflow-hidden rounded-t-xl">
        <Image
          fill
          alt={course.title}
          className="object-cover"
          src={course.image}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>) : (
        // Course Image Placeholder
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-90" />
          </div>
        </div>
      )}

      {/* Course Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            <Link href={`/courses/${course._id}`} className="hover:text-indigo-600 transition-colors">
              {course.title}
            </Link>
          </h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
            {course.category}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4 text-gray-600">
          <div className="flex items-center space-x-2">
            <UserCircle className="w-5 h-5 text-gray-500" />
            <span className="text-sm">{course.instructor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm">
              {course.rating} ({course.reviews} reviews)
            </span>
          </div>
        </div>

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

const CoursesGrid = ({ courses, onViewAllCourses }) => {
  const handleCourseSelect = (courseId) => {
    // Implement navigation logic
    // For example: router.push(`/courses/${courseId}`)
    console.log(`Navigate to course ${courseId}`);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelectCourse={() => handleCourseSelect(course.id)}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onViewAllCourses}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold 
          hover:bg-indigo-700 transition-colors duration-300 
          shadow-md hover:shadow-lg transform hover:scale-105"
        >
          View All Courses
        </button>
      </div>
    </div>
  );
};

export default CoursesGrid;