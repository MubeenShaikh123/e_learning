"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';
import { signIn } from 'next-auth/react';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
        const [variant, setVariant] = useState(0);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (result?.ok) {
            setMessage({ type: "success", text: "Login successful" });
            router.push("/"); // Or wherever
        } else {
            setMessage({
                type: "error",
                text: result?.error || "Invalid email or password",
            });
        }
    };

    const props = { formData, handleChange, handleSubmit, showPassword, setShowPassword, message };
    // 🔄 change return target every 3 sec
    useEffect(() => {
        const interval = setInterval(() => {
            setVariant((prev) => (prev + 1) % 6); // 3 variants
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // ✨ Here’s your dynamic return
    // if (variant === 0) return darkLogin(props);
    // if (variant === 1) return minimalistLogin(props);
    // if (variant === 2) return cyberpunkLogin(props);
    // if (variant === 3) return floatingLogin(props);
    // if (variant === 4) return glassLogin(props);
    return glassLogin(props);
}

const darkLogin = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, message }) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-[#232B37] to-[#2a3441] text-white px-8 pt-12 pb-8 text-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>

                    <h1 className="text-3xl font-bold mb-3 relative z-10">Welcome Back</h1>
                    <p className="text-gray-300 relative z-10">Sign in to continue your journey</p>
                </div>

                {/* Form Section */}
                <div className="px-8 py-10 bg-[#F3F3F7]">
                    {/* Error/Success Message */}
                    {message && (
                        <div className={`
                            mb-6 p-4 rounded-xl text-center font-medium
                            ${message.type === 'error'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-green-50 text-green-700 border border-green-200'
                            }
                        `}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#232B37] focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#232B37] focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                                )}
                            </button>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-[#232B37] hover:text-gray-600 font-medium transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#232B37] to-[#2a3441] text-white py-4 rounded-xl hover:from-[#2a3441] hover:to-[#232B37] transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#232B37] focus:ring-opacity-50 font-semibold"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[#F3F3F7] text-gray-600 font-medium">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                        className="w-full bg-white text-gray-700 border border-gray-200 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 flex items-center justify-center space-x-3 font-medium"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Sign in with Google</span>
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                href="/auth/register"
                                className="text-[#232B37] hover:text-gray-600 font-semibold transition-colors"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const minimalistLogin = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, message }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-100/40 to-amber-100/40 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-lg">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-0 relative">
                    {/* Subtle top accent */}
                    <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"></div>

                    {/* Header Section */}
                    <div className="text-center px-12 pt-16 pb-8">
                        <h1 className="text-4xl font-light text-gray-800 mb-3">Welcome</h1>
                        <p className="text-gray-500 text-lg">Sign in to continue</p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-6"></div>
                    </div>

                    {/* Form Section */}
                    <div className="px-12 pb-12">
                        {/* Error/Success Message */}
                        {message && (
                            <div className={`
                                mb-8 p-5 rounded-xl text-center font-medium
                                ${message.type === 'error'
                                    ? 'bg-red-50 text-red-600 border-l-4 border-red-400'
                                    : 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-400'
                                }
                            `}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Email Input */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MailIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:border-emerald-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 text-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <LockIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:border-emerald-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 text-lg"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-emerald-500 transition-colors" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400 hover:text-emerald-500 transition-colors" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 font-medium text-lg shadow-md"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-6 bg-white text-gray-500">or</span>
                            </div>
                        </div>

                        {/* Google Sign In Button */}
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="w-full bg-white text-gray-700 border border-gray-300 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:ring-offset-2 flex items-center justify-center space-x-3 font-medium text-lg shadow-sm"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        {/* Sign Up Link */}
                        <div className="text-center mt-10">
                            <p className="text-gray-600 text-lg">
                                Don't have an account?{' '}
                                <Link
                                    href="/auth/register"
                                    className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Version 1: Modern Glass Morphism (Light)
const glassLogin = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, message }) => {
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
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Continue your journey with us</p>
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
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
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

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-semibold shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/50"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white/70 text-gray-600 font-medium backdrop-blur-sm rounded-full">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                        className="w-full bg-white/80 backdrop-blur-sm text-gray-700 border border-white/50 py-4 rounded-2xl hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500/30 flex items-center justify-center space-x-3 font-medium shadow-lg"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Sign in with Google</span>
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8 relative z-10">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Version 2: Neumorphism Design (Light)
// i dont want neumorphism version so skip it
// const neumorphismLogin ;

// Version 3: Cyberpunk Dark Theme
const cyberpunkLogin = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, message }) => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(0,255,255,0.1)_25%,rgba(0,255,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.1)_75%,rgba(0,255,255,0.1)_76%,transparent_77%,transparent)] bg-[length:80px_80px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,0.1)_25%,rgba(0,255,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.1)_75%,rgba(0,255,255,0.1)_76%,transparent_77%,transparent)] bg-[length:80px_80px]"></div>
            </div>

            {/* Glowing Elements */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-32 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-500"></div>

            <div className="relative w-full max-w-md">
                <div className="bg-gray-900/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-8 relative overflow-hidden shadow-2xl shadow-cyan-500/20">
                    {/* Neon border glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 blur-sm"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

                    {/* Header */}
                    <div className="text-center mb-8 relative z-10">
                        <div className="w-16 h-16 border-2 border-cyan-400 rounded-lg mx-auto mb-4 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-cyan-400/20 rounded-lg animate-pulse"></div>
                            <LockIcon className="h-8 w-8 text-cyan-400 relative z-10" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">ACCESS <span className="text-cyan-400">GRANTED</span></h1>
                        <p className="text-gray-300 font-mono text-sm">AUTHENTICATION REQUIRED</p>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded border-l-4 font-mono text-sm ${message.type === 'error' ? 'bg-red-900/30 text-red-300 border-red-500' : 'bg-green-900/30 text-green-300 border-green-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Email */}
                        <div className="relative">
                            <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-cyan-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="user@domain.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-gray-800 transition-all duration-300 text-white placeholder-gray-400 font-mono"
                                    required
                                />
                                <div className="absolute inset-0 border border-cyan-400/0 hover:border-cyan-400/30 rounded pointer-events-none transition-colors duration-300"></div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-cyan-400 text-xs font-mono mb-2 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LockIcon className="h-5 w-5 text-cyan-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-600 rounded focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-gray-800 transition-all duration-300 text-white placeholder-gray-400 font-mono"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-cyan-400 hover:text-cyan-300 transition-colors" /> : <EyeIcon className="h-5 w-5 text-cyan-400 hover:text-cyan-300 transition-colors" />}
                                </button>
                                <div className="absolute inset-0 border border-cyan-400/0 hover:border-cyan-400/30 rounded pointer-events-none transition-colors duration-300"></div>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link href="/auth/forgot-password" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono uppercase tracking-wider transition-colors">
                                Forgot Access Code?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black py-4 rounded font-bold uppercase tracking-wider hover:from-cyan-400 hover:to-emerald-400 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/50 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                            <span className="relative z-10">INITIALIZE ACCESS</span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-900 text-gray-400 font-mono uppercase tracking-wider">Alternative Access</span>
                        </div>
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                        className="w-full bg-gray-800 border border-gray-600 text-white py-4 rounded hover:border-cyan-400 hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3 font-mono uppercase tracking-wider"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Google Protocol</span>
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8 relative z-10">
                        <p className="text-gray-300 font-mono text-sm">
                            Need Access?{' '}
                            <Link href="/auth/register" className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider transition-colors">
                                Register Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Version 4: Floating Cards Design (Light)
const floatingLogin = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, message }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl rotate-12 animate-bounce opacity-70"></div>
            <div className="absolute top-1/4 right-10 w-16 h-16 bg-gradient-to-r from-red-200 to-pink-200 rounded-full -rotate-12 animate-pulse opacity-60"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg rotate-45 animate-bounce delay-500 opacity-50"></div>
            <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full animate-ping delay-1000"></div>

            <div className="relative w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 relative transform hover:scale-[1.02] transition-all duration-300">
                    {/* Floating Icon Card */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <LockIcon className="h-8 w-8 text-white" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8 pt-6">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">Hello Again</h1>
                        <p className="text-gray-500 text-lg">Welcome back to your space</p>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-2xl text-center font-medium shadow-lg ${message.type === 'error' ? 'bg-red-50 text-red-600 border-l-4 border-red-400' : 'bg-green-50 text-green-600 border-l-4 border-green-400'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Card */}
                        <div className="bg-gray-50 rounded-2xl p-6 shadow-inner hover:shadow-lg transition-shadow duration-300">
                            <label className="block text-gray-700 font-semibold mb-3">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-orange-500" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-orange-400 transition-all duration-300 text-gray-700 shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Card */}
                        <div className="bg-gray-50 rounded-2xl p-6 shadow-inner hover:shadow-lg transition-shadow duration-300">
                            <label className="block text-gray-700 font-semibold mb-3">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LockIcon className="h-5 w-5 text-orange-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-orange-400 transition-all duration-300 text-gray-700 shadow-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-orange-500 hover:text-orange-600 transition-colors" /> : <EyeIcon className="h-5 w-5 text-orange-500 hover:text-orange-600 transition-colors" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link href="/auth/forgot-password" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 font-bold text-lg shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-6 bg-white text-gray-500 font-medium">or</span>
                        </div>
                    </div>

                    {/* Google Button Card */}
                    <div className="bg-gray-50 rounded-2xl p-2 shadow-inner hover:shadow-lg transition-shadow duration-300">
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center space-x-3 font-semibold shadow-sm"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600 text-lg">
                            New here?{' '}
                            <Link href="/auth/register" className="text-orange-500 hover:text-orange-600 font-bold transition-colors">
                                Join Us
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;