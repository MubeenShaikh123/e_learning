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
    }, [currentQuestionIndex]);

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

    const renderOptions = () => {
        switch (currentQuestion.type) {
            case 'multiple-choice':
                return currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`place-self-start border min-w-[80%] p-2 ${(selectedAnswer == option) ? ' bg-green-400 text-white ' : ''}`}
                        onClick={() => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: option })}
                    >
                        {option}
                    </button>
                ));
            case 'true-false':
                return (
                    <>
                        <button
                            className={`place-self-start border min-w-[80%] p-2 ${(selectedAnswer == 'true') ? ' bg-green-400 text-white ' : ''}`}
                            onClick={() => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: "true" })}
                        >
                            True
                        </button>
                        <button
                            className={`place-self-start border min-w-[80%] p-2 ${(selectedAnswer == 'false') ? ' bg-green-400 text-white ' : ''}`}
                            onClick={() => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: "false" })}
                        >
                            False
                        </button>
                    </>
                );
            case 'short-answer':
                return (
                    <input
                        type="text"
                        className="border p-2 min-w-[80%]"
                        value={`${(selectedAnswer == option) ? ' bg-green-400 text-white ' : ''}`}
                        onBlur={(e) => handleSaveAnswer({ index: currentQuestionIndex, questionId: currentQuestion._id, answer: e.target.value })}
                        placeholder="Type your answer here..."
                    />
                );
            default:
                return <p>No options available for this question.</p>;
        }
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-2 md:px-5 pt-4 md:pt-12 pb-24 mx-auto">
                <div className="lg:w-full justify-center items-center mx-auto flex flex-wrap flex-col">
                    <div className="border lg:w-2/3 w-full lg:px-4 lg:py-6 mb-6 lg:mb-0">
                        <h2 className='text-3xl font-semibold p-2'>{quiz?.title || 'Quiz Title'}</h2>
                        <div className='p-4'>
                            {currentQuestion ? (
                                <p className='text-xl'>Q.{currentQuestionIndex + 1} {currentQuestion.text}</p>
                            ) : (
                                <p>No question available.</p>
                            )}
                            <div className="options grid grid-cols-2 gap-3 my-3">
                                {renderOptions()}
                            </div>

                            <div className="navigation-buttons flex flex-row justify-between">
                                <button className='p-2 border flex flex-row' onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                                    <FcPrevious className='self-center' /> Previous Question
                                </button>
                                <button className='p-2 border flex flex-row' onClick={handleNext} disabled={currentQuestionIndex === quiz.questions.length - 1}>
                                    Next Question <FcNext className='self-center' />
                                </button>
                            </div>
                        </div>

                        <div className="question-list p-2 border grid gap-1 grid-cols-5 md:grid-cols-10">
                            {quiz.questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`border p-2 px-4 w-full place-self-center question-number  ${(answers[index] && 1) ? ' bg-green-400 ' : `${(index === currentQuestionIndex) ? ' bg-purple-400 ' : ''}`
                                        }`}
                                    onClick={() => handleQuestionChange(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div></div>
        </section>
    );
};

export default QuestionPage;
