import dbConnect from '@/middleware/mongoose';
import Enrollment from '@/models/course/enrollmentModel';

const enrollCourse = async (req, res) => {
  const { id } = req.query;
  const { userId } = req.body;

  if (req.method === 'POST') {
    try {
      const existingEnrollment = await Enrollment.findOne({ userId, courseId: id });
      if (existingEnrollment) {
        return res.status(400).json({ success: false, message: 'Already enrolled' });
      }

      const enrollment = new Enrollment({ userId, courseId: id });
      await enrollment.save();

      return res.status(201).json({ success: true, message: 'Successfully enrolled' });
    } catch (error) {
      console.error('Enrollment error:', error);
      return res.status(500).json({ success: false, message: 'Failed to enroll', error: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const enrollment = await Enrollment.findOne({ userId, courseId: id });
      if (enrollment) {
        return res.status(200).json({ success: true, enrolled: true });
      }
      return res.status(200).json({ success: false, enrolled: false });
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return res.status(500).json({ success: false, message: 'Failed to check enrollment' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

export default dbConnect(enrollCourse);
