import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Course", // Reference to Course model
      required: true 
    },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
