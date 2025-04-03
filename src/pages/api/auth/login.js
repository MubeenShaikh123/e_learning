// src/pages/api/login.js
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import dbConnect from "@/middleware/mongoose";
import User from '@/models/auth/userModel';

const login = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password required' });
    }

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Verify the password using CryptoJS
      const hashedPassword = CryptoJS.SHA256(password).toString();
      if (hashedPassword !== user.password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name, phone: user.phone },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Return success response with the token
      return res.status(200).json({ message: 'Login successful', token: token, email: user.email, name: user.name, phone: user.phone });
    } catch (error) {
      console.error('Error logging in:', error.message);
      return res.status(500).json({ message: 'Failed to login user', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(login);
