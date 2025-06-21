"use client";

import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
import html2pdf from "html2pdf.js";
import mammoth from "mammoth";
import { Upload, FileText, Download, Eye, Sparkles } from 'lucide-react';

export default function UploadForm() {
  const [docFile, setDocFile] = useState(null);
  const [placeholders, setPlaceholders] = useState([]);
  const [formData, setFormData] = useState({});

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
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDocFile(file);

    // 🧹 Reset previous file data
    setPlaceholders([]); // or whatever your placeholder state is
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
          ['date', 'current_position', 'applied_position', 'current_company_name', 'applied_company_name']
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

        saveAs(out, "Customized_Cover_Letter.docx");
      } catch (error) {
        alert("Error generating docx: " + error.message);
      }
    };
    reader.readAsBinaryString(docFile);
  };

  // ✅ generatePDF function (frontend)
  const generatePDF = () => {
    if (!docFile) return alert("Upload a template first");

    const reader = new FileReader();
    reader.onload = async (event) => {
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

        // Create FormData with generated docx blob
        const formDataToSend = new FormData();
        formDataToSend.append("file", out, "temp.docx");

        // Send to backend API for conversion
        const res = await fetch("/api/cv/docx_to_pdf", {
          method: "POST",
          body: formDataToSend,
        });

        if (!res.ok) {
          alert("Failed to convert to PDF");
          return;
        }

        const blobPDF = await res.blob();
        const url = window.URL.createObjectURL(blobPDF);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Cover_Letter.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        alert("Error generating PDF: " + error.message);
      }
    };

    reader.readAsBinaryString(docFile);
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Template</h2>
          <p className="text-gray-600">
            Upload your .docx template with placeholders like <code className="bg-gray-100 px-2 py-1 rounded text-sm">{"{position}"}</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">{"{company}"}</code>
          </p>
        </div>

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
            <span className="text-gray-600 font-medium">Click to browse files</span>
            <span className="text-sm text-gray-400">or drag and drop your .docx file</span>
          </label>
        </div>
      </div>

      {/* Form Section */}
      {placeholders.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center mb-6">
            <Sparkles className="w-6 h-6 text-purple-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Fill Your Details</h3>
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={generateDocx}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download DOCX
            </button>
            <button
              // onClick={generatePDF}
              onClick={() => { alert('This function is not yet implemented') }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
          </div>

          {/* Preview Section */}
          {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Eye className="w-5 h-5 text-gray-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">Live Preview</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {placeholders.map((key) => (
                <div key={key} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {key}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium mt-1 min-h-[1.5rem]">
                    {formData[key] || (
                      <span className="text-gray-400 italic">Not filled yet</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
