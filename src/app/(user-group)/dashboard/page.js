"use client"; // Add this at the top

// pages/dashboard.js
import React, { useState } from 'react';
import { 
  BookOpen, Award, Bell, BarChart2, Menu, X, ChevronRight 
} from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');

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
            <h1 className="text-xl font-bold text-gray-800">LearnHub</h1>
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
            <h1 className="text-2xl font-bold text-gray-800">LearnHub</h1>
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
            <button 
              onClick={() => setActiveTab('badges')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${activeTab === 'badges' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Award size={20} />
              <span className="font-medium">Badges</span>
            </button>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
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
                  JD
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Course Progress Tab */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Overall progress card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Overall Progress</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">68%</p>
                        <p className="text-sm text-gray-500">3 of 5 courses in progress</p>
                      </div>
                      <div className="h-16 w-16 text-indigo-600">
                        <BarChart2 size={64} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Time spent card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Time Spent</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">24h</p>
                        <p className="text-sm text-gray-500">This month</p>
                      </div>
                      <div className="h-16 w-16 text-indigo-600">
                        <BookOpen size={64} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming deadline card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Next Deadline</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-indigo-600">Frontend Basics</p>
                        <p className="text-sm text-gray-500">Due in 3 days</p>
                      </div>
                      <div className="h-16 w-16 text-indigo-600">
                        <ChevronRight size={64} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Courses in progress */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Courses In Progress</h3>
                  </div>
                  <div className="divide-y">
                    {[
                      { id: 1, title: 'JavaScript Fundamentals', progress: 85, lessons: 12, completed: 10 },
                      { id: 2, title: 'React Basics', progress: 60, lessons: 10, completed: 6 },
                      { id: 3, title: 'Next.js Advanced', progress: 30, lessons: 8, completed: 2 },
                    ].map((course) => (
                      <div key={course.id} className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="mb-4 sm:mb-0">
                            <h4 className="text-md font-medium text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-500">
                              {course.completed} of {course.lessons} lessons completed
                            </p>
                          </div>
                          <div className="w-full sm:w-64">
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-indigo-600 h-2 rounded-full" 
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-700">
                                {course.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recommended courses */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Recommended Courses</h3>
                  </div>
                  <div className="divide-y">
                    {[
                      { id: 1, title: 'Advanced CSS Techniques', duration: '4 hours', level: 'Intermediate' },
                      { id: 2, title: 'TypeScript for React Developers', duration: '6 hours', level: 'Advanced' },
                    ].map((course) => (
                      <div key={course.id} className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-md font-medium text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-500">
                              {course.duration} • {course.level}
                            </p>
                          </div>
                          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Enroll
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Results Tab */}
            {activeTab === 'results' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Overall score card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Average Score</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">82%</p>
                        <p className="text-sm text-gray-500">Across all quizzes</p>
                      </div>
                      <div className="h-16 w-16 text-indigo-600">
                        <BarChart2 size={64} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Quizzes completed card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Quizzes Completed</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">12</p>
                        <p className="text-sm text-gray-500">Out of 15 total</p>
                      </div>
                      <div className="h-16 w-16 text-indigo-600">
                        <Award size={64} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Next quiz card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Next Quiz</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-indigo-600">React Hooks</p>
                        <p className="text-sm text-gray-500">Available now</p>
                      </div>
                      <button className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                        Start
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recent quiz results */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Recent Quiz Results</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quiz Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { id: 1, name: 'JavaScript Arrays', date: 'Mar 20, 2025', score: 90, status: 'Passed' },
                          { id: 2, name: 'CSS Flexbox', date: 'Mar 15, 2025', score: 75, status: 'Passed' },
                          { id: 3, name: 'React Components', date: 'Mar 10, 2025', score: 82, status: 'Passed' },
                          { id: 4, name: 'Next.js Routing', date: 'Mar 5, 2025', score: 68, status: 'Passed' },
                        ].map((quiz) => (
                          <tr key={quiz.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{quiz.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{quiz.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{quiz.score}%</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {quiz.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-indigo-600 hover:text-indigo-900">Review</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                {/* Filter controls */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md">
                      All
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-md">
                      Announcements
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-md">
                      Course Updates
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-md">
                      Deadlines
                    </button>
                  </div>
                </div>
                
                {/* Notifications list */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">All Notifications</h3>
                  </div>
                  <div className="divide-y">
                    {[
                      { 
                        id: 1, 
                        type: 'announcement', 
                        title: 'New Course Available', 
                        message: 'A new course on TypeScript has been added to the platform.',
                        time: '2 hours ago',
                        isNew: true
                      },
                      { 
                        id: 2, 
                        type: 'deadline', 
                        title: 'Assignment Due Soon', 
                        message: 'Your React Hooks assignment is due in 48 hours.',
                        time: '5 hours ago',
                        isNew: true
                      },
                      { 
                        id: 3, 
                        type: 'update', 
                        title: 'Course Material Updated', 
                        message: 'New material has been added to the Next.js Advanced course.',
                        time: '1 day ago',
                        isNew: false
                      },
                      { 
                        id: 4, 
                        type: 'announcement', 
                        title: 'Live Workshop', 
                        message: 'Join us for a live workshop on CSS Grid this Friday at 3 PM.',
                        time: '2 days ago',
                        isNew: false
                      },
                    ].map((notification) => (
                      <div key={notification.id} className={`px-6 py-4 ${notification.isNew ? 'bg-indigo-50' : ''}`}>
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 p-2 rounded-full ${
                            notification.type === 'announcement' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'deadline' ? 'bg-red-100 text-red-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            <Bell size={16} />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-md font-medium text-gray-900">{notification.title}</h4>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <div className="space-y-6">
                {/* Badges summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Total Badges</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">12</p>
                        <p className="text-sm text-gray-500">Earned so far</p>
                      </div>
                      <div className="h-16 w-16 text-indigo-600">
                        <Award size={64} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Rank</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">Silver</p>
                        <p className="text-sm text-gray-500">3 more to reach Gold</p>
                      </div>
                      <div className="h-16 w-16 text-yellow-500">
                        <Award size={64} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Recent Badge</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-indigo-600">Quick Learner</p>
                        <p className="text-sm text-gray-500">Earned 2 days ago</p>
                      </div>
                      <div className="h-16 w-16 text-indigo-600">
                        <Award size={64} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Badges grid */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Your Badges</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {[
                        { id: 1, name: 'First Course', description: 'Completed your first course', date: 'Jan 15, 2025', color: 'bg-blue-100 text-blue-600' },
                        { id: 2, name: 'Perfect Score', description: 'Achieved 100% on a quiz', date: 'Feb 3, 2025', color: 'bg-green-100 text-green-600' },
                        { id: 3, name: 'Fast Learner', description: 'Completed a course in record time', date: 'Feb 20, 2025', color: 'bg-purple-100 text-purple-600' },
                        { id: 4, name: 'Consistent', description: 'Logged in for 10 days in a row', date: 'Mar 1, 2025', color: 'bg-yellow-100 text-yellow-600' },
                        { id: 5, name: 'Helper', description: 'Answered 5 questions in the forum', date: 'Mar 10, 2025', color: 'bg-red-100 text-red-600' },
                        { id: 6, name: 'Quick Learner', description: 'Completed 3 courses in a month', date: 'Mar 21, 2025', color: 'bg-indigo-100 text-indigo-600' },
                      ].map((badge) => (
                        <div key={badge.id} className="bg-white border rounded-lg overflow-hidden">
                          <div className={`p-4 flex items-center justify-center ${badge.color}`}>
                            <Award size={48} />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-gray-900">{badge.name}</h4>
                            <p className="mt-1 text-xs text-gray-500">{badge.description}</p>
                            <p className="mt-2 text-xs text-gray-400">Earned: {badge.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Badges to earn */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Badges to Earn</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { id: 1, name: 'Course Master', description: 'Complete 10 courses', progress: 50 },
                        { id: 2, name: 'Quiz Wizard', description: 'Score 90%+ on 15 quizzes', progress: 80 },
                        { id: 3, name: 'Dedicated Student', description: 'Study for 100 hours total', progress: 30 },
                      ].map((badge) => (
                        <div key={badge.id} className="bg-gray-50 border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="p-2 rounded-full bg-gray-200 text-gray-500 mr-3">
                              <Award size={24} />
                            </div>
                            <h4 className="font-medium text-gray-900">{badge.name}</h4>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${badge.progress}%` }}
                              ></div>
                            </div>
                            <span className="ml-3 text-xs font-medium text-gray-700">
                              {badge.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}