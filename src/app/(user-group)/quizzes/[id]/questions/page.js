"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    nextQuestion,
    prevQuestion,
    saveAnswer,
    setQuiz,
    setQuestionIndex,
} from "@/lib/features/quiz/quizSlice";
import { FcNext, FcPrevious } from "react-icons/fc";

const QuestionPage = ({ initialQuiz, userId }) => {
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector(
        (state) => state.quiz.currentQuestionIndex
    );
    const quiz = useSelector((state) => state.quiz.quiz);
    const answers = useSelector((state) => state.quiz.answers);
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const [selectedAnswer, setSelectedAnswer] = useState(undefined);
    const [markedForReview, setMarkedForReview] = useState({});
    const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert minutes to seconds
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialQuiz) {
            dispatch(setQuiz(initialQuiz));
        }
    }, [initialQuiz, dispatch]);

    useEffect(() => {
        setSelectedAnswer(answers[currentQuestionIndex]);
    }, [currentQuestionIndex, answers]);

    const handleSubmit = useCallback(async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const payload = {
            quizId: quiz._id,
            userId: "mubeenshaikh8072@gmail.com", // Ensure userId is included
            answers: quiz.questions.map((question, index) => ({
                questionId: question._id,
                answer: answers[index] || null
            })),
            markedForReview: quiz.questions.reduce((acc, question, index) => {
                if (markedForReview[index]) {
                    acc[question._id] = true;
                }
                return acc;
            }, {})
        };

        try {
            const response = await fetch("/api/quizzes/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Quiz submitted successfully!");
            } else {
                alert("❌ Failed to submit quiz: " + data.message);
            }
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("❌ An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, quiz, answers, markedForReview]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, handleSubmit]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleNext = () => {
        setSelectedAnswer(undefined);
        dispatch(nextQuestion());
    };

    const handlePrev = () => {
        setSelectedAnswer(undefined);
        dispatch(prevQuestion());
    };

    const handleSaveAnswer = ({ index, questionId, answer }) => {
        dispatch(saveAnswer({ index, questionId, answer }));
        setSelectedAnswer(answer);
    };

    const handleQuestionChange = (index) => {
        setSelectedAnswer(undefined);
        dispatch(setQuestionIndex({ index }));
    };

    const handleMarkForReview = () => {
        setMarkedForReview((prev) => ({
            ...prev,
            [currentQuestionIndex]: !prev[currentQuestionIndex],
        }));
    };

    const renderQuestionOptions = () => {
        if (!currentQuestion) return null;

        switch (currentQuestion.type) {
            case "multiple-choice":
                return (
                    <div className="flex flex-col space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:shadow-md ${selectedAnswer === option
                                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                                    : "bg-white border border-gray-200 hover:border-green-300"
                                    }`}
                                onClick={() =>
                                    handleSaveAnswer({
                                        index: currentQuestionIndex,
                                        questionId: currentQuestion._id,
                                        answer: option,
                                    })
                                }
                            >
                                <span className="inline-block w-8 h-8 mr-3 text-center rounded-full border border-current">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>
                );

            case "true-false":
                const trueFalseOptions = ["True", "False"];
                return (
                    <div className="flex flex-col space-y-4">
                        {trueFalseOptions.map((option, index) => (
                            <button
                                key={index}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:shadow-md ${selectedAnswer === option
                                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                                    : "bg-white border border-gray-200 hover:border-green-300"
                                    }`}
                                onClick={() =>
                                    handleSaveAnswer({
                                        index: currentQuestionIndex,
                                        questionId: currentQuestion._id,
                                        answer: option,
                                    })
                                }
                            >
                                <span className="inline-block w-8 h-8 mr-3 text-center rounded-full border border-current">
                                    {option === "True" ? "T" : "F"}
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>
                );

            case "short-answer":
                return (
                    <div className="mt-4">
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            rows="4"
                            placeholder="Type your answer here..."
                            value={selectedAnswer || ""}
                            onChange={(e) => {
                                const answer = e.target.value;
                                setSelectedAnswer(answer);
                                handleSaveAnswer({
                                    index: currentQuestionIndex,
                                    questionId: currentQuestion._id,
                                    answer: answer,
                                });
                            }}
                        />
                    </div>
                );

            default:
                return <p className="text-red-500">Unsupported question type: {currentQuestion.type}</p>;
        }
    };

    const getQuestionTypeLabel = (type) => {
        switch (type) {
            case "multiple-choice":
                return "Multiple Choice";
            case "true-false":
                return "True/False";
            case "short-answer":
                return "Short Answer";
            default:
                return "Unknown";
        }
    };

    const allQuestionsAnswered = Object.keys(answers).length === quiz.questions.length;

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Timer and Progress */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{quiz?.title || "Quiz Title"}</h2>
                            <div className="text-lg font-semibold bg-white text-indigo-700 px-3 py-1 rounded-lg">
                                ⏳ {formatTime(timeLeft)}
                            </div>
                        </div>

                        <div className="p-6">
                            {currentQuestion ? (
                                <>
                                    {/* Question Header */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-500">
                                                Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                            </span>
                                            <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                                {getQuestionTypeLabel(currentQuestion.type)}
                                            </span>
                                        </div>
                                        <p className="text-xl font-medium text-gray-800">{currentQuestion.text}</p>
                                    </div>

                                    {/* Question Options/Input */}
                                    {renderQuestionOptions()}

                                    {/* Mark for Review */}
                                    <button
                                        className={`mt-6 px-4 py-2 rounded-lg transition-colors ${markedForReview[currentQuestionIndex]
                                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                            }`}
                                        onClick={handleMarkForReview}
                                    >
                                        {markedForReview[currentQuestionIndex] ? "🏷️ Marked for Review" : "🏷️ Mark for Review"}
                                    </button>
                                </>
                            ) : (
                                <p className="text-gray-500">No question available.</p>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentQuestionIndex === 0}
                                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentQuestionIndex === 0
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        }`}
                                >
                                    <FcPrevious className="mr-2" /> Previous
                                </button>

                                {allQuestionsAnswered && (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Quiz"}
                                    </button>
                                )}

                                <button
                                    onClick={handleNext}
                                    disabled={currentQuestionIndex === quiz.questions.length - 1}
                                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentQuestionIndex === quiz.questions.length - 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        }`}
                                >
                                    Next <FcNext className="ml-2" />
                                </button>
                            </div>
                        </div>

                        {/* Question Navigation */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">Questions Overview</h3>
                            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                                {quiz.questions.map((question, index) => {
                                    const isAnswered = answers[index] !== undefined && answers[index] !== null && answers[index] !== "";
                                    const isMarked = markedForReview[index];
                                    const isCurrent = index === currentQuestionIndex;

                                    return (
                                        <button
                                            key={index}
                                            className={`w-10 h-10 rounded-full text-sm font-medium transition-all border-2 ${isCurrent
                                                ? "border-indigo-500 ring-2 ring-indigo-200"
                                                : "border-transparent"
                                                } ${isMarked
                                                    ? "bg-yellow-500 text-white"
                                                    : isAnswered
                                                        ? "bg-green-500 text-white"
                                                        : "bg-white border border-gray-300 text-gray-700"
                                                }`}
                                            onClick={() => handleQuestionChange(index)}
                                            title={`Question ${index + 1} - ${getQuestionTypeLabel(question.type)} ${isAnswered ? "(Answered)" : ""} ${isMarked ? "(Marked)" : ""}`}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                                    <span>Answered</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                                    <span>Marked for Review</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-white border border-gray-300 rounded-full mr-2"></div>
                                    <span>Not Answered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestionPage;