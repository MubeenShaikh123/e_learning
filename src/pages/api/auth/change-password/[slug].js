// src/pages/api/auth/change-password/[slug].js
import CryptoJS from 'crypto-js';
import dbConnect from "@/middleware/mongoose";
import User from '@/models/userModel';

const changePassword = async (req, res) => {
  if (req.method === 'PUT') {
    const { slug } = req.query; // slug is the token
    const { password, confirmPassword } = req.body;

    if (!slug || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Token, password, and confirm password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
      const user = await User.findOne({
        resetToken: slug
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      console.log("slug",slug)
      console.log("token",user.resetToken)
      console.log("token",user.resetTokenExpiry)
      console.log("token",new Date())
      
      // Hash the new password
      const hashedPassword = CryptoJS.SHA256(password).toString();
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();

      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error resetting password:', error.message);
      return res.status(500).json({ message: 'Failed to reset password', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(changePassword);
