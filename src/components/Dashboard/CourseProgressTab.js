import React, { useEffect, useState } from 'react';
import { BookOpen, BarChart2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CourseProgressTab = () => {

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('x-access-token');

                const [enrolledRes, recommendedRes] = await Promise.all([
                    fetch('/api/courses/get-all-enrollments', {
                        headers: { authorization: `Bearer ${token}` },
                    }),
                    fetch('/api/courses/getall?limit=2'),
                ]);

                const enrolledData = await enrolledRes.json();
                const recommendedData = await recommendedRes.json();

                if (enrolledData.success) {
                    setEnrolledCourses(enrolledData.data);
                }

                if (recommendedData.success) {
                    setRecommendedCourses(recommendedData.data);
                }
            } catch (err) {
                console.error('Failed to fetch course data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const totalEnrolled = enrolledCourses.length;
    const totalLessonsCompleted = 0;

    return (
        <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Courses Enrolled</h3>
                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <p className="text-3xl font-bold text-indigo-600">{totalEnrolled}</p>
                            <p className="text-sm text-gray-500">Total enrolled</p>
                        </div>
                        <div className="h-16 w-16 text-indigo-600">
                            <BookOpen size={64} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900">Courses Available</h3>
                    <Link href='./courses'>
                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <p className="text-3xl font-bold text-indigo-600">Continue Learning</p>
                                <p className="text-sm text-gray-500">Click to explore courses</p>
                            </div>
                            <div className="h-16 w-16 text-indigo-600">
                                <ChevronRight size={64} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Courses in progress */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Courses In Progress</h3>
                </div>
                <div className="divide-y">
                    {loading ? (
                        <div className="px-6 py-4 text-gray-500">Loading...</div>
                    ) : enrolledCourses.length === 0 ? (
                        <div className="px-6 py-4 text-gray-500">{`You're not enrolled in any courses yet.`}</div>
                    ) : (
                        enrolledCourses.map((course, i) => (
                            <div key={course._id || i} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900">{course.courseId?.title || 'Untitled Course'}</h4>
                                        <p className="text-sm text-gray-500">Enrolled course</p>
                                    </div>
                                    <Link href={`/courses/${course.courseId?._id}`}>
                                        <button
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                                        >
                                            View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Recommended courses */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Recommended Courses</h3>
                </div>
                <div className="divide-y">
                    {loading ? (
                        <div className="px-6 py-4 text-gray-500">Loading...</div>
                    ) : recommendedCourses.length === 0 ? (
                        <div className="px-6 py-4 text-gray-500">No recommendations available.</div>
                    ) : (
                        recommendedCourses.map((course) => (
                            <div key={course._id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900">{course.title}</h4>
                                        <p className="text-sm text-gray-500">
                                            {course.timeLimit ? `${course.timeLimit} min` : 'Self-paced'} • {course.difficulty || 'Beginner'}
                                        </p>
                                    </div>
                                    <Link href={`/courses/${course.courseId?._id}`}>
                                        <button
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                                        >
                                            View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseProgressTab;
