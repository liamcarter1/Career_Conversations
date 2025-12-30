
import React from 'react';
import { CareerContext } from '../types';

interface ExperienceProps {
  data: CareerContext;
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  return (
    <section id="experience" className="py-24 px-4 bg-[#0a0f1d] scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Professional <span className="text-purple-400">Journey</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A timeline of industrial leadership and technical excellence.</p>
        </div>
        
        <div className="space-y-12">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="relative pl-8 md:pl-0">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800"></div>
              
              <div className={`md:flex items-start justify-between mb-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-[45%]">
                  <div className="glass p-8 rounded-3xl hover:border-blue-500/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
                    <span className="text-xs font-black text-blue-400 mb-3 block uppercase tracking-[0.2em]">{exp.period}</span>
                    <h3 className="text-2xl font-bold text-slate-100 mb-1 group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                    <p className="text-slate-300 font-semibold mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                      {exp.company}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {exp.description.map((point, i) => (
                        <li key={i} className="text-sm text-slate-400 leading-relaxed flex items-start">
                          <span className="text-blue-500 mr-3 mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-800/80 rounded-lg text-[10px] uppercase tracking-widest font-black text-slate-400 border border-slate-700/50 group-hover:border-blue-500/20 group-hover:text-slate-200 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 md:left-1/2 top-10 w-4 h-4 bg-blue-600 rounded-full border-4 border-[#0a0f1d] -translate-x-1/2 hidden md:block z-10 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                <div className="md:w-[45%]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
