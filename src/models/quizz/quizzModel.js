import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["multiple-choice", "true-false", "short-answer"], 
    required: true 
  },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
}, { _id: true });

const quizQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  instructor: { type: String },
  price: { type: Number },
  timeLimit: { type: Number },
  difficulty: { type: String },
  color: { type: String },
  icon: { type: String },
  questions: [questionSchema],
  questionCount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Use existing model if already compiled
const QuizQuestion = mongoose.models.Quizzes || mongoose.model("Quizzes", quizQuestionSchema);

export default QuizQuestion;
