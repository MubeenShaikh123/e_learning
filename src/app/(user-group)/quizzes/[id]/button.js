"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setQuiz } from '@/lib/features/quiz/quizSlice';

const Button = ({ quiz, userId }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isAttempted, setIsAttempted] = useState(false);
    const [loading, setLoading] = useState(true);
    userId = "mubeenshaikh8072@gmail.com";

    useEffect(() => {
        const checkAttempt = async () => {
            try {

                const response = await fetch("/api/quizzes/check-attempt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quizId: quiz._id, userId }),
                });

                const data = await response.json();

                if (response.ok && data.attempted) {
                    setIsAttempted(true);
                }
            } catch (error) {
                console.error("Error checking quiz attempt:", error);
            } finally {
                setLoading(false);
            }
        };

        if (quiz._id && userId) {
            checkAttempt();
        }
    }, [quiz._id, userId]);

    const handleClick = () => {
        if (isAttempted) return;

        Swal.fire({
            title: 'Do you want to confirm?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setQuiz(quiz));
                router.push(`/quizzes/${quiz._id}/questions`);
            }
        });
    };

return (
    <div className="flex w-full">
        <button
            onClick={handleClick}
            disabled={isAttempted}
            className={`flex w-full justify-center items-center py-3 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform shadow-lg ${
                isAttempted 
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 hover:shadow-xl'
            }`}
        >
            {loading ? "Checking..." : isAttempted ? "Already Attempted" : "Attempt Now"}
        </button>
    </div>
);
};

export default Button;
