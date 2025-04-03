import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    content: [{ type: String, required: true }],
  },
  { _id: false } // Prevents Mongoose from adding an _id to each module
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: String, required: true },
    category: { type: String, required: true },
    modules: [moduleSchema], // Array of course modules
    totalDuration: { type: Number, default: 0 }, // Auto-calculated sum of module durations
    rating: { type: Number, default: 0 }, // Average rating (to be updated dynamically)
    reviews: { type: Number, default: 0 }, // Total number of reviews (to be updated dynamically)
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Middleware to calculate totalDuration before saving
courseSchema.pre("save", function (next) {
  this.totalDuration = this.modules.reduce((sum, module) => sum + module.duration, 0);
  next();
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
