import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../portfolioData';
import { Download, ExternalLink, Star, ChevronLeft, ChevronRight, Mail, Check, Copy, Send, Sparkles, Globe, Eye, Activity, Cpu } from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { getProjectUrl } from '../utils/projectRoutes';

export default function BackpackPocket({
  activeTab,
  onSelectTab,
  onOpenCaseStudy,
  onNavigateToProject,
  currentProjectIndex,
  onSelectProjectIndex
}) {
  const { projects, resume, contact } = portfolioData;
  const currentProject = projects[currentProjectIndex] || projects[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const chipRefs = useRef({});
  const thumbRefs = useRef({});

  const isFirstMount = useRef(true);

  // Auto-scroll the active project chip horizontally into view in Backpack (skip on first mount)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const el = chipRefs.current[currentProjectIndex];
    if (el && el.parentElement) {
      const container = el.parentElement;
      const targetLeft = el.offsetLeft - (container.clientWidth / 2) + (el.clientWidth / 2);
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }, [currentProjectIndex]);

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
      
      {/* ================= PHYSICAL FOLDER TABS ================= */}
      <div className="relative flex items-end justify-between px-2 sm:px-3 z-10 -mb-[2px] font-mono">
        {/* Tab 1: RÉSUMÉ */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('resume');
          }}
          className={`relative group px-3.5 sm:px-5 py-2 font-black text-xs sm:text-sm uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 cursor-pointer ${
            activeTab === 'resume'
              ? 'bg-[#ffd31e] text-black -translate-y-2 shadow-[0px_-3px_0px_rgba(0,0,0,0.2)] z-20'
              : 'bg-[#feee91] text-gray-900 hover:-translate-y-1 z-10'
          }`}
        >
          <span>📁 01. RÉSUMÉ</span>
        </button>

        {/* Tab 2: SYSTEMS / CASE STUDIES */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('portfolio');
          }}
          className={`relative group px-3.5 sm:px-5 py-2 font-black text-xs sm:text-sm uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 cursor-pointer ${
            activeTab === 'portfolio'
              ? 'bg-[#f36b16] text-white -translate-y-2 shadow-[0px_-3px_0px_rgba(0,0,0,0.2)] z-20'
              : 'bg-[#ea580c] text-white/90 hover:-translate-y-1 z-10'
          }`}
        >
          <span>⚡ 02. CASE STUDIES ({currentProjectIndex + 1}/{projects.length})</span>
        </button>

        {/* Tab 3: DISPATCH */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('contact');
          }}
          className={`relative group px-3.5 sm:px-5 py-2 font-black text-xs sm:text-sm uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-[#d3222a] text-white -translate-y-2 shadow-[0px_-3px_0px_rgba(0,0,0,0.2)] z-20'
              : 'bg-[#b91c1c] text-white/90 hover:-translate-y-1 z-10'
          }`}
        >
          <span>✉️ 03. DISPATCH</span>
        </button>
      </div>

      {/* ================= PHYSICAL FOLDER CHASSIS ================= */}
      <div className="relative w-full rounded-2xl border-[3.5px] border-black manila-card shadow-[10px_10px_0px_#000000] overflow-hidden">
        
        {/* Brass Corner Staples */}
        <div className="brass-staple top-3 left-3 rotate-[-45deg]" />
        <div className="brass-staple top-3 right-3 rotate-[45deg]" />

        {/* Top Caution Striping Trim */}
        <div className="w-full h-2.5 bg-caution-stripes-sm border-b-2 border-black" />

        {/* Folder Meta Header (Editorial Case File Identity) */}
        <div className="px-4 py-2.5 bg-amber-50 border-b-2 border-black flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-1.5 font-black text-black uppercase">
            <Cpu className="w-3.5 h-3.5 text-brand-orange" />
            <span>PRAVIN G // ENGINEERING CASE FILE</span>
          </div>
          <span className="px-2 py-0.5 bg-brand-yellow text-black border border-black rounded text-[9.5px] font-black uppercase">
            VERIFIED BUILD
          </span>
        </div>

        {/* ================= CARD PULL-OUT CONTENT ================= */}
        <div className="p-4 sm:p-5 z-20 relative min-h-[410px] flex flex-col justify-between">
          
          {/* -------------------- 1. PORTFOLIO / SYSTEMS CARD -------------------- */}
          {activeTab === 'portfolio' && (
            <div className="bg-white border-[3px] border-black rounded-xl p-4 sm:p-5 shadow-[5px_5px_0px_#000000] flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
              
              {/* Top Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black text-brand-yellow flex items-center justify-center font-black text-xs tracking-tighter border-2 border-black">
                    {currentProject.title.slice(0, 4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-xl text-black leading-none uppercase">
                        {currentProject.title}
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-200 border border-black rounded font-bold">
                        {currentProjectIndex + 1}/{projects.length}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 mt-0.5 line-clamp-1">
                      {currentProject.subtitle}
                    </p>
                  </div>
                </div>

                {/* Country Flag Badge */}
                <div className="flex items-center gap-1 px-2 py-0.5 border border-black rounded bg-gray-100 text-xs font-mono font-bold">
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
                  <span>{currentProject.rating} · {currentProject.ratingSource}</span>
                </div>

                {/* Tag Badges */}
                <div className="flex items-center gap-1.5 font-bold text-[10px] flex-wrap">
                  {currentProject.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded border border-black uppercase ${
                        tag.includes('AI') || tag.includes('NEXT') || tag.includes('FULL')
                          ? 'bg-[#92f080] text-black font-extrabold'
                          : 'bg-white text-gray-800'
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
                  className="relative w-full h-32 sm:h-36 rounded-lg border-2 border-black overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                >
                  <img
                    src={currentProject.images[activeImageIndex] || currentProject.images[0]}
                    alt={currentProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-[1px]">
                    <Eye className="w-4 h-4" />
                    <span>Expand Case Study</span>
                  </div>
                </div>

                {/* Screen Switcher thumbnails */}
                {currentProject.images.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar scroll-smooth">
                    {currentProject.images.map((img, idx) => {
                      const isArch = img.includes('arch');
                      return (
                        <button
                          key={idx}
                          ref={(el) => (thumbRefs.current[idx] = el)}
                          type="button"
                          onClick={(e) => {
                            sound.playClick();
                            setActiveImageIndex(idx);
                            if (e.currentTarget) {
                              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                            }
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-all ${
                            activeImageIndex === idx
                              ? 'bg-brand-yellow text-black border-black shadow-sm font-extrabold'
                              : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {isArch ? '📐 Architecture' : `Screen ${idx + 1}`}
                        </button>
                      );
                    })}
                    <span className="text-[10px] font-mono text-gray-400 ml-auto truncate max-w-[140px]">
                      {currentProject.imageCaptions ? currentProject.imageCaptions[activeImageIndex] : ''}
                    </span>
                  </div>
                )}

                {/* Project Selector Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-gray-100 no-scrollbar scroll-smooth">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      ref={(el) => (chipRefs.current[idx] = el)}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveImageIndex(0);
                        onSelectProjectIndex(idx);
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer ${
                        currentProjectIndex === idx
                          ? 'bg-black text-white border-black shadow-[1px_1px_0px_#000]'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
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
                    className="p-2.5 bg-gray-100 hover:bg-black hover:text-white border-2 border-black rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextProject}
                    title="Next Project"
                    className="p-2.5 bg-gray-100 hover:bg-black hover:text-white border-2 border-black rounded-lg transition-colors cursor-pointer"
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
                    className="p-2.5 bg-black hover:bg-gray-800 text-white border-2 border-black rounded-lg transition-colors flex items-center justify-center cursor-pointer"
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
                    className="p-2.5 bg-[#10b981] hover:bg-emerald-600 text-white border-2 border-black rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}

                {/* Big Yellow OPEN CASE STUDY Button */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    if (onNavigateToProject) {
                      onNavigateToProject(getProjectUrl(currentProject.id));
                    } else {
                      onOpenCaseStudy(currentProject);
                    }
                  }}
                  className="flex-1 py-2.5 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>EXPLORE FULL SPECIFICATION</span>
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
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-brand-yellow hover:bg-[#ffde59] text-black font-extrabold text-[11px] uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD CV</span>
                  </a>

                  <a
                    href="https://github.com/Pravin98651"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    title="GitHub"
                    className="p-1.5 bg-black hover:bg-gray-800 text-white rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center"
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
                {(resume?.experiences || []).map((exp, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-black/80 bg-gray-50">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-bold text-black">{exp.role}</span>
                      <span className="font-mono text-[10px] text-gray-500">{exp.period}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-brand-orange mt-0.5 font-mono">
                      {exp.company}
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Categorized Skills Breakdown */}
              <div className="pt-2 border-t border-dashed border-gray-300 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                <span className="text-[10px] font-mono font-bold uppercase text-gray-500">
                  Technical Matrix
                </span>
                <div className="flex flex-wrap gap-1">
                  {(resume?.skills || []).flatMap(s => s.items).slice(0, 16).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300 text-[10px] font-mono text-gray-800"
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

                  <span className="text-2xl">📡</span>
                </div>

                {/* Email Direct Card */}
                <div className="my-3 p-3 bg-gray-50 rounded-lg border-2 border-black flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                      Direct Email
                    </span>
                    <span className="font-mono text-xs font-bold text-black select-all">
                      {contact.email}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 bg-brand-yellow hover:bg-[#ffde59] text-black font-extrabold text-xs uppercase tracking-wider rounded border border-black shadow-[1px_1px_0px_#000] flex items-center gap-1 transition-all cursor-pointer"
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
                    className="w-full py-2 bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND MESSAGE VIA CLIENT</span>
                  </button>

                  {contactSent && (
                    <div className="p-2 bg-emerald-100 border border-emerald-400 rounded text-emerald-800 text-[11px] font-mono font-bold text-center animate-in fade-in">
                      ✓ Note dispatched! Opening mail client.
                    </div>
                  )}
                </form>
              </div>

              {/* Bottom links */}
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] font-mono text-gray-600">
                <span>{contact.location}</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-bold text-black underline hover:text-brand-orange"
                >
                  Direct Mailto ↗
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
