import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Database, 
  Share2, 
  ShieldCheck, 
  Globe, 
  Maximize2, 
  X,
  Volume2,
  VolumeX,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { getAdjacentProjects, ALL_PROJECT_ROUTES } from '../utils/projectRoutes';

export default function ProjectDetailPage({ 
  project, 
  onBack, 
  onNavigate,
  isMuted,
  onToggleMute
}) {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef(null);

  const stepPillRefs = useRef({});
  const navTabRefs = useRef({});
  const imageThumbRefs = useRef({});
  const workflowStageRef = useRef(null);

  const adjacent = getAdjacentProjects(project.id);
  const cloneCommand = project.githubUrl && project.githubUrl !== '#' ? `git clone ${project.githubUrl}.git` : '';

  // Auto-scroll the active workflow step pill horizontally into view
  useEffect(() => {
    const el = stepPillRefs.current[activeWorkflowStep];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [activeWorkflowStep]);

  // Auto-scroll the active nav tab in sticky bar horizontally into view
  useEffect(() => {
    const el = navTabRefs.current[activeTab];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [activeTab]);

  // Auto-scroll image thumbnail into view
  useEffect(() => {
    const el = imageThumbRefs.current[selectedImageIndex];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [selectedImageIndex]);

  // Calculate reading progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setReadingProgress(pct);
      setShowScrollTop(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          sound.playClick();
          onBack();
        }
      } else if (e.key === 'ArrowRight' && !isLightboxOpen && e.altKey) {
        if (adjacent.next) {
          sound.playFlip();
          onNavigate(adjacent.next.canonicalUrl);
        }
      } else if (e.key === 'ArrowLeft' && !isLightboxOpen && e.altKey) {
        if (adjacent.prev) {
          sound.playFlip();
          onNavigate(adjacent.prev.canonicalUrl);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, onNavigate, adjacent, isLightboxOpen]);

  const handleCopyClone = () => {
    if (!cloneCommand) return;
    sound.playSuccess();
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2200);
  };

  const handleCopyShare = () => {
    sound.playSuccess();
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  const toggleFaq = (index) => {
    sound.playClick();
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  const scrollToTab = (tabId) => {
    sound.playClick();
    setActiveTab(tabId);
    const elem = document.getElementById(`section-${tabId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentImage = project.images?.[selectedImageIndex] || project.cover;
  const currentImageCaption = project.imageCaptions?.[selectedImageIndex] || '';

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'workflow', label: 'Workflow Pipeline', icon: '⚡' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'stack', label: 'Tech Stack', icon: '⚙️' },
    { id: 'features', label: 'Key Features', icon: '🎯' },
    { id: 'decisions', label: 'Decisions & Tradeoffs', icon: '⚖️' },
    { id: 'faq', label: 'Interview Q&A', icon: '🎙️' },
    { id: 'contributions', label: 'Attribution', icon: '🎓' }
  ];

  return (
    <div className="min-h-screen w-full bg-orange-ribbed text-black flex flex-col justify-between overflow-x-hidden selection:bg-brand-yellow selection:text-black">
      
      {/* Top Global Reading Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-emerald-400 z-50 transition-all duration-75 shadow-[0_0_12px_rgba(243,103,14,0.9)]"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Ambient Atmospheric Glow Mesh */}
      <div className="ambient-glow-mesh" aria-hidden="true">
        <div className="glow-orb-top" />
        <div className="glow-orb-left" />
        <div className="glow-orb-right" />
      </div>

      {/* ================= TOP FLOATING NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 flex items-center justify-between select-none bg-white/95 backdrop-blur-md border-b-[3px] border-black shadow-[0_3px_0px_#000]">
        
        {/* Left: Back Button & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-yellow hover:bg-[#ffde59] text-black rounded-full border-2 border-black font-mono text-xs font-black shadow-[2px_2px_0px_#000] hover:scale-105 transition-all cursor-pointer"
            title="Return to Main Portfolio Dossier (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PORTFOLIO</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-700">
            <span className="hidden md:inline">PRAVIN G</span>
            <span className="hidden md:inline text-gray-400">/</span>
            <span className="bg-brand-yellow text-black px-2 py-0.5 border border-black rounded text-xs font-black uppercase tracking-tight shadow-[1px_1px_0px_#000] truncate max-w-[160px] sm:max-w-[280px]">
              {project.title}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
          </div>
        </div>

        {/* Center: Project Switcher Quick-Menu */}
        <div className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-full border-2 border-black font-mono text-[11px] font-bold shadow-[2px_2px_0px_#000]">
          {ALL_PROJECT_ROUTES.slice(0, 5).map((route) => {
            const isCurrent = route.slug === project.slug || route.id === project.id;
            return (
              <button
                key={route.slug}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigate(`/${route.slug}`);
                }}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-brand-yellow text-black font-black border border-black shadow-[1px_1px_0px_#000]'
                    : 'text-gray-800 hover:text-black hover:bg-yellow-50'
                }`}
              >
                {route.title}
              </button>
            );
          })}
        </div>

        {/* Right: Actions (GitHub, Live, Share, Mute) */}
        <div className="flex items-center gap-2">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full border-2 border-black font-mono text-xs font-black shadow-[2px_2px_0px_#000] hover:scale-105 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              title="View Public Source Code on GitHub"
              className="p-2 bg-black hover:bg-gray-800 text-white rounded-full border-2 border-black shadow-[2px_2px_0px_#ffd31e] transition-all hover:scale-105"
            >
              <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
            </a>
          )}

          <button
            type="button"
            onClick={handleCopyShare}
            title="Copy Direct Link to this Project Case Study"
            className="p-2 bg-white hover:bg-yellow-100 text-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000] hover:scale-105 transition-all cursor-pointer"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>

          {onToggleMute && (
            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? 'Tactile Audio Muted - Click to Unmute' : 'Tactile Audio Active - Click to Mute'}
              className="p-2 bg-white hover:bg-yellow-100 text-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000] hover:scale-105 transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 w-full space-y-10">
        
        {/* ================= 1. HERO SHOWCASE CARD (TACTILE MANILA DOSSIER) ================= */}
        <section className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_#000000] select-none transition-all">
          
          {/* Four Corner Screws */}
          <div className="absolute top-3.5 left-3.5 plaque-screw" />
          <div className="absolute top-3.5 right-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

          {/* Top Hazard Caution Stripe Trim */}
          <div className="w-full h-3 bg-caution-stripes-sm rounded-full border border-black mb-5 shadow-xs" />

          {/* Top Status Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-brand-yellow text-black border-2 border-black rounded-full text-xs font-mono font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                ⚡ {project.category}
              </span>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 border-2 border-black rounded-full text-[11px] font-mono font-bold shadow-[1px_1px_0px_#000]">
                ✓ VERIFIED SYSTEM ARCHITECTURE
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-800">
              <span className="px-2.5 py-1 bg-white text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_#000]">
                ROLE: {project.role || "Primary Developer"}
              </span>
              <span className="px-2.5 py-1 bg-white text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_#000]">
                {project.timeline || "Verified"}
              </span>
            </div>
          </div>

          {/* Giant Title & Highlight */}
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight leading-[0.95]">
              <span className="bg-brand-yellow text-black px-3.5 py-1 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] inline-block">
                {project.title}
              </span>
            </h1>
            <p className="text-sm sm:text-lg font-bold text-brand-orange-dark font-mono mt-3">
              // {project.subtitle}
            </p>
            <p className="text-sm sm:text-base text-gray-900 font-medium leading-relaxed max-w-4xl pt-1">
              {project.summary}
            </p>
          </div>

          {/* 4 Verified Telemetry Specs Counter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {project.stats.map((st, i) => (
              <div 
                key={i} 
                className="p-3.5 bg-white border-2 border-black rounded-xl text-center shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 transition-all"
              >
                <div className="font-mono text-[10px] text-gray-600 uppercase font-black tracking-wider truncate">
                  {st.label}
                </div>
                <div className="font-black text-sm sm:text-xl text-black truncate mt-1">
                  {st.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-6">
            {(project.tags || []).map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-white text-black border-2 border-black rounded-md text-[11px] font-mono font-black uppercase shadow-[2px_2px_0px_#000]"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* CLI Terminal Clone Command & Action Buttons */}
          <div className="pt-5 border-t-2 border-dashed border-gray-400 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Terminal Clone Input */}
            {cloneCommand && (
              <div className="flex-1 flex items-center bg-[#0d0f17] rounded-xl border-2 border-black p-1.5 shadow-[3px_3px_0px_#000]">
                <div className="px-2 text-emerald-400 font-mono text-xs font-black select-none">
                  $
                </div>
                <code className="flex-1 font-mono text-xs text-yellow-300 font-bold truncate select-all px-1">
                  {cloneCommand}
                </code>
                <button
                  type="button"
                  onClick={handleCopyClone}
                  className="px-3 py-1.5 bg-brand-yellow hover:bg-yellow-400 text-black rounded-lg font-mono text-xs font-black uppercase flex items-center gap-1 border border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                >
                  {copiedClone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedClone ? 'COPIED' : 'CLONE'}</span>
                </button>
              </div>
            )}

            {/* Live Demo & Repo Links */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl border-2 border-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[3px_3px_0px_#000] hover:scale-105 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>VISIT LIVE DEMO</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-xl border-2 border-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[3px_3px_0px_#ffd31e] hover:scale-105 transition-all"
                >
                  <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
                  <span>VIEW REPO</span>
                </a>
              )}
            </div>

          </div>

          {/* Mechanical Partition Bottom Telemetry */}
          <div className="mt-5 pt-3 border-t-2 border-dashed border-gray-400 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-gray-700 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM DOSSIER: VERIFIED & BENCHMARKED
            </span>
            <span className="font-bold">PRAVIN · APPLIED AI</span>
          </div>
        </section>

        {/* ================= 2. INTERACTIVE ARCHITECTURE & MEDIA SHOWCASE ================= */}
        {project.images && project.images.length > 0 && (
          <section className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] select-none">
            
            {/* Screws */}
            <div className="absolute top-3.5 left-3.5 plaque-screw" />
            <div className="absolute top-3.5 right-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

            <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-brand-yellow border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
                  📐
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-black uppercase tracking-tight">
                  System Architecture & Visual Specifications
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsLightboxOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-yellow hover:bg-yellow-400 text-black rounded-xl border-2 border-black font-mono text-xs font-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                title="Fullscreen Image Lightbox"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">FULLSCREEN</span>
              </button>
            </div>

            {/* Clean White Main Screen Viewer */}
            <div 
              className="relative w-full rounded-2xl border-[3px] border-black overflow-hidden bg-white flex items-center justify-center min-h-[300px] sm:min-h-[460px] cursor-pointer group shadow-[4px_4px_0px_#000]"
              onClick={() => {
                sound.playClick();
                setIsLightboxOpen(true);
              }}
            >
              <img
                src={currentImage}
                alt={currentImageCaption || project.title}
                className="w-full h-auto max-h-[560px] object-contain group-hover:scale-[1.01] transition-transform duration-300"
              />

              {/* Hover Zoom Prompt */}
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/85 text-brand-yellow border border-black rounded-lg font-mono text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
                <Maximize2 className="w-3 h-3" />
                <span>CLICK TO ENLARGE</span>
              </div>
            </div>

            {/* Screenshot Caption */}
            {currentImageCaption && (
              <div className="mt-4 p-3.5 bg-white border-2 border-black rounded-xl flex items-center justify-between text-xs font-mono font-bold text-gray-900 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                  <span className="font-black">FIGURE {selectedImageIndex + 1}: {currentImageCaption}</span>
                </div>
                <span className="text-gray-600 text-[10px] font-extrabold uppercase bg-gray-100 px-2 py-0.5 rounded border border-black">
                  VERIFIED ASSET
                </span>
              </div>
            )}

            {/* Interactive Screen Switcher Tabs */}
            {project.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pt-1 scroll-smooth">
                {project.images.map((img, i) => {
                  const isArch = img.includes('arch');
                  const label = isArch 
                    ? '📐 System Architecture' 
                    : i === 0 
                      ? '🖥️ Primary UI Console' 
                      : `📱 Screen ${i + 1}`;

                  return (
                    <button
                      key={i}
                      ref={(el) => (imageThumbRefs.current[i] = el)}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedImageIndex(i);
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border-2 transition-all whitespace-nowrap cursor-pointer ${
                        selectedImageIndex === i
                          ? 'bg-brand-yellow text-black border-black shadow-[3px_3px_0px_#000] font-black scale-102'
                          : 'bg-white text-gray-800 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-50'
                      }`}
                    >
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            )}

          </section>
        )}

        {/* ================= 3. STICKY SUB-NAV TAB BAR ================= */}
        <div className="sticky top-[60px] z-30 flex items-center gap-1.5 p-2 bg-white/95 backdrop-blur-md rounded-2xl border-[3px] border-black shadow-[5px_5px_0px_#000] overflow-x-auto no-scrollbar select-none scroll-smooth">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (navTabRefs.current[tab.id] = el)}
              type="button"
              onClick={() => scrollToTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-yellow text-black border-2 border-black font-black shadow-[2px_2px_0px_#000]'
                  : 'text-black hover:bg-yellow-100 font-bold'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ================= 4. OVERVIEW SECTION (PROBLEM & SOLUTION) ================= */}
        <section id="section-overview" className="space-y-6 scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Problem Statement */}
            <div className="relative bg-[#fff5f5] border-[3.5px] border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-2 text-brand-red mb-3">
                <AlertTriangle className="w-5 h-5 fill-current" />
                <h3 className="font-mono font-black text-xs uppercase tracking-wider text-black bg-red-100 px-2 py-0.5 rounded border border-black shadow-xs">
                  01 // The Engineering Challenge
                </h3>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-black uppercase mb-3">
                Problem Definition
              </h4>
              <p className="text-sm text-gray-900 leading-relaxed font-semibold">
                {project.caseStudy?.problem || project.summary}
              </p>
            </div>

            {/* The Architectural Solution */}
            <div className="relative bg-[#f0fdf4] border-[3.5px] border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-2 text-emerald-700 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-mono font-black text-xs uppercase tracking-wider text-black bg-emerald-100 px-2 py-0.5 rounded border border-black shadow-xs">
                  02 // The Architectural Solution
                </h3>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-black uppercase mb-3">
                Implemented Strategy
              </h4>
              <p className="text-sm text-gray-900 leading-relaxed font-semibold">
                {project.caseStudy?.solution || project.tagline}
              </p>
            </div>

          </div>
        </section>

        {/* ================= 5. INTERACTIVE WORKFLOW PIPELINE ================= */}
        {project.caseStudy?.workflowSteps && project.caseStudy.workflowSteps.length > 0 && (
          <section id="section-workflow" className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] space-y-6 scroll-mt-28 select-none">
            
            {/* Screws */}
            <div className="absolute top-3.5 left-3.5 plaque-screw" />
            <div className="absolute top-3.5 right-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-brand-yellow border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
                    ⚡
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                    Execution Workflow Pipeline
                  </h3>
                </div>
                <p className="text-xs font-mono font-bold text-gray-600 mt-1">
                  // {project.caseStudy.workflowSteps.length} Verified Sequential Stages
                </p>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playFlip();
                    setActiveWorkflowStep(prev => Math.max(0, prev - 1));
                    workflowStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  disabled={activeWorkflowStep === 0}
                  className="px-3.5 py-1.5 bg-white hover:bg-gray-100 disabled:opacity-40 border-2 border-black rounded-xl font-mono text-xs font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                >
                  ← PREV STEP
                </button>
                <span className="font-mono text-xs font-black px-2 bg-brand-yellow border-2 border-black rounded-lg py-1 shadow-[2px_2px_0px_#000]">
                  {activeWorkflowStep + 1} / {project.caseStudy.workflowSteps.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playFlip();
                    setActiveWorkflowStep(prev => Math.min(project.caseStudy.workflowSteps.length - 1, prev + 1));
                    workflowStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  disabled={activeWorkflowStep === project.caseStudy.workflowSteps.length - 1}
                  className="px-3.5 py-1.5 bg-brand-yellow hover:bg-yellow-400 text-black disabled:opacity-40 border-2 border-black rounded-xl font-mono text-xs font-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                >
                  NEXT STEP →
                </button>
              </div>
            </div>

            {/* Step Selector Horizontal Ribbon */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
              {project.caseStudy.workflowSteps.map((st, idx) => {
                const isActive = activeWorkflowStep === idx;
                return (
                  <button
                    key={idx}
                    ref={(el) => (stepPillRefs.current[idx] = el)}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveWorkflowStep(idx);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 font-mono text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-black text-brand-yellow border-black shadow-[3px_3px_0px_#ffd31e] scale-102 font-black'
                        : 'bg-white text-gray-800 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-50'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] ${
                      isActive ? 'bg-brand-yellow text-black' : 'bg-gray-200 text-black'
                    }`}>
                      {st.step || idx + 1}
                    </span>
                    <span>{st.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Feature Box */}
            {project.caseStudy.workflowSteps[activeWorkflowStep] && (
              <div 
                ref={workflowStageRef}
                className="p-6 bg-[#fffbeb] border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#000] space-y-3 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold uppercase px-2.5 py-1 bg-black text-brand-yellow rounded border border-black shadow-xs">
                    STAGE 0{project.caseStudy.workflowSteps[activeWorkflowStep].step || activeWorkflowStep + 1} IN DETAIL
                  </span>
                  <span className="font-mono text-xs text-gray-700 font-bold">
                    // EXECUTION PROTOCOL
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-black uppercase">
                  {project.caseStudy.workflowSteps[activeWorkflowStep].title}
                </h4>
                <p className="text-sm sm:text-base text-gray-900 font-medium leading-relaxed">
                  {project.caseStudy.workflowSteps[activeWorkflowStep].desc}
                </p>
              </div>
            )}

          </section>
        )}

        {/* ================= 6. TECH STACK & ARCHITECTURE TABLE ================= */}
        {project.caseStudy?.techStackTable && project.caseStudy.techStackTable.length > 0 && (
          <section id="section-stack" className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] space-y-5 scroll-mt-28 select-none">
            
            {/* Screws */}
            <div className="absolute top-3.5 left-3.5 plaque-screw" />
            <div className="absolute top-3.5 right-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

            <div className="flex items-center gap-2 pb-3 border-b-2 border-black">
              <span className="p-1.5 bg-emerald-400 border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
                ⚙️
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                Technical Stack & Component Breakdown
              </h3>
            </div>

            <div className="overflow-x-auto border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black text-brand-yellow border-b-2 border-black font-black uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 sm:p-4">Subsystem / Component</th>
                    <th className="p-3.5 sm:p-4">Technologies & Libraries</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/10 font-medium">
                  {project.caseStudy.techStackTable.map((row, rIdx) => (
                    <tr 
                      key={rIdx} 
                      className={rIdx % 2 === 0 ? 'bg-white' : 'bg-yellow-50/50'}
                    >
                      <td className="p-3.5 sm:p-4 font-black text-black">
                        {row.component}
                      </td>
                      <td className="p-3.5 sm:p-4 text-brand-orange-dark font-black">
                        {row.tech}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </section>
        )}

        {/* ================= 7. KEY FEATURES GRID ================= */}
        {project.caseStudy?.keyFeatures && project.caseStudy.keyFeatures.length > 0 && (
          <section id="section-features" className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] space-y-5 scroll-mt-28 select-none">
            
            {/* Screws */}
            <div className="absolute top-3.5 left-3.5 plaque-screw" />
            <div className="absolute top-3.5 right-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

            <div className="flex items-center gap-2 pb-3 border-b-2 border-black">
              <span className="p-1.5 bg-brand-yellow border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
                🎯
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                Key Engineering Features & Capabilities
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {project.caseStudy.keyFeatures.map((feat, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 border border-black shadow-xs">
                    ✓
                  </div>
                  <div className="text-xs sm:text-sm text-gray-900 font-bold leading-relaxed">
                    {feat}
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ================= 8. ARCHITECTURAL DECISIONS & TRADEOFFS ================= */}
        {project.caseStudy?.engineeringDecisions && project.caseStudy.engineeringDecisions.length > 0 && (
          <section id="section-decisions" className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] space-y-5 scroll-mt-28 select-none">
            
            {/* Screws */}
            <div className="absolute top-3.5 left-3.5 plaque-screw" />
            <div className="absolute top-3.5 right-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

            <div className="flex items-center gap-2 pb-3 border-b-2 border-black">
              <span className="p-1.5 bg-brand-yellow border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
                ⚖️
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                Architectural Tradeoffs & Engineering Decisions
              </h3>
            </div>

            <div className="space-y-3">
              {project.caseStudy.engineeringDecisions.map((dec, dIdx) => (
                <div 
                  key={dIdx} 
                  className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] flex items-start gap-3"
                >
                  <span className="font-mono font-black text-xs px-2.5 py-0.5 bg-black text-brand-yellow rounded border border-black shadow-xs flex-shrink-0 mt-0.5">
                    DECISION {dIdx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-900 font-medium leading-relaxed">
                    {dec}
                  </p>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ================= 9. DATA SCHEMAS & ENTITIES ================= */}
        {project.caseStudy?.dataEntities && project.caseStudy.dataEntities.length > 0 && (
          <section id="section-architecture" className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] space-y-5 scroll-mt-28 select-none">
            
            {/* Screws */}
            <div className="absolute top-3.5 left-3.5 plaque-screw" />
            <div className="absolute top-3.5 right-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

            <div className="flex items-center gap-2 pb-3 border-b-2 border-black">
              <span className="p-1.5 bg-brand-yellow border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
                💾
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                Data Entities & Schema Models
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.caseStudy.dataEntities.map((ent, eIdx) => (
                <div 
                  key={eIdx}
                  className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]"
                >
                  <div className="font-mono text-xs font-black uppercase text-brand-orange-dark mb-1 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-black" />
                    <span>{ent.entity}</span>
                  </div>
                  <p className="text-xs text-gray-800 font-medium leading-snug">
                    {ent.purpose}
                  </p>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ================= 10. TECHNICAL INTERVIEW Q&A ACCORDION ================= */}
        {project.caseStudy?.interviewQA && project.caseStudy.interviewQA.length > 0 && (
          <section id="section-faq" className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] space-y-5 scroll-mt-28 select-none">
            
            {/* Screws */}
            <div className="absolute top-3.5 left-3.5 plaque-screw" />
            <div className="absolute top-3.5 right-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
            <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-brand-yellow border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
                  🎙️
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                  Technical Interview Q&A Deep Dive
                </h3>
              </div>
              <span className="font-mono text-xs text-gray-700 font-bold bg-white px-2.5 py-1 rounded-lg border border-black shadow-xs">
                {project.caseStudy.interviewQA.length} QUESTIONS
              </span>
            </div>

            <div className="space-y-3">
              {project.caseStudy.interviewQA.map((qa, qIdx) => {
                const isOpen = openFaqIndex === qIdx;
                return (
                  <div
                    key={qIdx}
                    className="border-2 border-black rounded-xl overflow-hidden shadow-[3px_3px_0px_#000] transition-all bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(qIdx)}
                      className="w-full p-4 bg-white hover:bg-yellow-50 text-left font-black text-xs sm:text-sm text-black uppercase flex items-center justify-between gap-3 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs px-2.5 py-0.5 bg-black text-brand-yellow rounded font-black border border-black shadow-xs">
                          Q{qIdx + 1}
                        </span>
                        <span>{qa.q}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-4 sm:p-5 bg-yellow-50/70 border-t-2 border-black text-xs sm:text-sm text-gray-900 leading-relaxed font-semibold animate-in fade-in duration-150">
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono font-black text-xs text-emerald-700 mt-0.5">
                            ANSWER //
                          </span>
                          <p className="flex-1">{qa.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </section>
        )}

        {/* ================= 11. PERSONAL CONTRIBUTION & LEARNINGS ================= */}
        <section id="section-contributions" className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] space-y-6 scroll-mt-28 select-none">
          
          {/* Screws */}
          <div className="absolute top-3.5 left-3.5 plaque-screw" />
          <div className="absolute top-3.5 right-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

          <div className="flex items-center gap-2 pb-3 border-b-2 border-black">
            <span className="p-1.5 bg-brand-yellow border-2 border-black rounded-lg text-black font-black text-xs shadow-[2px_2px_0px_#000]">
              🎓
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
              Developer Attribution & Lessons Learned
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* My Contribution */}
            <div className="p-5 bg-white border-2 border-black rounded-xl space-y-2 shadow-[3px_3px_0px_#000]">
              <span className="font-mono text-xs font-black text-brand-orange-dark uppercase tracking-wider block">
                ENGINEERING RESPONSIBILITIES
              </span>
              <h4 className="text-base font-black text-black uppercase">
                My Primary Contributions
              </h4>
              <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                {project.caseStudy?.myContribution || project.summary}
              </p>
            </div>

            {/* What I Learned */}
            <div className="p-5 bg-white border-2 border-black rounded-xl space-y-2 shadow-[3px_3px_0px_#000]">
              <span className="font-mono text-xs font-black text-brand-orange-dark uppercase tracking-wider block">
                SYSTEM DESIGN INSIGHTS
              </span>
              <h4 className="text-base font-black text-black uppercase">
                Key Technical Takeaways
              </h4>
              <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                {project.caseStudy?.whatILearned || "Hands-on experience delivering verified architectures under strict real-world constraints."}
              </p>
            </div>

          </div>

          {/* Accuracy & Audit Notice */}
          {project.caseStudy?.accuracyNote && (
            <div className="p-3.5 bg-amber-100 border-2 border-black rounded-xl flex items-start gap-2.5 text-xs font-mono font-bold text-amber-950 shadow-[2px_2px_0px_#000]">
              <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>VERIFIED AUDIT NOTICE:</strong> {project.caseStudy.accuracyNote}
              </span>
            </div>
          )}

        </section>

        {/* ================= 12. BOTTOM ADJACENT PROJECT NAVIGATION ================= */}
        <section className="pt-6 border-t-2 border-dashed border-black/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Previous Project Card */}
            {adjacent.prev && (
              <button
                type="button"
                onClick={() => {
                  sound.playFlip();
                  onNavigate(adjacent.prev.canonicalUrl);
                }}
                className="p-5 bg-white hover:bg-yellow-50 border-[3.5px] border-black rounded-2xl shadow-[5px_5px_0px_#000] text-left flex items-center justify-between group transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <div>
                  <span className="font-mono text-[10px] text-gray-600 uppercase font-black block">
                    ← PREVIOUS PROJECT
                  </span>
                  <span className="text-base sm:text-lg font-black text-black uppercase group-hover:text-brand-orange-dark">
                    {adjacent.prev.title}
                  </span>
                  <span className="text-xs text-gray-600 font-mono block line-clamp-1">
                    {adjacent.prev.subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-black text-brand-yellow flex items-center justify-center font-black text-sm border-2 border-black flex-shrink-0 ml-3 shadow-[2px_2px_0px_#000]">
                  {adjacent.prev.flag || '←'}
                </div>
              </button>
            )}

            {/* Next Project Card */}
            {adjacent.next && (
              <button
                type="button"
                onClick={() => {
                  sound.playFlip();
                  onNavigate(adjacent.next.canonicalUrl);
                }}
                className="p-5 bg-brand-yellow hover:bg-[#ffde59] text-black border-[3.5px] border-black rounded-2xl shadow-[5px_5px_0px_#000] text-right flex items-center justify-between group transition-all hover:-translate-y-0.5 cursor-pointer sm:flex-row-reverse"
              >
                <div>
                  <span className="font-mono text-[10px] text-black/70 uppercase font-black block">
                    NEXT PROJECT →
                  </span>
                  <span className="text-base sm:text-lg font-black text-black uppercase">
                    {adjacent.next.title}
                  </span>
                  <span className="text-xs text-gray-800 font-mono block line-clamp-1">
                    {adjacent.next.subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-black text-brand-yellow flex items-center justify-center font-black text-sm border-2 border-black flex-shrink-0 mr-3 sm:mr-0 sm:ml-3 shadow-[2px_2px_0px_#000]">
                  {adjacent.next.flag || '→'}
                </div>
              </button>
            )}

          </div>

          {/* Centered Return to Portfolio Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white rounded-full border-2 border-black font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:scale-105 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO COMPLETE PORTFOLIO DOSSIER</span>
            </button>
          </div>
        </section>

      </main>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 right-6 p-3 bg-brand-yellow text-black rounded-full border-2 border-black shadow-[4px_4px_0px_#000] z-40 hover:scale-110 transition-all cursor-pointer"
          title="Scroll to top of case study"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* ================= FULLSCREEN IMAGE LIGHTBOX MODAL ================= */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="absolute -top-12 right-0 p-2 bg-brand-yellow text-black rounded-full border-2 border-black hover:bg-yellow-400 transition-all shadow-[2px_2px_0px_#000]"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={currentImage}
              alt="Fullscreen Architecture"
              className="max-w-full max-h-[82vh] object-contain rounded-xl border-4 border-black shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-white"
              onClick={(e) => e.stopPropagation()}
            />

            {currentImageCaption && (
              <div className="mt-3 px-4 py-2 bg-brand-yellow text-black font-mono text-xs font-black rounded-lg border-2 border-black text-center max-w-2xl shadow-[2px_2px_0px_#000]">
                {currentImageCaption}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}