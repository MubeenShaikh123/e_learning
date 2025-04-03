import dbConnect from "@/middleware/mongoose";
import Review from "@/models/course/reviewModel";

const getReviews = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }
    
    const reviews = await Review.find({ course: id });
    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

export default dbConnect(getReviews);
