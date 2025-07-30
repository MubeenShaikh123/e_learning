import dbConnect from "@/middleware/mongoose";
import testimonialModel from "@/models/home/testimonialModel";

const addTestimonials = async (req, res) => {

  if (req.method === 'POST') {
    try {
      const { content, author, role, rating } = req.body;

      if (!content || !author || !role || typeof rating !== 'number') {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newTestimonial = await testimonialModel.create({
        content,
        author,
        role,
        rating,
      });

      return res.status(201).json({
        message: 'Testimonial added successfully',
        data: newTestimonial,
      });
    } catch (error) {
      console.error('Error adding testimonial:', error.message);
      return res.status(500).json({
        message: 'Failed to add testimonial',
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(addTestimonials);
