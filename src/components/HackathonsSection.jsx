import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
  ExternalLink,
  CheckCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Cpu,
  Layers,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { getProjectUrl } from '../utils/projectRoutes';

export default function HackathonsSection({ onNavigateToProject }) {
  const { hackathons } = portfolioData;
  const [activeItemId, setActiveItemId] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('portfolio_hackathons_active_item');
      if (saved && hackathons.items.some(it => it.id === saved)) return saved;
    }
    return 'danfoss-2026';
  });

  useEffect(() => {
    sessionStorage.setItem('portfolio_hackathons_active_item', activeItemId);
  }, [activeItemId]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null); // { url, title, caption }

  const pillRefs = useRef({});
  const photoRefs = useRef({});
  const showcaseRef = useRef(null);

  const currentIndex = Math.max(0, hackathons.items.findIndex(it => it.id === activeItemId));
  const currentItem = hackathons.items[currentIndex] || hackathons.items[0];

  const isFirstPillMount = useRef(true);
  const isFirstPhotoMount = useRef(true);

  // Auto-scroll the active pill horizontally into view whenever active item changes (skip on first mount)
  useEffect(() => {
    if (isFirstPillMount.current) {
      isFirstPillMount.current = false;
      return;
    }
    const el = pillRefs.current[activeItemId];
    if (el && el.parentElement) {
      const container = el.parentElement;
      const targetLeft = el.offsetLeft - (container.clientWidth / 2) + (el.clientWidth / 2);
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }, [activeItemId]);

  // Auto-scroll photo thumbnail into view whenever photo changes (skip on first mount)
  useEffect(() => {
    if (isFirstPhotoMount.current) {
      isFirstPhotoMount.current = false;
      return;
    }
    const el = photoRefs.current[selectedPhotoIndex];
    if (el && el.parentElement) {
      const container = el.parentElement;
      const targetLeft = el.offsetLeft - (container.clientWidth / 2) + (el.clientWidth / 2);
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }, [selectedPhotoIndex]);

  const handleSelectTab = (id, scrollShowcase = false) => {
    sound.playClick();
    setActiveItemId(id);
    setSelectedPhotoIndex(0);
    if (scrollShowcase && showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleNextItem = (scrollShowcase = true) => {
    sound.playFlip();
    const nextIdx = (currentIndex + 1) % hackathons.items.length;
    const nextItem = hackathons.items[nextIdx];
    setActiveItemId(nextItem.id);
    setSelectedPhotoIndex(0);
    if (scrollShowcase && showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handlePrevItem = (scrollShowcase = true) => {
    sound.playFlip();
    const prevIdx = (currentIndex - 1 + hackathons.items.length) % hackathons.items.length;
    const prevItem = hackathons.items[prevIdx];
    setActiveItemId(prevItem.id);
    setSelectedPhotoIndex(0);
    if (scrollShowcase && showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleOpenLightbox = (imageObj) => {
    sound.playClick();
    setLightboxImage(imageObj);
  };

  const handleCloseLightbox = () => {
    sound.playClick();
    setLightboxImage(null);
  };

  return (
    <section id="hackathons" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20 scroll-mt-20 sm:scroll-mt-24">
      
      {/* ================= SECTION HEADER PLAQUE ================= */}
      <div className="relative manila-card border-[3.5px] border-black rounded-2xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] mb-8 select-none scroll-reveal">
        {/* Four Screws */}
        <div className="absolute top-3.5 left-3.5 plaque-screw" />
        <div className="absolute top-3.5 right-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

        {/* Top Caution Striping Trim */}
        <div className="w-full h-3 bg-caution-stripes-sm rounded-full border border-black mb-5 shadow-xs" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow border-2 border-black rounded-full text-xs font-mono font-black mb-3 shadow-[2px_2px_0px_#000]">
              <Trophy className="w-3.5 h-3.5 text-black" />
              <span>{hackathons.tagline}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase leading-none">
              AWARDS, HACKATHONS & <span className="text-brand-orange wavy-accent">HONORS</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-900 font-medium max-w-3xl leading-relaxed">
              {hackathons.intro}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold text-gray-800 bg-white p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] self-start md:self-end">
            <span className="flex items-center gap-1.5 text-black font-extrabold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>OFFICIAL EVIDENCE ATTACHED</span>
            </span>
          </div>
        </div>

        {/* 4 Telemetry Stats Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t-2 border-dashed border-black/40">
          {hackathons.stats.map((st, sIdx) => (
            <div key={sIdx} className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
              <div className="text-[10px] font-mono font-bold uppercase text-gray-500">
                {st.label}
              </div>
              <div className="text-base sm:text-lg font-black text-black mt-0.5 flex items-center gap-1">
                {st.value}
              </div>
              <div className="text-[10px] font-mono text-brand-orange-dark font-bold mt-0.5 truncate">
                {st.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= AWARDS AT A GLANCE (QUICK MATRIX PILLS + AUTO-SCROLLING CONTROLS) ================= */}
      <div className="manila-card border-[3.5px] border-black rounded-2xl p-3 sm:p-4 shadow-[8px_8px_0px_#000] mb-8 flex flex-col md:flex-row items-center justify-between gap-3 scroll-reveal">
        {/* Horizontal scroll ribbon with pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1 scroll-smooth">
          {hackathons.items.map((item, idx) => {
            const isActive = activeItemId === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => (pillRefs.current[item.id] = el)}
                type="button"
                onClick={() => handleSelectTab(item.id, false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold border-2 transition-all whitespace-nowrap cursor-pointer shadow-[3px_3px_0px_#000] ${
                  isActive
                    ? 'bg-black text-brand-yellow border-black shadow-[3px_3px_0px_#ffd31e] font-black -translate-y-0.5'
                    : 'bg-white text-gray-800 border-black hover:bg-brand-yellow hover:text-black'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-brand-yellow text-black text-[10px] font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{item.badge}</span>
                <span className="text-gray-400 font-normal">|</span>
                <span className="font-sans font-black">{item.shortTitle || item.title.split('—')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Paging Prev/Next Controls */}
        <div className="flex items-center gap-2 self-end md:self-center font-mono shrink-0">
          <span className="text-xs font-bold text-gray-600 mr-1 uppercase hidden sm:inline">
            AWARD {currentIndex + 1} OF {hackathons.items.length}
          </span>
          <button
            type="button"
            onClick={() => handlePrevItem(false)}
            title="Previous Award"
            className="p-2 sm:px-3 sm:py-2 bg-white hover:bg-black hover:text-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREV</span>
          </button>
          <button
            type="button"
            onClick={() => handleNextItem(false)}
            title="Next Award"
            className="p-2 sm:px-3 sm:py-2 bg-brand-yellow hover:bg-[#ffd31e] text-black rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1 text-xs font-black cursor-pointer"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= FEATURED SHOWCASE STAGE ================= */}
      <div 
        ref={showcaseRef}
        className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[12px_12px_0px_#000000] transition-all scroll-reveal"
      >
        
        {/* Top Header Badge Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-2.5">
            <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] ${currentItem.badgeColor}`}>
              {currentItem.badge}
            </span>
            <span className="font-mono text-xs font-bold text-gray-500 uppercase">
              {currentItem.event}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-gray-600">
            {currentItem.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{currentItem.date}</span>
              </span>
            )}
            {currentItem.venue && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{currentItem.venue}</span>
              </span>
            )}
            {currentItem.prize && (
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded font-black">
                {currentItem.prize}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          
          {/* Left Column: Real Verification Photo Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Interactive Photo Viewer */}
            {currentItem.images && currentItem.images.length > 0 && (
              <div className="space-y-3">
                <div
                  onClick={() => handleOpenLightbox(currentItem.images[selectedPhotoIndex] || currentItem.images[0])}
                  className="relative w-full h-64 sm:h-80 rounded-xl border-[3px] border-black overflow-hidden bg-black flex items-center justify-center cursor-pointer group shadow-[4px_4px_0px_#000]"
                >
                  <img
                    src={currentItem.images[selectedPhotoIndex]?.url || currentItem.images[0]?.url}
                    alt={currentItem.images[selectedPhotoIndex]?.title || currentItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-wider backdrop-blur-[2px]">
                    <div className="p-3 bg-brand-yellow text-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <span>Click to Inspect High-Resolution Photo / Certificate</span>
                  </div>

                  {/* Bottom Verification Label */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md rounded border border-white/20 p-2 text-white flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold truncate">
                      {currentItem.images[selectedPhotoIndex]?.title || 'Ceremony & Certificate'}
                    </span>
                    <span className="px-2 py-0.5 bg-brand-yellow text-black rounded text-[10px] font-black shrink-0 ml-2">
                      VERIFIED PROOF
                    </span>
                  </div>
                </div>

                {/* Photo Switchers if multiple images exist */}
                {currentItem.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
                    {currentItem.images.map((img, i) => (
                      <button
                        key={i}
                        ref={(el) => (photoRefs.current[i] = el)}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setSelectedPhotoIndex(i);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border-2 transition-all cursor-pointer whitespace-nowrap ${
                          selectedPhotoIndex === i
                            ? 'bg-brand-yellow text-black border-black shadow-[2px_2px_0px_#000] font-black'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Photo {i + 1}: {img.title.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Caption description */}
                <p className="text-xs text-gray-600 font-mono italic leading-relaxed">
                  "{currentItem.images[selectedPhotoIndex]?.caption || ''}"
                </p>
              </div>
            )}

            {/* Performance Metrics if Available (e.g. Robust RPM) */}
            {currentItem.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {currentItem.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2.5 bg-gray-50 border-2 border-black rounded-xl text-center">
                    <div className="font-mono text-[10px] text-gray-500 uppercase font-bold truncate">
                      {m.label}
                    </div>
                    <div className="font-black text-xs sm:text-sm text-black truncate mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Project Context, Architecture & Contribution */}
          <div className="lg:col-span-6 space-y-5">
            
            <div>
              <div className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                {currentItem.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase leading-tight">
                {currentItem.title}
              </h3>
              {currentItem.team && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono text-xs font-bold text-gray-700 mt-2">
                  <Users className="w-3.5 h-3.5 text-black" />
                  <span>{currentItem.team}</span>
                </div>
              )}
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              {currentItem.summary}
            </p>

            {/* Signal Processing / Pipeline Steps if applicable */}
            {currentItem.pipeline && (
              <div className="p-4 bg-[#fdfdfd] border-2 border-black rounded-xl space-y-2.5">
                <div className="text-[11px] font-mono font-extrabold uppercase text-gray-600 tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-black" />
                  <span>Signal Processing & Multi-Stage Validation Pipeline</span>
                </div>
                <div className="space-y-2 text-xs">
                  {currentItem.pipeline.map((step, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 leading-snug">
                      <span className="font-mono font-black text-[10px] px-1.5 py-0.5 bg-brand-yellow border border-black rounded">
                        {step.step}
                      </span>
                      <div>
                        <span className="font-bold text-black">{step.name}: </span>
                        <span className="text-gray-700">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Highlights if applicable */}
            {currentItem.highlights && (
              <div className="p-4 bg-[#fdfdfd] border-2 border-black rounded-xl space-y-2.5">
                <div className="text-[11px] font-mono font-extrabold uppercase text-gray-600 tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-black" />
                  <span>Key Innovation & Engineering Highlights</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-800">
                  {currentItem.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 leading-snug">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Personal Contribution Box */}
            {currentItem.contribution && (
              <div className="p-3.5 bg-gray-50 border-l-4 border-black rounded-r-xl space-y-1">
                <div className="text-[10px] font-mono font-black uppercase text-gray-500 tracking-widest">
                  MY PERSONAL CONTRIBUTION
                </div>
                <p className="text-xs text-gray-800 font-medium leading-relaxed">
                  "{currentItem.contribution}"
                </p>
              </div>
            )}

            {/* Direct Deep-Dive Link to Dedicated Page */}
            {onNavigateToProject && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onNavigateToProject(getProjectUrl(currentItem.id));
                  }}
                  className="w-full py-2.5 px-4 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>⚡ EXPLORE FULL SPECIFICATION</span>
                  <ExternalLink className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            )}

            {/* Quick Next / Prev Award Switcher Bottom Toolbar */}
            <div className="pt-3 border-t-2 border-dashed border-gray-200 flex items-center justify-between gap-3 font-mono">
              <button
                type="button"
                onClick={() => handlePrevItem(true)}
                className="py-2 px-3 bg-white hover:bg-black hover:text-white text-black font-bold text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV AWARD</span>
              </button>

              <span className="text-xs font-black text-gray-500 hidden sm:inline">
                {currentIndex + 1} OF {hackathons.items.length}
              </span>

              <button
                type="button"
                onClick={() => handleNextItem(true)}
                className="py-2 px-3 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>NEXT AWARD</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ================= LIGHTBOX MODAL FOR HIGH-RES PHOTOS ================= */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-white border-[3px] border-black rounded-2xl shadow-[12px_12px_0px_#000] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-brand-orange-dark" />
                <h4 className="font-black text-sm uppercase tracking-wide text-black">
                  {lightboxImage.title || 'Official Award / Certificate'}
                </h4>
              </div>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-1.5 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Modal Image */}
            <div className="p-3 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title || 'Official Evidence'}
                className="max-h-[68vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 bg-white border-t-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
              <p className="text-gray-700 font-medium">
                {lightboxImage.caption}
              </p>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="px-4 py-2 bg-brand-yellow hover:bg-[#ffde59] text-black font-black uppercase rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
              >
                CLOSE [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
