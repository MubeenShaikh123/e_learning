// src/models/otpModel.js
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});
otpSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    try {
      // Create a transporter using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      // Setup email options
      const mailOptions = {
        from: process.env.EMAIL,
        to: this.email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${this.otp}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log("OTP email sent successfully");
    } catch (error) {
      console.error("Error sending OTP email:", error);
      return next(error); // Abort save if email sending fails (optional)
    }
  }
  next();
});

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTP;
