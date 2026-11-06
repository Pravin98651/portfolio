import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { Download, ExternalLink, Star, ChevronLeft, ChevronRight, Mail, Check, Copy, Send, Sparkles, Globe, Eye } from 'lucide-react';
import { sound } from '../utils/soundEffects';

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
      
      {/* ================= POCKET TABS HEADER ================= */}
      <div className="relative flex items-end justify-between px-4 z-10 -mb-[2px]">
        {/* Tab 1: RÉSUMÉ (Yellow) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('resume');
          }}
          className={`relative group px-4 sm:px-6 py-2.5 font-black text-sm sm:text-base uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 ${
            activeTab === 'resume'
              ? 'bg-brand-yellow text-black -translate-y-2 shadow-[0px_-3px_0px_rgba(0,0,0,0.15)] z-20'
              : 'bg-[#ffde59] text-gray-800 hover:-translate-y-1 z-10'
          }`}
        >
          <span>RÉSUMÉ</span>
        </button>

        {/* Tab 2: PORTFOLIO (Blue) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('portfolio');
          }}
          className={`relative group px-4 sm:px-6 py-2.5 font-black text-sm sm:text-base uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 ${
            activeTab === 'portfolio'
              ? 'bg-brand-blue text-white -translate-y-2 shadow-[0px_-3px_0px_rgba(0,0,0,0.15)] z-20'
              : 'bg-[#3b5beb] text-white/90 hover:-translate-y-1 z-10'
          }`}
        >
          <span>PROJECTS</span>
          <span className="block text-[9px] font-mono tracking-widest text-brand-yellow -mt-0.5">
            CHOOSE ({currentProjectIndex + 1}/{projects.length})
          </span>
        </button>

        {/* Tab 3: CONTACT (Red) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('contact');
          }}
          className={`relative group px-4 sm:px-6 py-2.5 font-black text-sm sm:text-base uppercase tracking-wider rounded-t-xl border-[3px] border-b-0 border-black transition-all duration-200 ${
            activeTab === 'contact'
              ? 'bg-brand-red text-white -translate-y-2 shadow-[0px_-3px_0px_rgba(0,0,0,0.15)] z-20'
              : 'bg-[#c91823] text-white/90 hover:-translate-y-1 z-10'
          }`}
        >
          <span>CONTACT</span>
        </button>
      </div>

      {/* ================= BACKPACK POCKET POUCH CONTAINER ================= */}
      <div className="relative w-full rounded-2xl border-[3px] border-black bg-pocket-red shadow-[10px_10px_0px_#000000] overflow-hidden">
        
        {/* Dashed Sewing Stitches around Pocket Border */}
        <div className="absolute inset-2 border-2 border-dashed border-red-300/40 rounded-xl pointer-events-none z-10" />

        {/* Peeking Background Creative Studio Illustration */}
        <div className="relative w-full h-28 sm:h-32 bg-[#422c54] border-b-[3px] border-black overflow-hidden flex items-center justify-center">
          <img
            src="/assets/behinder.png"
            alt="Creative Studio Backdrop"
            className="w-full h-full object-cover object-center pointer-events-none opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ================= CARD PULL-OUT CONTENT ================= */}
        <div className="p-4 sm:p-6 z-20 relative min-h-[410px] flex flex-col justify-between">
          
          {/* -------------------- 1. PORTFOLIO / PROJECTS CARD -------------------- */}
          {activeTab === 'portfolio' && (
            <div className="bg-white border-[3px] border-black rounded-xl p-4 sm:p-5 shadow-[5px_5px_0px_#000000] flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
              
              {/* Top Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Project Brand Mark */}
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

                {/* Country/Category Pill */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-black rounded-md text-xs font-bold text-gray-800 flex-shrink-0">
                  <span>{currentProject.flag}</span>
                  <span className="hidden sm:inline">{currentProject.country}</span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-gray-700 font-medium my-2.5 leading-snug">
                {currentProject.summary}
              </p>

              {/* Rating & Tags Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-y border-dashed border-gray-300 text-xs">
                {/* Rating */}
                <div className="flex items-center gap-1 font-bold text-gray-800">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
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
              <div className="my-2.5 space-y-1.5">
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
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
                    {currentProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setActiveImageIndex(idx);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-all ${
                          activeImageIndex === idx
                            ? 'bg-brand-yellow text-black border-black shadow-sm font-extrabold'
                            : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        Screen {idx + 1}
                      </button>
                    ))}
                    <span className="text-[10px] font-mono text-gray-400 ml-auto">
                      {currentProject.imageCaptions ? currentProject.imageCaptions[activeImageIndex]?.slice(0, 24) + '...' : ''}
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
                      className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all whitespace-nowrap ${
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
                    className="p-2.5 bg-gray-100 hover:bg-black hover:text-white border-2 border-black rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextProject}
                    title="Next Project"
                    className="p-2.5 bg-gray-100 hover:bg-black hover:text-white border-2 border-black rounded-lg transition-colors"
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
                    className="p-2.5 bg-black hover:bg-gray-800 text-white border-2 border-black rounded-lg transition-colors flex items-center justify-center"
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
                    className="p-2.5 bg-[#10b981] hover:bg-emerald-600 text-white border-2 border-black rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}

                {/* Big Yellow OPEN CASE STUDY Button */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenCaseStudy(currentProject);
                  }}
                  className="flex-1 py-2.5 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
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
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-brand-yellow hover:bg-[#ffde59] text-black font-extrabold text-[11px] uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
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
                {resume.experiences.map((exp, idx) => (
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
                <div className="text-[10px] font-mono font-bold uppercase text-gray-500">
                  Grouped Technical Capabilities:
                </div>
                {resume.skills.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-brand-orange uppercase">
                      {group.category}:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[9px] font-bold">
                      {group.items.map((item, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 bg-gray-100 rounded border border-gray-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------- 3. CONTACT CARD -------------------- */}
          {activeTab === 'contact' && (
            <div className="bg-[#fffdf2] border-[3px] border-black rounded-xl p-4 sm:p-5 shadow-[5px_5px_0px_#000000] flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 relative">
              
              {/* Postage Stamp Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-brand-red text-white rounded-md flex items-center justify-center font-bold text-xs border border-black">
                    ✉
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-black leading-none uppercase">
                      {contact.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-green-700 flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
                      {contact.availability}
                    </p>
                  </div>
                </div>

                {/* Email Direct Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-black hover:text-white text-black font-mono text-xs font-bold rounded-md border-2 border-black shadow-[1px_1px_0px_#000] transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED!' : 'COPY EMAIL'}</span>
                </button>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-gray-700 font-medium my-2.5 leading-snug">
                {contact.subtitle}
              </p>

              {/* Direct Links Bar */}
              <div className="grid grid-cols-2 gap-2 my-1">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-center gap-2 py-2 bg-black text-white text-xs font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-gray-800 transition-colors"
                >
                  <img src="/assets/icon-github.svg" alt="GitHub" className="w-3.5 h-3.5 invert" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href="https://kidtube-dun.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-center gap-2 py-2 bg-brand-blue text-white text-xs font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-blue-700 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>KidTube Live</span>
                </a>
              </div>

              {/* Quick Interactive Contact Form */}
              <form onSubmit={handleContactSubmit} className="space-y-2 my-1">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs font-medium bg-white border-2 border-black rounded-md focus:ring-2 focus:ring-brand-yellow outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs font-medium bg-white border-2 border-black rounded-md focus:ring-2 focus:ring-brand-yellow outline-none"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Share details about your role, product, or idea..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-medium bg-white border-2 border-black rounded-md focus:ring-2 focus:ring-brand-yellow outline-none resize-none"
                />

                <button
                  type="submit"
                  disabled={contactSent}
                  className="w-full py-2 bg-brand-red hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  {contactSent ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>MESSAGE SENT!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>

              {/* Direct channels */}
              <div className="mt-1 pt-2 border-t border-dashed border-gray-300 flex items-center justify-between text-[11px] font-mono text-gray-600">
                <span>{contact.email}</span>
                <span>{contact.location}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
