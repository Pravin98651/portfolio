import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/soundEffects';
import { ChevronDown, Zap, Activity } from 'lucide-react';

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
      <div className="absolute inset-y-0 w-12 flex items-center justify-center">
        
        {/* Left Precision Ruler Rail with Cyan Micro-Tick marks */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#181a24] border-x-2 border-black flex flex-col justify-between py-4 shadow-inner">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1.5px] ${i % 4 === 0 ? 'w-full bg-[#00f0ff]' : 'w-1.5 bg-[#4b5563]'}`}
            />
          ))}
        </div>

        {/* Center Magnetic Core with High-Voltage Glow */}
        <div className="w-2.5 h-full bg-[#090a10] border-x-2 border-black relative overflow-hidden">
          {/* Active Energized Voltage Line with multi-color neon gradient */}
          <div
            className="w-full bg-gradient-to-b from-[#00f0ff] via-[#ffd31e] to-[#ff007f] transition-all duration-75 glow-cyan"
            style={{ height: `${Math.max(6, progress * 100)}%` }}
          />
        </div>

        {/* Right Precision Ruler Rail with Amber Micro-Tick marks */}
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#181a24] border-x-2 border-black flex flex-col justify-between py-4 shadow-inner">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1.5px] ml-auto ${i % 4 === 0 ? 'w-full bg-[#ffd31e]' : 'w-1.5 bg-[#4b5563]'}`}
            />
          ))}
        </div>
      </div>

      {/* Kinetic Throttle Carriage (Draggable Slider with 3D Tactile Styling) */}
      <div
        className="absolute top-0 flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform duration-75 group"
        style={{
          transform: `translateY(${sliderPosition}px)`,
        }}
        onPointerDown={handlePointerDown}
        onClick={handleThrottleClick}
        title="Drag or click to engage system modules"
      >
        {/* Main Anodized Metal Carriage with Neo-Brutalist Colors */}
        <div className="w-14 sm:w-16 h-18 bg-gradient-to-b from-[#ffd31e] via-[#fbbf24] to-[#f59e0b] border-[3px] border-black rounded-xl shadow-[5px_5px_0px_#000] flex flex-col items-center justify-between p-2 hover:scale-105 transition-transform btn-tactile-3d">
          
          {/* Knurled Grip Top */}
          <div className="w-full flex items-center justify-center gap-1">
            <div className="w-2 h-1 bg-black/80 rounded-full" />
            <div className="w-2 h-1 bg-black/80 rounded-full" />
            <div className="w-2 h-1 bg-black/80 rounded-full" />
          </div>

          {/* Center Power Diode with Neon Glow */}
          <div className="flex flex-col items-center">
            <Zap className="w-4 h-4 text-black fill-current animate-bounce glow-yellow" />
            <span className="font-mono font-black text-[9px] uppercase tracking-tighter text-black leading-none mt-0.5">
              ENGAGE
            </span>
          </div>

          {/* Directional Chevron */}
          <ChevronDown className="w-4 h-4 text-black group-hover:translate-y-1 transition-transform" />
        </div>

        {/* Lower Callsign Flag with Neon Accent */}
        <div className="mt-1 px-2.5 py-0.5 bg-black border-2 border-black rounded-md text-[9px] font-mono font-black text-[#ffd31e] shadow-[2px_2px_0px_#00f0ff] whitespace-nowrap">
          {progress > 0.05 ? `${Math.round(progress * 100)}% ENGAGED` : 'SCROLL ↓'}
        </div>
      </div>
    </div>
  );
}
