"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from 'lucide-react'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: result.message });
                // Redirect or handle successful login
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-blue-600 text-white p-6 text-center">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-blue-100">Sign in to continue learning</p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    {/* Error/Success Message */}
                    {message && (
                        <div className={`
                            mb-4 p-3 rounded-lg text-center
                            ${message.type === 'error'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }
                        `}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account? {' '}
                            <Link
                                href="/auth/register"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    {/* Optional Social Login Divider */}
                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <button className="w-full bg-white border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.266 9.765A7.076 7.076 0 0 1 12 4.909c1.69 0 3.113.615 4.254 1.627L19.444 3C17.352 1.081 14.864 0 12 0 7.23 0 3.082 2.554 1.18 6.481l4.086 3.284z" />
                                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.076 7.076 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.531-1.006 7.496-2.829l-3.456-2.158z" />
                                <path fill="#4285F4" d="M19.5 12.5c0-.639-.057-1.252-.164-1.84H12v3.48h4.844a4.14 4.14 0 0 1-1.793 2.717l3.456 2.158c2.013-1.852 3.193-4.576 3.193-7.815z" />
                                <path fill="#FBBC05" d="M5.277 14.268A7.077 7.077 0 0 1 4.909 12c0-.79.123-1.549.368-2.268L1.18 6.481A11.965 11.965 0 0 0 0 12c0 1.93.483 3.748 1.18 5.519l4.097-3.251z" />
                            </svg>
                        </button>
                        <button className="w-full bg-white border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.725-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.022 0 2.044.138 3.004.412 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </button>
                        <button className="w-full bg-white border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login