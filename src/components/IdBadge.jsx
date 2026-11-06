import React, { useState, useRef } from 'react';
import { portfolioData } from '../portfolioData';
import { RotateCw, ArrowRight, Download, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function IdBadge({ onOpenResume }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);
  const { personal } = portfolioData;

  const toggleFlip = (e) => {
    if (e) e.stopPropagation();
    sound.playFlip();
    setIsFlipped((prev) => !prev);
  };

  // High-precision 3D mouse parallax tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 8, // tilt up to 8 deg
      y: (x / (rect.width / 2)) * 8,
      glareX: ((e.clientX - rect.left) / rect.width) * 100,
      glareY: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative select-none flex flex-col items-center group transition-transform duration-200"
      style={{
        perspective: '1200px',
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Vibrant Red/Orange Lanyard Strap with Tactical Buckle */}
      <div className="flex flex-col items-center z-10 -mb-2">
        {/* Woven Strap with Neon Cyan Stripe */}
        <div className="w-5 sm:w-6 h-12 sm:h-16 bg-gradient-to-b from-[#ff385c] via-[#f97316] to-[#EE4D31] border-x-[3px] border-black relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#000_0px,#000_2px,transparent_2px,transparent_6px)]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-[#00f0ff]/50" />
        </div>

        {/* Tactical Quick-Release Buckle */}
        <div className="w-8 sm:w-9 h-7 bg-[#1c1c1e] border-2 border-black rounded-sm flex flex-col items-center justify-between py-1 shadow-sm relative">
          <div className="w-6 h-1 bg-[#ffd31e] rounded-full" />
          <div className="w-4 h-1 bg-gray-500 rounded-full" />
          <div className="w-6 h-1 bg-[#00f0ff] rounded-full" />
        </div>

        {/* Metal Carabiner Clip */}
        <div className="w-4 h-5 border-2 border-black rounded-b-md bg-gradient-to-b from-gray-300 to-gray-400 -mt-1 shadow-inner" />
      </div>

      {/* The 3D Badge Holder */}
      <div 
        className="perspective-1200 w-[240px] sm:w-[260px] h-[385px] sm:h-[415px] cursor-pointer"
        onClick={toggleFlip}
        title="Click badge to flip in 3D"
      >
        <div
          className={`relative w-full h-full rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_#000000] bg-badge-stripes transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Dynamic Holographic Foil Overlay */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none holographic-sheen opacity-40 z-20 mix-blend-color-dodge" 
          />

          {/* ================= FRONT SIDE ================= */}
          <div
            className={`absolute inset-0 backface-hidden p-3.5 flex flex-col justify-between transition-opacity duration-300 ${
              isFlipped ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
            }`}
          >
            {/* Top Lanyard Slot & Obvious FLIP Button */}
            <div className="relative flex items-center justify-between mb-1 z-30">
              {/* Clearance Badge Chip */}
              <div className="flex items-center gap-1 bg-black text-[#ffd31e] px-2 py-0.5 rounded border border-black font-mono text-[9px] font-black tracking-wider">
                <Zap className="w-3 h-3 text-[#00f0ff]" />
                <span>DEV-PASS</span>
              </div>

              {/* Lanyard Hole cutout */}
              <div className="w-12 h-3.5 bg-[#1a1a1a] rounded-full border-2 border-black" />

              {/* Prominent 3D Flip Button */}
              <button
                type="button"
                onClick={toggleFlip}
                title="Flip badge to view resume & download"
                className="px-2 py-0.5 bg-white hover:bg-black hover:text-[#ffd31e] text-black border-2 border-black rounded-md flex items-center gap-1 font-mono font-black text-[10px] uppercase transition-all btn-tactile-3d shadow-[2px_2px_0px_#000]"
              >
                <span>3D FLIP</span>
                <RotateCw className="w-3 h-3 text-brand-orange animate-spin-slow" />
              </button>
            </div>

            {/* Halftone Portrait Box with Pravin's Pop-Art Avatar */}
            <div className="relative mx-auto w-[94%] h-[178px] sm:h-[195px] border-2 border-black rounded-xl halftone-pink overflow-hidden shadow-inner flex items-center justify-center group-hover:scale-[1.01] transition-transform">
              <img
                src={personal.avatar}
                alt={personal.fullName}
                className="w-full h-full object-cover object-center pointer-events-none"
              />
              
              {/* Multi-Angle Holographic Chip Emblem */}
              <div className="absolute top-2 left-2 w-6 h-5 rounded border border-black/80 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-sm flex items-center justify-center">
                <div className="w-3 h-2 border border-black/40 rounded-xs grid grid-cols-2 gap-0.5 p-0.5">
                  <div className="bg-black/30 rounded-xs" />
                  <div className="bg-black/30 rounded-xs" />
                </div>
              </div>

              {/* Live Status Pill in Corner */}
              <div className="absolute bottom-2 right-2 bg-black/85 backdrop-blur-sm border border-emerald-400 text-emerald-400 px-2 py-0.5 rounded-full font-mono text-[9px] font-bold flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Masking Tape Label (Name & Role) with Neon Accent */}
            <div className="relative mt-1 bg-[#fffdf0] border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_rgba(0,0,0,0.2)] -rotate-1 text-center rounded-sm">
              <div className="text-black font-black text-xl sm:text-2xl leading-none tracking-tight">
                {personal.name}
              </div>
              <div className="text-brand-orange-dark font-extrabold text-[11px] mt-0.5 font-mono tracking-wider">
                {personal.role}
              </div>
            </div>

            {/* Social Icons Bar with Vibrant Color Accents */}
            <div className="mt-1 flex items-center justify-center gap-2 z-30">
              {personal.socials.map((s, idx) => {
                const colors = ['bg-[#00f0ff] hover:bg-[#38bdf8]', 'bg-[#ffd31e] hover:bg-[#fde047]', 'bg-[#ff3399] hover:bg-[#ec4899]'];
                const colorClass = colors[idx % colors.length];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                    }}
                    title={s.label}
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${colorClass} text-black rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d`}
                  >
                    <img src={s.icon} alt={s.label} className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

            {/* Professional Micro Barcode & 3D Flip Hint */}
            <div className="pt-1.5 flex items-center justify-between border-t-2 border-black/30 font-mono text-[9px] text-black">
              <span className="font-extrabold tracking-widest bg-white/70 px-1 rounded">||| | |||| | |||</span>
              <span className="uppercase text-black font-black flex items-center gap-1 bg-[#ffd31e] px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
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
            <div className="relative flex items-center justify-between mb-1 z-30">
              <div className="flex items-center gap-1 bg-black text-[#00f0ff] px-2 py-0.5 rounded border border-black font-mono text-[9px] font-black tracking-wider">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>VERIFIED</span>
              </div>

              <div className="w-12 h-3.5 bg-[#1a1a1a] rounded-full border-2 border-black" />

              <button
                type="button"
                onClick={toggleFlip}
                title="Flip to Front (Photo & Socials)"
                className="px-2 py-0.5 bg-white hover:bg-black hover:text-[#ffd31e] text-black border-2 border-black rounded-md flex items-center gap-1 font-mono font-black text-[10px] uppercase transition-all btn-tactile-3d shadow-[2px_2px_0px_#000]"
              >
                <span>FRONT</span>
                <RotateCw className="w-3 h-3" />
              </button>
            </div>

            {/* Back Card Header & Core Skills */}
            <div className="my-auto space-y-2.5 z-30">
              <div>
                <h3 className="text-black font-black text-xl leading-tight uppercase tracking-tight">
                  {personal.name}
                </h3>
                <div className="text-[11px] font-mono font-black tracking-wider text-brand-orange-dark uppercase">
                  {personal.backCard.title}
                </div>
              </div>

              {/* Core Specialties List with Vibrant Neon Badges */}
              <div className="py-2.5 px-3 bg-white/95 border-2 border-black rounded-xl text-left shadow-[3px_3px_0px_#000]">
                <p className="text-[9px] font-mono font-black uppercase tracking-wider text-gray-700 mb-1.5 flex items-center justify-between">
                  <span>{personal.backCard.skillsCategory}</span>
                  <span className="text-emerald-600 font-bold">100% PRODUCTION</span>
                </p>
                <div className="space-y-1">
                  {personal.backCard.skills.map((skill, idx) => (
                    <div key={idx} className="text-[11px] font-extrabold text-gray-900 flex items-center gap-1.5 leading-tight">
                      <span className="w-2 h-2 rounded-full bg-[#00f0ff] border border-black flex-shrink-0" />
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prominent DOWNLOAD RESUME / CV Button with 3D Pop */}
              <div className="space-y-1.5 pt-1">
                <a
                  href={personal.backCard.downloadUrl || "/assets/Pravin_Resume.pdf"}
                  download="Pravin_Resume.pdf"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSuccess();
                  }}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-[#ffd31e] via-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-amber-500 text-black border-2 border-black rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] btn-tactile-3d transition-all"
                >
                  <Download className="w-4 h-4 text-black animate-bounce" />
                  <span>DOWNLOAD CV / RÉSUMÉ</span>
                </a>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full py-1.5 px-3 bg-white hover:bg-black hover:text-white text-black border-2 border-black rounded-lg font-mono font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] btn-tactile-3d transition-all"
                >
                  <span>VIEW TIMELINE IN CONSOLE</span>
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                </button>
              </div>
            </div>

            {/* Back Card Footer Security Seal */}
            <div className="pt-1.5 flex items-center justify-between border-t-2 border-black/30 font-mono text-[9px] text-black">
              <span className="font-extrabold text-emerald-800 bg-emerald-100 px-1 rounded border border-emerald-300">VALIDATED AUDIT</span>
              <span className="font-mono text-gray-700">TOKEN: #PV-2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
