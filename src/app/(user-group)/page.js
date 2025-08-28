'use client'
/* eslint-disable @next/next/no-page-custom-font */

import Head from 'next/head';
import Link from 'next/link';
import CoursesGrid from '@/components/Home/CourseGrid';
import QuizzesGrid from '@/components/Home/QuizzesGrid';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Online Learning Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
              <div className="hidden md:flex space-x-8 ml-10">
                <Link href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
                <Link href="/courses" className="text-gray-700 hover:text-indigo-600">Courses</Link>
                <Link href="/quizzes" className="text-gray-700 hover:text-indigo-600">Quizzes</Link>
                <Link href="/cv" className="text-gray-700 hover:text-indigo-600">{`Doc's`}</Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  href="/quizzes"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quizzes
                </Link>
                <Link
                  href="/cv"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {`Doc's`}
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}
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
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <CoursesGrid />

      {/* Popular Quizzes Section */}
      <QuizzesGrid />

      {/* Testimonial Section */}
      <TestimonialsSection />

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                {process.env.NEXT_PUBLIC_APP_NAME || 'EduLearn'}
              </h3>
              <p className="text-gray-400">
                Empowering learners through quality education and innovative learning experiences.
              </p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact-us" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy-terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/privacy-terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <p className="text-gray-400 text-sm mb-4">
                Stay connected for updates and learning tips
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100048574524041&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transform hover:scale-110 transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>

                <a
                  href="https://www.instagram.com/__mubeen_shaikh?igsh=ZWF5MTg4Z2Zuamg0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transform hover:scale-110 transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>

                <a
                  href="https://www.linkedin.com/in/mubeen-shaikh-6276b7247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transform hover:scale-110 transition-all duration-300"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>

                <a
                  href="https://github.com/MubeenShaikh123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transform hover:scale-110 transition-all duration-300"
                  aria-label="Follow us on YouTube"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2025 {process.env.NEXT_PUBLIC_APP_NAME || 'EduLearn'}. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Made with ❤️ for learners worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}