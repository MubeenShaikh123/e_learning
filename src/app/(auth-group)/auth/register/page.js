"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null); // Fixed the TypeScript-style syntax

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: result.message });
                setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Clear form on success
            } else {
                setMessage({ type: "error", text: result.message });
            }
            console.log(`result: ${JSON.stringify(result)}`);
        } catch (error) {
            console.log(`error: ${error}`);
            setMessage({ type: "error", text: "Something went wrong" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-blue-600 text-white p-6 text-center">
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-blue-100">Start your learning journey today</p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    {/* Error/Success Message */}
                    {message && (
                        <div className={`mb-4 p-3 rounded-lg text-center ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required 
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required 
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                name="confirmPassword" 
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
