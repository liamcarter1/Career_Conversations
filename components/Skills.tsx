
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CareerContext } from '../types';

const COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb7185'];

interface SkillsProps {
  data: CareerContext;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  return (
    <section id="skills" className="py-24 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Technical <span className="text-blue-400">Expertise</span></h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-[450px] glass p-6 rounded-3xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.skills} layout="vertical" margin={{ left: 40, right: 30, top: 10, bottom: 10 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
                  width={140} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="level" radius={[0, 8, 8, 0]} barSize={24}>
                  {data.skills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4 tracking-tight">Core Competencies</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              My technical journey bridges the gap between industrial quality management and cutting-edge Artificial Intelligence. I specialize in building RAG systems and autonomous agents that improve efficiency and ROI.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {data.coreCompetencies.map((item) => (
                <div key={item} className="flex items-center space-x-3 p-3 glass rounded-xl border border-slate-700/50 group hover:border-blue-500/50 transition-all">
                  <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover:scale-125 transition-transform"></span>
                  <span className="text-sm font-medium text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <p className="text-[12px] text-blue-400 font-bold uppercase tracking-widest mb-1">Latest Certification</p>
              <p className="text-sm text-slate-300">RAG for Professionals & AI Engineer Core Track (LLM Engineering, QLoRA, Agents).</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
