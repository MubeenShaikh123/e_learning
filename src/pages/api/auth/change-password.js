import crypto from 'crypto';
import dbConnect from "@/middleware/mongoose";
import User from '@/models/auth/userModel';
import Otp from '@/models/auth/otpModel'; // Assuming you have an OTP model

const changepassword = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, confirmPassword, otp } = req.body;

  // Validate input
  if (!email || !password || !confirmPassword || !otp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Password matching validation
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash the new password using Node.js crypto module
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Update user's password
    existingUser.password = hashedPassword;
    await existingUser.save();

    // Delete the OTP record after successful password change
    await Otp.deleteOne({ email, otp });

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error.message);
    return res.status(500).json({ message: 'Failed to change password', error: error.message });
  }
};

export default dbConnect(changepassword);
