// src/pages/api/quizzes/add.js
import dbConnect from "@/middleware/mongoose";
import QuizQuestion from "@/models/quizz/quizzModel";

const addQuiz = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { title, description, category, instructor, price, timeLimit, questions, difficulty, color, icon } = req.body;

  // Validation: Ensure required fields are present
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "Title and at least one question are required" });
  }

  try {
    // Create new quiz
    const newQuiz = new QuizQuestion({
      title,
      description,
      category,
      instructor,
      price,
      timeLimit,
      difficulty,
      color,
      icon,
      questions,
      questionCount: questions.length, // Ensure this is set correctly
    });

    // Save to DB
    await newQuiz.save();

    return res.status(201).json({ message: "Quiz added successfully", data: newQuiz });
  } catch (error) {
    console.error("Error adding quiz:", error.message);
    return res.status(500).json({ message: "Failed to add quiz", error: error.message });
  }
};

// Use dbConnect with handler
export default dbConnect(addQuiz);
