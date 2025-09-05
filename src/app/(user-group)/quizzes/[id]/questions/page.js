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
                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group ${selectedAnswer === option
                                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl border border-green-400/50"
                                        : "backdrop-blur-xl bg-white/60 border border-white/50 text-gray-700 hover:bg-white/70"
                                    }`}
                                onClick={() =>
                                    handleSaveAnswer({
                                        index: currentQuestionIndex,
                                        questionId: currentQuestion._id,
                                        answer: option,
                                    })
                                }
                            >
                                <div className="flex items-center">
                                    <span className={`inline-flex items-center justify-center w-10 h-10 mr-4 text-center rounded-2xl font-bold transition-all duration-300 ${selectedAnswer === option
                                            ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                                            : "bg-blue-500/20 backdrop-blur-sm text-blue-700 border border-blue-500/30 group-hover:bg-blue-500/30"
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="font-medium text-lg">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                );

            case "true-false":
                const trueFalseOptions = ["True", "False"];
                return (
                    <div className="space-y-4">
                        {trueFalseOptions.map((option, index) => (
                            <button
                                key={index}
                                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group ${selectedAnswer === option
                                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl border border-green-400/50"
                                        : "backdrop-blur-xl bg-white/60 border border-white/50 text-gray-700 hover:bg-white/70"
                                    }`}
                                onClick={() =>
                                    handleSaveAnswer({
                                        index: currentQuestionIndex,
                                        questionId: currentQuestion._id,
                                        answer: option,
                                    })
                                }
                            >
                                <div className="flex items-center">
                                    <span className={`inline-flex items-center justify-center w-10 h-10 mr-4 text-center rounded-2xl font-bold transition-all duration-300 ${selectedAnswer === option
                                            ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                                            : "bg-blue-500/20 backdrop-blur-sm text-blue-700 border border-blue-500/30 group-hover:bg-blue-500/30"
                                        }`}>
                                        {option === "True" ? "T" : "F"}
                                    </span>
                                    <span className="font-medium text-lg">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                );

            case "short-answer":
                return (
                    <div className="mt-6">
                        <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-2 shadow-lg">
                            <textarea
                                className="w-full p-4 bg-transparent border-0 rounded-xl resize-none text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent text-lg"
                                rows="6"
                                placeholder="Type your detailed answer here..."
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
                        <div className="mt-3 text-sm text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            Your answer will be saved automatically as you type
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 rounded-2xl p-6 text-center">
                        <p className="text-red-600 font-medium text-lg">
                            Unsupported question type: {currentQuestion.type}
                        </p>
                    </div>
                );
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden py-6">
            {/* Animated Background Elements */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <section className="relative z-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
                            {/* Timer and Progress */}
                            <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-6 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                <h2 className="text-2xl sm:text-3xl font-bold">{quiz?.title || "Quiz Title"}</h2>
                                <div className="text-lg font-bold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-2xl border border-white/30">
                                    ⏳ {formatTime(timeLeft)}
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">
                                {currentQuestion ? (
                                    <>
                                        {/* Question Header */}
                                        <div className="mb-6">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                                                <span className="text-sm font-medium text-gray-500">
                                                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                                </span>
                                                <span className="text-sm font-medium text-blue-700 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
                                                    {getQuestionTypeLabel(currentQuestion.type)}
                                                </span>
                                            </div>
                                            <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-6 shadow-lg">
                                                <p className="text-xl font-medium text-gray-800 leading-relaxed">{currentQuestion.text}</p>
                                            </div>
                                        </div>

                                        {/* Question Options/Input */}
                                        <div className="mb-6">
                                            {renderQuestionOptions()}
                                        </div>

                                        {/* Mark for Review */}
                                        <button
                                            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 shadow-lg ${markedForReview[currentQuestionIndex]
                                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
                                                : "backdrop-blur-xl bg-white/60 border border-white/50 text-gray-700 hover:bg-white/70"
                                                } hover:scale-105`}
                                            onClick={handleMarkForReview}
                                        >
                                            {markedForReview[currentQuestionIndex] ? "🏷️ Marked for Review" : "🏷️ Mark for Review"}
                                        </button>
                                    </>
                                ) : (
                                    <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-8 text-center">
                                        <p className="text-gray-500 text-lg">No question available.</p>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentQuestionIndex === 0}
                                        className={`flex items-center justify-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${currentQuestionIndex === 0
                                            ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed"
                                            : "backdrop-blur-xl bg-white/60 border border-white/50 text-gray-700 hover:bg-white/70 hover:scale-105"
                                            } shadow-lg`}
                                    >
                                        <FcPrevious className="mr-2" /> Previous
                                    </button>

                                    {allQuestionsAnswered && (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Quiz"}
                                        </button>
                                    )}

                                    <button
                                        onClick={handleNext}
                                        disabled={currentQuestionIndex === quiz.questions.length - 1}
                                        className={`flex items-center justify-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${currentQuestionIndex === quiz.questions.length - 1
                                            ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed"
                                            : "backdrop-blur-xl bg-white/60 border border-white/50 text-gray-700 hover:bg-white/70 hover:scale-105"
                                            } shadow-lg`}
                                    >
                                        Next <FcNext className="ml-2" />
                                    </button>
                                </div>
                            </div>

                            {/* Question Navigation */}
                            <div className="backdrop-blur-xl bg-white/40 border-t border-white/30 p-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">Questions Overview</h3>
                                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
                                    {quiz.questions.map((question, index) => {
                                        const isAnswered = answers[index] !== undefined && answers[index] !== null && answers[index] !== "";
                                        const isMarked = markedForReview[index];
                                        const isCurrent = index === currentQuestionIndex;

                                        return (
                                            <button
                                                key={index}
                                                className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-110 shadow-lg ${isCurrent
                                                    ? "ring-2 ring-blue-500 ring-offset-2"
                                                    : ""
                                                    } ${isMarked
                                                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                                        : isAnswered
                                                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                                            : "backdrop-blur-xl bg-white/60 border border-white/50 text-gray-700 hover:bg-white/70"
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
                                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 shadow-sm"></div>
                                        <span className="font-medium text-gray-700">Answered</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3 shadow-sm"></div>
                                        <span className="font-medium text-gray-700">Marked for Review</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 backdrop-blur-xl bg-white/60 border border-white/50 rounded-full mr-3 shadow-sm"></div>
                                        <span className="font-medium text-gray-700">Not Answered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuestionPage;