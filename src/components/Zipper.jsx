import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/soundEffects';

export default function Zipper({ progress, onProgressChange, onToggleOpen, isOpen }) {
  const [isDragging, setIsDragging] = useState(false);
  const zipperRef = useRef(null);
  const lastSoundProgress = useRef(0);

  // Trigger tactile zipper sound when progress moves significantly
  const maybePlayZipperSound = (newProg) => {
    if (Math.abs(newProg - lastSoundProgress.current) > 0.08) {
      sound.playZipper();
      lastSoundProgress.current = newProg;
    }
  };

  // Synchronize zipper progress with window scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;
      const scrollThreshold = 420; // pixels to full unzip
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const prog = Math.min(1, Math.max(0, currentScroll / scrollThreshold));
      maybePlayZipperSound(prog);
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

  // Handle pointer down on slider
  const handlePointerDown = (e) => {
    sound.playClick();
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  // Handle pointer move during drag
  const handlePointerMove = (e) => {
    if (!isDragging || !zipperRef.current) return;
    const rect = zipperRef.current.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const maxDrag = Math.max(100, rect.height - 90);
    const clampedY = Math.max(0, Math.min(maxDrag, offsetY));
    const newProgress = clampedY / maxDrag;

    maybePlayZipperSound(newProgress);
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
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onToggleOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Click on the slider or scroll pull tab
  const handlePullTabClick = (e) => {
    e.stopPropagation();
    sound.playZipper();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Height of the track
  const trackHeight = 720;
  const sliderPosition = progress * (trackHeight - 90);

  return (
    <div
      ref={zipperRef}
      className="relative h-[720px] w-12 sm:w-14 flex items-center justify-center select-none z-30 touch-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Central zipper seam */}
      <div className="absolute inset-y-0 w-8 flex items-center justify-center overflow-hidden">
        {/* Left zipper teeth */}
        <div
          className="absolute left-0 top-0 w-4 h-full bg-repeat-y opacity-90 transition-transform duration-200"
          style={{
            backgroundImage: "url('/assets/left-zip.svg')",
            backgroundSize: '16px auto',
            transform: progress > 0.05 ? `translateX(-${progress * 9}px)` : 'none'
          }}
        />

        {/* Right zipper teeth */}
        <div
          className="absolute right-0 top-0 w-4 h-full bg-repeat-y opacity-90 transition-transform duration-200"
          style={{
            backgroundImage: "url('/assets/right-zip.svg')",
            backgroundSize: '16px auto',
            transform: progress > 0.05 ? `translateX(${progress * 9}px)` : 'none'
          }}
        />

        {/* Center metal tooth line */}
        <div className="w-[3px] h-full bg-[#111] z-10" />
      </div>

      {/* The Zipper Slider Puller */}
      <div
        className="absolute top-0 flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform duration-75 group"
        style={{
          transform: `translateY(${sliderPosition}px)`,
        }}
        onPointerDown={handlePointerDown}
        onClick={handlePullTabClick}
        title="Drag or click to scroll down to projects"
      >
        {/* Upper Slider Head (Gold metal clasp) */}
        <div className="w-10 h-10 drop-shadow-[2px_3px_0px_rgba(0,0,0,0.6)] z-20">
          <img
            src="/assets/logo-upper.svg"
            alt="Zipper Head"
            className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Lower Puller Tag (Badge with 'scroll' and chevrons) */}
        <div className="w-14 h-12 -mt-1 drop-shadow-[2px_4px_0px_rgba(0,0,0,0.7)] z-20">
          <img
            src="/assets/logo-badge.svg"
            alt="Scroll Pull Tab"
            className={`w-full h-full object-contain pointer-events-none group-hover:translate-y-1 transition-transform ${
              progress < 0.15 ? 'animate-bounce' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}
