import mongoose from "mongoose";

const QuizSubmissionSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizQuestion",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Assuming you have a User model
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
            default: null, // Will be calculated later
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.models.QuizSubmission ||
    mongoose.model("QuizSubmission", QuizSubmissionSchema);
