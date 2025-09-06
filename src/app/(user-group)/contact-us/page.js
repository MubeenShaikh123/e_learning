"use client"

import React, { useState } from 'react';
import { Mail, Send, CheckCircle, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from ' + (process.env.NEXT_PUBLIC_APP_NAME || 'SkillUp'));
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:mubeenshaikh8072@gmail.com?subject=${subject}&body=${body}`;
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Have a question or need help? Send us a message and we&apos;ll get back to you soon.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">Fill out the form below and we&apos;ll respond as soon as possible.</p>
                </div>
                
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-emerald-100/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <p className="text-emerald-800 font-medium">Your email client should open now!</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg"
                      placeholder="What&apos;s this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email || !formData.message}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We&apos;re here to help you succeed in your learning journey. Reach out to us anytime!
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a 
                        href="mailto:mubeenshaikh8072@gmail.com" 
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        mubeenshaikh8072@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-2xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Course Access Issues?</h4>
                      <p className="text-sm text-gray-600">Check your internet connection and try refreshing the page.</p>
                    </div>
                    <div className="p-4 bg-cyan-50/80 backdrop-blur-sm rounded-2xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Payment Questions?</h4>
                      <p className="text-sm text-gray-600">Contact us with your order details for quick resolution.</p>
                    </div>
                    <div className="p-4 bg-teal-50/80 backdrop-blur-sm rounded-2xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Technical Support?</h4>
                      <p className="text-sm text-gray-600">Our team responds to technical queries within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Notice */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/50 shadow-xl rounded-3xl p-8 text-center">
            <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">We&apos;re Here to Help</h3>
            <p className="text-gray-700 leading-relaxed">
              We typically respond to messages within 24 hours. For urgent matters, 
              please include &quot;URGENT&quot; in your subject line.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}