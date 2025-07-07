import dbConnect from "@/middleware/mongoose";
import QuizSubmission from "@/models/quizz/quizSubmissionModel";
import QuizQuestion from "@/models/quizz/quizzModel";

const submitQuiz = async (req, res) => {
  console.log(`reqb: ${JSON.stringify(req.body)}`)
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { quizId, userId, answers } = req.body;

  if (!quizId || !userId || !answers || answers.length === 0) {
    return res.status(400).json({ message: "Quiz ID, User ID, and answers are required" });
  }

  try {
    // Fetch the quiz to validate answers and calculate score
    const quiz = await QuizQuestion.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate score
    let score = 0;
    quiz.questions.forEach((question) => {
      console.log(`answers: ${JSON.stringify(answers)}`)
      const userAnswer = answers.find((ans) => ans.questionId === question._id.toString());
      if (userAnswer && userAnswer.answer === question.correctAnswer) {
        score += 1;
      }
    });
    let maxScore = quiz.questions.length;

    // Save the submission
    const newSubmission = new QuizSubmission({
      quizId,
      userId,
      answers,
      score,
      maxScore
    });

    await newSubmission.save();

    return res.status(201).json({ message: "Quiz submitted successfully", data: newSubmission });
  } catch (error) {
    console.error("Error submitting quiz:", error.message);
    return res.status(500).json({ message: "Failed to submit quiz", error: error.message });
  }
};

export default dbConnect(submitQuiz);
