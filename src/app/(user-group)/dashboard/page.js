"use client"; // Add this at the top

// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import {
  BookOpen, Award, Bell, BarChart2, Menu, X, ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import CourseProgressTab from '@/components/Dashboard/CourseProgressTab';
import QuizResultsTab from '@/components/Dashboard/QuizResultsTab';
import NotificationsTab from '@/components/Dashboard/NotificationsTab';
import BadgesTab from '@/components/Dashboard/BadgesTab';

export default function Dashboard() {
  const MySwal = withReactContent(Swal);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   MySwal.fire({
  //     icon: 'info',
  //     title: 'Demo Dashboard',
  //     text: 'This is a demo dashboard. Personalized dashboard features are not implemented yet.',
  //     showConfirmButton: false,
  //     timer: 3000, // Auto close after 2 seconds (2000 milliseconds)
  //   })
  // });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-gray-800">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-indigo-600">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'progress' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <BookOpen size={20} />
              <span className="font-medium">Course Progress</span>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'results' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <BarChart2 size={20} />
              <span className="font-medium">Quiz Results</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'notifications' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Bell size={20} />
              <span className="font-medium">Notifications</span>
            </button>
            {/* <button
              onClick={() => setActiveTab('badges')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'badges' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Award size={20} />
              <span className="font-medium">Badges12</span>
            </button> */}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="pt-16 lg:pt-0">
          <div className="hidden lg:block bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === 'progress' && 'Course Progress'}
                {activeTab === 'results' && 'Quiz Results'}
                {activeTab === 'notifications' && 'Notifications'}
                {activeTab === 'badges' && 'Badges Earned'}
              </h1>
              <div className="flex items-center space-x-4">
                <button className="relative text-gray-600 hover:text-indigo-600">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  ##
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Course Progress Tab */}
            {activeTab === 'progress' && (
              <CourseProgressTab/>
            )}

            {/* Quiz Results Tab */}
            {activeTab === 'results' && (
              <QuizResultsTab/>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <NotificationsTab/>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <BadgesTab/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}