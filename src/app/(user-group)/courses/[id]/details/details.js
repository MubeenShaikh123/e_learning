"use client";
import React, { useState } from 'react';
import Description from './description';
import Contents from './contents';
import Reviews from './reviews';

const Details = ({ course }) => {
    const [tab, setTab] = useState('Description');
    // Function to render content based on the active tab
    const renderContent = () => {
        switch (tab) {
            case 'Description':
                return <Description course={course}></Description>;
            case 'Contents':
                return <Contents course={course}></Contents>;
            case 'Reviews':
                return <Reviews course={course}></Reviews>;
            default:
                return <Description course={course}></Description>;
        }
    };

    return (
        <>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 uppercase">{course.title}</h1>
            <div className="flex mb-4">
                <button
                    className={`flex-grow ${tab === 'Description' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'border-b-2 border-gray-300'} py-2 text-lg px-1`}
                    onClick={() => setTab('Description')}
                >
                    Description
                </button>
                <button
                    className={`flex-grow ${tab === 'Contents' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'border-b-2 border-gray-300'} py-2 text-lg px-1`}
                    onClick={() => setTab('Contents')}
                >
                    Contents
                </button>
                <button
                    className={`flex-grow ${tab === 'Reviews' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'border-b-2 border-gray-300'} py-2 text-lg px-1`}
                    onClick={() => setTab('Reviews')}
                >
                    Reviews
                </button>
            </div>
            {renderContent()}

        </>
    );
};

export default Details;
