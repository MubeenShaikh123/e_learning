import React from 'react'
import {
    BookOpen, BarChart2, ChevronRight
} from 'lucide-react';

const CourseProgressTab = () => {
    return (
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
    )
}

export default CourseProgressTab