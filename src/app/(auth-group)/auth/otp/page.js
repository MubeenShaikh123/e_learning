"use client";

import React, { useState, useRef, useEffect } from "react";
import { ShieldCheckIcon, RefreshCwIcon } from "lucide-react";

const OTPVerification = () => {
    const [otp, setOTP] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    // Start timer countdown
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    // Handle OTP input changes
    const handleOTPChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);

            // Move to next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    // Handle key presses (Backspace, Arrow keys)
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Verify OTP
    const handleVerify = async () => {
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            setError("Please enter the complete OTP");
            return;
        }

        try {
            const response = await fetch("/api/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: otpCode }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("OTP Verified");
            } else {
                setError(result.message || "Invalid OTP");
            }
        } catch (error) {
            setError("Something went wrong");
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        if (!canResend) return;

        try {
            const response = await fetch("/api/resend-otp", {
                method: "POST",
            });

            const result = await response.json();

            if (response.ok) {
                setTimer(60);
                setCanResend(false);
                setOTP(["", "", "", "", "", ""]);
                setError("");
            } else {
                setError(result.message || "Failed to resend OTP");
            }
        } catch (error) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6 text-center">
                    <ShieldCheckIcon className="mx-auto h-12 w-12 mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Verify Your Account</h1>
                    <p className="text-blue-100">Enter the 6-digit code sent to your email</p>
                </div>

                {/* OTP Section */}
                <div className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">{error}</div>
                    )}

                    {/* OTP Input Boxes */}
                    <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleOTPChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-16 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        ))}
                    </div>

                    {/* Resend OTP Section */}
                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-600">
                        {timer > 0 ? (
                            <p>Resend OTP in {timer} seconds</p>
                        ) : (
                            <button
                                onClick={handleResendOTP}
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                            >
                                <RefreshCwIcon className="h-4 w-4" />
                                <span>Resend OTP</span>
                            </button>
                        )}
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={otp.some((digit) => digit === "")}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        <ShieldCheckIcon className="h-5 w-5" />
                        <span>Verify</span>
                    </button>

                    {/* Additional Context */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Didn't receive the code?
                        {timer > 0 && <span> Wait {timer} seconds to resend</span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
