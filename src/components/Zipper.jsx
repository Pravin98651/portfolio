import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/soundEffects';
import { ChevronDown, Zap } from 'lucide-react';

export default function Zipper({ progress, onProgressChange, onToggleOpen, isOpen }) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const lastSoundProgress = useRef(0);

  // Trigger tactile mechanical ratchet sound when progress moves
  const maybePlaySound = (newProg) => {
    if (Math.abs(newProg - lastSoundProgress.current) > 0.08) {
      sound.playZipper();
      lastSoundProgress.current = newProg;
    }
  };

  // Synchronize throttle carriage with window scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;
      const scrollThreshold = 420;
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const prog = Math.min(1, Math.max(0, currentScroll / scrollThreshold));
      maybePlaySound(prog);
      onProgressChange(prog);
      if (prog > 0.35 && !isOpen) {
        onToggleOpen(true);
      } else if (prog <= 0.35 && isOpen) {
        onToggleOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging, isOpen, onProgressChange, onToggleOpen]);

  // Handle pointer down on throttle handle
  const handlePointerDown = (e) => {
    sound.playClick();
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  // Handle pointer move during drag
  const handlePointerMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const maxDrag = Math.max(100, rect.height - 100);
    const clampedY = Math.max(0, Math.min(maxDrag, offsetY));
    const newProgress = clampedY / maxDrag;

    maybePlaySound(newProgress);
    onProgressChange(newProgress);

    // Scroll window smoothly in sync
    const scrollThreshold = 420;
    window.scrollTo({
      top: newProgress * scrollThreshold,
      behavior: 'instant'
    });
  };

  // Handle pointer up
  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (progress > 0.35) {
        onToggleOpen(true);
        document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onToggleOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Click on the throttle slider triggers scroll down
  const handleThrottleClick = (e) => {
    e.stopPropagation();
    sound.playZipper();
    const target = document.getElementById('bento') || document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trackHeight = 720;
  const sliderPosition = progress * (trackHeight - 110);

  return (
    <div
      ref={trackRef}
      className="relative h-[720px] w-14 sm:w-16 flex items-center justify-center select-none z-30 touch-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Precision Industrial Bus Rail Track */}
      <div className="absolute inset-y-0 w-10 flex items-center justify-center">
        
        {/* Left Precision Ruler Rail */}
        <div className="absolute left-1 top-0 bottom-0 w-2.5 bg-[#1e2028] border-x border-black/80 flex flex-col justify-between py-4 shadow-inner">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1.5px] bg-[#4b5563] ${i % 5 === 0 ? 'w-full bg-brand-yellow' : 'w-1.5'}`}
            />
          ))}
        </div>

        {/* Center Magnetic Core */}
        <div className="w-2 h-full bg-[#0a0a0d] border-x border-black relative overflow-hidden">
          {/* Active Energized Voltage Line that glows as you scroll */}
          <div
            className="w-full bg-gradient-to-b from-brand-yellow via-brand-orange to-emerald-400 transition-all duration-75"
            style={{ height: `${Math.max(5, progress * 100)}%` }}
          />
        </div>

        {/* Right Precision Ruler Rail */}
        <div className="absolute right-1 top-0 bottom-0 w-2.5 bg-[#1e2028] border-x border-black/80 flex flex-col justify-between py-4 shadow-inner">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1.5px] bg-[#4b5563] ml-auto ${i % 5 === 0 ? 'w-full bg-brand-yellow' : 'w-1.5'}`}
            />
          ))}
        </div>
      </div>

      {/* Kinetic Throttle Carriage (Draggable Slider) */}
      <div
        className="absolute top-0 flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform duration-75 group"
        style={{
          transform: `translateY(${sliderPosition}px)`,
        }}
        onPointerDown={handlePointerDown}
        onClick={handleThrottleClick}
        title="Drag or click to engage system modules"
      >
        {/* Main Anodized Metal Carriage */}
        <div className="w-14 h-16 bg-[#ffd31e] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_#000] flex flex-col items-center justify-between p-1.5 hover:scale-105 transition-transform group-hover:bg-[#ffde59]">
          
          {/* Knurled Grip Top */}
          <div className="w-full flex items-center justify-center gap-1">
            <div className="w-1.5 h-1 bg-black/60 rounded-full" />
            <div className="w-1.5 h-1 bg-black/60 rounded-full" />
            <div className="w-1.5 h-1 bg-black/60 rounded-full" />
          </div>

          {/* Center Power Diodes */}
          <div className="flex flex-col items-center">
            <Zap className="w-4 h-4 text-black fill-current animate-pulse" />
            <span className="font-mono font-black text-[9px] uppercase tracking-tighter text-black leading-none mt-0.5">
              ENGAGE
            </span>
          </div>

          {/* Directional Chevron */}
          <ChevronDown className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
        </div>

        {/* Lower Callsign Flag */}
        <div className="mt-1 px-2 py-0.5 bg-black border border-black rounded text-[8.5px] font-mono font-bold text-white shadow-[2px_2px_0px_#ffd31e] whitespace-nowrap">
          {progress > 0.05 ? `${Math.round(progress * 100)}% RUN` : 'SCROLL ↓'}
        </div>
      </div>
    </div>
  );
}
