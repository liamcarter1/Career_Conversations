
import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Chatbot from './components/Chatbot';
import { INITIAL_CAREER_DATA } from './constants';
import { CareerContext, Skill } from './types';

const STORAGE_KEY = 'career_agent_portfolio_data';
const ADMIN_ACCESS_KEY = 'career_portfolio_is_authorized';

const App: React.FC = () => {
  const [careerData, setCareerData] = useState<CareerContext>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse saved career data", e);
        return INITIAL_CAREER_DATA;
      }
    }
    return INITIAL_CAREER_DATA;
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Hidden Access Logic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasEditParam = params.get('edit') === 'true';
    setShowAdminButton(hasEditParam);
    
    const authPersisted = localStorage.getItem(ADMIN_ACCESS_KEY) === 'true';
    if (authPersisted) {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(careerData));
  }, [careerData]);

  const handleUpdate = (field: keyof CareerContext, value: any) => {
    setCareerData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (field: keyof CareerContext, newItem: any) => {
    setCareerData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), { ...newItem, id: Math.random().toString(36).substr(2, 9) }]
    }));
  };

  const removeItem = (field: keyof CareerContext, id: string) => {
    setCareerData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  const updateArrayItem = (field: keyof CareerContext, index: number, updatedItem: any) => {
    const newArray = [...(careerData[field] as any[])];
    newArray[index] = updatedItem;
    handleUpdate(field, newArray);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will restore default data and delete your custom changes locally.")) {
      setCareerData(INITIAL_CAREER_DATA);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ADMIN_ACCESS_KEY);
      setIsEditMode(false);
      setIsAuthorized(false);
    }
  };

  const handleProjectImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateArrayItem('projects', index, { ...careerData.projects[index], imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleUpdate('profileImageUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(careerData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          setCareerData(imported);
          alert("Data restored successfully!");
        } catch (err) {
          alert("Invalid file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAdminClick = () => {
    if (isAuthorized) {
      setIsEditMode(!isEditMode);
    } else {
      setShowPasswordModal(true);
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === (careerData.adminPassword || 'liam2025')) {
      setIsAuthorized(true);
      setIsEditMode(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setAuthError(false);
      localStorage.setItem(ADMIN_ACCESS_KEY, 'true');
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 1000);
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setIsEditMode(false);
    localStorage.removeItem(ADMIN_ACCESS_KEY);
  };

  return (
    <div className="min-h-screen selection:bg-blue-500/30 bg-[#0f172a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-heading font-bold text-xl tracking-tighter flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs shadow-lg font-black">
              {careerData.name ? careerData.name.split(' ').map(n => n[0]).join('') : 'LC'}
            </div>
            <span className="hidden sm:inline font-bold text-slate-100">{careerData.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {showAdminButton && (
              <button 
                onClick={handleAdminClick}
                className={`p-2 transition-all hover:scale-110 active:scale-90 ${isEditMode ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'}`}
                title="Admin Control"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </button>
            )}

            <a href={`mailto:${careerData.name.toLowerCase().replace(' ', '.')}@danfoss.com`} className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg">Contact Liam</a>
          </div>
        </div>
      </nav>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`glass max-w-sm w-full p-8 rounded-[2.5rem] shadow-2xl border-slate-700/50 transform transition-transform ${authError ? 'animate-shake' : ''}`}>
            <div className="w-16 h-16 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-500 mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 className="text-xl font-black text-white text-center mb-2 uppercase tracking-tight">Admin Access</h3>
            <p className="text-sm text-slate-400 text-center mb-8">Enter your security key to unlock the AI brain editor.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                autoFocus
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter Password..."
                className={`w-full bg-slate-900/80 border ${authError ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 text-center text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-white placeholder:text-slate-600`}
              />
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => { setShowPasswordModal(false); setPasswordInput(''); }}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold text-sm transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Editor Drawer */}
      {isEditMode && isAuthorized && (
        <div className="fixed inset-y-0 left-0 w-[400px] z-50 glass border-r border-slate-700/50 p-6 overflow-y-auto animate-in slide-in-from-left duration-300 shadow-2xl custom-scrollbar text-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[10px]">AI</span>
              Agent Brain Editor
            </h2>
            <button onClick={() => setIsEditMode(false)} className="text-slate-400 hover:text-white transition-colors">✕</button>
          </div>
          
          <div className="space-y-10 pb-20">
            <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-2xl border border-slate-800">
               <button onClick={handleLogout} className="text-[9px] font-black uppercase text-slate-500 hover:text-white flex items-center gap-1 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                 Lock Session
               </button>
               <span className="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-1">
                 <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                 Authorized
               </span>
            </div>

            <Section title="Data & Backups" color="cyan">
               <div className="space-y-3">
                 <button onClick={exportData} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-700 transition-all flex items-center justify-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                   Download Backup (.json)
                 </button>
                 <button onClick={() => fileInputRef.current?.click()} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-700 transition-all flex items-center justify-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                   Restore from File
                 </button>
                 <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={importData} />
               </div>
            </Section>

            <Section title="Profile" color="blue">
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <img 
                    src={careerData.profileImageUrl || `https://picsum.photos/seed/${careerData.name}/300/300`} 
                    alt="Profile Preview" 
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500/30 shadow-lg"
                  />
                  <label className="w-full cursor-pointer">
                    <div className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-center text-[10px] font-black uppercase tracking-widest transition-colors shadow-xl shadow-blue-600/20">
                      Change Profile Picture
                    </div>
                    <input type="file" ref={profileInputRef} className="hidden" accept="image/*" onChange={handleProfileImageUpload} />
                  </label>
                </div>
                <Input label="Full Name" value={careerData.name} onChange={v => handleUpdate('name', v)} />
                <Input label="Professional Headline" value={careerData.title} onChange={v => handleUpdate('title', v)} />
                <Textarea label="Mission Bio" value={careerData.bio} onChange={v => handleUpdate('bio', v)} />
              </div>
            </Section>

            <Section title="AI Build Spotlight" color="pink">
              <div className="space-y-8">
                {careerData.projects.map((proj, i) => (
                  <div key={proj.id} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <Input 
                          label="Build Title" 
                          value={proj.title} 
                          onChange={v => updateArrayItem('projects', i, { ...proj, title: v })} 
                        />
                      </div>
                      <div className="w-16 h-12 rounded border border-slate-700 overflow-hidden bg-slate-800">
                        <img src={proj.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-1">Card Image</label>
                      <label className="block cursor-pointer">
                        <div className="py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-center text-[9px] font-black uppercase text-slate-400 hover:bg-slate-700 transition-colors">
                          Upload Screenshot
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleProjectImageUpload(i, e)} />
                      </label>
                    </div>

                    <Input 
                      label="Application URL (Live Link)" 
                      value={proj.link || ''} 
                      onChange={v => updateArrayItem('projects', i, { ...proj, link: v })} 
                      placeholder="https://..."
                    />
                    
                    <Textarea 
                      label="Short Description" 
                      value={proj.description} 
                      onChange={v => updateArrayItem('projects', i, { ...proj, description: v })} 
                    />
                    
                    <Input 
                      label="Tags (comma separated)" 
                      value={proj.tags.join(', ')} 
                      onChange={v => updateArrayItem('projects', i, { ...proj, tags: v.split(',').map(t => t.trim()).filter(Boolean) })} 
                    />

                    <button 
                      onClick={() => removeItem('projects', proj.id)} 
                      className="w-full py-1 text-red-400 text-[10px] uppercase font-bold tracking-widest border border-red-500/20 rounded mt-1 hover:bg-red-500/10 transition-colors"
                    >
                      Delete Project
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('projects', { title: 'New AI Build', description: 'Briefly explain what this tool does...', imageUrl: '', tags: ['AI', 'Python'], link: '' })} 
                  className="w-full py-3 bg-pink-600/10 border border-pink-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-pink-400 hover:bg-pink-600/20 transition-all"
                >
                  + Add New Project
                </button>
              </div>
            </Section>

            <Section title="Advanced Knowledge Base" color="cyan">
              <div className="space-y-6">
                <Textarea 
                  label="Detailed Career Report (AI Champion File)" 
                  value={careerData.detailedResumeContext} 
                  onChange={v => handleUpdate('detailedResumeContext', v)} 
                  rows={15}
                  placeholder="Paste your full AI Champion / Career Report here..."
                />
                <Textarea 
                  label="Project Deep Dive Context" 
                  value={careerData.projectDeepDiveContext} 
                  onChange={v => handleUpdate('projectDeepDiveContext', v)} 
                  rows={8}
                />
              </div>
            </Section>

            <Section title="Technical Expertise" color="emerald">
              <div className="space-y-6">
                {careerData.skills.map((skill, i) => (
                  <div key={skill.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-3">
                    <Input 
                      label="Skill Name" 
                      value={skill.name} 
                      onChange={v => updateArrayItem('skills', i, { ...skill, name: v })} 
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Expertise Level (%)</label>
                        <span className="text-xs font-black text-blue-400">{skill.level}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={skill.level} 
                        onChange={e => updateArrayItem('skills', i, { ...skill, level: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                    <Input 
                      label="Category (e.g., backend, ai)" 
                      value={skill.category} 
                      onChange={v => updateArrayItem('skills', i, { ...skill, category: v })} 
                    />
                    <button 
                      onClick={() => removeItem('skills', skill.id)} 
                      className="w-full py-1 text-red-400 text-[10px] uppercase font-bold tracking-widest border border-red-500/20 rounded mt-1 hover:bg-red-500/10 transition-colors"
                    >
                      Remove Skill
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('skills', { name: 'New Skill', level: 50, category: 'general' })} 
                  className="w-full py-2 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-300"
                >
                  + Add Skill
                </button>
              </div>
            </Section>

            <Section title="Core Competencies" color="cyan">
              <Textarea 
                label="Tags (one per line)" 
                value={careerData.coreCompetencies.join('\n')} 
                onChange={v => handleUpdate('coreCompetencies', v.split('\n').filter(s => s.trim()))} 
                rows={6}
              />
            </Section>

            <Section title="Professional Experience" color="purple">
              {careerData.experience.map((exp, i) => (
                <div key={exp.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-4 space-y-3">
                  <Input label="Company" value={exp.company} onChange={v => updateArrayItem('experience', i, { ...exp, company: v })} />
                  <Input label="Role" value={exp.role} onChange={v => updateArrayItem('experience', i, { ...exp, role: v })} />
                  <Input label="Period" value={exp.period} onChange={v => updateArrayItem('experience', i, { ...exp, period: v })} />
                  <Textarea label="Bullets (Newline separated)" value={exp.description.join('\n')} onChange={v => updateArrayItem('experience', i, { ...exp, description: v.split('\n') })} />
                  <button onClick={() => removeItem('experience', exp.id)} className="w-full py-1 text-red-400 text-[10px] uppercase font-bold tracking-widest border border-red-500/20 rounded mt-2 hover:bg-red-500/10 transition-colors">Remove</button>
                </div>
              ))}
              <button onClick={() => addItem('experience', { company: 'New Company', role: 'Role', period: '2025', description: ['Achievement'], technologies: [] })} className="w-full py-2 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold mt-2 uppercase tracking-wider text-slate-300">+ Add Entry</button>
            </Section>

            <Section title="Security & Management" color="slate">
               <div className="space-y-4">
                 <Input 
                  label="Change Admin Password" 
                  type="password"
                  value={careerData.adminPassword || ''} 
                  onChange={v => handleUpdate('adminPassword', v)} 
                 />
                 <button onClick={handleReset} className="w-full py-3 px-4 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 rounded-2xl text-[10px] uppercase font-bold tracking-tighter transition-all">Factory Reset Data</button>
               </div>
            </Section>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`${isEditMode ? 'md:ml-[400px]' : ''} transition-all duration-500`}>
        <Hero 
          data={careerData} 
          onStartChat={() => setIsChatOpen(true)} 
          onViewReport={() => {}} 
        />
        <Skills data={careerData} />
        <Experience data={careerData} />
        
        <section className="py-24 px-4 bg-slate-900/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-16 text-center text-white tracking-tighter uppercase">AI Build <span className="text-pink-500">Spotlight</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {careerData.projects.map(proj => {
                const Card = (
                  <div className={`group h-full flex flex-col glass rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-2xl ${proj.link ? 'hover:border-pink-500/40 cursor-pointer' : 'border-slate-700/50'}`}>
                    <div className="aspect-video overflow-hidden relative bg-slate-800">
                       <img 
                        src={proj.imageUrl || `https://picsum.photos/seed/${proj.id}/800/450`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={proj.title} 
                       />
                       {proj.link && (
                         <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-6 py-2.5 bg-pink-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                              Launch Live App
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                            </span>
                         </div>
                       )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="font-black text-2xl mb-4 tracking-tight text-white uppercase group-hover:text-pink-400 transition-colors">{proj.title}</h3>
                      <p className="text-sm text-slate-400 mb-8 leading-relaxed flex-1 font-medium">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map(tag => (
                          <span key={tag} className="text-[9px] px-3 py-1 bg-slate-800 text-slate-400 rounded-full border border-slate-700 font-black uppercase tracking-widest">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );

                return proj.link ? (
                  <a key={proj.id} href={proj.link} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">
                    {Card}
                  </a>
                ) : (
                  <div key={proj.id} className="h-full">{Card}</div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-20 px-4 border-t border-slate-800 bg-[#0a0f1d] ${isEditMode ? 'md:ml-[400px]' : ''} transition-all duration-500`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="font-heading font-black text-3xl mb-4 tracking-tighter text-white uppercase">
              {careerData.name} <span className="text-blue-500">.</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Quality Management • AI Engineering • Continuous Improvement</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-6">
              <a href={careerData.socials.linkedIn} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-blue-600 rounded-2xl text-white transition-all shadow-xl group" title="LinkedIn">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href={careerData.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-purple-600 rounded-2xl text-white transition-all shadow-xl group" title="GitHub">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-4.51-2-7-2"/></svg>
              </a>
            </div>
            <a href={`mailto:${careerData.name.toLowerCase().replace(' ', '.')}@danfoss.com`} className="px-10 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-blue-600/20 active:scale-95">
              Contact Liam
            </a>
          </div>
        </div>
      </footer>

      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} careerData={careerData} />
    </div>
  );
};

const Section: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({ title, color, children }) => {
  const colorMap: Record<string, string> = {
    blue: 'var(--blue-rgb)',
    indigo: 'var(--indigo-rgb)',
    emerald: 'var(--emerald-rgb)',
    cyan: 'var(--cyan-rgb)',
    purple: 'var(--purple-rgb)',
    pink: 'var(--pink-rgb)',
    slate: 'var(--slate-rgb)'
  };
  const rgb = colorMap[color] || 'var(--blue-rgb)';
  
  return (
    <div className="p-6 rounded-3xl border shadow-sm" style={{ backgroundColor: `rgba(${rgb}, 0.05)`, borderColor: `rgba(${rgb}, 0.2)` }}>
      <h3 className="text-[10px] font-black uppercase mb-5 tracking-[0.2em] opacity-80" style={{ color: `rgb(${rgb})` }}>{title}</h3>
      <div className="space-y-6">{children}</div>
    </div>
  );
};

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }> = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-300 font-medium placeholder:text-slate-700" />
  </div>
);

const Textarea: React.FC<{ label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }> = ({ label, value, onChange, rows = 3, placeholder }) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <textarea rows={rows} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[11px] outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-300 font-sans leading-relaxed custom-scrollbar" />
  </div>
);

export default App;
