// src/pages/api/quizzes/index.js
import dbConnect from "@/middleware/mongoose";
import QuizQuestion from '@/models/quizz/quizzModel';

const getQuizzes = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const quizzes = await QuizQuestion.find();
      return res.status(200).json({ message: 'Quizzes retrieved successfully', data: quizzes });
    } catch (error) {
      console.error('Error retrieving quizzes:', error.message);
      return res.status(500).json({ message: 'Failed to retrieve quizzes', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(getQuizzes);
