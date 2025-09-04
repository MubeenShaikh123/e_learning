'use client'

import React, { useEffect, useState } from 'react';
import {
    Clock,
    Star,
    UserCircle,
    ChevronRight,
    ArrowRight,
    Brain,
    Zap,
    Target
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const QuizCard = ({ quiz, onStartQuiz }) => {
    // Icon selection based on category or default
    const getQuizIcon = (category) => {
        const icons = {
            'Programming': <Brain className="w-16 h-16 text-white opacity-90" />,
            'Data Science': <Zap className="w-16 h-16 text-white opacity-90" />,
            'Design': <Target className="w-16 h-16 text-white opacity-90" />
        };
        return icons[category] || <Brain className="w-16 h-16 text-white opacity-90" />;
    };

    return (
        <div className="group h-full">
            <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80 h-full flex flex-col">
                <div className="h-36 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 relative flex items-center justify-center flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="relative z-10">
                        {quiz.icon ? (
                            <span className="text-6xl opacity-90">{quiz.icon}</span>
                        ) : (
                            getQuizIcon(quiz.category)
                        )}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-1 text-xs font-bold text-gray-800 border border-white/50">
                        {quiz.difficulty}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4 min-h-[3rem]">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-grow pr-2 leading-tight">
                            {quiz.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-700 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 border border-blue-500/30">
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
                            <UserCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span className="truncate">{quiz.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
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
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            ${quiz.price.toFixed(2)}
                        </div>
                    </div>

                    <Link
                        href={`/quizzes/${quiz._id}`}
                        onClick={onStartQuiz}
                        className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-auto"
                    >
                        <span>Start Quiz</span>
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
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
        <div className="backdrop-blur-xl bg-white/30 border-y border-white/50">
            <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                        Popular Quizzes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Test your knowledge and challenge yourself with our curated quizzes
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin animate-reverse"></div>
                        </div>
                        <p className="mt-6 text-center text-gray-600 font-medium">Loading interactive quizzes...</p>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 rounded-3xl p-8 max-w-md mx-auto">
                            <p className="text-red-600 text-lg font-medium">{error}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {quizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz._id}
                                    quiz={quiz}
                                    onStartQuiz={() => router.push(`/quizzes/${quiz._id}`)}
                                />
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <button
                                onClick={() => router.push('/quizzes')}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-flex items-center"
                            >
                                View All Quizzes
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizzesGrid;