import dbConnect from "@/middleware/mongoose";
import QuizSubmission from "@/models/quizz/quizSubmissionModel";

const checkAttempt = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { quizId, userId } = req.body;

    if (!quizId || !userId) {
        return res.status(400).json({ message: "Quiz ID and User ID are required" });
    }

    try {
        // Check if the user has already submitted this quiz
        const existingSubmission = await QuizSubmission.findOne({ quizId, userId });

        return res.status(200).json({ attempted: !!existingSubmission });
    } catch (error) {
        console.error("Error checking quiz attempt:", error.message);
        return res.status(500).json({ message: "Failed to check attempt", error: error.message });
    }
};

// Wrap in dbConnect()
export default dbConnect(checkAttempt);
