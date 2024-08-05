// src/pages/api/courses/add.js
import dbConnect from "@/middleware/mongoose";
import Course from '@/models/course/courseModel';

const addCourses = async (req, res) => {
  if (req.method === 'POST') {
    const { courses } = req.body;
    console.log(courses)

    if (!courses) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    try {
      // Create a new Course document
      for (let i = 0; i < courses.length; i++) {
        const newCourse = new Course(courses[i]);
        await newCourse.save();
      }

      return res.status(201).json({ success: true, message: 'Courses added successfully' });
    } catch (error) {
      console.error('Error adding courses:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to add courses', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

export default dbConnect(addCourses);
