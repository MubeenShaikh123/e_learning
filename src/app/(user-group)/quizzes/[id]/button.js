"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setQuiz } from '@/lib/features/quiz/quizSlice';

const Button = ({quiz}) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = () => {
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
                dispatch(setQuiz(quiz))
                router.push(`/quizzes/${quiz._id}/questions`);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log("Action canceled");
            }
        });
    };

    return (
        <div className="flex">
            <button onClick={handleClick} className="flex ml-auto w-full text-white bg-gradient-to-br from-[#3442D2] to-[#B24EFF] border-0 py-2 px-6 focus:outline-none rounded justify-center uppercase">
                Attempt now
            </button>
        </div>
    );
};

export default Button;
