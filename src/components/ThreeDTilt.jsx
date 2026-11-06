import React, { useRef, useState, useCallback } from 'react';

/**
 * ThreeDTilt: High-performance 3D mouse parallax tilt wrapper with
 * dynamic specular reflection glare and smooth spring physics.
 */
export default function ThreeDTilt({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  scale = 1.02,
  style = {},
  onClick
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransform({
      rotateX: Number(rotateX.toFixed(2)),
      rotateY: Number(rotateY.toFixed(2)),
      scale,
      glareX: Number(glareX.toFixed(1)),
      glareY: Number(glareY.toFixed(1)),
      glareOpacity: 0.25
    });
  }, [maxTilt, scale]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-style-3d ${className}`}
      style={{
        perspective: '1200px',
        transform: `perspective(1200px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`,
        transition: isHovered ? 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        willChange: 'transform',
        ...style
      }}
    >
      {children}

      {/* Dynamic Specular Reflection Glare Overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
          style={{
            opacity: transform.glareOpacity,
            background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 30%, transparent 65%)`,
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </div>
  );
}
