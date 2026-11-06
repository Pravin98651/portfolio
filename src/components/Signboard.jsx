import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';

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
      {/* The Whiteboard / Signboard Plaque */}
      <div className="relative bg-[#fcfcfc] border-[3px] border-black rounded-xl p-7 sm:p-9 shadow-[8px_8px_0px_#000000] z-0 transition-transform duration-300">
        
        {/* Four Screw Rivets in the Corners */}
        <div className="absolute top-3.5 left-3.5 plaque-screw" />
        <div className="absolute top-3.5 right-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

        {/* Top Status & Specialization Bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 border border-black rounded-full text-[11px] font-mono font-bold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>OPEN FOR OPPORTUNITIES</span>
          </div>

          <span className="font-mono text-[11px] font-bold text-gray-500">
            SPEC. APPLIED AI
          </span>
        </div>

        {/* Big Bold Headline (Faithful to uimaven aesthetic) */}
        <h1 className="text-black font-black text-4xl sm:text-5xl lg:text-[54px] leading-[0.95] tracking-tight uppercase">
          {heroTitle.line1}
          <br />
          {heroTitle.line2}
          <br />
          <span className="text-brand-orange">{heroTitle.highlight}</span>
          <br />
          {heroTitle.line3}
        </h1>

        {/* Core Message / Subtitle */}
        <p className="mt-4 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-200 pt-3">
          {coreMessage}
        </p>

        {/* Professional Specialties Footer Tag Bar */}
        <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex flex-wrap items-center gap-1.5 text-[10px] font-mono font-bold text-gray-600">
          <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300">Full-Stack</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300">Applied AI</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300">FastAPI</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300">Next.js 14</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300">LangGraph</span>
        </div>
      </div>

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
          } outline-none focus:outline-none`}
        >
          <img
            src={stk.image}
            alt={stk.alt}
            className="w-full h-full object-contain pointer-events-none drop-shadow-[3px_4px_0px_rgba(0,0,0,0.85)]"
          />
        </button>
      ))}
    </div>
  );
}
