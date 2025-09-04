"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Forgotpass = () => {
    const router = useRouter();
    const MySwal = withReactContent(Swal);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null); // Fixed the TypeScript-style syntax
    const [otpSent, setOtpSent] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "email") {
            validateEmail(value);
        }
    };

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    };

    // Handle sending OTP
    const handleSendOtp = async () => {
        if (!formData.email) {
            setMessage({ type: "error", text: "Email is required" });
            return;
        }

        try {
            const response = await fetch("/api/auth/sendotp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formData.email }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "OTP sent successfully" });
                setOtpSent(true);
            } else {
                setMessage({ type: "error", text: result.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            return;
        }

        if (!otpSent) {
            setMessage({ type: "error", text: "Please verify your email first" });
            return;
        }

        try {
            const response = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: result.message });
                MySwal.fire({
                    title: 'Success!',
                    text: 'Your password has been changed successfully.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000, // Auto close after 2 seconds (2000 milliseconds)
                }).then(() => {
                    setFormData({
                        email: '',
                        password: '',
                        confirmPassword: '',
                        otp: '',
                    });
                    setOtpSent(false);
                    router.push('/auth/login');
                });
            } else {
                setMessage({ type: "error", text: result.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/30 to-emerald-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>

            <div className="relative w-full max-w-md">
                <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
                    {/* Glass shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                    {/* Header */}
                    <div className="text-center mb-8 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <LockIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">Change Password</h1>
                        <p className="text-gray-600">Reset your account password</p>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-2xl backdrop-blur-sm border text-center font-medium ${message.type === 'error' ? 'bg-red-100/80 text-red-700 border-red-200/50' : 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg"
                                required
                            />
                            {isEmailValid && (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    Send OTP
                                </button>
                            )}
                        </div>

                        {/* OTP */}
                        {otpSent && (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LockIcon className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg"
                                    required
                                />
                            </div>
                        )}

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="New Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-12 pr-12 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                {showPassword ? <EyeOffIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 transition-colors" /> : <EyeIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 transition-colors" />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-12 pr-12 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                {showConfirmPassword ? <EyeOffIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 transition-colors" /> : <EyeIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 transition-colors" />}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-semibold shadow-lg"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Forgotpass;
