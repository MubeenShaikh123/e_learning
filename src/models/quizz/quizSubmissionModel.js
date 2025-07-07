import mongoose from "mongoose";

const QuizSubmissionSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quizzes",
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        answers: [
            {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                answer: {
                    type: String,
                    required: true,
                },
            },
        ],
        score: {
            type: Number,
            default: null,
        },
        maxScore: {
            type: Number,
            default: null,
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Prevent recompiling the model on every request
const QuizSubmission =
    mongoose.models.QuizSubmission || mongoose.model("QuizSubmission", QuizSubmissionSchema);

export default QuizSubmission;