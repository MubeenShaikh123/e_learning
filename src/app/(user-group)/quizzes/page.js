import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Quizz = ({ isHome }) => {
    const quizzes = [
        {
            _id: "66bce68f317341e67df79f10",
            title: "Python Programming Basics",
            description: "An introductory quiz on Python programming.",
            category: "Programming",
            instructor: "Alice Johnson",
            price: 12.99,
            timeLimit: 35,
            questionCount: 20,
            difficulty: "Beginner",
            color: "from-blue-500 to-indigo-600",
            icon: "🐍",
            questions: [
                // questions data preserved
            ],
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
            questions: [
                // questions data preserved
            ],
            createdAt: "2024-08-07T10:15:00Z",
            updatedAt: "2024-08-07T10:15:00Z"
        },
        {
            _id: "64d123456789abcd01234583",
            title: "React.js Fundamentals",
            description: "A quiz on the basics of React.js and its core concepts.",
            category: "Web Development",
            instructor: "Emily White",
            price: 9.99,
            timeLimit: 30,
            questionCount: 15,
            difficulty: "Intermediate",
            color: "from-cyan-500 to-blue-500",
            icon: "⚛️",
            questions: [
                // questions data preserved
            ],
            createdAt: "2024-08-06T16:45:00Z",
            updatedAt: "2024-08-06T16:45:00Z"
        },
        {
            _id: "64d123456789abcd01234587",
            title: "Database Management Systems",
            description: "Test your understanding of database concepts and SQL.",
            category: "Database",
            instructor: "Michael Brown",
            price: 13.99,
            timeLimit: 40,
            questionCount: 22,
            difficulty: "Intermediate",
            color: "from-amber-500 to-orange-500",
            icon: "🗄️",
            questions: [
                // questions data preserved
            ],
            createdAt: "2024-08-05T11:30:00Z",
            updatedAt: "2024-08-05T11:30:00Z"
        },
        {
            _id: "64d123456789abcd01234591",
            title: "Network Security Basics",
            description: "A quiz on fundamental concepts in network security.",
            category: "Cybersecurity",
            instructor: "Sarah Green",
            price: 14.99,
            timeLimit: 50,
            questionCount: 30,
            difficulty: "Advanced",
            color: "from-emerald-500 to-green-500",
            icon: "🔒",
            questions: [
                // questions data preserved
            ],
            createdAt: "2024-08-04T09:00:00Z",
            updatedAt: "2024-08-04T09:00:00Z"
        }
    ];

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
                                    <span className="inline-flex items-center text-xs text-gray-500">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {quiz.timeLimit} mins
                                    </span>
                                    <span className="inline-flex items-center text-xs text-gray-500">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {quiz.questionCount} questions
                                    </span>
                                    <span className="inline-flex items-center text-xs text-gray-500">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        {quiz.instructor}
                                    </span>
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
                                
                                <Link href={`./quizzes/${quiz._id}`} 
                                    className="block w-full text-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
                                    Start Quiz
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                
                {isHome && (
                    <div className="mt-12 text-center">
                        <Link href="./quizzes" 
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                            View All Quizzes
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Quizz;