import React from 'react'
import {
    BookOpen, Award, BarChart2
} from 'lucide-react';

const QuizResultsTab = () => {
    return (
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
    )
}

export default QuizResultsTab   