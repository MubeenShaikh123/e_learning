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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

            {/* Hero Section */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center relative z-10">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
                            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                                About SkillUp
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                            Empowering learners worldwide with cutting-edge educational technology and personalized learning experiences.
                        </p>
                        <Link href='/' className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                            Start Learning Today
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/80">
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                We believe that quality education should be accessible to everyone, regardless of their background or location. Our platform combines innovative technology with expert-crafted content to create personalized learning experiences that adapt to each student's unique needs and pace.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                From interactive courses and intelligent assessments to comprehensive progress tracking and professional CV building tools, we provide everything learners need to succeed in today's competitive landscape.
                            </p>
                            <div className="flex items-center space-x-4">
                                <CheckCircle className="w-6 h-6 text-emerald-500" />
                                <span className="text-gray-700 font-medium">Trusted by thousands of learners worldwide</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/80 to-cyan-500/80 border border-white/50 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                                {/* Glass shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                                
                                <div className="relative z-10">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                        <h3 className="text-2xl font-bold mb-6">Learning Made Simple</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                                                <span className="font-medium">Personalized learning paths</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                                                <span className="font-medium">Real-time progress tracking</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                                                <span className="font-medium">Expert-led content</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                                                <span className="font-medium">Career development tools</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            What Makes Us Different
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Discover the powerful features that make learning engaging, effective, and enjoyable.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {features.map((feature, index) => (
                            <div key={index} className="group">
                                <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/80 h-full relative overflow-hidden">
                                    {/* Glass shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="backdrop-blur-xl bg-gradient-to-r from-gray-900/80 to-blue-900/80 border-y border-white/10 relative overflow-hidden">
                    {/* Background elements for this section */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300/10 rounded-full blur-2xl"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Core Values</h2>
                            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                                The principles that guide everything we do and every decision we make.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center group h-full">
                                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 h-full flex flex-col relative overflow-hidden">
                                        {/* Glass shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                                        
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl p-4 inline-block mb-6 mx-auto shadow-lg">
                                                {value.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                                            <p className="text-blue-200 flex-grow leading-relaxed">{value.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/50 shadow-2xl rounded-3xl p-12 relative overflow-hidden">
                        {/* Glass shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Ready to Start Your Learning Journey?
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Join thousands of learners who are already transforming their careers with our comprehensive platform.
                            </p>
                            <Link href="/" className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}