"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FileText, Upload, Edit3, Download, Sparkles, Target, Clock, Shield, Bot, User } from 'lucide-react';
import GenerateWithAi from "@/components/CV/GenerateWithAi";

const UploadForm = dynamic(() => import("../../../components/CV/UploadForm"), {
  ssr: false,
});

export default function CVPage() {
  const [activeMode, setActiveMode] = useState('ai'); // 'ai' or 'manual'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-6 shadow-2xl border-4 border-white/50">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Dynamic Document Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create professional resumes, cover letters, and CVs in seconds. Upload your template, fill in the details, and download your personalized document.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 mb-8 transition-all duration-500 hover:shadow-3xl hover:bg-white/80">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Method</h2>
            <p className="text-gray-600">Select how you want to generate your document content</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="backdrop-blur-xl bg-white/60 border border-white/50 p-2 rounded-2xl flex shadow-lg">
              <button
                onClick={() => setActiveMode('ai')}
                className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeMode === 'ai'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-2xl transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:scale-105'
                }`}
              >
                <Bot className="w-5 h-5 mr-2" />
                AI Generated
              </button>
              <button
                onClick={() => setActiveMode('manual')}
                className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeMode === 'manual'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-2xl transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:scale-105'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Manual Entry
              </button>
            </div>
          </div>

          {/* Mode Descriptions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${
              activeMode === 'ai' 
                ? 'border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-pink-50/80 shadow-xl transform scale-105' 
                : 'border-gray-200/50 bg-white/50 hover:shadow-lg'
            }`}>
              <div className="flex items-center mb-3">
                <Bot className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">AI Generated</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Upload template + job description</li>
                <li>• AI generates personalized content</li>
                <li>• Perfect for quick applications</li>
                <li>• Smart content matching</li>
              </ul>
            </div>

            <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${
              activeMode === 'manual' 
                ? 'border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 shadow-xl transform scale-105' 
                : 'border-gray-200/50 bg-white/50 hover:shadow-lg'
            }`}>
              <div className="flex items-center mb-3">
                <User className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Manual Entry</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Upload template only</li>
                <li>• Fill each field manually</li>
                <li>• Full control over content</li>
                <li>• Perfect for custom templates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 mb-12 transition-all duration-500 hover:shadow-3xl hover:bg-white/80">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">How to Use</h2>
            <p className="text-gray-600 text-lg">
              Follow these simple steps to create your perfect cover letter, resume, or CV
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Upload Your Template</h3>
                  <p className="text-gray-600">Upload your existing cover letter template or resume with variables like {"{company_name}"}, {"{position}"}, {"{your_name}"}. Supported formats: PDF, DOC, DOCX, TXT.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Edit3 className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Fill in Details</h3>
                  <p className="text-gray-600">Provide job-specific information like company name, position, and key requirements you want to highlight.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">3. AI Enhancement</h3>
                  <p className="text-gray-600">Our AI will generate compelling content for sections like professional summary, skills highlights, and achievements.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Download & Apply</h3>
                  <p className="text-gray-600">Review your personalized cover letter and download it in your preferred format, ready to submit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Template Variables Info */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-amber-50/80 to-orange-50/80 border border-amber-200/50 rounded-3xl p-6 mb-8 shadow-lg">
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">Template Variables</h3>
            <p className="text-amber-800 mb-4">
              Use these variables in your template for dynamic content replacement:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="backdrop-blur-sm bg-white/60 border border-white/50 rounded-2xl p-4">
                <h4 className="font-semibold text-amber-800 mb-3">Basic Variables:</h4>
                <ul className="space-y-2 text-amber-700 font-mono text-sm">
                  <li>• {"{company_name}"}</li>
                  <li>• {"{position}"}</li>
                  <li>• {"{your_name}"}</li>
                  <li>• {"{your_email}"}</li>
                  <li>• {"{your_phone}"}</li>
                  <li>• {"{date}"}</li>
                </ul>
              </div>
              <div className="backdrop-blur-sm bg-white/60 border border-white/50 rounded-2xl p-4">
                <h4 className="font-semibold text-amber-800 mb-3">AI-Generated Content:</h4>
                <ul className="space-y-2 text-amber-700 font-mono text-sm">
                  <li>• {"{professional_summary}"}</li>
                  <li>• {"{key_skills}"}</li>
                  <li>• {"{achievements}"}</li>
                  <li>• {"{job_specific_content}"}</li>
                  <li>• {"{closing_paragraph}"}</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 backdrop-blur-sm bg-white/80 border border-white/50 rounded-2xl p-4">
              <p className="text-sm text-amber-800 font-medium">
                <strong>Example:</strong> {`"Dear Hiring Manager at {company_name}, I am writing to express my interest in the {position} role. {professional_summary}"`}
              </p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 text-center">AI-Powered Content Generation</h3>
            <p className="text-gray-600 text-center mb-6">
              Our AI can help you create compelling content for various sections of your cover letters, resumes, and CVs:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Professional Summary</h4>
                <p className="text-sm text-gray-600">Generate impactful opening statements that highlight your key strengths and career objectives.</p>
              </div>

              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Skills & Achievements</h4>
                <p className="text-sm text-gray-600">Create compelling descriptions of your accomplishments and technical skills relevant to the job.</p>
              </div>

              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Edit3 className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Job-Specific Content</h4>
                <p className="text-sm text-gray-600">Tailor your content to match specific job requirements and company culture.</p>
              </div>
            </div>
          </div>

          {/* When to Use Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-gradient-to-r from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">When This Tool is Most Useful</h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Applying to multiple jobs quickly</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-4 h-4" />
                  </div>
                  <span>Customizing content for specific roles</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Enhancing existing resume content</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <span>Overcoming writer's block</span>
                </li>
              </ul>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">Key Benefits</h3>
              <ul className="space-y-3 text-blue-700">
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>Professional, error-free content</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Save hours of writing time</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-4 h-4" />
                  </div>
                  <span>Industry-specific optimization</span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>ATS-friendly formatting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeMode === 'ai' ? <GenerateWithAi /> : <UploadForm />}
        </div>
      </div>
    </div>
  );
}