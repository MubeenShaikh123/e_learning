import React from 'react'
import {
    Award
} from 'lucide-react';

const BadgesTab = () => {
    return (
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
    )
}

export default BadgesTab