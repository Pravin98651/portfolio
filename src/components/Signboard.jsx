import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import ThreeDTilt from './ThreeDTilt';
import { Sparkles, Terminal, Cpu, Zap } from 'lucide-react';

export default function Signboard() {
  const { heroTitle, stickers, coreMessage } = portfolioData.personal;
  const [bouncedSticker, setBouncedSticker] = useState(null);

  const handleStickerClick = (id) => {
    sound.playClick();
    setBouncedSticker(id);
    setTimeout(() => setBouncedSticker(null), 600);
  };

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[540px] select-none">
      
      {/* 3D Tilt Plaque Wrapper */}
      <ThreeDTilt maxTilt={6} scale={1.01} glare={true} className="rounded-2xl">
        <div className="relative bg-[#fcfcfc] dark:bg-[#12141c] border-[3px] border-black rounded-2xl p-7 sm:p-9 shadow-[10px_10px_0px_#000000] z-0 transition-all duration-300">
          
          {/* Four Corner Hex Rivets */}
          <div className="absolute top-3.5 left-3.5 plaque-screw" />
          <div className="absolute top-3.5 right-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

          {/* Top Status & Specialization Bar with Vibrant Colors */}
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/70 border-2 border-black rounded-full text-[11px] font-mono font-black text-emerald-900 dark:text-emerald-300 shadow-[2px_2px_0px_#000]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>OPEN FOR OPPORTUNITIES</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#00f0ff]/15 border-2 border-black rounded-lg text-[10px] font-mono font-black text-cyan-900 dark:text-cyan-300 shadow-[2px_2px_0px_#000]">
              <Cpu className="w-3 h-3 text-[#00f0ff]" />
              <span>SPEC. APPLIED AI</span>
            </div>
          </div>

          {/* Big Bold Cyber-Pop Headline */}
          <h1 className="text-black dark:text-white font-black text-4xl sm:text-5xl lg:text-[54px] leading-[0.92] tracking-tight uppercase">
            {heroTitle.line1}
            <br />
            {heroTitle.line2}
            <br />
            <span className="bg-gradient-to-r from-[#f3670e] via-[#ff007f] to-[#7928ca] bg-clip-text text-transparent drop-shadow-sm">
              {heroTitle.highlight}
            </span>
            <br />
            {heroTitle.line3}
          </h1>

          {/* Core Message / Subtitle with Neo-Brutalist Border */}
          <p className="mt-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed border-t-2 border-black/10 dark:border-white/10 pt-3">
            {coreMessage}
          </p>

          {/* Professional Specialties Footer Tag Bar with Vibrant Neo Colors */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-wrap items-center gap-2 text-[11px] font-mono font-black">
            <span className="px-2.5 py-1 bg-[#ecfeff] dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-200 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d cursor-default">
              ⚡ Full-Stack
            </span>
            <span className="px-2.5 py-1 bg-[#fef9c3] dark:bg-yellow-950/60 text-amber-900 dark:text-yellow-200 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d cursor-default">
              🧠 Applied AI
            </span>
            <span className="px-2.5 py-1 bg-[#f0fdf4] dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d cursor-default">
              🚀 FastAPI
            </span>
            <span className="px-2.5 py-1 bg-[#fdf2f8] dark:bg-pink-950/60 text-pink-900 dark:text-pink-200 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d cursor-default">
              ⚛️ Next.js 14
            </span>
            <span className="px-2.5 py-1 bg-[#faf5ff] dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] btn-tactile-3d cursor-default">
              🕸️ LangGraph
            </span>
          </div>
        </div>
      </ThreeDTilt>

      {/* Floating Interactive Stickers with Tactile Bounce & Audio */}
      {stickers.map((stk) => (
        <button
          key={stk.id}
          type="button"
          onClick={() => handleStickerClick(stk.id)}
          title={stk.tooltip}
          aria-label={stk.alt}
          className={`${stk.className} ${
            bouncedSticker === stk.id ? 'animate-bounce' : ''
          } outline-none focus:outline-none transition-transform hover:scale-110 active:scale-95`}
        >
          <img
            src={stk.image}
            alt={stk.alt}
            className="w-full h-full object-contain pointer-events-none drop-shadow-[4px_5px_0px_rgba(0,0,0,0.9)]"
          />
        </button>
      ))}
    </div>
  );
}
