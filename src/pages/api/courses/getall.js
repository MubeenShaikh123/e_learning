// src/pages/api/courses/index.js
import dbConnect from "@/middleware/mongoose";
import Course from '@/models/course/courseModel';

const getCourses = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const courses = await Course.find({});
      return res.status(200).json({ success: true, data: courses });
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch courses', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(getCourses);
