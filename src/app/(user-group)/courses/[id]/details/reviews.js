"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import StarRatings from "react-star-ratings";
import { motion, AnimatePresence } from "framer-motion";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/courses/getallreviews/${params.id}`);

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Failed to fetch reviews");
                }

                const data = await res.json();
                setReviews(data.reviews || []);
            } catch (err) {
                console.error("Error fetching reviews:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchReviews();
    }, [params.id]);

    const handleAddReview = () => {
        router.push(`${pathname}/add-review`);
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Course Reviews</h2>
                        <p className="text-gray-600 mt-1">
                            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>
                    <button
                        onClick={handleAddReview}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Review
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="p-6 text-center bg-red-50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-red-600">Error loading reviews</h3>
                        <p className="mt-2 text-red-500">{error}</p>
                    </div>
                ) : reviews.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                    >
                        <AnimatePresence>
                            {reviews.map((review) => (
                                <motion.div
                                    key={review._id}
                                    variants={item}
                                    className="p-5 bg-gray-50 rounded-lg hover:bg-white transition-all duration-200 border border-gray-100 hover:border-blue-100 hover:shadow-sm"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{review.reviewerName}</h3>
                                            <div className="mt-1">
                                                <StarRatings
                                                    rating={review.rating}
                                                    starRatedColor="#4f46e5"
                                                    starEmptyColor="#d1d5db"
                                                    numberOfStars={5}
                                                    starDimension="18px"
                                                    starSpacing="1px"
                                                    name="rating"
                                                />
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="mt-3 text-gray-700 leading-relaxed">{review.comment}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-12">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-600">No reviews yet</h3>
                        <p className="mt-2 text-gray-500">Be the first to share your thoughts about this course</p>
                        <button
                            onClick={handleAddReview}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            Write a Review
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;