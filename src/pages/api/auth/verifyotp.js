// src/pages/api/verifyotp.js
import CryptoJS from 'crypto-js';
import dbConnect from "@/middleware/mongoose";
import OTP from '@/models/auth/otpModel';

const verifyOTP = async (req, res) => {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
      const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
      if (!otpRecord) {
        return res.status(400).json({ message: 'OTP not found' });
      }

      if (otpRecord.expiresAt < new Date()) {
        return res.status(400).json({ message: 'OTP expired' });
      }

      const hashedOtp = CryptoJS.SHA256(otp).toString();
      if (hashedOtp !== otpRecord.otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      await OTP.deleteMany({ email });

      return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      return res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default dbConnect(verifyOTP);
