// src/pages/api/sendotp.js
import dbConnect from "@/middleware/mongoose";
import User from '@/models/auth/userModel';
import OTP from '@/models/auth/otpModel';

const sendOTP = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {

      // Check if there's an existing non-expired OTP for this email
      const existingOtp = await OTP.findOne({ email });
      if (existingOtp) {
        return res.status(200).json({ message: 'An OTP has already been generated. Please check your email.' });
      }

      // Generate a new 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

      // Create a new OTP record.
      // The pre-save hook in the OTP model will automatically send the email.
      await OTP.create({
        email,
        otp,
        expiresAt,
      });

      return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      return res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(sendOTP);
