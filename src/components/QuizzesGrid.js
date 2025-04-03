import React, { useState } from 'react';
import {
    Clock,
    Star,
    UserCircle,
    ChevronRight
} from 'lucide-react';

const QuizCard = ({ quiz, onStartQuiz }) => {
    return (
        <div className="group bg-white border border-gray-200 rounded-xl shadow-soft 
            hover:shadow-lg transition-all duration-300 ease-in-out 
            transform hover:-translate-y-2 overflow-hidden">
            {/* Quiz Header with Gradient and Icon */}
            <div 
                className={`h-36 bg-gradient-to-r ${quiz.color} relative flex items-center justify-center`}
            >
                <span className="text-6xl text-white opacity-80">{quiz.icon}</span>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold text-gray-800">
                    {quiz.difficulty}
                </div>
            </div>

            {/* Quiz Details */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex-grow pr-2">
                        {quiz.title}
                    </h3>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium whitespace-nowrap">
                        {quiz.category}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 h-[4rem] overflow-hidden text-ellipsis">
                    {quiz.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                        <UserCircle className="w-5 h-5 text-gray-500" />
                        <span className="truncate">{quiz.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span>{quiz.timeLimit} min</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
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

                <button
                    onClick={onStartQuiz}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg 
                    font-semibold hover:bg-indigo-700 transition-colors 
                    flex items-center justify-center"
                >
                    Start Quiz
                    <ChevronRight className="ml-2 w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const QuizzesGrid = ({ quizzes, onViewAllQuizzes }) => {
    const [visibleQuizzes, setVisibleQuizzes] = useState(6);

    const handleStartQuiz = (quizId) => {
        console.log(`Navigate to quiz ${quizId}`);
    };

    const loadMoreQuizzes = () => {
        setVisibleQuizzes(prev => prev + 6);
    };

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.slice(0, visibleQuizzes).map((quiz) => (
                    <QuizCard
                        key={quiz._id}
                        quiz={quiz}
                        onStartQuiz={() => handleStartQuiz(quiz._id)}
                    />
                ))}
            </div>

            {visibleQuizzes < quizzes.length && (
                <div className="mt-10 text-center">
                    <button
                        onClick={loadMoreQuizzes}
                        className="flex items-center justify-center mx-auto 
                        bg-indigo-600 text-white px-8 py-3 rounded-lg 
                        text-base font-semibold 
                        hover:bg-indigo-700 transition-colors duration-300 
                        shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        Load More Quizzes
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="mt-10 text-center">
                <button
                    onClick={onViewAllQuizzes}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg 
                    text-base font-semibold 
                    hover:bg-indigo-700 transition-colors duration-300 
                    shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    View All Quizzes
                </button>
            </div>
        </div>
    );
};

export default QuizzesGrid;