import React, { useState, useRef, useEffect, useCallback } from 'react';
import { portfolioData } from '../portfolioData';
import { RotateCw, ArrowRight, Download, Sparkles, Wind, Mail } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function IdBadge({ onOpenResume }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { personal } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    sound.playSuccess();
    navigator.clipboard.writeText(personal.email || 'pravin98651@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // DOM Refs for direct 60/120fps physics updates
  const containerRef = useRef(null);
  const lanyardRef = useRef(null);
  const badgeWrapperRef = useRef(null);
  const card3DRef = useRef(null);
  const sheenRef = useRef(null);
  const sheenBackRef = useRef(null);
  const animFrameId = useRef(null);

  // Physics simulation state
  const physics = useRef({
    // Displacement
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    // Pendulum angular rotation (degrees)
    rot: 0,
    vRot: 0,
    // 3D Perspective Tilt (degrees)
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    // Drag tracking
    isDragging: false,
    hasDragged: false,
    startX: 0,
    startY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    lastTime: 0,
  });

  // Apply transforms directly to DOM elements for ultra-high performance
  const applyTransforms = useCallback(() => {
    const p = physics.current;
    
    // 1. Dynamic Lanyard: Hinges from top anchor, swings with reduced amplitude
    if (lanyardRef.current) {
      const strapAngle = p.rot * 0.65;
      const strapX = p.x * 0.35;
      const strapY = Math.max(0, p.y * 0.16);
      lanyardRef.current.style.transform = `translate3d(${strapX}px, ${strapY}px, 0) rotate(${strapAngle}deg)`;
    }

    // 2. Badge Outer Wrapper: Translates and rotates as an articulated pendulum
    if (badgeWrapperRef.current) {
      badgeWrapperRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
    }

    // 3. Card 3D Flip & Perspective Tilt
    if (card3DRef.current) {
      const flipRotation = isFlipped ? 180 : 0;
      card3DRef.current.style.transform = `perspective(1000px) rotateX(${p.tiltX}deg) rotateY(${p.tiltY + flipRotation}deg)`;
      
      // Dynamic drop shadow reacting to 3D elevation
      const shadowX = Math.round(8 + p.x * 0.12);
      const shadowY = Math.round(8 + Math.max(0, p.y * 0.22) + Math.abs(p.rot) * 0.1);
      card3DRef.current.style.boxShadow = `${shadowX}px ${shadowY}px 0px #000000`;
    }

    // 4. Specular Holographic Glare / Sheen angle shifts dynamically with tilt and swing
    const sheenX = 50 + (p.tiltY / 15) * 40;
    const sheenY = 50 - (p.tiltX / 15) * 40;
    const sheenStyle = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.48) 0%, rgba(255,215,0,0.2) 35%, transparent 70%)`;
    
    if (sheenRef.current) {
      sheenRef.current.style.background = sheenStyle;
    }
    if (sheenBackRef.current) {
      sheenBackRef.current.style.background = sheenStyle;
    }
  }, [isFlipped]);

  // Main physics simulation loop
  const startPhysicsLoop = useCallback(() => {
    if (animFrameId.current) return;

    const tick = () => {
      const p = physics.current;

      if (!p.isDragging) {
        // Natural spring & pendulum constants
        const kSpring = 0.042;     // elastic tension towards anchor
        const damping = 0.89;      // linear velocity damping
        const kRot = 0.048;        // pendulum gravity restoring torque
        const rotDamping = 0.90;   // rotational friction

        // Spring forces
        const fx = -kSpring * p.x;
        const fy = -kSpring * p.y;
        p.vx = (p.vx + fx) * damping;
        p.vy = (p.vy + fy) * damping;
        p.x += p.vx;
        p.y += p.vy;

        // Pendulum rotational dynamics coupled to horizontal motion and acceleration
        const torque = -kRot * p.rot - (p.x * 0.16) - (p.vx * 0.22);
        p.vRot = (p.vRot + torque) * rotDamping;
        p.rot += p.vRot;

        // Smooth hover tilt restoration
        p.tiltX += (p.targetTiltX - p.tiltX) * 0.14;
        p.tiltY += (p.targetTiltY - p.tiltY) * 0.14;
      } else {
        // While dragging, smooth 3D tilt tracking
        p.tiltX += (p.targetTiltX - p.tiltX) * 0.25;
        p.tiltY += (p.targetTiltY - p.tiltY) * 0.25;
      }

      applyTransforms();

      // Check if simulation should continue running
      const isStillActive =
        p.isDragging ||
        Math.abs(p.vx) > 0.02 ||
        Math.abs(p.vy) > 0.02 ||
        Math.abs(p.x) > 0.15 ||
        Math.abs(p.y) > 0.15 ||
        Math.abs(p.vRot) > 0.02 ||
        Math.abs(p.rot) > 0.1 ||
        Math.abs(p.targetTiltX - p.tiltX) > 0.1 ||
        Math.abs(p.targetTiltY - p.tiltY) > 0.1;

      if (isStillActive) {
        animFrameId.current = requestAnimationFrame(tick);
      } else {
        // Snap to complete rest
        p.x = 0;
        p.y = 0;
        p.vx = 0;
        p.vy = 0;
        p.rot = 0;
        p.vRot = 0;
        p.tiltX = p.targetTiltX;
        p.tiltY = p.targetTiltY;
        applyTransforms();
        animFrameId.current = null;
      }
    };

    animFrameId.current = requestAnimationFrame(tick);
  }, [applyTransforms]);

  // Flip toggle handler
  const toggleFlip = useCallback((e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    sound.playFlip();
    setIsFlipped((prev) => !prev);
  }, []);

  // When flip state changes, re-apply transforms immediately
  useEffect(() => {
    applyTransforms();
  }, [isFlipped, applyTransforms]);

  // Impulse kick: simulate flicking or pushing the badge
  const triggerImpulse = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    sound.playSpring();
    const p = physics.current;
    const direction = Math.random() > 0.5 ? 1 : -1;
    p.vx += direction * (22 + Math.random() * 10);
    p.vy += Math.random() * 6;
    p.vRot += direction * (14 + Math.random() * 8);
    startPhysicsLoop();
  };

  // Pointer Down (Mouse or Touch Grab)
  const handlePointerDown = (e) => {
    // If clicking a link or button directly, allow native click without drag
    if (e.target.closest('button, a, input, select')) return;

    // Prevent text selection during grab
    e.preventDefault();

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore fallback if unsupported
    }

    const p = physics.current;
    p.isDragging = true;
    p.hasDragged = false;
    p.startX = e.clientX;
    p.startY = e.clientY;
    p.lastPointerX = e.clientX;
    p.lastPointerY = e.clientY;
    p.lastTime = performance.now();

    setIsDragging(true);
    sound.playClick();
    startPhysicsLoop();
  };

  // Pointer Move (Drag or Hover)
  const handlePointerMove = (e) => {
    const p = physics.current;

    if (p.isDragging) {
      const dx = e.clientX - p.startX;
      const dy = e.clientY - p.startY;

      // Check drag threshold
      if (Math.hypot(dx, dy) > 4) {
        p.hasDragged = true;
      }

      // Elastic rubber-band resistance curve
      const resistanceFactorX = 1 + Math.abs(dx) / 340;
      const resistanceFactorY = 1 + Math.abs(dy) / 240;
      const targetX = dx / resistanceFactorX;
      const targetY = Math.max(-35, dy / resistanceFactorY);

      p.x = targetX;
      p.y = targetY;

      // Dynamic pendulum rotation responding to displacement
      p.rot = Math.max(-42, Math.min(42, (targetX / 160) * 32));

      // 3D tilt responding to pull direction
      p.targetTiltX = Math.max(-20, Math.min(20, targetY * 0.18));
      p.targetTiltY = Math.max(-20, Math.min(20, -targetX * 0.18));

      // Calculate instantaneous release velocity
      const now = performance.now();
      const dt = Math.max(1, now - p.lastTime);
      p.vx = ((e.clientX - p.lastPointerX) / dt) * 16;
      p.vy = ((e.clientY - p.lastPointerY) / dt) * 16;
      p.lastPointerX = e.clientX;
      p.lastPointerY = e.clientY;
      p.lastTime = now;

      applyTransforms();
    } else {
      // Subtle natural mouse-tracking tilt when hovering
      if (!card3DRef.current) return;
      const rect = card3DRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      p.targetTiltX = Math.max(-14, Math.min(14, -ny * 10));
      p.targetTiltY = Math.max(-14, Math.min(14, nx * 10));
      startPhysicsLoop();
    }
  };

  // Pointer Up (Release or Click)
  const handlePointerUp = (e) => {
    const p = physics.current;
    if (!p.isDragging) return;

    p.isDragging = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (!p.hasDragged) {
      // Clean tap/click -> flip card!
      toggleFlip();
    } else {
      // Elastic fling release!
      p.vx = Math.max(-28, Math.min(28, p.vx));
      p.vy = Math.max(-28, Math.min(28, p.vy));
      p.vRot = p.vx * 0.45;
      sound.playSpring();
      p.targetTiltX = 0;
      p.targetTiltY = 0;
      startPhysicsLoop();
    }
  };

  const handlePointerLeave = () => {
    const p = physics.current;
    if (!p.isDragging) {
      p.targetTiltX = 0;
      p.targetTiltY = 0;
      startPhysicsLoop();
    }
  };

  // Double click gives an instant fun wobble
  const handleDoubleClick = (e) => {
    if (e.target.closest('button, a')) return;
    triggerImpulse(e);
  };

  // Cleanup anim frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative select-none flex flex-col items-center group py-2"
    >
      {/* Interactive Physics Status Pill Header */}
      <div className="flex items-center gap-1.5 px-3 py-1 bg-black/90 text-white rounded-full border border-black text-[10px] font-mono font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000] z-20">
        <Sparkles className="w-3 h-3 text-brand-yellow animate-spin-slow" />
        <span className="hidden sm:inline">PHYSICAL PENDULUM ·</span>
        <span>DRAG & FLING</span>
      </div>

      {/* Top Fixed Wall Anchor Bracket */}
      <div className="flex flex-col items-center z-10 select-none">
        <div className="w-7 h-3 bg-[#23272f] border-2 border-black rounded-t-md flex items-center justify-center shadow-xs">
          <div className="w-2.5 h-1 bg-amber-400 rounded-full" />
        </div>
      </div>

      {/* Articulated Heavy-Duty Industrial Lanyard Strap (Hinges from Top Center Anchor) */}
      <div
        ref={lanyardRef}
        className="flex flex-col items-center z-10 -mb-2 transition-none origin-top will-change-transform"
      >
        {/* Woven Industrial Strap with Ribbed Texture */}
        <div className="w-6 sm:w-7 h-14 sm:h-20 bg-gradient-to-b from-[#f36b16] to-[#b43200] border-x-[3px] border-black relative overflow-hidden shadow-md">
          {/* Subtle woven industrial herringbone texture */}
          <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(45deg,#000_0px,#000_3px,transparent_3px,transparent_7px)]" />
          <div className="absolute inset-y-0 left-1 w-[1px] bg-white/40" />
          <div className="absolute inset-y-0 right-1 w-[1px] bg-black/40" />
        </div>

        {/* Industrial Metal Clasp & Quick-Release Buckle */}
        <div className="w-9 sm:w-10 h-7 bg-[#23272f] border-2 border-black rounded-md flex flex-col items-center justify-between py-1 shadow-md relative">
          <div className="w-7 h-1 bg-black rounded-full" />
          <div className="w-5 h-1 bg-amber-400 rounded-full" />
          <div className="w-7 h-1 bg-black rounded-full" />
        </div>

        {/* Heavy Swivel Carabiner Metal Ring */}
        <div className="w-5 h-6 border-[2.5px] border-black rounded-b-lg bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] -mt-1 shadow-sm flex items-end justify-center pb-0.5">
          <div className="w-2.5 h-1 bg-black/80 rounded-full" />
        </div>
      </div>

      {/* Badge Pendulum Outer Wrapper (Swings & Translates on requestAnimationFrame) */}
      <div
        ref={badgeWrapperRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onDoubleClick={handleDoubleClick}
        className={`relative origin-top will-change-transform touch-none ${
          isDragging ? 'cursor-grabbing scale-102' : 'cursor-grab hover:scale-101'
        } transition-transform duration-75`}
      >
        {/* The 3D Physical ID Badge Card */}
        <div
          ref={card3DRef}
          className="relative w-[245px] sm:w-[270px] h-[395px] sm:h-[425px] rounded-2xl will-change-transform select-none"
          style={{
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            boxShadow: '8px 8px 0px #000000',
            transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.34, 1.3, 0.64, 1)',
          }}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden p-4 flex flex-col justify-between border-[3.5px] border-black bg-gradient-to-b from-[#ffd31e] via-[#fffbeb] to-[#fbbf24]"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              opacity: isFlipped ? 0 : 1,
              pointerEvents: isFlipped ? 'none' : 'auto',
              transition: 'opacity 0.25s ease-in-out',
            }}
          >
            {/* Holographic Specular Reflection Foil Overlays for Front */}
            <div
              ref={sheenRef}
              className={`absolute inset-0 pointer-events-none rounded-2xl z-30 transition-opacity duration-300 ${
                isFlipped ? 'opacity-0' : isDragging ? 'opacity-70' : 'opacity-40'
              }`}
            />
            {/* Top Lanyard Slot & Flip Button */}
            <div className="relative flex items-center justify-between mb-1 pb-1 border-b-2 border-black/80">
              <div className="w-14" />

              {/* Lanyard Hole cutout */}
              <div className="w-12 h-3 bg-[#111] rounded-full border-2 border-black mx-auto" />

              {/* Prominent Flip Button */}
              <button
                type="button"
                onClick={toggleFlip}
                title="Flip badge to view resume & download"
                className="px-2 py-0.5 bg-black hover:bg-brand-orange text-brand-yellow hover:text-white border-2 border-black rounded-md flex items-center gap-1 font-mono font-black text-[10px] uppercase transition-all shadow-[1.5px_1.5px_0px_#000] hover:scale-105 cursor-pointer"
              >
                <span>FLIP</span>
                <RotateCw className="w-3 h-3 animate-spin-slow" />
              </button>
            </div>

            {/* Halftone Portrait Box with Pravin's Avatar */}
            <div className="relative mx-auto w-full h-[185px] sm:h-[200px] border-2 border-black rounded-xl halftone-pink overflow-hidden shadow-inner flex items-center justify-center bg-black pointer-events-none">
              <img
                src={personal.avatar}
                alt={personal.fullName}
                className="w-full h-full object-cover object-center pointer-events-none"
              />
              
              {/* Holographic Security Stamp Badge */}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded border border-black/80 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-sm font-mono text-[8.5px] font-black text-black uppercase tracking-tight flex items-center gap-1 -rotate-3">
                <Sparkles className="w-2.5 h-2.5 fill-black" />
                <span>OFFICIAL</span>
              </div>


            </div>

            {/* Physical Label: Name & Professional Title */}
            <div className="relative mt-1 bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_#000] text-center pointer-events-none">
              <div className="text-black font-black text-xl sm:text-2xl leading-none uppercase tracking-tight">
                {personal.name}
              </div>
              <div className="text-brand-orange font-bold text-xs mt-0.5 font-mono">
                {personal.role}
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="mt-1 flex items-center justify-center gap-2 relative z-20">
              {personal.socials.map((s) => {
                if (s.id === 'resume') {
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        if (onOpenResume) onOpenResume();
                      }}
                      title="Open Official Résumé Dossier"
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-black hover:bg-brand-yellow hover:text-black text-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                    >
                      <img src={s.icon} alt={s.label} className="w-3.5 h-3.5 invert hover:invert-0" />
                    </button>
                  );
                }

                const isExternal = typeof s.href === 'string' && s.href.startsWith('http');
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                    }}
                    title={s.label}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-black hover:bg-brand-orange text-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                  >
                    <img src={s.icon} alt={s.label} className="w-3.5 h-3.5 invert" />
                  </a>
                );
              })}
            </div>

            {/* Industrial Scannable Barcode & Interactive Physics Hint */}
            <div className="pt-1 flex items-center justify-between border-t border-black/40 font-mono text-[9px] text-gray-800 pointer-events-none">
              <span className="font-bold tracking-widest truncate select-none">||| | |||| | ||| | ||</span>
              <span className="uppercase text-black font-black flex items-center gap-1 hover:text-brand-orange">
                <span>DRAG · FLICK · FLIP ⟲</span>
              </span>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden p-3 sm:p-3.5 flex flex-col justify-between text-center border-[3.5px] border-black bg-gradient-to-b from-[#ffd31e] via-[#fffbeb] to-[#fbbf24]"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              opacity: isFlipped ? 1 : 0,
              pointerEvents: isFlipped ? 'auto' : 'none',
              transition: 'opacity 0.25s ease-in-out',
            }}
          >
            {/* Holographic Specular Foil for Back */}
            <div
              ref={sheenBackRef}
              className={`absolute inset-0 pointer-events-none rounded-2xl z-30 transition-opacity duration-300 ${
                !isFlipped ? 'opacity-0' : isDragging ? 'opacity-70' : 'opacity-40'
              }`}
            />
            {/* Top Lanyard Slot & Flip Back Button */}
            <div className="relative flex items-center justify-between mb-0.5 pb-1 border-b-2 border-black/80">
              <span className="font-mono text-[8.5px] font-black uppercase tracking-wider text-brand-yellow bg-black px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_#000]">
                DEV-ID // ACCESS PASS
              </span>

              {/* Lanyard Hole cutout */}
              <div className="w-10 h-2.5 bg-[#111] rounded-full border-2 border-black mx-auto" />

              {/* Flip to Front Button */}
              <button
                type="button"
                onClick={toggleFlip}
                title="Flip to Front (Photo & Socials)"
                className="px-2 py-0.5 bg-black hover:bg-brand-orange text-brand-yellow hover:text-white border-2 border-black rounded-md flex items-center gap-1 font-mono font-black text-[9.5px] uppercase transition-all shadow-[1.5px_1.5px_0px_#000] hover:scale-105 cursor-pointer"
              >
                <span>FRONT</span>
                <RotateCw className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Magnetic Stripe Graphic */}
            <div className="w-full h-3.5 bg-[#0e0f14] border border-black rounded-xs flex items-center justify-between px-2 font-mono text-[7.5px] text-gray-400 select-none">
              <span className="flex items-center gap-1 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                <span>MAGSTRIPE // AUTH LEVEL-02</span>
              </span>
              <span className="text-brand-orange-dark font-black tracking-widest">SN: 2026-ENG-PAT20</span>
            </div>

            {/* Back Card Header & Identity */}
            <div className="space-y-0.5 mt-0.5">
              <div>
                <h3 className="text-black font-black text-base sm:text-lg leading-none uppercase tracking-tight">
                  {personal.name}
                </h3>
                <div className="text-[10px] font-mono font-bold text-brand-orange-dark uppercase mt-0.5">
                  {personal.role}
                </div>
              </div>

              {/* Clearance & Availability Badge */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/95 text-emerald-900 border-2 border-black rounded-full font-mono text-[8.5px] font-black shadow-[1px_1px_0px_#000]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN FOR ROLES // GLOBAL & REMOTE</span>
              </div>
            </div>

            {/* Key Verified Credentials Matrix */}
            <div className="grid grid-cols-2 gap-1.5 my-1 font-mono">
              <div className="p-1 bg-white/95 border-2 border-black rounded-lg shadow-[1.5px_1.5px_0px_#000] text-center">
                <span className="text-black font-black text-[10px] block leading-tight">📜 20+ PATENTS</span>
                <span className="text-[8px] font-bold text-gray-500 uppercase">PUBLISHED</span>
              </div>
              <div className="p-1 bg-white/95 border-2 border-black rounded-lg shadow-[1.5px_1.5px_0px_#000] text-center">
                <span className="text-black font-black text-[10px] block leading-tight">🏆 8+ HACKATHONS</span>
                <span className="text-[8px] font-bold text-gray-500 uppercase">PODIUM WINS</span>
              </div>
            </div>

            {/* Core Capabilities Box */}
            <div className="py-1 px-2 bg-white/95 border-2 border-black rounded-xl text-left shadow-[2px_2px_0px_#000] text-[9.5px] font-mono font-bold space-y-0.5">
              <div className="flex items-center justify-between text-[8px] text-gray-500 font-extrabold uppercase border-b border-gray-200 pb-0.5 mb-1">
                <span>CORE SPECIALTIES</span>
                <span className="text-emerald-700">VERIFIED BUILDER</span>
              </div>
              <div className="text-gray-900 truncate flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-brand-orange shrink-0" />
                <span>LLMs, LangGraph & Agentic Systems</span>
              </div>
              <div className="text-gray-900 truncate flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-brand-orange shrink-0" />
                <span>FastAPI, Next.js 14 & React Native</span>
              </div>
              <div className="text-gray-900 truncate flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-brand-orange shrink-0" />
                <span>Hybrid RAG, pgvector & FAISS Dense Search</span>
              </div>
            </div>

            {/* Direct Contact Dispatch with 1-Click Copy */}
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Click to copy email address"
              className="w-full py-1 px-2 bg-white hover:bg-yellow-50 border-2 border-black rounded-lg flex items-center justify-between font-mono text-[9px] font-bold text-gray-800 transition-colors shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
            >
              <span className="flex items-center gap-1.5 text-black truncate">
                <Mail className="w-3 h-3 text-brand-orange shrink-0" />
                <span className="truncate">{personal.email}</span>
              </span>
              <span className="text-[8px] font-black uppercase text-black bg-brand-yellow px-1.5 py-0.2 rounded border border-black shrink-0">
                {copiedEmail ? 'COPIED! ✓' : 'COPY'}
              </span>
            </button>

            {/* Action Buttons */}
            <div className="space-y-1 relative z-20">
              <a
                href={personal.backCard.downloadUrl || "/assets/Pravin_Resume.pdf"}
                download="Pravin_Resume.pdf"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playSuccess();
                }}
                className="w-full py-2 px-3 bg-black hover:bg-neutral-800 text-brand-yellow hover:text-white font-black text-xs uppercase tracking-wider rounded-xl border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                <span>DOWNLOAD CV / RÉSUMÉ</span>
              </a>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  if (onOpenResume) onOpenResume();
                }}
                className="w-full py-1 px-2 bg-white hover:bg-black hover:text-white text-black font-mono font-bold text-[9.5px] uppercase tracking-wider rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span>VIEW INTERACTIVE DOSSIER TAB</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Industrial Security Barcode & Footer Flip Note */}
            <div className="pt-1 flex items-center justify-between border-t border-black/30 font-mono text-[8.5px] text-gray-700">
              <span className="font-bold tracking-widest select-none truncate">||| || | |||| ||| ||||</span>
              <button
                type="button"
                onClick={toggleFlip}
                className="text-[8.5px] font-black text-black hover:text-brand-orange uppercase flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>FLIP TO PHOTO ⟲</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Physics Quick Controls Bar */}
      <div className="mt-3 flex items-center gap-2 z-20">
        <button
          type="button"
          onClick={triggerImpulse}
          title="Flick badge to start physics pendulum swing"
          className="px-3 py-1.5 bg-white hover:bg-brand-yellow text-black border-2 border-black rounded-xl font-mono text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Wind className="w-3.5 h-3.5 text-brand-orange-dark" />
          <span>SWING BADGE</span>
        </button>

        <button
          type="button"
          onClick={toggleFlip}
          title="Turn badge over"
          className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white border-2 border-black rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_#ffd31e] hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5 text-brand-yellow" />
          <span>{isFlipped ? 'FRONT' : 'FLIP'}</span>
        </button>
      </div>
    </div>
  );
}
