// models/Video.js
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  url: String,
  thumbnail: String,
  duration: String,
});

export default mongoose.models.Video || mongoose.model("Video", videoSchema);
