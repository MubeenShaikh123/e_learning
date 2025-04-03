"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Course = ({ isHome }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/api/courses/getall");
                const data = await response.json();
                console.log(`courses: ${JSON.stringify(data)}`)
                setCourses(data.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-600">Loading courses...</p>;
    }

    return (
        <section className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Explore Our Expert-Led Courses
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover a wide range of courses designed to help you excel in your career. From beginner to advanced levels.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <p className="text-center text-gray-600">No courses available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-48">
                                    <Image
                                        fill
                                        alt={course.title}
                                        className="object-cover"
                                        src="/bg4.jfif"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                                </div>

                                <div className="p-6">
                                    <div className="mb-3">
                                        <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                                            {course.category || "Uncategorized"}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <Link href={`/courses/${course._id}`} className="hover:text-indigo-600 transition-colors">
                                            {course.title}
                                        </Link>
                                    </h3>

                                    <p className="text-gray-600 line-clamp-3 mb-4">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-medium">{course.rating}</span>
                                            <span className="text-gray-500">({course.reviews})</span>
                                        </div>
                                        <span className="text-lg font-bold text-indigo-600">₹{course.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isHome && (
                    <div className="mt-12 text-center">
                        <Link href="/courses" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                            View All Courses
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Course;
