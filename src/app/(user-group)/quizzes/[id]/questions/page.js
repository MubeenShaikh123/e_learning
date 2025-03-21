"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, prevQuestion, saveAnswer, setQuiz, setQuestionIndex } from '@/lib/features/quiz/quizSlice';
import { FcNext, FcPrevious } from "react-icons/fc";

const QuestionPage = ({ initialQuiz }) => {
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
    const quiz = useSelector((state) => state.quiz.quiz);
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const answers = useSelector((state) => state.quiz.answers);
    const [selectedAnswer, setSelectedAnswer] = useState(undefined);

    useEffect(() => {
        // Set the initial quiz data when the component mounts
        if (initialQuiz) {
            dispatch(setQuiz(initialQuiz));
        }
    }, [initialQuiz, dispatch]);

    useEffect(() => {
        setSelectedAnswer(answers[currentQuestionIndex])
    }, [currentQuestionIndex, answers]);

    const handleNext = () => {
        setSelectedAnswer(undefined)
        dispatch(nextQuestion());
    };

    const handlePrev = () => {
        setSelectedAnswer(undefined)
        dispatch(prevQuestion());
    };

    const handleSaveAnswer = ({ index, questionId, answer }) => {
        dispatch(saveAnswer({ index, questionId, answer }));
        setSelectedAnswer(answer);
    };

    const handleQuestionChange = (index) => {
        setSelectedAnswer(undefined)
        dispatch(setQuestionIndex({ index }));
    };

    const getProgressPercentage = () => {
        const answeredCount = Object.keys(answers).length;
        const totalQuestions = quiz.questions.length;
        return (answeredCount / totalQuestions) * 100;
    };

    const renderOptions = () => {
        switch (currentQuestion.type) {
            case 'multiple-choice':
                return currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                            selectedAnswer === option 
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                                : 'bg-white border border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: option })}
                    >
                        <span className="inline-block w-8 h-8 mr-3 text-center rounded-full border border-current">
                            {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                    </button>
                ));
            case 'true-false':
                return (
                    <div className="flex flex-col space-y-4 w-full">
                        <button
                            className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                                selectedAnswer === 'true' 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                                    : 'bg-white border border-gray-200 hover:border-green-300'
                            }`}
                            onClick={() => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: "true" })}
                        >
                            <span className="inline-block w-8 h-8 mr-3 text-center rounded-full border border-current">
                                T
                            </span>
                            True
                        </button>
                        <button
                            className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                                selectedAnswer === 'false' 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                                    : 'bg-white border border-gray-200 hover:border-green-300'
                            }`}
                            onClick={() => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: "false" })}
                        >
                            <span className="inline-block w-8 h-8 mr-3 text-center rounded-full border border-current">
                                F
                            </span>
                            False
                        </button>
                    </div>
                );
            case 'short-answer':
                return (
                    <input
                        type="text"
                        className="w-full border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={selectedAnswer || ''}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        onBlur={(e) => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: e.target.value })}
                        placeholder="Type your answer here..."
                    />
                );
            default:
                return <p className="text-gray-500 italic">No options available for this question.</p>;
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Header with progress bar */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                            <h2 className="text-2xl font-bold mb-2">{quiz?.title || 'Quiz Title'}</h2>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">
                                    Progress: {Object.keys(answers).length}/{quiz.questions.length} questions answered
                                </span>
                                <span className="text-sm">
                                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                </span>
                            </div>
                            <div className="h-2 mt-2 rounded-full bg-white bg-opacity-20">
                                <div 
                                    className="h-2 rounded-full bg-green-400" 
                                    style={{ width: `${getProgressPercentage()}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        {/* Question content */}
                        <div className="p-6">
                            {currentQuestion ? (
                                <div className="mb-6">
                                    <div className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                        Question {currentQuestionIndex + 1}
                                    </div>
                                    <p className="text-xl font-medium text-gray-800 mb-6">{currentQuestion.text}</p>
                                    <div className="flex flex-col space-y-4">
                                        {renderOptions()}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-40">
                                    <p className="text-gray-500">No question available.</p>
                                </div>
                            )}

                            {/* Navigation buttons */}
                            <div className="mt-8 flex justify-between">
                                <button 
                                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                        currentQuestionIndex === 0 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    }`} 
                                    onClick={handlePrev} 
                                    disabled={currentQuestionIndex === 0}
                                >
                                    <FcPrevious className="mr-2" />
                                    Previous
                                </button>
                                <button 
                                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                        currentQuestionIndex === quiz.questions.length - 1 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    }`} 
                                    onClick={handleNext} 
                                    disabled={currentQuestionIndex === quiz.questions.length - 1}
                                >
                                    Next
                                    <FcNext className="ml-2" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Question navigation */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">Questions</h3>
                            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                                {quiz.questions.map((_, index) => {
                                    const isAnswered = answers[index] !== undefined;
                                    const isCurrent = index === currentQuestionIndex;
                                    
                                    let buttonClass = "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ";
                                    
                                    if (isAnswered && isCurrent) {
                                        buttonClass += "bg-gradient-to-r from-green-500 to-green-600 text-white ring-2 ring-offset-2 ring-green-500";
                                    } else if (isAnswered) {
                                        buttonClass += "bg-green-500 text-white";
                                    } else if (isCurrent) {
                                        buttonClass += "bg-indigo-500 text-white ring-2 ring-offset-2 ring-indigo-500";
                                    } else {
                                        buttonClass += "bg-white border border-gray-300 text-gray-700 hover:border-indigo-500";
                                    }
                                    
                                    return (
                                        <button
                                            key={index}
                                            className={buttonClass}
                                            onClick={() => handleQuestionChange(index)}
                                            aria-label={`Go to question ${index + 1}`}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestionPage;