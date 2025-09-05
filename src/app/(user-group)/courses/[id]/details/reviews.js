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
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
            {/* Header Section */}
            <div className="p-8 border-b border-white/50 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Course Reviews
                        </h2>
                        <p className="text-gray-600 mt-2 font-medium">
                            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>
                    <button
                        onClick={handleAddReview}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Review
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin animate-reverse"></div>
                        </div>
                        <p className="mt-6 text-center text-gray-600 font-medium">Loading reviews...</p>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 rounded-3xl p-8 max-w-md mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-bold text-red-600 mb-2">Error loading reviews</h3>
                            <p className="text-red-500">{error}</p>
                        </div>
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
                                    className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:bg-white/70"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{review.reviewerName}</h3>
                                            <div>
                                                <StarRatings
                                                    rating={review.rating}
                                                    starRatedColor="#3b82f6"
                                                    starEmptyColor="#d1d5db"
                                                    numberOfStars={5}
                                                    starDimension="20px"
                                                    starSpacing="2px"
                                                    name="rating"
                                                />
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-700 rounded-full text-sm font-medium border border-blue-500/30">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-lg">{review.comment}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-16">
                        <div className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-3xl p-12 max-w-md mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                                No reviews yet
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Be the first to share your thoughts about this course
                            </p>
                            <button
                                onClick={handleAddReview}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold hover:scale-105 shadow-lg"
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;