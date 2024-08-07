// src/pages/api/quizzes/add.js
import dbConnect from "@/middleware/mongoose";
import QuizQuestion from '@/models/quizz/quizzModel';

const addQuiz = async (req, res) => {
  if (req.method === 'POST') {
    const { title, description, category, instructor, price, timeLimit, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }

    try {
      const newQuiz = new QuizQuestion({ title, description, category, instructor, price, timeLimit, questions });
      await newQuiz.save();
      return res.status(201).json({ message: 'Quiz added successfully', data: newQuiz });
    } catch (error) {
      console.error('Error adding quiz:', error.message);
      return res.status(500).json({ message: 'Failed to add quiz', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(addQuiz);
