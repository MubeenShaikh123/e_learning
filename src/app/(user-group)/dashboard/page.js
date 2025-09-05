"use client"; // Add this at the top

// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import {
  BookOpen, Award, Bell, BarChart2, Menu, X, ChevronRight,
  LogOut
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import CourseProgressTab from '@/components/Dashboard/CourseProgressTab';
import QuizResultsTab from '@/components/Dashboard/QuizResultsTab';
import NotificationsTab from '@/components/Dashboard/NotificationsTab';
import BadgesTab from '@/components/Dashboard/BadgesTab';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
  const MySwal = withReactContent(Swal);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const getInitials = (name) => {
    if (!name) return '#';
    const parts = name.trim().split(' ').filter(Boolean);

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    if (parts.length === 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }

    // 3 or more words
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: `
        rgba(59, 130, 246, 0.1)
        url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1' fill-rule='nonzero'%3e%3ccircle cx='30' cy='30' r='2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")
        left top
        repeat
      `,
      customClass: {
        popup: 'backdrop-blur-xl bg-white/90 border border-white/50 shadow-2xl rounded-3xl',
        title: 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent',
        confirmButton: 'bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg',
        cancelButton: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-2xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg ml-4'
      }
    });

    if (result.isConfirmed) {
      signOut({ callbackUrl: '/auth/login' })
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 text-gray-700 hover:text-blue-600 focus:outline-none transition-all duration-300 hover:scale-110"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110" 
              onClick={() => { setActiveTab('notifications') }}
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-lg border-2 border-white/50">
              {getInitials(user.name)}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-15 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-20 w-64 backdrop-blur-xl bg-white/70 border-r border-white/50 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-500 ease-out`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/30">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => {
                setActiveTab('progress');
                setSidebarOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === 'progress' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border border-blue-500/30 shadow-lg' 
                  : 'text-gray-600 hover:bg-white/60 hover:text-blue-600 hover:scale-105'
              }`}
            >
              <BookOpen size={20} className={`${activeTab === 'progress' ? 'text-blue-600' : 'group-hover:text-blue-600'} transition-colors duration-300`} />
              <span className="font-medium">Course Progress</span>
              {activeTab === 'progress' && <ChevronRight size={16} className="ml-auto text-blue-600" />}
            </button>
            
            <button
              onClick={() => {
                setActiveTab('results');
                setSidebarOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === 'results' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border border-blue-500/30 shadow-lg' 
                  : 'text-gray-600 hover:bg-white/60 hover:text-blue-600 hover:scale-105'
              }`}
            >
              <BarChart2 size={20} className={`${activeTab === 'results' ? 'text-blue-600' : 'group-hover:text-blue-600'} transition-colors duration-300`} />
              <span className="font-medium">Quiz Results</span>
              {activeTab === 'results' && <ChevronRight size={16} className="ml-auto text-blue-600" />}
            </button>
            
            <button
              onClick={() => {
                setActiveTab('notifications');
                setSidebarOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === 'notifications' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border border-blue-500/30 shadow-lg' 
                  : 'text-gray-600 hover:bg-white/60 hover:text-blue-600 hover:scale-105'
              }`}
            >
              <Bell size={20} className={`${activeTab === 'notifications' ? 'text-blue-600' : 'group-hover:text-blue-600'} transition-colors duration-300`} />
              <span className="font-medium">Notifications</span>
              <span className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"></span>
              {activeTab === 'notifications' && <ChevronRight size={16} className="ml-2 text-blue-600" />}
            </button>
          </nav>
          
          <div className="p-4 border-t border-white/30">
            <div className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-xl rounded-3xl p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-lg border-2 border-white/50">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 hover:from-red-500/20 hover:to-pink-500/20 border border-red-500/20 transition-all duration-300 hover:scale-105 shadow-lg group"
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 relative z-10">
        <div className="pt-20 lg:pt-0">
          <div className="hidden lg:block backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {activeTab === 'progress' && 'Course Progress'}
                  {activeTab === 'results' && 'Quiz Results'}
                  {activeTab === 'notifications' && 'Notifications'}
                  {activeTab === 'badges' && 'Badges Earned'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'progress' && 'Track your learning journey and achievements'}
                  {activeTab === 'results' && 'View your quiz performance and scores'}
                  {activeTab === 'notifications' && 'Stay updated with latest announcements'}
                  {activeTab === 'badges' && 'Celebrate your learning milestones'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  className="relative p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 shadow-lg" 
                  onClick={() => { setActiveTab('notifications') }}
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"></span>
                </button>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-lg border-2 border-white/50">
                  {getInitials(user.name)}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Course Progress Tab */}
            {activeTab === 'progress' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CourseProgressTab />
              </div>
            )}

            {/* Quiz Results Tab */}
            {activeTab === 'results' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <QuizResultsTab />
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <NotificationsTab />
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <BadgesTab />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}