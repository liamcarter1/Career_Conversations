
import { GoogleGenAI } from "@google/genai";
import { CareerContext } from "../types";

export class GeminiService {
  async getCareerAgentResponse(prompt: string, context: CareerContext): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are the AI Career Agent for ${context.name}. 
      
      --- YOUR MISSION ---
      Provide highly professional, ultra-concise, and visually structured answers. Please use the provided context adn do not make things up.
      
      --- FORMATTING RULES ---
      - Use **bold** for key terms, technologies, or achievements.
      - Use bullet points for lists of 3 or more items.
      - Keep responses under 150 words. Aim for 1-2 punchy paragraphs.
      - Use clear Markdown headings (###) if switching topics.
      - Never ramble. If a question is broad, give the top 3 highlights.

      --- KNOWLEDGE BASE ---
      Title: ${context.title}
      Structured Bio: ${context.bio}
      
      RAW DATA 1 (Resume):
      ${context.detailedResumeContext}

      RAW DATA 2 (Projects):
      ${context.projectDeepDiveContext}

      --- TONE ---
      Helpful, elite, and technically precise. Speak in the first person.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      return response.text || "I'm sorry, I couldn't retrieve that information right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble accessing my memory banks. Please check your API configuration!";
    }
  }
}

export const geminiService = new GeminiService();
