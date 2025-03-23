"use client";

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const courses = [
    {
      id: "66b0614fe62c16a46fe8a151",
      title: 'Full Stack Web Development',
      category: 'Programming',
      duration: '32 hours',
      lessons: 45,
      progress: 70,
      rating: 4.8,
      price: 299,
    },
    {
      id: 2,
      title: 'Data Science and Machine Learning',
      category: 'Data Science',
      duration: '40 hours',
      lessons: 50,
      progress: 60,
      rating: 4.7,
      price: 399,
    },
    {
      id: 3,
      title: 'Mobile App Development with Flutter',
      category: 'Mobile Development',
      duration: '28 hours',
      lessons: 38,
      progress: 85,
      rating: 4.9,
      price: 349,
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
      category: 'Cybersecurity',
      duration: '25 hours',
      lessons: 30,
      progress: 55,
      rating: 4.6,
      price: 259,
    },
    {
      id: 5,
      title: 'Artificial Intelligence with Python',
      category: 'AI',
      duration: '35 hours',
      lessons: 42,
      progress: 75,
      rating: 4.8,
      price: 499,
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      category: 'Web Dev',
      duration: '~20 min',
      questions: 15,
      description: 'Test your knowledge of JavaScript basics, from variables to functions.',
      rating: 4.7,
      gradient: 'from-blue-500 to-indigo-600',
      tagColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      title: 'Data Science Basics',
      category: 'Data Science',
      duration: '~30 min',
      questions: 20,
      description: 'Challenge yourself with statistics, Python, and data visualization concepts.',
      rating: 4.9,
      gradient: 'from-purple-500 to-pink-600',
      tagColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 3,
      title: 'Cloud Computing',
      category: 'DevOps',
      duration: '~15 min',
      questions: 12,
      description: 'Evaluate your knowledge of AWS, Azure, and cloud infrastructure.',
      rating: 4.6,
      gradient: 'from-green-500 to-teal-600',
      tagColor: 'bg-green-100 text-green-800',
    },
    {
      id: 4,
      title: 'React Mastery',
      category: 'Web Dev',
      duration: '~25 min',
      questions: 18,
      description: 'Test your knowledge of React hooks, state management, and components.',
      rating: 4.8,
      gradient: 'from-red-500 to-orange-500',
      tagColor: 'bg-red-100 text-red-800',
    },
    {
      id: 5,
      title: 'UX Design Principles',
      category: 'Design',
      duration: '~20 min',
      questions: 15,
      description: 'Check your understanding of user experience design fundamentals.',
      rating: 4.5,
      gradient: 'from-yellow-400 to-amber-500',
      tagColor: 'bg-yellow-100 text-yellow-800',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>SkillUp - Online Learning Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">SkillUp</h1>
              <div className="hidden md:flex space-x-8 ml-10">
                <Link href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
                <Link href="/courses" className="text-gray-700 hover:text-indigo-600">Courses</Link>
                <Link href="/quizzes" className="text-gray-700 hover:text-indigo-600">Quizzes</Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Learn New Skills
              <br />
              <span className="text-indigo-200">From Expert Teachers</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Access 5000+ online courses and quizzes from 500+ professional instructors.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-3 rounded-l-lg focus:outline-none"
              />
              <button className="mt-2 w-full sm:mt-0 sm:w-auto bg-white text-indigo-600 px-6 py-3 rounded-r-lg font-medium hover:bg-gray-100">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/courses/${course.id}`)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {course.category}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{course.rating}</span>
                  </div>
                  <span className="text-gray-600">{course.duration}</span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 rounded-full h-2"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{course.progress}% Complete</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/courses')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            View All Courses
          </button>
        </div>
      </div>

      {/* Popular Quizzes Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Quizzes</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className={`h-40 bg-gradient-to-r ${quiz.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-5xl font-bold opacity-30">Q</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-indigo-800">
                  {quiz.questions} Questions
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${quiz.tagColor}`}>
                    {quiz.category}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{quiz.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{quiz.rating}</span>
                  </div>
                  <span className="text-gray-600">{quiz.duration}</span>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => router.push(`/quizzes/${quiz.id}`)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/quizzes')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            View All Quizzes
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Start Learning Today
            </h2>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-indigo-100">
              Join thousands of students already learning with SkillUp. Get access to premium courses, quizzes, and learning resources.
            </p>
            <div className="mt-8">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">SkillUp</h3>
              <p className="text-gray-400">Empowering learners through quality education.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  {/* Add social media icons here */}
                </a>
                {/* Add other social media links */}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2023 SkillUp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}