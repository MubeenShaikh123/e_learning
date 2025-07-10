import dbConnect from "@/middleware/mongoose";
import testimonialModel from "@/models/home/testimonialModel";

const getTestimonials = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : null;

      const testimonials = await testimonialModel.find().limit(limit);

      return res.status(200).json({
        message: 'Testimonials retrieved successfully',
        data: testimonials,
      });
    } catch (error) {
      console.error('Error retrieving testimonials:', error.message);
      return res.status(500).json({
        message: 'Failed to retrieve testimonials',
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(getTestimonials);
