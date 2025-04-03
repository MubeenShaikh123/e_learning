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

            <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">Add Your Review</h1>
                            <Link
                                href={`/courses/${id}`}
                                className="text-white hover:text-blue-100 font-medium transition-colors duration-200"
                            >
                                Back to Course
                            </Link>
                        </div>
                    </div>

                    {/* Course Info */}
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">{course?.title}</h2>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-6">
                        {error && (
                            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md">
                                {error}
                            </div>
                        )}

                        {/* Rating */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-3">
                                Your Rating
                            </label>
                            <div className="flex items-center">
                                <StarRatings
                                    rating={formData.rating}
                                    starRatedColor="rgb(59, 130, 246)" // tailwind blue-500
                                    starHoverColor="rgb(96, 165, 250)" // tailwind blue-400
                                    starEmptyColor="rgb(209, 213, 219)" // tailwind gray-300
                                    changeRating={handleRatingChange}
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="40px"
                                    starSpacing="4px"
                                />
                                <span className="ml-4 text-xl font-medium text-gray-700">
                                    {formData.rating > 0 ? formData.rating : ''}
                                </span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="mb-6">
                            <label
                                htmlFor="comment"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Your Review <span className="text-sm font-normal">(Max {maxChars} characters)</span>
                            </label>
                            <textarea
                                id="comment"
                                value={formData.comment}
                                onChange={handleCommentChange}
                                rows={3}
                                maxLength={maxChars}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                placeholder="Share your experience with this course..."
                            />
                            <div className="mt-2 flex justify-end text-sm">
                                <span className={charCount > maxChars * 0.9 ? (charCount === maxChars ? "text-orange-600 font-medium" : "text-green-600") : "text-gray-500"}>
                                    {charCount}/{maxChars} characters
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <Link
                                href={`/courses/${id}`}
                                className="px-6 py-2.5 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting || charCount === 0 || formData.rating === 0}
                                className={`px-6 py-2.5 rounded-md font-medium text-white transition-colors duration-200 ${isSubmitting || charCount === 0 || formData.rating === 0
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddReview