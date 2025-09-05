"use client";

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link'
import StarRatings from 'react-star-ratings'
import Head from 'next/head'

const AddReview = ({ course = { title: "Full Stack Web Development" } }) => {
    const { id } = useParams(); // Extracts [id] from the URL
    const router = useRouter();
    const [formData, setFormData] = useState({
        reviewerName: 'Miya Bhai',
        reviewerEmail: 'mubeenshaikh8072@gmail.com',
        rating: 0,
        comment: '',
    })
    const [charCount, setCharCount] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const maxChars = 300

    const handleRatingChange = (newRating) => {
        setFormData({ ...formData, rating: newRating })
    }

    const handleCommentChange = (e) => {
        const text = e.target.value
        if (text.length <= maxChars) {
            setFormData({ ...formData, comment: text })
            setCharCount(text.length)
        } else {
            // Allow deletion when over the limit
            if (text.length < formData.comment.length) {
                setFormData({ ...formData, comment: text })
                setCharCount(text.length)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.rating === 0) {
            setError("Please select a rating");
            return;
        }

        if (formData.comment.trim() === "") {
            setError("Please add a comment");
            return;
        }

        if (charCount > maxChars) {
            setError(`Comment exceeds the maximum of ${maxChars} characters`);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch(`/api/courses/add-review/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); // Parse the response body

            console.log("Response Data:", data); // Log the actual API response

            if (!response.ok) {
                throw new Error(data.message || "Failed to submit review"); // Use API's error message
            }

            // Redirect back to course page on success
            router.push(`/courses/${id}`);
        } catch (err) {
            setError(err.message || "Something went wrong");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head>
                <title>Add Review | {course?.title || 'Course'}</title>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden py-12">
                {/* Animated Background Elements */}
                <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold text-white">Add Your Review</h1>
                                <Link
                                    href={`/courses/${id}`}
                                    className="backdrop-blur-sm bg-white/20 text-white hover:bg-white/30 font-medium transition-all duration-300 px-6 py-2 rounded-full border border-white/30 hover:scale-105"
                                >
                                    Back to Course
                                </Link>
                            </div>
                        </div>

                        {/* Course Info */}
                        <div className="border-b border-white/30 bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm px-8 py-6">
                            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {course?.title}
                            </h2>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-8 py-8">
                            {error && (
                                <div className="mb-8 backdrop-blur-xl bg-red-50/80 border border-red-200/50 text-red-700 p-6 rounded-2xl shadow-lg">
                                    {error}
                                </div>
                            )}

                            {/* Rating */}
                            <div className="mb-8">
                                <label className="block text-gray-700 font-semibold mb-4 text-lg">
                                    Your Rating
                                </label>
                                <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-4 sm:p-6 shadow-lg">
                                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        {/* Stars container with proper spacing */}
                                        <div className="flex justify-center sm:justify-start">
                                            <StarRatings
                                                rating={formData.rating}
                                                starRatedColor="rgb(59, 130, 246)"
                                                starHoverColor="rgb(96, 165, 250)"
                                                starEmptyColor="rgb(209, 213, 219)"
                                                changeRating={handleRatingChange}
                                                numberOfStars={5}
                                                name="rating"
                                                starDimension="32px" // Smaller on mobile
                                                starSpacing="4px"    // Tighter spacing on mobile
                                            />
                                        </div>
                                        
                                        {/* Rating display */}
                                        <div className="flex justify-center sm:justify-start">
                                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                                {formData.rating > 0 ? `${formData.rating} Star${formData.rating !== 1 ? 's' : ''}` : 'Select Rating'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Helper text */}
                                    <p className="text-sm text-gray-500 mt-3 text-center sm:text-left">
                                        Tap the stars above to rate this course
                                    </p>
                                </div>
                            </div>

                            {/* Comment */}
                            <div className="mb-8">
                                <label
                                    htmlFor="comment"
                                    className="block text-gray-700 font-semibold mb-4 text-lg"
                                >
                                    Your Review
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        (Max {maxChars} characters)
                                    </span>
                                </label>
                                <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-6 shadow-lg">
                                    <textarea
                                        id="comment"
                                        value={formData.comment}
                                        onChange={handleCommentChange}
                                        rows={4}
                                        maxLength={maxChars}
                                        className="w-full px-6 py-4 rounded-xl border-0 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500"
                                        placeholder="Share your experience with this course..."
                                    />
                                    <div className="mt-3 flex justify-end">
                                        <span className={`text-sm font-medium ${charCount > maxChars * 0.9
                                                ? (charCount === maxChars ? "text-orange-600" : "text-green-600")
                                                : "text-gray-500"
                                            }`}>
                                            {charCount}/{maxChars} characters
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <Link
                                    href={`/courses/${id}`}
                                    className="px-8 py-3 backdrop-blur-xl bg-white/60 border border-white/50 rounded-2xl font-semibold text-gray-700 hover:bg-white/70 hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || charCount === 0 || formData.rating === 0}
                                    className={`px-8 py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-2xl ${isSubmitting || charCount === 0 || formData.rating === 0
                                            ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 hover:shadow-3xl"
                                        }`}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Review"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddReview