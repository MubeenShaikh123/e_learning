'use client'

import React from 'react';
import { BookOpen, Users, Award, TrendingUp, Target, Zap, Globe, Shield, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const features = [
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Interactive Courses",
            description: "Comprehensive learning materials with hands-on projects and real-world applications."
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Smart Quizzes",
            description: "Adaptive assessments that track your progress and identify areas for improvement."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Progress Dashboard",
            description: "Visual analytics and insights to monitor your learning journey and achievements."
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "CV Builder",
            description: "Professional resume creator with industry-specific templates and AI suggestions."
        }
    ];

    const stats = [
        { number: "50K+", label: "Active Learners" },
        { number: "500+", label: "Courses Available" },
        { number: "95%", label: "Success Rate" },
        { number: "24/7", label: "Support Available" }
    ];

    const values = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Innovation",
            description: "Cutting-edge learning technologies"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Accessibility",
            description: "Learning for everyone, everywhere"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Quality",
            description: "Premium content and experiences"
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Community",
            description: "Supporting learners together"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>

                {/* Animated background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            About {process.env.NEXT_PUBLIC_APP_NAME || 'SkillUp'}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Empowering learners worldwide with cutting-edge educational technology and personalized learning experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href='/' className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                Start Learning Today
                                <ArrowRight className="inline-block ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                                    <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {`We believe that quality education should be accessible to everyone, regardless of their background or location. Our platform combines innovative technology with expert-crafted content to create personalized learning experiences that adapt to each student's unique needs and pace.`}
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                {`From interactive courses and intelligent assessments to comprehensive progress tracking and professional CV building tools, we provide everything learners need to succeed in today's competitive landscape.`}
                            </p>
                            <div className="flex items-center space-x-4">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <span className="text-gray-700">Trusted by thousands of learners worldwide</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-2xl font-bold mb-4">Learning Made Simple</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-white rounded-full"></div>
                                            <span>Personalized learning paths</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-white rounded-full"></div>
                                            <span>Real-time progress tracking</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-white rounded-full"></div>
                                            <span>Expert-led content</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-white rounded-full"></div>
                                            <span>Career development tools</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            What Makes Us Different
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover the powerful features that make learning engaging, effective, and enjoyable.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Core Values</h2>
                        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                            The principles that guide everything we do and every decision we make.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center group h-full">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-full p-4 inline-block mb-6 mx-auto">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                    <p className="text-blue-200 flex-grow">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Start Your Learning Journey?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Join thousands of learners who are already transforming their careers with our comprehensive platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}