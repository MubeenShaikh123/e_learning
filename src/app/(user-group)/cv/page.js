"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FileText, Upload, Edit3, Download, Sparkles, Target, Clock, Shield, Bot, User } from 'lucide-react';
import GenerateWithAi from "@/components/CV/GenerateWithAi";

const UploadForm = dynamic(() => import("../../../components/CV/UploadForm"), {
  ssr: false,
});

export default function CVPage() {
  const [activeMode, setActiveMode] = useState('manual'); // 'ai' or 'manual'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dynamic Document Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional resumes, cover letters, and CVs in seconds. Upload your template, fill in the details, and download your personalized document.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Method</h2>
            <p className="text-gray-600">Select how you want to generate your document content</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setActiveMode('ai')}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeMode === 'ai'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Bot className="w-5 h-5 mr-2" />
                AI Generated
              </button>
              <button
                onClick={() => setActiveMode('manual')}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeMode === 'manual'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Manual Entry
              </button>
            </div>
          </div>

          {/* Mode Descriptions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border-2 transition-all ${
              activeMode === 'ai' 
                ? 'border-purple-200 bg-purple-50' 
                : 'border-gray-200 bg-gray-50'
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

            <div className={`p-6 rounded-xl border-2 transition-all ${
              activeMode === 'manual' 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
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
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How to Use</h2>
            <p className="text-gray-600 text-lg">
              Follow these simple steps to create your perfect cover letter, resume, or CV
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Upload Your Template</h3>
                  <p className="text-gray-600">Upload your existing cover letter template or resume with variables like {"{company_name}"}, {"{position}"}, {"{your_name}"}. Supported formats: PDF, DOC, DOCX, TXT.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Fill in Details</h3>
                  <p className="text-gray-600">Provide job-specific information like company name, position, and key requirements you want to highlight.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">3. AI Enhancement</h3>
                  <p className="text-gray-600">Our AI will generate compelling content for sections like professional summary, skills highlights, and achievements.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Download & Apply</h3>
                  <p className="text-gray-600">Review your personalized cover letter and download it in your preferred format, ready to submit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Template Variables Info */}
          <div className="bg-amber-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Template Variables</h3>
            <p className="text-amber-700 mb-4">
              Use these variables in your template for dynamic content replacement:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Basic Variables:</h4>
                <ul className="space-y-1 text-amber-700 font-mono text-sm">
                  <li>• {"{company_name}"}</li>
                  <li>• {"{position}"}</li>
                  <li>• {"{your_name}"}</li>
                  <li>• {"{your_email}"}</li>
                  <li>• {"{your_phone}"}</li>
                  <li>• {"{date}"}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">AI-Generated Content:</h4>
                <ul className="space-y-1 text-amber-700 font-mono text-sm">
                  <li>• {"{professional_summary}"}</li>
                  <li>• {"{key_skills}"}</li>
                  <li>• {"{achievements}"}</li>
                  <li>• {"{job_specific_content}"}</li>
                  <li>• {"{closing_paragraph}"}</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-amber-700">
                <strong>Example:</strong> {`"Dear Hiring Manager at {company_name}, I am writing to express my interest in the {position} role. {professional_summary}"`}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">AI-Powered Content Generation</h3>
            <p className="text-gray-600 text-center mb-6">
              Our AI can help you create compelling content for various sections of your cover letters, resumes, and CVs:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Target className="w-8 h-8 text-indigo-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Professional Summary</h4>
                <p className="text-sm text-gray-600">Generate impactful opening statements that highlight your key strengths and career objectives.</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Skills & Achievements</h4>
                <p className="text-sm text-gray-600">Create compelling descriptions of your accomplishments and technical skills relevant to the job.</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Edit3 className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Job-Specific Content</h4>
                <p className="text-sm text-gray-600">Tailor your content to match specific job requirements and company culture.</p>
              </div>
            </div>
          </div>

          {/* When to Use Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">When This Tool is Most Useful</h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <span>Applying to multiple jobs quickly</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-5 h-5 flex-shrink-0" />
                  <span>Customizing content for specific roles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span>Enhancing existing resume content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 flex-shrink-0" />
                  <span>{`Overcoming writer's block`}</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Key Benefits</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  <span>Professional, error-free content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <span>Save hours of writing time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-5 h-5 flex-shrink-0" />
                  <span>Industry-specific optimization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span>ATS-friendly formatting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Component Rendering */}
        {activeMode === 'ai' ? <GenerateWithAi /> : <UploadForm />}

      </div>
    </div>
  );
}