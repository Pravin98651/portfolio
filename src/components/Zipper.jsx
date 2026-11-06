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
      className="relative h-[720px] w-28 flex items-center justify-center select-none z-30 touch-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Physical Interlocking Zipper Track & Webbing Assembly */}
      <div className="absolute inset-y-0 w-24 flex items-center justify-center pointer-events-none">
        
        {/* Dark Industrial Fabric Webbing Tape along Left & Right */}
        <div className="absolute inset-y-0 w-20 bg-[#1a1c24] border-x-[3px] border-black rounded-lg shadow-[4px_0_12px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Stitched seams */}
          <div className="absolute left-1 inset-y-0 w-[1px] border-r-2 border-dashed border-amber-500/40" />
          <div className="absolute right-1 inset-y-0 w-[1px] border-l-2 border-dashed border-amber-500/40" />
        </div>

        {/* Top Heavy-Duty Metal Stop Bracket */}
        <div className="absolute top-0 w-16 h-5 bg-gradient-to-b from-[#eab308] to-[#ca8a04] border-2 border-black rounded-t-lg z-20 flex items-center justify-between px-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-black/70" />
          <span className="font-mono text-[7px] font-black text-black uppercase tracking-widest">TOP STOP</span>
          <div className="w-2 h-2 rounded-full bg-black/70" />
        </div>

        {/* Bottom Box Stop Bracket */}
        <div className="absolute bottom-0 w-16 h-6 bg-gradient-to-t from-[#ca8a04] to-[#eab308] border-2 border-black rounded-b-lg z-20 flex items-center justify-between px-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-black/70" />
          <span className="font-mono text-[7px] font-black text-black uppercase tracking-widest">BOTTOM</span>
          <div className="w-2 h-2 rounded-full bg-black/70" />
        </div>

        {/* Under-Track Backplate & Exposed Glowing Energy Core */}
        <div className="absolute inset-y-0 w-6 bg-[#090a0f] border-x-2 border-black/90 flex flex-col items-center overflow-hidden shadow-inner">
          {/* Active Energized Voltage Channel that reveals as teeth unzip */}
          <div
            className="w-full bg-gradient-to-b from-brand-yellow via-brand-orange to-amber-500 transition-all duration-75 shadow-[0_0_18px_rgba(243,103,14,0.95)]"
            style={{ height: `${Math.max(6, progress * 100)}%` }}
          />
        </div>

        {/* 36 Heavy Industrial Metal Teeth with Alternating Gunmetal & Brass Finish */}
        <div className="absolute inset-y-0 w-full flex flex-col justify-between py-6">
          {Array.from({ length: 36 }).map((_, i) => {
            const toothProgress = i / 35;
            const isUnmeshed = progress > toothProgress;
            const diff = Math.max(0, progress - toothProgress);
            const separation = isUnmeshed ? Math.min(32, diff * 85) : 0;
            const rotation = isUnmeshed ? Math.min(22, diff * 55) : 0;
            const isBrass = i % 2 === 0;

            const toothGradientLeft = isBrass
              ? 'bg-gradient-to-r from-[#d97706] via-[#fbbf24] to-[#f59e0b]'
              : 'bg-gradient-to-r from-[#1e293b] via-[#475569] to-[#0f172a]';
            const toothGradientRight = isBrass
              ? 'bg-gradient-to-l from-[#d97706] via-[#fbbf24] to-[#f59e0b]'
              : 'bg-gradient-to-l from-[#1e293b] via-[#475569] to-[#0f172a]';

            return (
              <div
                key={i}
                className="relative w-full flex items-center justify-center h-4.5"
              >
                {/* Left Metallic Tooth */}
                <div
                  className={`w-4.5 h-3 ${toothGradientLeft} border-[1.5px] border-black rounded-[2px] shadow-[2px_1px_0px_#000]`}
                  style={{
                    transform: `translateX(-${separation + 1}px) rotate(-${rotation}deg)`,
                    transition: 'transform 0.08s ease-out',
                  }}
                />

                {/* Center Interlocking Seam Line */}
                <div className="w-1" />

                {/* Right Metallic Tooth (Staggered offset by 2px for realistic interlocking mesh) */}
                <div
                  className={`w-4.5 h-3 ${toothGradientRight} border-[1.5px] border-black rounded-[2px] shadow-[2px_1px_0px_#000] translate-y-[2px]`}
                  style={{
                    transform: `translateX(${separation + 1}px) rotate(${rotation}deg)`,
                    transition: 'transform 0.08s ease-out',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Outer Ruler Ticks for Industrial Precision */}
        <div className="absolute left-1 inset-y-0 w-1 flex flex-col justify-between py-6">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1px] bg-amber-400/50 ${i % 4 === 0 ? 'w-2.5 bg-brand-yellow font-mono' : 'w-1'}`}
            />
          ))}
        </div>
        <div className="absolute right-1 inset-y-0 w-1 flex flex-col justify-between py-6 items-end">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`h-[1px] bg-amber-400/50 ${i % 4 === 0 ? 'w-2.5 bg-brand-yellow font-mono' : 'w-1'}`}
            />
          ))}
        </div>
      </div>

      {/* Kinetic Oversized Mechanical Zipper Slider & Pull Tab */}
      <div
        className="absolute top-2 flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform duration-75 group z-40"
        style={{
          transform: `translateY(${sliderPosition}px) rotate(${isDragging ? 5 : 0}deg)`,
        }}
        onPointerDown={handlePointerDown}
        onClick={handleThrottleClick}
        title="Pull down to unzip Pravin's retro-industrial portfolio"
      >
        {/* Dynamic Voltage Spark Glow at the Teeth Unmeshing Point */}
        <div className="absolute -top-2 w-7 h-7 bg-brand-yellow rounded-full blur-[6px] animate-pulse pointer-events-none opacity-90" />

        {/* Main Die-Cast Metallic Slider Carriage */}
        <div className="w-16 h-18 bg-[#ffd31e] hover:bg-[#ffde59] border-[3.5px] border-black rounded-2xl shadow-[5px_5px_0px_#000] flex flex-col items-center justify-between p-1.5 hover:scale-105 transition-transform">
          
          {/* Top Knurled Ridges */}
          <div className="w-full flex items-center justify-center gap-1 pt-0.5">
            <div className="w-2 h-1 bg-black rounded-full" />
            <div className="w-2 h-1 bg-black rounded-full" />
            <div className="w-2 h-1 bg-black rounded-full" />
          </div>

          {/* Center Mechanical Core */}
          <div className="flex flex-col items-center">
            <Zap className="w-5 h-5 text-black fill-current animate-bounce" />
            <span className="font-mono font-black text-[9px] uppercase tracking-wider text-black leading-none mt-0.5">
              UNZIP
            </span>
          </div>

          {/* Directional Down Chevron */}
          <ChevronDown className="w-4 h-4 text-black group-hover:translate-y-1 transition-transform" />
        </div>

        {/* Swivel Ring Link */}
        <div className="w-4 h-3.5 border-2 border-black rounded-md bg-gray-400 -mt-1 shadow-xs" />

        {/* Oversized Heavy Metal Pull Tab */}
        <div className="relative w-14 py-2 bg-gradient-to-b from-[#ffd31e] to-[#f59e0b] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_#000] flex flex-col items-center justify-center -mt-1 group-hover:scale-105 transition-all">
          <div className="w-6 h-1.5 bg-black/80 rounded-full mb-1" />
          <span className="font-mono font-black text-[8px] uppercase tracking-tighter text-black leading-none text-center">
            PULL TO
            <br />
            EXPLORE
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-black animate-pulse mt-0.5" />
        </div>

        {/* Callout Sticker Label near Zipper */}
        <div className="mt-2 px-3 py-1 bg-black border-2 border-black rounded-lg text-[9px] font-mono font-black text-brand-yellow shadow-[3px_3px_0px_#f3670e] whitespace-nowrap animate-pulse">
          {progress > 0.05 ? `${Math.round(progress * 100)}% UNZIPPED ↓` : 'UNZIP MY WORK ↓'}
        </div>
      </div>
    </div>
  );
}
