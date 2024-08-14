import React from 'react';
import { notFound } from 'next/navigation'; // Import the notFound helper function
import Button from './button'; // Import your client-side button component

async function fetchQuizData(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes/get/${id}`, { next: { revalidate: 60 } });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const { data: quizzData } = await res.json();
        return quizzData;
    } catch (error) {
        console.error('Failed to fetch quiz data:', error);
        return null;
    }
}

const QuizzPage = async ({ params }) => {
    const quizz = await fetchQuizData(params.id);

    if (!quizz) {
        // Use notFound to redirect to a 404 page
        notFound();
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 pt-12 pb-24 mx-auto">
                <div className="lg:w-full justify-center items-center mx-auto flex flex-wrap flex-col">
                    <div className="border lg:w-2/3 w-full lg:px-4 lg:py-6 mb-6 lg:mb-0">
                        <h1 className='text-2xl font-semibold uppercase'>{quizz.title}</h1>
                        <p className=''>{quizz.description}</p>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Time Limit</span>
                            <span className="ml-auto text-gray-900">{quizz.timeLimit || '30'} Minutes</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Number of questions</span>
                            <span className="ml-auto text-gray-900">{quizz.questions.length || 'N/A'}</span>
                        </div>
                        <Button quiz={quizz}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuizzPage;
