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
      {/* Red Lanyard Strap with Tactical Buckle */}
      <div className="flex flex-col items-center z-10 -mb-2">
        {/* Woven Strap */}
        <div className="w-5 sm:w-6 h-12 sm:h-16 bg-[#EE4D31] border-x-[3px] border-black relative overflow-hidden shadow-sm">
          <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,#000_0px,#000_2px,transparent_2px,transparent_6px)]" />
        </div>

        {/* Tactical Quick-Release Buckle */}
        <div className="w-8 sm:w-9 h-7 bg-[#1c1c1e] border-2 border-black rounded-sm flex flex-col items-center justify-between py-1 shadow-sm relative">
          <div className="w-6 h-1 bg-black rounded-full" />
          <div className="w-4 h-1 bg-gray-500 rounded-full" />
          <div className="w-6 h-1 bg-black rounded-full" />
        </div>

        {/* Metal Carabiner Clip */}
        <div className="w-4 h-5 border-2 border-black rounded-b-md bg-[#bbb] -mt-1" />
      </div>

      {/* The 3D Badge Holder */}
      <div 
        className="perspective-1000 w-[240px] sm:w-[260px] h-[380px] sm:h-[410px] cursor-pointer"
        onClick={toggleFlip}
        title="Click badge to flip"
      >
        <div
          className={`relative w-full h-full rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_#000000] bg-badge-stripes transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className={`absolute inset-0 backface-hidden p-3.5 flex flex-col justify-between transition-opacity duration-300 ${
              isFlipped ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
            }`}
          >
            {/* Top Lanyard Slot & Obvious FLIP Button */}
            <div className="relative flex items-center justify-center mb-1">
              {/* Lanyard Hole cutout */}
              <div className="w-12 h-3.5 bg-[#1a1a1a] rounded-full border-2 border-black" />

              {/* Prominent Flip Button */}
              <button
                type="button"
                onClick={toggleFlip}
                title="Flip badge to view resume & download"
                className="absolute right-0 top-0 px-2 py-0.5 bg-white hover:bg-black hover:text-white text-black border-2 border-black rounded-md flex items-center gap-1 font-mono font-bold text-[10px] uppercase transition-all shadow-[1px_1px_0px_#000] hover:scale-105"
              >
                <span>FLIP</span>
                <RotateCw className="w-3 h-3 animate-spin-slow" />
              </button>
            </div>

            {/* Halftone Portrait Box with Pravin's Pop-Art Avatar */}
            <div className="relative mx-auto w-[92%] h-[175px] sm:h-[190px] border-2 border-black rounded-lg halftone-pink overflow-hidden shadow-inner flex items-center justify-center">
              <img
                src={personal.avatar}
                alt={personal.fullName}
                className="w-full h-full object-cover object-center pointer-events-none"
              />
              {/* Holographic Chip Emblem */}
              <div className="absolute top-2 left-2 w-5 h-4 rounded border border-black/80 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-sm opacity-90" />
            </div>

            {/* Masking Tape Label (Name & Role) */}
            <div className="relative mt-1 bg-[#fffdf0] border-y-2 border-dashed border-gray-400 px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] -rotate-1 text-center">
              <div className="text-black font-extrabold text-xl sm:text-2xl leading-none tracking-tight">
                {personal.name}
              </div>
              <div className="text-gray-800 font-semibold text-xs mt-0.5 font-mono">
                {personal.role}
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="mt-1.5 flex items-center justify-center gap-2">
              {personal.socials.map((s) => (
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
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-black hover:bg-brand-orange text-white rounded-md flex items-center justify-center transition-transform hover:-translate-y-0.5 border border-black"
                >
                  <img src={s.icon} alt={s.label} className="w-3.5 h-3.5 invert" />
                </a>
              ))}
            </div>

            {/* Professional Micro Barcode & Flip Hint */}
            <div className="pt-1 flex items-center justify-between border-t border-black/30 font-mono text-[9px] text-gray-700">
              <span className="font-bold tracking-widest">||| | |||| | |||</span>
              <span className="uppercase text-black font-bold flex items-center gap-1 hover:text-brand-orange">
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
