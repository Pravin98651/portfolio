import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import { 
  Sparkles, 
  Lightbulb, 
  Zap, 
  CheckCircle2, 
  Award, 
  Star, 
  Cpu, 
  ArrowRight, 
  ShieldCheck,
  Bot
} from 'lucide-react';

export default function Signboard() {
  const { heroTitle, coreMessage } = portfolioData.personal;
  const [bouncedSticker, setBouncedSticker] = useState(null);

  const handleStickerClick = (id) => {
    sound.playClick();
    setBouncedSticker(id);
    setTimeout(() => setBouncedSticker(null), 600);
  };

  const retroStickers = [
    {
      id: "verified-builder",
      label: "VERIFIED BUILDER",
      sub: "OFFICIAL AUDIT ★",
      bg: "bg-[#2563eb] text-white",
      border: "border-black",
      shadow: "shadow-[4px_4px_0px_#000]",
      rotate: "-rotate-6",
      position: "-top-6 -right-4 sm:-right-8",
      icon: Star
    },
    {
      id: "patents",
      label: "6 PATENT FILINGS",
      sub: "1 IN GRANT PROCESS",
      bg: "bg-[#ffd31e] text-black",
      border: "border-black",
      shadow: "shadow-[4px_4px_0px_#000]",
      rotate: "rotate-3",
      position: "-bottom-6 -left-3 sm:-left-6",
      icon: Award
    },
    {
      id: "zero-hallucinations",
      label: "ZERO HALLUCINATIONS",
      sub: "100% GROUNDED DATA",
      bg: "bg-[#d3222a] text-white",
      border: "border-black",
      shadow: "shadow-[3px_3px_0px_#000]",
      rotate: "-rotate-3",
      position: "-bottom-6 right-8 sm:right-16",
      icon: ShieldCheck
    },
    {
      id: "systems-thinker",
      label: "SYSTEMS THINKER",
      sub: "STATEFUL AI GRAPHS",
      bg: "bg-[#10b981] text-black",
      border: "border-black",
      shadow: "shadow-[3px_3px_0px_#000]",
      rotate: "rotate-6",
      position: "top-1/3 -right-6 hidden sm:flex",
      icon: Cpu
    }
  ];

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[530px] select-none">
      
      {/* Brass Staples in Upper Corners */}
      <div className="brass-staple top-2 left-6 rotate-[-12deg]" />
      <div className="brass-staple top-2 right-14 rotate-[8deg]" />

      {/* Frosted Masking Tape on Upper Right Corner */}
      <div className="masking-tape -top-3 right-4 w-28 rotate-[15deg]" />

      {/* The Manila Engineering Folder Plaque */}
      <div className="relative manila-card border-[3px] border-black rounded-2xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] z-0 transition-transform duration-300">
        
        {/* Four Industrial Screws */}
        <div className="absolute top-3.5 left-3.5 plaque-screw" />
        <div className="absolute top-3.5 right-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

        {/* Top Caution Striping Trim Bar */}
        <div className="w-full h-2.5 bg-caution-stripes-sm rounded-full border border-black mb-4 shadow-xs" />

        {/* Top Status & Specialization Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border-2 border-black rounded-full text-xs font-mono font-black text-emerald-900 shadow-[2px_2px_0px_#000]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>OPEN FOR OPPORTUNITIES</span>
          </div>

          <span className="font-mono text-xs font-black text-black bg-brand-yellow px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_#000]">
            EST. 2020 // VIT 2026
          </span>
        </div>

        {/* Big Bold Headline with Retro Comic High-Contrast Accents */}
        <div className="relative my-2">
          
          {/* Comic Cartoon Lightbulb Accent */}
          <div className="absolute -top-6 right-2 sm:right-6 flex items-center justify-center p-2 bg-brand-yellow rounded-full border-2 border-black shadow-[3px_3px_0px_#000] rotate-12 animate-pulse hidden sm:flex" title="Engineered Solutions">
            <Lightbulb className="w-5 h-5 text-black fill-current" />
          </div>

          <h1 className="text-black dark:text-white font-black text-4xl sm:text-5xl lg:text-[54px] leading-[0.92] tracking-tight uppercase">
            {heroTitle.line1}
            <br />
            {heroTitle.line2}
            <br />
            <span className="relative inline-block text-brand-orange">
              {heroTitle.highlight}
              {/* Comic Hand-Drawn Underline Bar */}
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-brand-yellow -z-10 rounded-sm border-b-2 border-black -rotate-1" />
            </span>
            <br />
            {heroTitle.line3}
          </h1>
        </div>

        {/* Core Message / Engineering Subtitle */}
        <p className="mt-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed border-t-2 border-black/80 pt-3">
          {coreMessage}
        </p>

        {/* Hand-Drawn Action Arrow Prompting Zipper Unzip */}
        <div className="mt-3 flex items-center justify-between bg-amber-50 dark:bg-black/40 border-2 border-dashed border-black rounded-xl p-2.5 font-mono text-xs font-bold text-gray-900 dark:text-gray-100">
          <div className="flex items-center gap-1.5 text-brand-orange font-black">
            <Zap className="w-4 h-4 fill-current animate-bounce" />
            <span className="uppercase">VINTAGE MECHANICAL DOSSIER</span>
          </div>
          <div className="flex items-center gap-1 text-black dark:text-brand-yellow font-black animate-pulse">
            <span>UNZIP WORKSPACE</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Professional Specialties Footer Tag Bar */}
        <div className="mt-4 pt-3 border-t-2 border-black/60 flex flex-wrap items-center gap-1.5 text-[11px] font-mono font-bold text-black">
          <span className="px-2.5 py-0.5 bg-white border border-black rounded-md shadow-[1px_1px_0px_#000]">#Full-Stack</span>
          <span className="px-2.5 py-0.5 bg-brand-yellow border border-black rounded-md shadow-[1px_1px_0px_#000]">#Applied AI</span>
          <span className="px-2.5 py-0.5 bg-white border border-black rounded-md shadow-[1px_1px_0px_#000]">#FastAPI</span>
          <span className="px-2.5 py-0.5 bg-white border border-black rounded-md shadow-[1px_1px_0px_#000]">#Next.js 14</span>
          <span className="px-2.5 py-0.5 bg-brand-orange text-white border border-black rounded-md shadow-[1px_1px_0px_#000]">#LangGraph</span>
          <span className="px-2.5 py-0.5 bg-white border border-black rounded-md shadow-[1px_1px_0px_#000]">#pgvector</span>
        </div>

      </div>

      {/* Floating Retro Die-Cut Stickers with Tactile Bounce & Audio */}
      {retroStickers.map((stk) => {
        const Icon = stk.icon;
        const isBounced = bouncedSticker === stk.id;
        return (
          <button
            key={stk.id}
            type="button"
            onClick={() => handleStickerClick(stk.id)}
            title={`Retro Badge: ${stk.label}`}
            className={`absolute ${stk.position} ${stk.rotate} ${stk.bg} border-2 ${stk.border} ${stk.shadow} px-3 py-1.5 rounded-xl font-mono text-center flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 hover:rotate-0 z-20 ${
              isBounced ? 'animate-bounce' : ''
            }`}
          >
            <div className="flex items-center gap-1">
              <Icon className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="font-black text-[11px] uppercase tracking-wider leading-none whitespace-nowrap">
                {stk.label}
              </span>
            </div>
            <span className="text-[9px] font-bold opacity-80 uppercase tracking-tighter mt-0.5">
              {stk.sub}
            </span>
          </button>
        );
      })}

    </div>
  );
}
