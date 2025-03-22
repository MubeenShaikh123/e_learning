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
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Test Your Knowledge</h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-600">
                        Challenge yourself with our expertly crafted quizzes to reinforce your learning and boost your confidence in applying new skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {quizzes.map((quiz) => (
                        <div 
                            key={quiz._id} 
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                        >
                            <div className={`h-36 bg-gradient-to-r ${quiz.color} relative flex items-center justify-center`}>
                                <span className="text-6xl">{quiz.icon}</span>
                                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold">
                                    {quiz.difficulty}
                                </div>
                            </div>

                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md bg-indigo-100 text-indigo-800">
                                        {quiz.category}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4 text-sm">
                                    {quiz.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="inline-flex items-center text-xs text-gray-500">⏳ {quiz.timeLimit} mins</span>
                                    <span className="inline-flex items-center text-xs text-gray-500">❓ {quiz.questionCount} questions</span>
                                    <span className="inline-flex items-center text-xs text-gray-500">👨‍🏫 {quiz.instructor}</span>
                                </div>
                            </div>

                            <div className="px-6 pb-6 mt-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold text-xl text-gray-900">${quiz.price}</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 mr-1">★★★★★</span>
                                        <span className="text-xs text-gray-500">5.0</span>
                                    </div>
                                </div>

                                <Link href={`/quizzes/${quiz._id}`} 
                                    className="block w-full text-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
                                    Start Quiz
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {isHome && (
                    <div className="mt-12 text-center">
                        <Link href="/quizzes" 
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                            View All Quizzes
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Quizz;
