// src/pages/api/auth/forgot-password.js
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dbConnect from "@/middleware/mongoose";
import User from '@/models/userModel';

const forgotPassword = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log("user.resetTokenExpiry",user.resetTokenExpiry)
      console.log("Date.now",new Date())
      // Check if there's an existing valid reset token
      if (user.resetToken && user.resetTokenExpiry > new Date()) {
        return res.status(400).json({ message: 'A password reset request has already been sent. Please check your email.' });
      }

      // Generate a new token and save it to the user document
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
      await user.save();

      // Send email with reset link
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APP_PASSWORD
        }
      });

      const mailOptions = {
        to: email,
        from: process.env.EMAIL,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password/${resetToken}`
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      return res.status(500).json({ message: 'Failed to send password reset email', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(forgotPassword);
