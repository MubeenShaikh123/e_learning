"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, prevQuestion, saveAnswer, setQuiz,setQuestionIndex } from '@/lib/features/quiz/quizSlice';
import { FcNext, FcPrevious } from "react-icons/fc";

const QuestionPage = ({ initialQuiz }) => {
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
    const quiz = useSelector((state) => state.quiz.quiz);
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const answers = useSelector((state) => state.quiz.answers);

    useEffect(() => {
        // Set the initial quiz data when the component mounts
        if (initialQuiz) {
            dispatch(setQuiz(initialQuiz));
        }
    }, [initialQuiz, dispatch]);

    const handleNext = () => {
        dispatch(nextQuestion());
    };

    const handlePrev = () => {
        dispatch(prevQuestion());
    };

    const handleSaveAnswer = ({index,answer}) => {
        dispatch(saveAnswer({ questionId: index, answer }));
    };

    const handleQuestionChange = (index) => {
        dispatch(setQuestionIndex({ index }));
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 pt-12 pb-24 mx-auto">
                <div className="lg:w-full justify-center items-center mx-auto flex flex-wrap flex-col">
                    <div className="border lg:w-2/3 w-full lg:px-4 lg:py-6 mb-6 lg:mb-0">
                        <h2 className='text-3xl font-semibold'>{quiz?.title || 'Quiz Title'}</h2>
                        <div className='p-4'>
                            {currentQuestion ? (
                                <p className='text-xl'>{currentQuestion.text}</p>
                            ) : (
                                <p>No question available.</p>
                            )}
                            <div className="options grid grid-cols-2 gap-3 my-3">
                                {currentQuestion.options &&
                                    currentQuestion.options.map((option, index) => (
                                        <button key={index} className='place-self-start border min-w-[80%] p-2' onClick={() => handleSaveAnswer({index:currentQuestionIndex,answer:option})}>
                                            {option}
                                        </button>
                                    ))}
                                {/* For short-answer questions */}
                                {currentQuestion.type === 'short-answer' && (
                                    <input
                                        type="text"
                                        onBlur={(e) => handleSaveAnswer(e.target.value)}
                                        placeholder="Type your answer here..."
                                    />
                                )}
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

                        <div className="question-list p-2 border grid gap-1 grid-cols-10">
                            {quiz.questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`border p-2 px-4 place-self-center question-number ${index === currentQuestionIndex ? 'current' : ''} ${answers[quiz.questions[index]._id] ? 'answered' : 'unanswered'
                                        }`}
                                    onClick={() => handleQuestionChange(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div></div>
            /</section>
    );
};

export default QuestionPage;
