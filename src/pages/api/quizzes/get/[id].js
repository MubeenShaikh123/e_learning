// src/pages/api/quizzes/[id].js
import dbConnect from "@/middleware/mongoose";
import QuizQuestion from '@/models/quizz/quizzModel';

const getQuiz = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const quiz = await QuizQuestion.findById(id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      return res.status(200).json({ message: 'Quiz retrieved successfully', data: quiz });
    } catch (error) {
      console.error('Error retrieving quiz:', error.message);
      return res.status(500).json({ message: 'Failed to retrieve quiz', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(getQuiz);
