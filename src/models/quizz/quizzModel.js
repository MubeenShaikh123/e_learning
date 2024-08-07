// src/models/quizQuestionModel.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Question text
  type: { 
    type: String, 
    enum: ['multiple-choice', 'true-false', 'short-answer'], // Question types
    required: true 
  },
  options: [{ type: String }], // Options for multiple-choice questions
  correctAnswer: { type: String, required: true } // Correct answer
});

const quizQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Quiz title
  description: { type: String }, // Quiz description
  category: { type: String }, // Category of the quiz
  instructor: { type: String }, // Instructor's name
  price: { type: Number }, // Price of the quiz
  timeLimit: { type: Number }, // Time limit for the quiz in minutes
  questions: [questionSchema], // Array of question objects
  createdAt: { type: Date, default: Date.now }, // Creation date
  updatedAt: { type: Date, default: Date.now } // Last updated date
});

export default mongoose.models.QuizQuestion || mongoose.model('QuizQuestion', quizQuestionSchema);
