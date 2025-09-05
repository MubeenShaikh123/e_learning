"use client"; // Add this at the top

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Quizz = ({ isHome }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('/api/quizzes/getall');
                const data = await response.json();

                if (response.ok) {
                    setQuizzes(data.data);
                } else {
                    throw new Error(data.message || "Failed to fetch quizzes");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading quizzes...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

            <section className="py-20 relative z-10">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                            Test Your Knowledge
                        </h2>
                        <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
                            Challenge yourself with our expertly crafted quizzes to reinforce your learning and boost your confidence in applying new skills.
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
                                <p className="text-red-600 text-lg font-medium">Error: {error}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {quizzes.map((quiz) => (
                                    <div
                                        key={quiz._id}
                                        className="group backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80 flex flex-col h-full"
                                    >
                                        <div className="h-36 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 relative flex items-center justify-center flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                            <div className="relative z-10">
                                                <span className="text-6xl opacity-90">{quiz.icon}</span>
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

                                            <div className="grid grid-cols-1 gap-2 mb-4 text-sm text-gray-700">
                                                <div className="flex items-center justify-between">
                                                    <span className="flex items-center">
                                                        <span className="mr-2">⏳</span>
                                                        {quiz.timeLimit} mins
                                                    </span>
                                                    <span className="flex items-center">
                                                        <span className="mr-2">❓</span>
                                                        {quiz.questionCount} questions
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="mr-2">👨‍🏫</span>
                                                    <span className="truncate">{quiz.instructor}</span>
                                                </div>
                                            </div>

                                            <div className="flex-grow"></div>

                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                                    ${quiz.price}
                                                </span>
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 mr-1">★★★★★</span>
                                                    <span className="text-sm text-gray-500 font-medium">5.0</span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/quizzes/${quiz._id}`}
                                                className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-auto"
                                            >
                                                Start Quiz
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {isHome && (
                                <div className="mt-16 text-center">
                                    <Link
                                        href="/quizzes"
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-flex items-center"
                                    >
                                        View All Quizzes
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Quizz;
