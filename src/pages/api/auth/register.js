import CryptoJS from 'crypto-js';
import dbConnect from "@/middleware/mongoose";
import userModel from '@/models/auth/userModel';

const register = async (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body)
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // name length validation (at least 6 characters long)
    if (name.length < 6) {
      return res.status(400).json({ message: 'username must be at least 6 characters long' });
    }

    // Password matching validation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
      // Check if email already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash the password using CryptoJS
      const hashedPassword = CryptoJS.SHA256(password).toString();

      // Create a new document
      const newUser = new userModel({ name, email, password: hashedPassword });
      await newUser.save();

      return res.status(201).json({ message: 'Registration successful', data: newUser });
    } catch (error) {
      console.error('Error registering user:', error.message);
      return res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(register);
