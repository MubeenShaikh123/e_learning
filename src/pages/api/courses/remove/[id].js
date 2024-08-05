// src/pages/api/courses/remove/[id].js
import dbConnect from "@/middleware/mongoose";
import Course from '@/models/course/courseModel';

const removeCourse = async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    try {
      const course = await Course.findByIdAndDelete(id);

      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      return res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to delete course', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(removeCourse);
