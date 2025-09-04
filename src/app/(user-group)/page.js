'use client'

import React, { useState, useEffect } from 'react';
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

// Mock data for development
const mockCourses = [
  {
    _id: '1',
    title: 'Advanced React Development',
    category: 'Web Development',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    reviews: 1200,
    totalDuration: 180,
    price: 89.99,
    image: null
  },
  {
    _id: '2',
    title: 'Machine Learning Fundamentals',
    category: 'AI/ML',
    instructor: 'Dr. Michael Chen',
    rating: 4.9,
    reviews: 850,
    totalDuration: 240,
    price: 129.99,
    image: null
  },
  {
    _id: '3',
    title: 'Digital Marketing Mastery',
    category: 'Marketing',
    instructor: 'Emily Rodriguez',
    rating: 4.7,
    reviews: 950,
    totalDuration: 150,
    price: 79.99,
    image: null
  }
];

const mockQuizzes = [
  {
    _id: '1',
    title: 'JavaScript Fundamentals',
    category: 'Programming',
    instructor: 'Alex Kim',
    difficulty: 'Beginner',
    timeLimit: 30,
    questionCount: 25,
    price: 19.99,
    icon: '🚀',
    description: 'Test your understanding of JavaScript basics including variables, functions, and DOM manipulation.'
  },
  {
    _id: '2',
    title: 'Data Science Essentials',
    category: 'Data Science',
    instructor: 'Dr. Lisa Wang',
    difficulty: 'Intermediate',
    timeLimit: 45,
    questionCount: 30,
    price: 29.99,
    icon: '📊',
    description: 'Comprehensive quiz covering statistics, data visualization, and machine learning concepts.'
  },
  {
    _id: '3',
    title: 'UX Design Principles',
    category: 'Design',
    instructor: 'Maria Santos',
    difficulty: 'Advanced',
    timeLimit: 40,
    questionCount: 20,
    price: 24.99,
    icon: '🎨',
    description: 'Challenge your knowledge of user experience design, wireframing, and design systems.'
  }
];

const mockTestimonials = [
  {
    _id: '1',
    content: "This platform completely transformed my career. The courses are incredibly well-structured and the instructors are world-class. I landed my dream job within 3 months!",
    author: "Jessica Miller",
    role: "Full Stack Developer",
    rating: 5
  },
  {
    _id: '2',
    content: "The interactive quizzes helped me identify knowledge gaps and improve systematically. The glass morphism design is absolutely beautiful and makes learning enjoyable.",
    author: "David Park",
    role: "Data Scientist",
    rating: 5
  },
  {
    _id: '3',
    content: "Outstanding content quality and presentation. The modern interface and smooth animations make this the best learning platform I've ever used.",
    author: "Amanda Foster",
    role: "UX Designer",
    rating: 5
  }
];

// Course Card Component
const CourseCard = ({ course }) => {
  return (
    <div className="group h-full">
      <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80 h-full flex flex-col">
        {course.image ? (
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <img
              alt={course.title}
              className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
              src={course.image}
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
              {course.title}
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

// Quiz Card Component
const QuizCard = ({ quiz }) => {
  return (
    <div className="group h-full">
      <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80 h-full flex flex-col">
        <div className="h-36 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 relative flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <span className="text-6xl opacity-90 relative z-10">{quiz.icon}</span>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-1 text-xs font-bold text-gray-800 border border-white/50">
            {quiz.difficulty}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4 min-h-[3rem]">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors flex-grow pr-2 leading-tight">
              {quiz.title}
            </h3>
            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm text-purple-700 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 border border-purple-500/30">
              {quiz.category}
            </span>
          </div>

          <div className="mb-4 min-h-[4rem] flex items-start">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {quiz.description}
            </p>
          </div>

          <div className="flex-grow"></div>

          <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-700">
            <div className="flex items-center space-x-2 min-w-0">
              <UserCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span className="truncate">{quiz.instructor}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span>{quiz.timeLimit} min</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">
                {quiz.questionCount} Questions
              </span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${quiz.price}
            </div>
          </div>

          <button className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-auto">
            <span>Start Quiz</span>
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:shadow-3xl hover:bg-white/80 w-full h-full flex flex-col">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill={i < testimonial.rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic flex-grow text-lg leading-relaxed">
        "{testimonial.content}"
      </p>
      <div className="flex items-center mt-auto">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {testimonial.author?.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

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
  const [courses, setCourses] = useState(mockCourses);
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
                {['Home', 'Courses', 'Quizzes', "Doc's", 'Dashboard'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-110"
                  >
                    {item}
                  </a>
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
                {['Home', 'Courses', 'Quizzes', "Doc's", 'Dashboard'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-white/60 rounded-2xl font-medium transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
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
              <button className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Start Learning Now
              </button>
              <button className="backdrop-blur-xl bg-white/70 border border-white/50 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <StatsSection />
      </div>

      {/* Featured Courses */}
      <CoursesGrid></CoursesGrid>

      {/* Popular Quizzes */}
      <QuizzesGrid></QuizzesGrid>

      {/* Testimonials */}
      <TestimonialsSection></TestimonialsSection>
      {/* Features Section */}
      <div className="backdrop-blur-xl bg-white/30 border-y border-white/50">
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
      </div>

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
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
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
                  { Icon: Facebook, color: 'hover:text-blue-400' },
                  { Icon: Instagram, color: 'hover:text-pink-400' },
                  { Icon: Linkedin, color: 'hover:text-blue-300' },
                  { Icon: Github, color: 'hover:text-gray-300' }
                ].map(({ Icon, color }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`text-gray-400 ${color} transform hover:scale-110 transition-all duration-300`}
                    aria-label={`Follow us on social media`}
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
      </footer>
    </div>
  );
};

export default ModernHomepage;