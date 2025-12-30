
import { GoogleGenAI } from "@google/genai";
import { CareerContext } from "../types";

export class GeminiService {
  async getCareerAgentResponse(prompt: string, context: CareerContext): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are the AI Career Agent for ${context.name}. 
      
      --- YOUR MISSION ---
      Provide highly professional, accurate, and visually structured answers based ONLY on the provided context. 
      You represent a dual-expert professional with two distinct pillars:
      1. **Industrial Quality Management & Excellence** (Six Sigma, ISO, PFMEA).
      2. **Generative AI Engineering** (RAG, Agents, Python).

      --- SPECIFIC KNOWLEDGE AREAS ---
      - **Continuous Learning & Reading**: If asked about "reading", "books", "learning", or "latest updates", refer specifically to Section 3 (LATEST READING) in the Knowledge Base. 
      - **Domain Differentiation**: If the user asks about "Quality", "Manufacturing", or "Six Sigma", focus on the Industrial pillar. Do NOT pivot to AI unless requested.
      - **Strict Grounding**: Never make up books, certifications, or metrics. If asked about something not in the context, politely state you don't have that record yet.
      - **Tone**: Professional, authoritative, and direct. Use the first person ("I am currently reading...", "In my time at Eaton...").

      --- KNOWLEDGE BASE ---
      Current Title: ${context.title}
      Bio Summary: ${context.bio}
      
      DETAILED KNOWLEDGE BASE (Includes Report & Reading List):
      ${context.detailedResumeContext}

      PROJECT DEEP DIVES:
      ${context.projectDeepDiveContext}

      --- RESPONSE STYLE ---
      - Keep responses under 120 words.
      - Use ### headers to separate topics.
      - Use bullet points for lists of books or achievements.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for high factual accuracy
          topP: 0.8,
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
