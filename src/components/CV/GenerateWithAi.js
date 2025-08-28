"use client";

import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
import { Upload, FileText, Download, Sparkles, Bot, Briefcase } from 'lucide-react';
import { generateWithGemini } from "@/utils/generateWithGemini";

export default function GenerateWithAi() {
    const [docFile, setDocFile] = useState(null);
    const [placeholders, setPlaceholders] = useState([]);
    const [formData, setFormData] = useState({});
    const [jobDescription, setJobDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [fileName, setFileName] = useState("");

    // Extract placeholders by searching for {var} pattern in raw text
    const extractPlaceholders = (text) => {
        const regex = /{([^{}]+)}/g;
        const tags = new Set();
        let match;
        while ((match = regex.exec(text))) {
            tags.add(match[1]);
        }
        return Array.from(tags);
    };

    function getFormattedDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setDocFile(file);
        setFileName(file?.name || "");

        // Reset previous file data
        setPlaceholders([]);
        setFormData({});

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target.result;
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip);

                // Get raw text from doc for placeholder extraction
                const fullText = doc.getFullText();

                // Extract placeholders from raw text
                const tags = extractPlaceholders(fullText);

                // Initialize form data with empty strings for each placeholder
                const defaultData = {};
                tags.forEach((tag) => {
                    if (tag === 'date') {
                        defaultData[tag] = getFormattedDate();
                    } else if (tag === 'current_position') {
                        defaultData[tag] = 'Full Stack Developer';
                    } else if (tag === 'applied_position') {
                        defaultData[tag] = 'Full Stack Developer';
                    } else if (tag === 'current_company_name') {
                        defaultData[tag] = 'StopSpoof';
                    } else {
                        defaultData[tag] = '';
                    }
                });

                setPlaceholders(tags);
                setFormData(defaultData);
            } catch (err) {
                alert("Error reading docx template: " + err.message);
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const generateWithAI = async () => {

        if (!jobDescription.trim()) {
            alert("Please enter a job description first");
            return;
        }

        if (jobDescription.length > 4000) {
            alert("Job description can be max. 4000 characters long!");
            return;
        }

        if (placeholders.length === 0) {
            alert("Please upload a docx template first");
            return;
        }

        setIsGenerating(true);

        try {
            // Create prompt for Gemini
            const prompt = `
Based on the following job description, generate appropriate content for these variables in a cover letter:

Job Description:
${jobDescription}

Variables to fill:
${placeholders.map(placeholder => `- {${placeholder}}`).join('\n')}

Please provide content for each variable that would be suitable for a cover letter. Return the response in this exact JSON format:
{
  ${placeholders.map(placeholder => `"${placeholder}": "content for ${placeholder}"`).join(',\n  ')}
}

Guidelines:
- For variables like "date", use current date format DD-MM-YYYY
- For company-related variables, extract from job description
- For position-related variables, use the job title from description
- For content variables like skills, experience, etc., write relevant content based on the job requirements
- Keep content professional and tailored to the job description
- If you can't determine a specific value, provide a reasonable placeholder

Return only the JSON object, no additional text.`;

            const response = await generateWithGemini({
                prompt: prompt,
                model: "gemini-2.5-flash"
            });

            // Parse the AI response
            try {
                // Clean the response to extract JSON
                const jsonMatch = response.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error("No valid JSON found in response");
                }

                const aiData = JSON.parse(jsonMatch[0]);

                // Update form data with AI-generated content
                const updatedFormData = { ...formData };
                Object.keys(aiData).forEach(key => {
                    if (placeholders.includes(key)) {
                        updatedFormData[key] = aiData[key];
                    }
                });

                setFormData(updatedFormData);
                alert("AI content generated successfully!");

            } catch (parseError) {
                console.error("Failed to parse AI response:", response);
                alert("AI generated content but couldn't parse it. Please try again.");
            }

        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Failed to generate AI content. Please try again.");
        }

        setIsGenerating(false);
    };

    const generateDocx = () => {
        if (!docFile) return alert("Upload a template first");

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target.result;
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

                doc.setData(formData);
                doc.render();

                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                saveAs(out, "AI_Generated_Cover_Letter.docx");
            } catch (error) {
                alert("Error generating docx: " + error.message);
            }
        };
        reader.readAsBinaryString(docFile);
    };

    return (
        <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                        <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Cover Letter Generator</h2>
                    <p className="text-gray-600">
                        Upload your .docx template and job description. AI will generate personalized content for your variables.
                    </p>
                </div>

                {/* File Upload */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">1. Upload Template</h3>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".docx"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <FileText className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-gray-600 font-medium">
                                {fileName ? fileName : "Click to browse files"}
                            </span>
                            <span className="text-sm text-gray-400">
                                {fileName ? "File uploaded successfully" : "or drag and drop your .docx file"}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Job Description Input */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-700">2. Enter Job Description</h3>
                        <span className={`text-sm ${jobDescription.length > 4000 ? 'text-red-500' : jobDescription.length > 4000 ? 'text-orange-500' : 'text-gray-500'}`}>
                            {jobDescription.length}/4000
                        </span>
                    </div>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => {
                            if (e.target.value.length <= 4000) {
                                setJobDescription(e.target.value);
                            }
                        }}
                        placeholder="Paste the job description here. Include company name, position title, requirements, responsibilities, etc. (Max 4000 characters)"
                        rows={8}
                        maxLength={4000}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none hover:border-gray-300 resize-none"
                    />
                    {jobDescription.length > 4500 && (
                        <p className="text-sm text-orange-600 mt-2">
                            ⚠️ Approaching character limit. Consider condensing for better AI processing.
                        </p>
                    )}
                </div>

                {/* Generate AI Content Button */}
                {placeholders.length > 0 && jobDescription.trim() && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={generateWithAI}
                            disabled={isGenerating}
                            className="flex items-center mx-auto px-8 py-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Generating AI Content...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-3" />
                                    Generate AI Content
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Variables Display */}
            {placeholders.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="flex items-center mb-6">
                        <Briefcase className="w-6 h-6 text-green-500 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-800">Detected Variables</h3>
                        <span className="ml-auto bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {placeholders.length} variables found
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {placeholders.map((key) => (
                            <div key={key} className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                {['date', 'current_position', 'applied_position', 'current_company_name', 'applied_company_name'].includes(key) ? (
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        placeholder={`Enter ${key}`}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none hover:border-gray-300"
                                    />
                                ) : (
                                    <textarea
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        placeholder={`Enter ${key}`}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none hover:border-gray-300 resize-none"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Download Button */}
                    <div className="text-center">
                        <button
                            onClick={generateDocx}
                            className="flex items-center mx-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
                        >
                            <Download className="w-5 h-5 mr-3" />
                            Download Generated DOCX
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}