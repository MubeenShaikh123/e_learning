// src/pages/api/quizzes/remove/[id].js
import dbConnect from "@/middleware/mongoose";
import QuizQuestion from '@/models/quizz/quizzModel';

const removeQuiz = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const quiz = await QuizQuestion.findByIdAndDelete(id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      return res.status(200).json({ message: 'Quiz removed successfully', data: quiz });
    } catch (error) {
      console.error('Error removing quiz:', error.message);
      return res.status(500).json({ message: 'Failed to remove quiz', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(removeQuiz);
