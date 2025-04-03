import CryptoJS from 'crypto-js';
import dbConnect from '@/middleware/mongoose';
import userModel from '@/models/auth/userModel';
import otpModel from '@/models/auth/otpModel';

const register = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password, confirmPassword, otp } = req.body;

  // Validate input
  if (!name || !email || !password || !confirmPassword || !otp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Name length validation (at least 6 characters)
  if (name.length < 6) {
    return res.status(400).json({ message: 'Username must be at least 6 characters long' });
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

    // Verify OTP
    const otpRecord = await otpModel.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash the password using CryptoJS
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Create a new user document
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    // Delete the OTP record after successful registration
    await otpModel.deleteOne({ email, otp });

    return res.status(201).json({ message: 'Registration successful', data: newUser });
  } catch (error) {
    console.error('Error registering user:', error.message);
    return res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

export default dbConnect(register);
