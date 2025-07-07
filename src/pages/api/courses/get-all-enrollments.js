import dbConnect from '@/middleware/mongoose';
import withAuth from '@/middleware/auth';
import Enrollment from '@/models/course/enrollmentModel';

const enrollCourse = async (req, res) => {
  const userId = req.email;

  if (req.method === 'GET') {
    try {
        console.log("getall hit enroll");
      const enrollment = await Enrollment.find({ userId }).populate('courseId', 'title description');

      if (enrollment.length > 0) {
        return res.status(200).json({ success: true, data: enrollment });
      }

      return res.status(200).json({ success: false, data: [] });
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return res.status(500).json({ success: false, message: 'Failed to check enrollment' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

export default dbConnect(withAuth(enrollCourse));
