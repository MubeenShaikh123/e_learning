"use client";

import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
import html2pdf from "html2pdf.js";
import mammoth from "mammoth";

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDocFile(file);

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
        tags.forEach((tag) => (defaultData[tag] = ""));

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

  const generatePDF = () => {
    if (!docFile) return alert("Upload and customize the document first");

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;

        // Convert .docx to HTML
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

        // Create hidden div for conversion
        const container = document.createElement("div");
        container.innerHTML = html;
        container.style.position = "fixed";
        container.style.top = "-9999px";
        document.body.appendChild(container);

        // Generate and download PDF
        await html2pdf().from(container).set({ filename: "Cover_Letter.pdf" }).save();

        // Clean up
        document.body.removeChild(container);
      } catch (error) {
        console.error("PDF generation failed:", error);
        alert("PDF generation failed: " + error.message);
      }
    };

    reader.readAsArrayBuffer(docFile);
  };

  return (
    <div>
      <h2>Upload your .docx template with placeholders like {"{pos}"}, {"{hname}"}</h2>
      <input type="file" accept=".docx" onChange={handleFileUpload} />

      {placeholders.length > 0 && (
        <>
          <h3>Fill placeholder values:</h3>
          {placeholders.map((key) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label>
                {key}:
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  style={{ marginLeft: 8, padding: 6, width: "300px" }}
                />
              </label>
            </div>
          ))}

          <button onClick={generateDocx} style={{ marginRight: 15 }}>
            Download .DOCX
          </button>
          <button onClick={generatePDF}>Download PDF</button>

          <div
            id="preview"
            style={{
              marginTop: 40,
              padding: 20,
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
            }}
          >
            <h3>Preview (filled values):</h3>
            {placeholders.map((key) => (
              <p key={key}>
                <strong>{key}:</strong> {formData[key]}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
