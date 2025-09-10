"use client"

import React, { useState } from 'react';
import { Award, BarChart2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const QuizResultsTab = ({ submissions }) => {
  const [quizzSubmissions, setQuizzSubmissions] = useState(submissions || []);
  const totalQuizzes = quizzSubmissions.length;
  const averageScore = totalQuizzes > 0
    ? Math.round(quizzSubmissions.reduce((acc, q) => acc + q.score, 0) / totalQuizzes)
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average score */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Average Score</h3>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{averageScore}%</p>
              <p className="text-sm text-gray-500">Across all quizzes</p>
            </div>
            <div className="h-16 w-16 text-indigo-600">
              <BarChart2 size={64} />
            </div>
          </div>
        </div>

        {/* Quizzes completed */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Quizzes Completed</h3>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{totalQuizzes}</p>
              <p className="text-sm text-gray-500">Submissions</p>
            </div>
            <div className="h-16 w-16 text-indigo-600">
              <Award size={64} />
            </div>
          </div>
        </div>

        {/* Next quiz card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Next Quiz</h3>
          <Link href='./quizzes'>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-indigo-600">Continue Learning</p>
                <p className="text-sm text-gray-500">Click to explore quizzes</p>
              </div>
              <div className="h-16 w-16 text-indigo-600">
                <ChevronRight size={64} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent quiz results table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Recent Quiz Results</h3>
        </div>
        <div className="overflow-x-auto">
          {quizzSubmissions.length === 0 ? (
            <div className="p-6 text-gray-500">No submissions found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizzSubmissions.map((quiz) => (
                  <tr key={quiz._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quiz.quizId.title || "Untitled Quiz"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quiz.score}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quiz.maxScore}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(quiz.score / quiz.maxScore) * 100 >= 35 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                        {(quiz.score / quiz.maxScore) * 100 >= 35 ? "Passed" : "Failed"}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">Review</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResultsTab;
