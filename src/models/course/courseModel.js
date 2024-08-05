// src/models/courseModel.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  modules: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      duration: {
        type: Number, // Duration in minutes
        required: true,
      },
      content: [{
        type: String,
        required: true,
      }],
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
