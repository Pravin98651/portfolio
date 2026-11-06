import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { Download, ExternalLink, Star, ChevronLeft, ChevronRight, Mail, Check, Copy, Send, Sparkles, Globe, Eye, Activity, Cpu, Zap } from 'lucide-react';
import { sound } from '../utils/soundEffects';
import ThreeDTilt from './ThreeDTilt';

export default function BackpackPocket({
  activeTab,
  onSelectTab,
  onOpenCaseStudy,
  currentProjectIndex,
  onSelectProjectIndex
}) {
  const { projects, resume, contact } = portfolioData;
  const currentProject = projects[currentProjectIndex] || projects[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  const nextProject = () => {
    sound.playClick();
    setActiveImageIndex(0);
    onSelectProjectIndex((currentProjectIndex + 1) % projects.length);
  };

  const prevProject = () => {
    sound.playClick();
    setActiveImageIndex(0);
    onSelectProjectIndex((currentProjectIndex - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[540px] flex flex-col select-none">
      
      {/* ================= MODULAR CONSOLE CARTRIDGE TABS ================= */}
      <div className="relative flex items-end justify-between px-3 z-10 -mb-[2px]">
        {/* Tab 1: RÉSUMÉ (Solar Gold Yellow) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('resume');
          }}
          className={`relative group px-4 sm:px-5 py-2 font-black text-xs sm:text-sm uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 cursor-pointer btn-tactile-3d ${
            activeTab === 'resume'
              ? 'bg-[#ffd31e] text-black -translate-y-2 shadow-[4px_-3px_0px_#000] z-20'
              : 'bg-[#fde047]/80 text-gray-800 hover:-translate-y-1 z-10'
          }`}
        >
          <span>📄 RÉSUMÉ</span>
        </button>

        {/* Tab 2: SYSTEMS (Cyber Cyan / Electric Blue) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('portfolio');
          }}
          className={`relative group px-4 sm:px-6 py-2 font-black text-xs sm:text-sm uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 cursor-pointer btn-tactile-3d ${
            activeTab === 'portfolio'
              ? 'bg-[#00f0ff] text-black -translate-y-2 shadow-[4px_-3px_0px_#000] z-20'
              : 'bg-[#38bdf8]/80 text-black/90 hover:-translate-y-1 z-10'
          }`}
        >
          <span>💾 SYSTEMS ({currentProjectIndex + 1}/{projects.length})</span>
        </button>

        {/* Tab 3: DISPATCH (Hot Magenta / Coral) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('contact');
          }}
          className={`relative group px-4 sm:px-5 py-2 font-black text-xs sm:text-sm uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 cursor-pointer btn-tactile-3d ${
            activeTab === 'contact'
              ? 'bg-[#ff007f] text-white -translate-y-2 shadow-[4px_-3px_0px_#000] z-20'
              : 'bg-[#f43f5e]/80 text-white/90 hover:-translate-y-1 z-10'
          }`}
        >
          <span>📡 DISPATCH</span>
        </button>
      </div>

      {/* ================= MODULAR CONSOLE CHASSIS (WITH 3D TILT) ================= */}
      <ThreeDTilt maxTilt={5} scale={1.01} glare={false} className="rounded-2xl">
        <div className="relative w-full rounded-2xl border-[3px] border-black bg-console-chassis shadow-[10px_10px_0px_#000000] overflow-hidden">
          
          {/* Four Corner Hex Rivets */}
          <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-gray-400 border border-black z-20 shadow-sm" />
          <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gray-400 border border-black z-20 shadow-sm" />
          <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-gray-400 border border-black z-20 shadow-sm" />
          <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-gray-400 border border-black z-20 shadow-sm" />

          {/* Original Oscilloscope & Telemetry Visualizer Banner */}
          <div className="relative w-full h-24 sm:h-28 bg-[#090b10] border-b-[3px] border-black overflow-hidden flex flex-col justify-between p-3">
            {/* Grid background on CRT screen */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,255,136,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.2) 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />

            {/* Header Row */}
            <div className="flex items-center justify-between z-10 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                <span className="glow-green">SYSTEM BUS // TELEMETRY OK</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                <span>115200 BAUD</span>
              </div>
            </div>

            {/* Animated SVG Oscilloscope Multi-Waveform */}
            <div className="w-full h-12 relative flex items-center justify-center overflow-hidden z-10">
              <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                {/* Emerald primary wave */}
                <path
                  d="M0 30 Q 50 8, 100 30 T 200 30 T 300 30 T 400 30"
                  fill="none"
                  stroke="#00ff88"
                  strokeWidth="2.5"
                  className="glow-green"
                />
                {/* Amber secondary harmonic */}
                <path
                  d="M0 30 Q 30 52, 70 30 T 140 8 T 210 52 T 280 18 T 350 42 T 400 30"
                  fill="none"
                  stroke="#ffd31e"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  className="glow-yellow"
                />
                {/* Cyan micro audio pulse */}
                <path
                  d="M0 30 L 120 30 L 130 15 L 140 45 L 150 20 L 160 40 L 170 30 L 400 30"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.2"
                  className="glow-cyan opacity-80"
                />
              </svg>
            </div>

            {/* Status Channel Readouts with Vibrant Badges */}
            <div className="flex items-center justify-between text-[9px] font-mono z-10">
              <span className="text-[#00ff88] font-bold">CH-01: LANGGRAPH ⚡</span>
              <span className="text-[#00f0ff] font-bold">CH-02: FAISS &lt;15MS 🟢</span>
              <span className="text-[#ff007f] font-bold">CH-03: PGVECTOR 0.92 🟣</span>
            </div>
          </div>

          {/* ================= CARD PULL-OUT CONTENT ================= */}
          <div className="p-4 sm:p-5 z-20 relative min-h-[410px] flex flex-col justify-between">
            
            {/* -------------------- 1. PORTFOLIO / SYSTEMS CARD -------------------- */}
            {activeTab === 'portfolio' && (
              <div className="bg-white border-[3px] border-black rounded-xl p-4 sm:p-5 shadow-[5px_5px_0px_#000000] flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
                
                {/* Top Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black text-[#00f0ff] flex items-center justify-center font-black text-xs tracking-tighter border-2 border-black shadow-[2px_2px_0px_#00f0ff]">
                      {currentProject.title.slice(0, 4)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-xl text-black leading-none uppercase tracking-tight">
                          {currentProject.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#ffd31e] text-black border border-black rounded-md font-black shadow-[1px_1px_0px_#000]">
                          {currentProjectIndex + 1}/{projects.length}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-600 mt-0.5 line-clamp-1">
                        {currentProject.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Country Flag Badge */}
                  <div className="flex items-center gap-1.5 px-2 py-0.5 border-2 border-black rounded-lg bg-gray-100 text-xs font-mono font-black shadow-[1px_1px_0px_#000]">
                    <span>{currentProject.flag}</span>
                    <span className="text-[11px] hidden sm:inline">{currentProject.country}</span>
                  </div>
                </div>

                {/* Rating & Tag Badges */}
                <div className="flex items-center justify-between my-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                    <div className="flex text-amber-500">
                      {Array.from({ length: currentProject.stars || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-mono text-[11px]">{currentProject.rating} · {currentProject.ratingSource}</span>
                  </div>

                  {/* Tag Badges with Vibrant Coded Colors */}
                  <div className="flex items-center gap-1.5 font-bold text-[10px] flex-wrap">
                    {currentProject.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-md border-2 border-black uppercase font-mono font-black shadow-[1px_1px_0px_#000] ${
                          tag.includes('AI') || tag.includes('GEMINI') || tag.includes('RAG')
                            ? 'bg-[#00f0ff] text-black'
                            : tag.includes('NEXT') || tag.includes('FULL')
                            ? 'bg-[#92f080] text-black'
                            : 'bg-[#fef9c3] text-black'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Screenshot Preview Gallery */}
                <div className="my-2 space-y-1.5">
                  {/* Main Preview Image */}
                  <div
                    onClick={() => {
                      sound.playClick();
                      onOpenCaseStudy(currentProject);
                    }}
                    className="relative w-full h-32 sm:h-36 rounded-xl border-2 border-black overflow-hidden bg-black flex items-center justify-center cursor-pointer group shadow-inner"
                  >
                    <img
                      src={currentProject.images[activeImageIndex] || currentProject.images[0]}
                      alt={currentProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-wider backdrop-blur-[2px]">
                      <Eye className="w-4 h-4 text-[#ffd31e]" />
                      <span>EXPLORE CASE STUDY & ARCHITECTURE</span>
                    </div>
                  </div>

                  {/* Screen Switcher thumbnails */}
                  {currentProject.images.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
                      {currentProject.images.map((img, idx) => {
                        const isArch = img.includes('arch');
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setActiveImageIndex(idx);
                            }}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-black border-2 transition-all btn-tactile-3d ${
                              activeImageIndex === idx
                                ? 'bg-[#ffd31e] text-black border-black shadow-[2px_2px_0px_#000]'
                                : 'bg-gray-100 text-gray-700 border-black hover:bg-gray-200'
                            }`}
                          >
                            {isArch ? '📐 Architecture' : `Screen ${idx + 1}`}
                          </button>
                        );
                      })}
                      <span className="text-[10px] font-mono text-gray-500 ml-auto truncate max-w-[140px] font-bold">
                        {currentProject.imageCaptions ? currentProject.imageCaptions[activeImageIndex] : ''}
                      </span>
                    </div>
                  )}

                  {/* Project Selector Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-gray-100 no-scrollbar">
                    {projects.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setActiveImageIndex(0);
                          onSelectProjectIndex(idx);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black border-2 transition-all whitespace-nowrap btn-tactile-3d ${
                          currentProjectIndex === idx
                            ? 'bg-black text-[#ffd31e] border-black shadow-[2px_2px_0px_#ffd31e]'
                            : 'bg-white text-gray-700 border-black hover:bg-gray-100 shadow-[1px_1px_0px_#000]'
                        }`}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-2 mt-1">
                  {/* Project Prev/Next Switchers */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevProject}
                      title="Previous Project"
                      className="p-2.5 bg-gray-100 hover:bg-black hover:text-white border-2 border-black rounded-lg transition-colors cursor-pointer btn-tactile-3d shadow-[2px_2px_0px_#000]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextProject}
                      title="Next Project"
                      className="p-2.5 bg-gray-100 hover:bg-black hover:text-white border-2 border-black rounded-lg transition-colors cursor-pointer btn-tactile-3d shadow-[2px_2px_0px_#000]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* GitHub link if available */}
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      title="GitHub Repository"
                      className="p-2.5 bg-black hover:bg-gray-800 text-white border-2 border-black rounded-lg transition-colors flex items-center justify-center cursor-pointer btn-tactile-3d shadow-[2px_2px_0px_#000]"
                    >
                      <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
                    </a>
                  )}

                  {/* Live Demo link if available */}
                  {currentProject.liveUrl && currentProject.liveUrl !== '#' && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      title="Live Demo"
                      className="p-2.5 bg-[#10b981] hover:bg-emerald-600 text-white border-2 border-black rounded-lg transition-colors flex items-center justify-center cursor-pointer btn-tactile-3d shadow-[2px_2px_0px_#000]"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}

                  {/* Big Vibrant OPEN CASE STUDY Button */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onOpenCaseStudy(currentProject);
                    }}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#ffd31e] via-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] btn-tactile-3d text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>CASE STUDY</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------- 2. RÉSUMÉ CARD -------------------- */}
            {activeTab === 'resume' && (
              <div className="bg-white border-[3px] border-black rounded-xl p-4 sm:p-5 shadow-[5px_5px_0px_#000000] flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
                
                {/* Header with Download CV button */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <div>
                    <h3 className="font-black text-xl text-black leading-none uppercase">
                      CURRICULUM VITAE
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 mt-0.5 font-mono">
                      Pravin · Software Developer
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href="/assets/Pravin_Resume.pdf"
                      download="Pravin_Resume.pdf"
                      onClick={() => sound.playSuccess()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffd31e] hover:bg-[#ffde59] text-black font-black text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 animate-bounce" />
                      <span>DOWNLOAD CV</span>
                    </a>

                    <a
                      href="https://github.com/Pravin98651"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      title="GitHub"
                      className="p-1.5 bg-black hover:bg-gray-800 text-white rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d flex items-center justify-center"
                    >
                      <img src="/assets/icon-github.svg" alt="GitHub" className="w-3.5 h-3.5 invert" />
                    </a>
                  </div>
                </div>

                {/* Bio summary */}
                <p className="text-xs text-gray-700 font-medium my-3 leading-relaxed">
                  {resume.summary}
                </p>

                {/* Experience / Flagship Systems List */}
                <div className="space-y-2.5 my-1 max-h-52 overflow-y-auto pr-1">
                  {resume.experiences.map((exp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border-2 border-black bg-gradient-to-r from-gray-50 to-white shadow-[2px_2px_0px_#000]">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-black text-black">{exp.role}</span>
                        <span className="font-mono text-[10px] text-gray-600 font-bold bg-white px-1.5 py-0.5 rounded border border-gray-300">{exp.period}</span>
                      </div>
                      <div className="text-[11px] font-bold text-brand-orange mt-0.5 font-mono">
                        {exp.company}
                      </div>
                      <p className="text-[11px] text-gray-700 mt-1 leading-snug">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Categorized Skills Breakdown with Colorful Pills */}
                <div className="pt-2 border-t-2 border-dashed border-gray-300 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  <span className="text-[10px] font-mono font-black uppercase text-gray-600">
                    Core Technical Matrix
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {resume.skills.flatMap(s => s.items).slice(0, 16).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-blue-900 rounded-md border border-black text-[10px] font-mono font-bold shadow-[1px_1px_0px_#000]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 3. CONTACT CARD -------------------- */}
            {activeTab === 'contact' && (
              <div className="bg-white border-[3px] border-black rounded-xl p-4 sm:p-5 shadow-[5px_5px_0px_#000000] flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                    <div>
                      <h3 className="font-black text-xl text-black leading-none uppercase">
                        DISPATCH BEACON
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5 font-mono">
                        {contact.availability}
                      </p>
                    </div>

                    <span className="text-2xl animate-bounce">📡</span>
                  </div>

                  {/* Email Direct Card */}
                  <div className="my-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-black flex items-center justify-between gap-2 shadow-[2px_2px_0px_#000]">
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-gray-600 uppercase block font-black">
                        Direct Email Address
                      </span>
                      <span className="font-mono text-xs font-black text-black select-all">
                        {contact.email}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 bg-[#ffd31e] hover:bg-[#ffde59] text-black font-black text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 btn-tactile-3d cursor-pointer"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  {/* Quick Message Form */}
                  <form onSubmit={handleContactSubmit} className="space-y-2 mt-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-1.5 border-2 border-black rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3 py-1.5 border-2 border-black rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    />
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell me about your role or project scope..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-1.5 border-2 border-black rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-[#ff007f] to-[#e11d48] hover:from-rose-600 hover:to-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 btn-tactile-3d cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH MESSAGE</span>
                    </button>

                    {contactSent && (
                      <div className="p-2 bg-emerald-100 border-2 border-emerald-500 rounded-lg text-emerald-900 text-[11px] font-mono font-black text-center animate-in fade-in">
                        ✓ Note dispatched! Opening your default mail client.
                      </div>
                    )}
                  </form>
                </div>

                {/* Bottom links */}
                <div className="pt-2 border-t-2 border-gray-200 flex items-center justify-between text-[11px] font-mono text-gray-700">
                  <span className="font-bold">{contact.location}</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-black text-black underline hover:text-brand-orange"
                  >
                    Direct Mailto ↗
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </ThreeDTilt>
    </div>
  );
}
