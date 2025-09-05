"use client"

import React, { useState } from 'react';
import { Shield, FileText, Eye, Lock, Users, AlertCircle, CheckCircle, Calendar, BookOpen } from 'lucide-react';

export default function PrivacyTermsPage() {
    const [activeTab, setActiveTab] = useState('privacy');
    const lastUpdated = "August 2025";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
                        {activeTab === 'privacy' ? (
                            <Shield className="w-10 h-10 text-white" />
                        ) : (
                            <FileText className="w-10 h-10 text-white" />
                        )}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {activeTab === 'privacy'
                            ? 'How we protect and handle your personal information'
                            : 'Terms and conditions for using our platform'
                        }
                    </p>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg sticky top-0 z-50 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-0">
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`flex-1 py-4 px-6 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center ${activeTab === 'privacy'
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                                }`}
                        >
                            <Shield className="w-5 h-5 mr-2" />
                            Privacy Policy
                        </button>
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`flex-1 py-4 px-6 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center ${activeTab === 'terms'
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                                }`}
                        >
                            <FileText className="w-5 h-5 mr-2" />
                            Terms of Service
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="relative py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        {/* Glass shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            {/* Last Updated */}
                            <div className="flex items-center justify-center space-x-2 mb-8 p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <span className="text-blue-800 font-medium">Last updated: {lastUpdated}</span>
                            </div>

                            {activeTab === 'privacy' ? (
                                <div className="prose prose-lg max-w-none">
                                    <div className="mb-8">
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            At SkillUp, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our e-learning platform.
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="backdrop-blur-sm bg-blue-50/50 border-l-4 border-blue-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <Eye className="w-6 h-6 mr-3 text-blue-600" />
                                                Information We Collect
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Name and email address when you create an account</li>
                                                        <li>Profile information you choose to provide</li>
                                                        <li>Payment information for course purchases (processed securely)</li>
                                                        <li>Communication data when you contact us</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Data</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Course progress and completion status</li>
                                                        <li>Quiz results and assessment scores</li>
                                                        <li>Learning preferences and activity logs</li>
                                                        <li>CV builder content and templates used</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Information</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Device information and browser type</li>
                                                        <li>IP address and location data</li>
                                                        <li>Usage patterns and platform interactions</li>
                                                        <li>Cookies and similar tracking technologies</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="backdrop-blur-sm bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <Users className="w-6 h-6 mr-3 text-emerald-600" />
                                                How We Use Your Information
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Delivery</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Provide access to courses and content</li>
                                                        <li>Track learning progress and achievements</li>
                                                        <li>Generate certificates and credentials</li>
                                                        <li>Facilitate CV building and career tools</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Platform Improvement</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Personalize learning experiences</li>
                                                        <li>Improve course recommendations</li>
                                                        <li>Enhance platform functionality</li>
                                                        <li>Analyze usage patterns and trends</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Communication</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Send course updates and notifications</li>
                                                        <li>Provide customer support</li>
                                                        <li>Share relevant educational content</li>
                                                        <li>Process feedback and inquiries</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Legal Compliance</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Comply with applicable laws</li>
                                                        <li>Protect against fraud and abuse</li>
                                                        <li>Enforce our terms of service</li>
                                                        <li>Respond to legal requests</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="backdrop-blur-sm bg-purple-50/50 border-l-4 border-purple-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <Lock className="w-6 h-6 mr-3 text-purple-600" />
                                                Data Security & Protection
                                            </h2>
                                            <div className="space-y-4">
                                                <p className="text-gray-700">
                                                    We implement industry-standard security measures to protect your personal information:
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                        <h4 className="font-semibold text-gray-800 mb-2">Technical Safeguards</h4>
                                                        <ul className="text-sm text-gray-700 space-y-1">
                                                            <li>• SSL/TLS encryption for data transmission</li>
                                                            <li>• Secure database storage and access controls</li>
                                                            <li>• Regular security audits and updates</li>
                                                            <li>• Multi-factor authentication options</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                        <h4 className="font-semibold text-gray-800 mb-2">Access Controls</h4>
                                                        <ul className="text-sm text-gray-700 space-y-1">
                                                            <li>• Limited employee access to personal data</li>
                                                            <li>• Regular training on data protection</li>
                                                            <li>• Monitoring and logging of data access</li>
                                                            <li>• Third-party security assessments</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="backdrop-blur-sm bg-orange-50/50 border-l-4 border-orange-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <CheckCircle className="w-6 h-6 mr-3 text-orange-600" />
                                                Your Rights & Choices
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Access & Control</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Access your personal information</li>
                                                        <li>Update or correct your data</li>
                                                        <li>Download your learning data</li>
                                                        <li>Delete your account and data</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Communication Preferences</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Opt out of marketing emails</li>
                                                        <li>Customize notification settings</li>
                                                        <li>Choose data sharing preferences</li>
                                                        <li>Manage cookie preferences</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-lg max-w-none">
                                    <div className="mb-8">
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            Welcome to SkillUp. These Terms of Service govern your use of our e-learning platform, including courses, quizzes, dashboard features, and CV builder tools. By using our services, you agree to these terms.
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="backdrop-blur-sm bg-blue-50/50 border-l-4 border-blue-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <Users className="w-6 h-6 mr-3 text-blue-600" />
                                                Account & Registration
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Creation</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>You must provide accurate and complete information when creating an account</li>
                                                        <li>You are responsible for maintaining the security of your account credentials</li>
                                                        <li>You must be at least 13 years old to create an account</li>
                                                        <li>One person may not maintain multiple accounts</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Responsibilities</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Keep your login information confidential</li>
                                                        <li>Notify us immediately of any unauthorized access</li>
                                                        <li>Update your information to keep it current</li>
                                                        <li>Use the platform only for lawful educational purposes</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="backdrop-blur-sm bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <BookOpen className="w-6 h-6 mr-3 text-emerald-600" />
                                                Course Access & Usage
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Enrollment</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Course access begins upon successful enrollment</li>
                                                        <li>Some courses may have prerequisites or restrictions</li>
                                                        <li>Course availability may change without notice</li>
                                                        <li>Enrollment is non-transferable between accounts</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Rights</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Access granted for personal, non-commercial use</li>
                                                        <li>Content may not be redistributed or shared</li>
                                                        <li>Screenshots and recordings are prohibited</li>
                                                        <li>Certificates are for individual use only</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="backdrop-blur-sm bg-purple-50/50 border-l-4 border-purple-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <Shield className="w-6 h-6 mr-3 text-purple-600" />
                                                Acceptable Use Policy
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Prohibited Activities</h3>
                                                    <p className="text-sm text-red-800 mb-2 font-medium">You may not:</p>
                                                    <ul className="list-disc list-inside text-red-700 space-y-1 text-sm">
                                                        <li>Share account credentials with others</li>
                                                        <li>Attempt to hack, reverse engineer, or exploit the platform</li>
                                                        <li>Upload malicious code or harmful content</li>
                                                        <li>Harass, threaten, or harm other users</li>
                                                        <li>Violate any applicable laws or regulations</li>
                                                        <li>Infringe on intellectual property rights</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Academic Integrity</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Complete quizzes and assessments honestly</li>
                                                        <li>Do not share quiz answers or solutions</li>
                                                        <li>Respect the learning process and community</li>
                                                        <li>Report any suspected cheating or violations</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="backdrop-blur-sm bg-orange-50/50 border-l-4 border-orange-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <AlertCircle className="w-6 h-6 mr-3 text-orange-600" />
                                                Payment & Refund Policy
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Terms</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>All payments are processed securely</li>
                                                        <li>Prices are subject to change without notice</li>
                                                        <li>Payment is required before course access</li>
                                                        <li>Currency and taxes may apply based on location</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Refund Policy</h3>
                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>30-day money-back guarantee for most courses</li>
                                                        <li>Refunds processed within 5-10 business days</li>
                                                        <li>Partial refunds may apply for used courses</li>
                                                        <li>Contact support for refund requests</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="backdrop-blur-sm bg-indigo-50/50 border-l-4 border-indigo-500 rounded-r-2xl p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                <Lock className="w-6 h-6 mr-3 text-indigo-600" />
                                                Limitation of Liability
                                            </h2>
                                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                                                <p className="text-gray-700 mb-4">
                                                    Our platform is provided "as is" without warranties of any kind. While we strive to provide high-quality educational content, we cannot guarantee specific learning outcomes or career results.
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-4">
                                                        <h4 className="font-semibold text-gray-800 mb-2">Service Availability</h4>
                                                        <ul className="text-sm text-gray-700 space-y-1">
                                                            <li>• Platform may be temporarily unavailable</li>
                                                            <li>• Content may be updated or removed</li>
                                                            <li>• Third-party integrations may fail</li>
                                                            <li>• Technical issues may occur</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-4">
                                                        <h4 className="font-semibold text-gray-800 mb-2">User Responsibility</h4>
                                                        <ul className="text-sm text-gray-700 space-y-1">
                                                            <li>• Learning outcomes depend on individual effort</li>
                                                            <li>• Career success is not guaranteed</li>
                                                            <li>• Users responsible for their own progress</li>
                                                            <li>• External factors may affect results</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}