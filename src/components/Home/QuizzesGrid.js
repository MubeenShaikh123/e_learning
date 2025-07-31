'use client'

import React, { useEffect, useState } from 'react';
import {
    Clock,
    Star,
    UserCircle,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const QuizCard = ({ quiz, onStartQuiz }) => {
    quiz.color = 'from-indigo-500 via-purple-500 to-pink-500';
    return (
        <div className="group bg-white border border-gray-200 rounded-xl shadow-soft
             hover:shadow-lg transition-all duration-300 ease-in-out
             transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
            {/* Quiz Header with Gradient and Icon */}
            <div
                className={`h-36 bg-gradient-to-r ${quiz.color} relative flex items-center justify-center flex-shrink-0`}
            >
                <span className="text-6xl text-white opacity-80">{quiz.icon}</span>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold text-gray-800">
                    {quiz.difficulty}
                </div>
            </div>

            {/* Quiz Details */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title and Category - Fixed area */}
                <div className="flex justify-between items-start mb-3 min-h-[3rem]">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex-grow pr-2 leading-tight">
                        {quiz.title}
                    </h3>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0">
                        {quiz.category}
                    </span>
                </div>

                {/* Description - Fixed area */}
                <div className="mb-4 min-h-[4rem] flex items-start">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {quiz.description}
                    </p>
                </div>

                {/* Flexible spacer to push content to bottom */}
                <div className="flex-grow"></div>

                {/* Instructor and Time - Always at same position */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-2 min-w-0">
                        <UserCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <span className="truncate">{quiz.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <span>{quiz.timeLimit} min</span>
                    </div>
                </div>

                {/* Questions and Price - Always at same position */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">
                            {quiz.questionCount} Questions
                        </span>
                    </div>
                    <div className="text-xl font-bold text-indigo-600">
                        ${quiz.price.toFixed(2)}
                    </div>
                </div>

                {/* Start Quiz Button - Always at bottom */}
                <Link
                    href={`/quizzes/${quiz._id}`}
                    className="flex items-center justify-center w-full text-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 mt-auto"
                >
                    <span>Start Quiz</span>
                    <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

const QuizzesGrid = () => {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch("/api/quizzes/getall?limit=3", {
                    cache: 'no-store'
                });
                const data = await response.json();
                setQuizzes(data.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                setError("Failed to load quizzes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="mb-10 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    Popular Quizzes
                </h2>
                <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Test your knowledge and challenge yourself with our curated quizzes
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="ml-4 text-center text-gray-500">Loading quizzes...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-600 text-lg">
                    {error}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <QuizCard
                                key={quiz._id}
                                quiz={quiz}
                            />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => router.push('/quizzes')}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg
                             text-base font-semibold
                             hover:bg-indigo-700 transition-colors duration-300
                             shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            View All Quizzes
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizzesGrid;