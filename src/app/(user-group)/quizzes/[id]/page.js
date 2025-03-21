import React from 'react';
import { notFound } from 'next/navigation';
import Button from './button';

const dummyQuizzes = [
    {
        _id: "66bce68f317341e67df79f10",
        title: "Python Programming Basics",
        description: "An introductory quiz on Python programming.",
        category: "Programming",
        instructor: "Alice Johnson",
        price: 12.99,
        timeLimit: 2,
        questionCount: 20,
        difficulty: "Beginner",
        color: "from-blue-500 to-indigo-600",
        icon: "🐍",
        questions: Array(2).fill({
            text: "Sample question", // Changed from `question` to `text`
            type: "multiple-choice", // Added question type
            options: ["A", "B", "C", "D"],
            correctAnswer: "A" // Changed from `answer` to `correctAnswer`
        }),
        createdAt: "2024-08-08T14:00:00Z",
        updatedAt: "2024-08-08T14:00:00Z"
    },
    {
        _id: "64d123456789abcd01234579",
        title: "Data Structures & Algorithms",
        description: "Test your knowledge of common data structures and algorithms.",
        category: "Computer Science",
        instructor: "Robert Lee",
        price: 15.99,
        timeLimit: 45,
        questionCount: 25,
        difficulty: "Intermediate",
        color: "from-purple-500 to-pink-500",
        icon: "🔍",
        questions: Array(25).fill({
            text: "Sample question", // Changed from `question` to `text`
            type: "multiple-choice", // Added question type
            options: ["A", "B", "C", "D"],
            correctAnswer: "B" // Changed from `answer` to `correctAnswer`
        }),
        createdAt: "2024-08-07T10:15:00Z",
        updatedAt: "2024-08-07T10:15:00Z"
    }
];

async function fetchQuizData(id) {
    const quizz = dummyQuizzes.find(q => q._id === id);
    if (!quizz) {
        return null;
    }
    return quizz;
}

const QuizzPage = async ({ params }) => {
    const quizz = await fetchQuizData(params.id);
    
    if (!quizz) {
        notFound(); // Redirect to 404 if quiz not found
    }
    
    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-[1.01]`}>
                        <div className={`h-16 bg-gradient-to-r ${quizz.color} flex items-center px-6`}>
                            <span className="text-3xl mr-4">{quizz.icon}</span>
                            <h1 className="text-2xl font-bold text-white">{quizz.title}</h1>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-6">
                                <p className="text-gray-700 text-lg mb-4">{quizz.description}</p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {quizz.category}
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        {quizz.difficulty}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                        ${quizz.price}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>Time Limit</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">{quizz.timeLimit || '30'} Minutes</span>
                                </div>
                                
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>Number of Questions</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">{quizz.questions.length || 'N/A'}</span>
                                </div>
                                
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        <span>Instructor</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">{quizz.instructor}</span>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-center">
                                <Button quiz={quizz} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuizzPage;