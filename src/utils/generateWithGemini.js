// src/lib/gemini.js
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });


// Reusable function
export async function generateWithGemini({ prompt, model = "gemini-2.5-flash" }) {
    try {
        const result = await genAI.models.generateContent({
            model: model,
            contents: prompt,
        });

        return result.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate content with Gemini");
    }
}
