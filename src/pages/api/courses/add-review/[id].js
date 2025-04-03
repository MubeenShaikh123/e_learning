import dbConnect from "@/middleware/mongoose";
import Review from "@/models/course/reviewModel";
import Course from "@/models/course/courseModel";

const addReview = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { id } = req.query; // Course ID from URL
            const { reviewerName, reviewerEmail, rating, comment } = req.body;

            if (!reviewerName || !reviewerEmail || !rating || !comment) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }
            // Check if the user already reviewed this course
            const existingReview = await Review.findOne({ course: id, reviewerEmail });
            if (existingReview) {
                return res.status(400).json({ success: false, message: "You have already added a review for this course" });
            }

            // Create a new review
            const newReview = new Review({ course: id, reviewerName, reviewerEmail, rating, comment });
            await newReview.save();

            // Recalculate course rating & review count
            const reviews = await Review.find({ course: id });

            const totalReviews = reviews.length;
            const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

            // Update Course with new rating & reviews count
            await Course.findByIdAndUpdate(id, {
                rating: averageRating.toFixed(1),
                reviews: totalReviews,
            });

            return res.status(201).json({ success: true, message: "Review added successfully" });
        } catch (error) {
            console.error("Error adding review:", error);
            return res.status(500).json({ success: false, message: "Failed to add review", error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
};

export default dbConnect(addReview);
