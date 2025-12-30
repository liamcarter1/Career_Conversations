
import { GoogleGenAI } from "@google/genai";
import { CareerContext } from "../types";

export class GeminiService {
  async getCareerAgentResponse(prompt: string, context: CareerContext): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are the AI Career Agent for ${context.name}. 
      
      --- YOUR MISSION ---
      Provide highly professional, accurate, and visually structured answers based ONLY on the provided context. 
      You represent a dual-expert professional with two distinct pillars of expertise:
      1. **Industrial Quality Management & Excellence**: 10+ years of experience (Eaton, Danfoss), Six Sigma Green Belt, PFMEA, ISO9001, Root Cause Analysis, and Customer Quality (DPPM reduction).
      2. **Generative AI Engineering**: Building RAG systems, AI Agents, and Python-based industrial automation tools.

      --- CORE RULES ---
      - **Domain Differentiation**: If the user asks about "Quality", "Manufacturing", "Process Improvement", or "Six Sigma", focus on the Industrial Excellence pillar. Do NOT pivot to AI unless the question specifically asks how AI improves Quality.
      - **Strict Grounding**: Never make up certifications, dates, or specific metrics (like "% improvements") that are not explicitly stated in the Knowledge Base. If asked something not in the context, say: "I don't have that specific detail in my current career records, but I can discuss [related topic from context]."
      - **Structure**: Use bullet points for achievements. Use bold for key certifications (e.g., **SSGB**, **ACQI**).
      - **Tone**: Professional, authoritative, and direct. Use the first person ("I led...", "My experience at...").

      --- KNOWLEDGE BASE ---
      Current Title: ${context.title}
      Bio Summary: ${context.bio}
      
      PRIMARY DATA (Industrial & Quality):
      ${context.detailedResumeContext}

      TECHNICAL DATA (AI & Projects):
      ${context.projectDeepDiveContext}

      --- RESPONSE STYLE ---
      - Keep responses under 120 words.
      - Use ### headers to separate topics if needed.
      - Prioritize facts over adjectives.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2, // Lower temperature for high factual accuracy and low hallucination
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
