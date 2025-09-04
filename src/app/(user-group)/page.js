'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Clock,
  Star,
  UserCircle,
  ChevronRight,
  Menu,
  X,
  PlayCircle,
  Award,
  Users,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import CoursesGrid from '@/components/Home/CourseGrid';
import QuizzesGrid from '@/components/Home/QuizzesGrid';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import Link from 'next/link';

// Stats Component
const StatsSection = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Students' },
    { icon: BookOpen, value: '5K+', label: 'Courses' },
    { icon: Award, value: '500+', label: 'Instructors' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/80">
            <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Homepage Component
const ModernHomepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const coursesRef = useRef(null);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Navigation */}
      <nav className="backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                SkillUp
              </h1>
              <div className="hidden md:flex space-x-8 ml-12">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Courses', href: '/courses' },
                  { name: 'Quizzes', href: '/quizzes' },
                  { name: "Doc's", href: '/cv' },
                  { name: 'Dashboard', href: '/dashboard' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-110"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 text-gray-700 hover:text-blue-600 focus:outline-none transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-6 space-y-1 backdrop-blur-xl bg-white/80 border-t border-white/50 rounded-b-3xl">
                {/* Mobile menu */}
                {mobileMenuOpen && (
                  <div className="md:hidden">
                    <div className="px-2 pt-2 pb-6 space-y-1 backdrop-blur-xl bg-white/80 border-t border-white/50 rounded-b-3xl">
                      {[
                        { name: 'Home', href: '/' },
                        { name: 'Courses', href: '/courses' },
                        { name: 'Quizzes', href: '/quizzes' },
                        { name: "Doc's", href: '/docs' },
                        { name: 'Dashboard', href: '/dashboard' }
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-white/60 rounded-2xl font-medium transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav >

      {/* Hero Section */}
      < div className="relative" >
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="mb-8">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-blue-500/20 backdrop-blur-sm text-blue-700 border border-blue-500/30 mb-8">
                <Zap className="w-4 h-4 mr-2" />
                New: AI-Powered Learning Paths
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Master New Skills
              </span>
              <br />
              <span className="text-gray-800">
                With Expert Guidance
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Join over 50,000 learners accessing premium courses and interactive quizzes
              from world-class instructors. Transform your career today.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={scrollToCourses} className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Start Learning Now
              </button>
            </div>
          </div>
        </div>
      </div >

      {/* Stats Section */}
      < div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10" >
        <StatsSection />
      </div >

      {/* Featured Courses */}
      < div ref={coursesRef} >
        <CoursesGrid />
      </div >

      {/* Popular Quizzes */}
      < QuizzesGrid />

      {/* Testimonials */}
      < TestimonialsSection />

      {/* Features Section */}
      < div className="backdrop-blur-xl bg-white/30 border-y border-white/50" >
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Choose SkillUp?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with years of real-world experience.'
              },
              {
                icon: Zap,
                title: 'Interactive Learning',
                description: 'Engage with hands-on projects, quizzes, and real-world applications.'
              },
              {
                icon: Award,
                title: 'Certificates',
                description: 'Earn recognized certificates to showcase your new skills to employers.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/80">
                  <feature.icon className="w-16 h-16 mx-auto mb-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >

      {/* Footer */}
      {/* Footer */}
      <footer className="backdrop-blur-xl bg-gray-900/90 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-white text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SkillUp
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Empowering learners through quality education and innovative learning experiences.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
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
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
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
              <h4 className="text-white font-semibold mb-6">Follow Us</h4>
              <p className="text-gray-400 mb-6">
                Stay connected for updates and learning tips
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    Icon: Facebook,
                    color: 'hover:text-blue-400',
                    href: 'https://www.facebook.com/profile.php?id=100048574524041&mibextid=ZbWKwL',
                    label: 'Follow us on Facebook'
                  },
                  {
                    Icon: Instagram,
                    color: 'hover:text-pink-400',
                    href: 'https://www.instagram.com/__mubeen_shaikh?igsh=ZWF5MTg4Z2Fuamg0',
                    label: 'Follow us on Instagram'
                  },
                  {
                    Icon: Linkedin,
                    color: 'hover:text-blue-300',
                    href: 'https://www.linkedin.com/in/mubeen-shaikh-6276b7247',
                    label: 'Connect with us on LinkedIn'
                  },
                  {
                    Icon: Github,
                    color: 'hover:text-gray-300',
                    href: 'https://github.com/MubeenShaikh123',
                    label: 'Follow us on GitHub'
                  }
                ].map(({ Icon, color, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${color} transform hover:scale-110 transition-all duration-300`}
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2025 SkillUp. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400">Made with ❤️ for learners worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </footer >

    </div >
  );
};

export default ModernHomepage;