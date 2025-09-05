"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

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
        // Course Component Return JSX
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

            <section className="relative z-10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                            Explore Our Expert-Led Courses
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Discover a wide range of courses designed to help you excel in your career. From beginner to advanced levels.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin animate-reverse"></div>
                            </div>
                            <p className="mt-6 text-center text-gray-600 font-medium">Loading amazing courses...</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center">
                            <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-12 max-w-md mx-auto">
                                <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-500" />
                                <p className="text-gray-600 text-lg font-medium">No courses available at the moment.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course) => (
                                <div key={course._id} className="group h-full">
                                    <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80 h-full flex flex-col">
                                        {course.image ? (
                                            <div className="relative h-48 overflow-hidden flex-shrink-0">
                                                <Image
                                                    fill
                                                    alt={course.title}
                                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                                    src={course.image}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
                                            </div>
                                        ) : (
                                            <div className="relative h-48 overflow-hidden flex-shrink-0">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"></div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <BookOpen className="w-16 h-16 text-white opacity-90" />
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="mb-4">
                                                <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-700 rounded-full text-sm font-medium border border-blue-500/30">
                                                    {course.category || "Uncategorized"}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                                <Link href={`/courses/${course._id}`} className="hover:text-blue-600 transition-colors">
                                                    {course.title}
                                                </Link>
                                            </h3>

                                            <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed flex-grow">
                                                {course.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/50">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-yellow-400">★</span>
                                                    <span className="font-medium text-gray-700">{course.rating}</span>
                                                    <span className="text-gray-500">({course.reviews})</span>
                                                </div>
                                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                                    ₹{course.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isHome && (
                        <div className="mt-16 text-center">
                            <Link
                                href="/courses"
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-flex items-center"
                            >
                                View All Courses
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Course;
