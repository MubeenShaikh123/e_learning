// src/pages/api/quizzes/index.js
import withAuth from "@/middleware/auth";
import dbConnect from "@/middleware/mongoose";
import QuizSubmission from "@/models/quizz/quizSubmissionModel";

const getSubmissions = async (req, res) => {
    if (req.method === 'GET') {
        try {
            await dbConnect();
            const userId = req.email;

            const quizSubmissions = await QuizSubmission.find({ userId })
                .populate('quizId', 'title') // ✅ get only quiz title
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: 'Quiz submissions fetched successfully',
                data: quizSubmissions,
            });
        } catch (error) {
            console.error('Error retrieving quiz submissions:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch quiz submissions',
                error: error.message,
            });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};

export default dbConnect(withAuth(getSubmissions));
