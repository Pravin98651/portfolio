import React, { useState, useRef } from 'react';
import { portfolioData } from '../portfolioData';
import { RotateCw, ArrowRight, Download, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function IdBadge({ onOpenResume }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const { personal } = portfolioData;

  const toggleFlip = (e) => {
    if (e) e.stopPropagation();
    sound.playFlip();
    setIsFlipped((prev) => !prev);
  };

  // Subtle natural mouse-tracking tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6, // tilt up to 6 deg
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative select-none flex flex-col items-center group transition-transform duration-150"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Heavy-Duty Industrial Lanyard Strap with Metallic Buckle */}
      <div className="flex flex-col items-center z-10 -mb-2 animate-lanyard-sway">
        {/* Woven Industrial Strap with Ribbed Texture */}
        <div className="w-6 sm:w-7 h-14 sm:h-20 bg-gradient-to-b from-[#f36b16] to-[#b43200] border-x-[3px] border-black relative overflow-hidden shadow-md">
          {/* Subtle woven industrial herringbone texture */}
          <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(45deg,#000_0px,#000_3px,transparent_3px,transparent_7px)]" />
          <div className="absolute inset-y-0 left-1 w-[1px] bg-white/40" />
          <div className="absolute inset-y-0 right-1 w-[1px] bg-black/40" />
        </div>

        {/* Industrial Metal Clasp & Quick-Release Buckle */}
        <div className="w-9 sm:w-10 h-7 bg-[#23272f] border-2 border-black rounded-md flex flex-col items-center justify-between py-1 shadow-md relative">
          <div className="w-7 h-1 bg-black rounded-full" />
          <div className="w-5 h-1 bg-amber-400 rounded-full" />
          <div className="w-7 h-1 bg-black rounded-full" />
        </div>

        {/* Heavy Swivel Carabiner Metal Ring */}
        <div className="w-5 h-6 border-[2.5px] border-black rounded-b-lg bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] -mt-1 shadow-sm flex items-end justify-center pb-0.5">
          <div className="w-2.5 h-1 bg-black/80 rounded-full" />
        </div>
      </div>

      {/* The 3D Physical ID Badge Card */}
      <div 
        className="perspective-1000 w-[245px] sm:w-[270px] h-[395px] sm:h-[425px] cursor-pointer"
        onClick={toggleFlip}
        title="Click badge to inspect credentials & resume"
      >
        <div
          className={`relative w-full h-full rounded-2xl border-[3.5px] border-black shadow-[8px_8px_0px_#000000] bg-gradient-to-b from-[#ffd31e] via-[#fffbeb] to-[#fbbf24] transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className={`absolute inset-0 backface-hidden p-4 flex flex-col justify-between transition-opacity duration-300 ${
              isFlipped ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
            }`}
          >
            {/* Top Lanyard Slot & Flip Button */}
            <div className="relative flex items-center justify-between mb-1 pb-1 border-b-2 border-black/80">
              <span className="font-mono text-[9px] font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border border-black rounded">
                ENG-ID // VIT
              </span>

              {/* Lanyard Hole cutout */}
              <div className="w-12 h-3 bg-[#111] rounded-full border-2 border-black mx-auto" />

              {/* Prominent Flip Button */}
              <button
                type="button"
                onClick={toggleFlip}
                title="Flip badge to view resume & download"
                className="px-2 py-0.5 bg-black hover:bg-brand-orange text-brand-yellow hover:text-white border-2 border-black rounded-md flex items-center gap-1 font-mono font-black text-[10px] uppercase transition-all shadow-[1.5px_1.5px_0px_#000] hover:scale-105 cursor-pointer"
              >
                <span>FLIP</span>
                <RotateCw className="w-3 h-3 animate-spin-slow" />
              </button>
            </div>

            {/* Halftone Portrait Box with Pravin's Avatar */}
            <div className="relative mx-auto w-full h-[185px] sm:h-[200px] border-2 border-black rounded-xl halftone-pink overflow-hidden shadow-inner flex items-center justify-center bg-black">
              <img
                src={personal.avatar}
                alt={personal.fullName}
                className="w-full h-full object-cover object-center pointer-events-none"
              />
              
              {/* Holographic Security Stamp Badge */}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded border border-black/80 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-sm font-mono text-[8.5px] font-black text-black uppercase tracking-tight flex items-center gap-1 -rotate-3">
                <Sparkles className="w-2.5 h-2.5 fill-black" />
                <span>OFFICIAL</span>
              </div>

              {/* Identification Stamp Overlay */}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/85 text-brand-yellow border border-black rounded text-[9px] font-mono font-bold">
                REG: 23MIS0325
              </div>
            </div>

            {/* Physical Label: Name & Professional Title */}
            <div className="relative mt-1 bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_#000] text-center">
              <div className="text-black font-black text-xl sm:text-2xl leading-none uppercase tracking-tight">
                {personal.name}
              </div>
              <div className="text-brand-orange font-bold text-xs mt-0.5 font-mono">
                {personal.role}
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="mt-1 flex items-center justify-center gap-2">
              {personal.socials.map((s) => {
                if (s.id === 'resume') {
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        if (onOpenResume) onOpenResume();
                      }}
                      title="Open Official Résumé Dossier"
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-black hover:bg-brand-yellow hover:text-black text-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                    >
                      <img src={s.icon} alt={s.label} className="w-3.5 h-3.5 invert hover:invert-0" />
                    </button>
                  );
                }

                const isExternal = typeof s.href === 'string' && s.href.startsWith('http');
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                    }}
                    title={s.label}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-black hover:bg-brand-orange text-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 border-2 border-black shadow-[1.5px_1.5px_0px_#000]"
                  >
                    <img src={s.icon} alt={s.label} className="w-3.5 h-3.5 invert" />
                  </a>
                );
              })}
            </div>

            {/* Industrial Scannable Barcode */}
            <div className="pt-1.5 flex items-center justify-between border-t-2 border-black/70 font-mono text-[9px] text-black">
              <span className="font-extrabold tracking-widest leading-none">||| | |||| | ||| | ||</span>
              <span className="uppercase text-black font-black flex items-center gap-1 hover:text-brand-orange">
                <span>⟲ CLICK TO FLIP</span>
              </span>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 p-4 sm:p-5 flex flex-col justify-between text-center bg-badge-stripes rounded-2xl transition-opacity duration-300 ${
              isFlipped ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {/* Top Lanyard Slot & Flip Back Button */}
            <div className="relative flex items-center justify-center mb-1">
              <div className="w-12 h-3.5 bg-[#1a1a1a] rounded-full border-2 border-black" />
              <button
                type="button"
                onClick={toggleFlip}
                title="Flip to Front (Photo & Socials)"
                className="absolute right-0 top-0 px-2 py-0.5 bg-white hover:bg-black hover:text-white text-black border-2 border-black rounded-md flex items-center gap-1 font-mono font-bold text-[10px] uppercase transition-all shadow-[1px_1px_0px_#000] hover:scale-105"
              >
                <span>FRONT</span>
                <RotateCw className="w-3 h-3" />
              </button>
            </div>

            {/* Back Card Header & Core Skills */}
            <div className="my-auto space-y-2.5">
              <div>
                <h3 className="text-black font-black text-lg sm:text-xl leading-tight uppercase">
                  {personal.name}
                </h3>
                <div className="text-[11px] font-mono font-bold tracking-wider text-brand-orange-dark uppercase">
                  {personal.backCard.title}
                </div>
              </div>

              {/* Core Specialties List */}
              <div className="py-2 px-2.5 bg-white/80 border-2 border-black rounded-xl text-left shadow-[2px_2px_0px_#000]">
                <p className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-gray-500 mb-1">
                  {personal.backCard.skillsCategory}
                </p>
                <div className="space-y-1">
                  {personal.backCard.skills.map((skill, idx) => (
                    <div key={idx} className="text-[11px] font-bold text-gray-900 flex items-center gap-1.5 leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prominent DOWNLOAD RESUME / CV Button */}
              <div className="space-y-1.5 pt-1">
                <a
                  href={personal.backCard.downloadUrl || "/assets/Pravin_Resume.pdf"}
                  download="Pravin_Resume.pdf"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSuccess();
                  }}
                  className="w-full py-2.5 px-3 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-[2.5px] border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>DOWNLOAD CV / RÉSUMÉ</span>
                </a>

                {/* Secondary Button to view interactive CV tab */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full py-1.5 px-2 bg-white hover:bg-black hover:text-white text-black font-mono font-bold text-[10px] uppercase tracking-wider rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center gap-1 transition-all"
                >
                  <span>View Interactive CV Tab</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Footer Flip Note */}
            <button
              type="button"
              onClick={toggleFlip}
              className="text-[10px] font-mono font-bold text-gray-700 hover:text-black flex items-center justify-center gap-1 pt-1 border-t border-black/20"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>Flip to see photo & socials</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
