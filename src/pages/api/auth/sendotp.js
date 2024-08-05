// src/pages/api/sendotp.js
import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';
import dbConnect from "@/middleware/mongoose";
import User from '@/models/userModel';
import OTP from '@/models/auth/otpModel';

const sendOTP = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

      await OTP.create({
        email,
        otp: CryptoJS.SHA256(otp).toString(),
        expiresAt,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
      };

      await transporter.sendMail(mailOptions);

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
