// src/pages/api/courses/[id].js
import dbConnect from "@/middleware/mongoose";
import Course from '@/models/course/courseModel';

const getCourseById = async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      return res.status(200).json({ success: true, data: course });
    } catch (error) {
      console.error('Error fetching course:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch course', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(getCourseById);
