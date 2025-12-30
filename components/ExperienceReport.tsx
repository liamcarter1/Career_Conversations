
import React, { useEffect } from 'react';
import { CareerContext } from '../types';

interface ExperienceReportProps {
  data: CareerContext;
  onBack: () => void;
}

const ExperienceReport: React.FC<ExperienceReportProps> = ({ data, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation / Actions */}
        <div className="flex justify-between items-center mb-10 no-print">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            Back to Dashboard
          </button>
          
          <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-xs font-bold transition-all border border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Download PDF Report
          </button>
        </div>

        {/* The CV Document */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
          
          {/* Document Header */}
          <div className="p-10 md:p-16 border-b border-slate-800 bg-slate-900/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  Technical Competency Profile
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                  {data.name}<br/>
                  <span className="text-blue-500">AI Champion</span>
                </h1>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</div>
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase">Certified AI Lead</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <div>
                <span className="block text-slate-600 mb-1">Location</span>
                <span className="text-slate-200">Portsmouth, UK</span>
              </div>
              <div>
                <span className="block text-slate-600 mb-1">Current Role</span>
                <span className="text-slate-200">Quality Manager</span>
              </div>
              <div>
                <span className="block text-slate-600 mb-1">Specialization</span>
                <span className="text-slate-200">GenAI & RAG</span>
              </div>
              <div>
                <span className="block text-slate-600 mb-1">Report ID</span>
                <span className="text-slate-200">LC-2025-V1</span>
              </div>
            </div>
          </div>

          <div className="p-10 md:p-16 space-y-16">
            {/* 1. Executive Summary */}
            <section>
              <h2 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-blue-500/30"></span>
                01. Executive Summary
              </h2>
              <div className="text-slate-300 text-sm leading-relaxed space-y-4 max-w-3xl">
                <p>
                  This report outlines the technical competencies and certifications acquired through an intensive, multi-disciplinary curriculum focused on <strong>Artificial Intelligence, Software Engineering, and Data Science.</strong>
                </p>
                <p>
                  The combined coursework represents over <strong>200+ hours of hands-on training</strong>, transitioning from advanced Python programming to the deployment of autonomous AI Agents, Large Language Models (LLMs), and interactive web applications.
                </p>
              </div>
            </section>

            {/* 2. Technical Skills Matrix */}
            <section>
              <h2 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-blue-500/30"></span>
                02. Technical Skills Matrix
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Core Programming</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Python (Advanced)', 'SQL', 'HTML5', 'CSS3', 'JavaScript'].map(s => (
                        <span key={s} className="px-3 py-1 bg-slate-800 text-slate-300 text-[11px] rounded border border-slate-700">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">AI & LLMs</h3>
                    <div className="flex flex-wrap gap-2">
                      {['OpenAI API', 'LangChain', 'Hugging Face', 'RAG', 'QLoRA', 'Pinecone', 'Vector DBs'].map(s => (
                        <span key={s} className="px-3 py-1 bg-blue-500/10 text-blue-300 text-[11px] rounded border border-blue-500/20">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Data Science & ML</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Pandas', 'Scikit-Learn', 'Plotly', 'Dash', 'Seaborn', 'Regression', 'Neural Networks'].map(s => (
                        <span key={s} className="px-3 py-1 bg-slate-800 text-slate-300 text-[11px] rounded border border-slate-700">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Tools & Deployment</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Flask', 'Django', 'Bootstrap 5', 'n8n Automation', 'Git/GitHub', 'VS Code', 'REST APIs'].map(s => (
                        <span key={s} className="px-3 py-1 bg-slate-800 text-slate-300 text-[11px] rounded border border-slate-700">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Detailed Competency Breakdown */}
            <section>
              <h2 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                <span className="w-8 h-px bg-blue-500/30"></span>
                03. Detailed Competency Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                <div>
                  <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-4">Domain A: AI Engineering & GenAI</h3>
                  <ul className="space-y-4 text-xs text-slate-400">
                    <li><strong className="text-slate-200">RAG Systems:</strong> Connecting LLMs to private data to reduce hallucinations.</li>
                    <li><strong className="text-slate-200">Fine-Tuning:</strong> Using QLoRA for local open-source model optimization.</li>
                    <li><strong className="text-slate-200">Agent Orchestration:</strong> Designing autonomous agents with multi-step reasoning.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-4">Domain B: Data Science & ML</h3>
                  <ul className="space-y-4 text-xs text-slate-400">
                    <li><strong className="text-slate-200">ML Foundations:</strong> Statistical foundations and Supervised/Unsupervised Learning.</li>
                    <li><strong className="text-slate-200">Deep Learning:</strong> Neural Network architecture and scaling models.</li>
                    <li><strong className="text-slate-200">Visualization:</strong> Interactive dashboard engineering with Plotly & Dash.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-4">Domain C: Software Architecture</h3>
                  <ul className="space-y-4 text-xs text-slate-400">
                    <li><strong className="text-slate-200">Advanced Python:</strong> Mastery of decorators, generators, and OOP patterns.</li>
                    <li><strong className="text-slate-200">Backend:</strong> Building server-side apps using Flask and Django.</li>
                    <li><strong className="text-slate-200">Automation:</strong> n8n workflow design and REST API integration.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-4">Domain D: UI/UX & Frontend</h3>
                  <ul className="space-y-4 text-xs text-slate-400">
                    <li><strong className="text-slate-200">Responsive Design:</strong> Bootstrap 5 and Grid system layouts.</li>
                    <li><strong className="text-slate-200">Prototyping:</strong> Rapid landing page development using Elementor.</li>
                    <li><strong className="text-slate-200">Componentry:</strong> Designing clean, modern dashboard interfaces.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Project Capabilities */}
            <section className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800">
              <h2 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-blue-500/30"></span>
                04. Project Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Custom Knowledge Chatbot (RAG/Python)",
                  "Automated Lead Qualifier (n8n/LLM)",
                  "Financial Analytics Dashboard (Plotly/Dash)",
                  "Predictive Sales Model (Scikit-learn/NumPy)",
                  "Responsive AI Web App (Flask/Bootstrap 5)",
                  "AI Root Cause Analysis (Danfoss Industrial)"
                ].map((proj, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="w-8 h-8 rounded bg-blue-600/10 flex items-center justify-center text-blue-500 font-black text-[10px]">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="text-[11px] font-bold text-slate-300">{proj}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer Signature */}
          <div className="p-10 md:p-16 bg-slate-950 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Authenticated Documentation</p>
                <p className="text-xs font-bold text-slate-300">© 2025 Liam Carter | AI Engineering Portfolio</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Digital Signature Hash</p>
              <p className="text-[10px] font-mono text-slate-500">48f9-a21c-421x-liam-ai-verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceReport;
