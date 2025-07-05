import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null // null means global/system-wide
    },
    type: {
      type: String,
      enum: ["general", "course", "quizz", "reminder"],
      default: "general",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    isNewNotification: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: false } // or true if you want `updatedAt` too
);

const Notifications =
  mongoose.models.Notifications || mongoose.model("Notifications", notificationSchema);

export default Notifications;
