
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message, CareerContext } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  careerData: CareerContext;
}

// Simple Markdown-to-React parser for common patterns
const MarkdownText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        let content: React.ReactNode = line;
        
        // Handle Bullet Points
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          const raw = line.trim().substring(2);
          content = (
            <div className="flex gap-2 items-start ml-2">
              <span className="text-blue-400 mt-1.5">•</span>
              <span>{parseBold(raw)}</span>
            </div>
          );
        } else if (line.trim().startsWith('### ')) {
          // Handle Headings
          content = <h3 className="font-bold text-blue-300 mt-3 mb-1 uppercase text-[11px] tracking-wider">{line.replace('### ', '')}</h3>;
        } else {
          content = parseBold(line);
        }

        return <div key={i}>{content}</div>;
      })}
    </div>
  );
};

// Helper to handle **bold** text
function parseBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-white bg-blue-500/10 px-1 rounded">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen, careerData }) => {
  // We use a separate state for conversation history
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define the dynamic welcome message based on the current careerData.name
  const welcomeMessage = useMemo(() => ({ 
    role: 'model' as const, 
    text: `Welcome! I'm the AI agent for **${careerData.name}**. I can tell you about my **technical stack**, **past projects**, or **career goals**. What would you like to know?`,
    timestamp: new Date()
  }), [careerData.name]);

  // Combine the dynamic welcome message with the actual conversation history
  const messages = [welcomeMessage, ...history];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await geminiService.getCareerAgentResponse(input, careerData);
    
    setHistory(prev => [...prev, {
      role: 'model',
      text: response,
      timestamp: new Date()
    }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="glass w-[340px] sm:w-[450px] h-[600px] rounded-[32px] mb-4 flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] border-slate-700/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="p-5 border-b border-slate-700/50 bg-slate-800/80 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div className="max-w-[180px] sm:max-w-[240px]">
                <p className="font-bold text-sm tracking-tight text-white truncate">{careerData.name}'s Agent</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></span>
                  Active Now
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#0f172a]/40 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[90%] p-4 rounded-[22px] text-[13.5px] leading-[1.6] shadow-xl ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none font-medium' 
                  : 'glass text-slate-200 rounded-tl-none border border-slate-700/50'
                }`}>
                  <MarkdownText text={m.text} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="glass p-4 rounded-2xl rounded-tl-none border border-slate-700/50 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-5 border-t border-slate-700/30 bg-slate-800/40">
            <div className="flex gap-3">
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my experience..."
                className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500 shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white w-[52px] h-[52px] rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-16 h-16 rounded-[24px] flex items-center justify-center shadow-[0_20px_40px_-15px_rgba(59,130,246,0.5)] transition-all duration-500 active:scale-90 ${
          isOpen ? 'bg-slate-800 rotate-90 scale-110' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        <div className="absolute -inset-3 bg-blue-500/30 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-all opacity-0 group-hover:opacity-100"></div>
        {isOpen ? (
          <svg className="relative text-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg className="relative text-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
