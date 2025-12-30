
import React from 'react';
import { CareerContext } from '../types';

interface HeroProps {
  data: CareerContext;
  onStartChat: () => void;
  onViewReport: () => void;
}

const Hero: React.FC<HeroProps> = ({ data, onStartChat }) => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden pt-20">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
      
      <div className="z-10 text-center max-w-4xl">
        <div className="mb-6 inline-block relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src={`https://picsum.photos/seed/${data.name}/300/300`} 
            alt={data.name}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover border-2 border-slate-700/50 shadow-2xl float-animation"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white uppercase tracking-tighter">
          Hi, I'm <span className="gradient-text">{data.name}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-8 font-light max-w-3xl mx-auto uppercase tracking-widest text-[10px] font-black">
          {data.title}
        </p>
        
        <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          {data.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onStartChat}
            className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            Talk to my Career Agent
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
