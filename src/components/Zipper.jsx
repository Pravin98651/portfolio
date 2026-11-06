import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/soundEffects';
import { ChevronDown, Zap } from 'lucide-react';

export default function Zipper({
  progress,
  onProgressChange,
  onToggleOpen,
  isOpen,
  onTriggerTransition,
  onDragStateChange,
}) {
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

  // Play mechanical sound whenever progress changes significantly
  useEffect(() => {
    maybePlaySound(progress);
  }, [progress]);

  // Handle pointer down on throttle handle
  const handlePointerDown = (e) => {
    sound.playClick();
    setIsDragging(true);
    onDragStateChange?.(true);
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
    const scrollThreshold = 350;
    window.scrollTo({
      top: newProgress * scrollThreshold,
      behavior: 'instant',
    });
  };

  // Handle pointer up
  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      onDragStateChange?.(false);
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (progress > 0.35) {
        onToggleOpen(true);
        if (onTriggerTransition) {
          onTriggerTransition();
        } else {
          document.getElementById('workspace-portal')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        onToggleOpen(false);
        onProgressChange(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Click on the throttle slider triggers scroll down with transition
  const handleThrottleClick = (e) => {
    e.stopPropagation();
    if (onTriggerTransition) {
      onTriggerTransition();
    } else {
      sound.playTransition();
      const target = document.getElementById('workspace-portal') || document.getElementById('bento');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const trackHeight = 720;
  const sliderPosition = progress * (trackHeight - 110);

  return (
    <div
      ref={trackRef}
      className="relative h-[720px] w-20 flex items-center justify-center select-none z-30 touch-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Physical Interlocking Zipper Track & Teeth Assembly */}
      <div className="absolute inset-y-0 w-16 flex items-center justify-center pointer-events-none">
        
        {/* Under-Track Backplate & Exposed Glowing Energy Core */}
        <div className="absolute inset-y-0 w-5 bg-[#0a0b10] border-x-2 border-black/90 flex flex-col items-center overflow-hidden shadow-inner">
          {/* Active Energized Voltage Channel that reveals as teeth unzip */}
          <div
            className="w-full bg-gradient-to-b from-brand-yellow via-brand-orange to-emerald-400 transition-all duration-75 shadow-[0_0_15px_rgba(243,103,14,0.9)]"
            style={{ height: `${Math.max(5, progress * 100)}%` }}
          />
        </div>

        {/* 36 Physical Interlocking Teeth Pairs with Real Separation Mechanics */}
        <div className="absolute inset-y-0 w-full flex flex-col justify-between py-2">
          {Array.from({ length: 36 }).map((_, i) => {
            const toothProgress = i / 35;
            const isUnmeshed = progress > toothProgress;
            const diff = Math.max(0, progress - toothProgress);
            const separation = isUnmeshed ? Math.min(28, diff * 75) : 0;
            const rotation = isUnmeshed ? Math.min(20, diff * 50) : 0;

            return (
              <div
                key={i}
                className="relative w-full flex items-center justify-center h-4.5"
              >
                {/* Left Metallic Tooth */}
                <div
                  className="w-4 h-2.5 bg-gradient-to-r from-[#d97706] to-[#fbbf24] border border-black rounded-[2px] shadow-[1px_1px_0px_#000]"
                  style={{
                    transform: `translateX(-${separation + 1}px) rotate(-${rotation}deg)`,
                    transition: 'transform 0.08s ease-out',
                  }}
                />

                {/* Center Interlocking Seam Line */}
                <div className="w-1" />

                {/* Right Metallic Tooth (Staggered offset by 2px for realistic interlocking mesh) */}
                <div
                  className="w-4 h-2.5 bg-gradient-to-l from-[#d97706] to-[#fbbf24] border border-black rounded-[2px] shadow-[1px_1px_0px_#000] translate-y-[2px]"
                  style={{
                    transform: `translateX(${separation + 1}px) rotate(${rotation}deg)`,
                    transition: 'transform 0.08s ease-out',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Outer Ruler Ticks for Technical Console Precision */}
        <div className="absolute left-0 inset-y-0 w-1 flex flex-col justify-between py-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1px] bg-black/40 ${i % 4 === 0 ? 'w-2 bg-brand-yellow' : 'w-1'}`}
            />
          ))}
        </div>
        <div className="absolute right-0 inset-y-0 w-1 flex flex-col justify-between py-4 items-end">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1px] bg-black/40 ${i % 4 === 0 ? 'w-2 bg-brand-yellow' : 'w-1'}`}
            />
          ))}
        </div>
      </div>

      {/* Kinetic Throttle Slider Puller */}
      <div
        className="absolute top-0 flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform duration-75 group z-40"
        style={{
          transform: `translateY(${sliderPosition}px) rotate(${isDragging ? 4 : 0}deg)`,
        }}
        onPointerDown={handlePointerDown}
        onClick={handleThrottleClick}
        title="Pull down or click to unzip architectural workspace"
      >
        {/* Dynamic Voltage Spark Glow at the Teeth Unmeshing Point */}
        <div className="absolute -top-1 w-5 h-5 bg-brand-yellow/80 rounded-full blur-[4px] animate-pulse pointer-events-none" />

        {/* Main Anodized Metal Carriage */}
        <div className="w-15 h-16 bg-[#ffd31e] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_#000] flex flex-col items-center justify-between p-1.5 hover:scale-105 transition-transform group-hover:bg-[#ffde59]">
          
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
              UNZIP
            </span>
          </div>

          {/* Directional Chevron */}
          <ChevronDown className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
        </div>

        {/* Lower Callsign Flag */}
        <div className="mt-1 px-2.5 py-0.5 bg-black border border-black rounded text-[8.5px] font-mono font-bold text-white shadow-[2px_2px_0px_#ffd31e] whitespace-nowrap">
          {progress > 0.05 ? `${Math.round(progress * 100)}% UNZIPPED` : 'PULL TO UNZIP ↓'}
        </div>
      </div>
    </div>
  );
}
