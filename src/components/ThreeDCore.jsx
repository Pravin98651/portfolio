import React, { useEffect, useRef } from 'react';

/**
 * ThreeDCore: Lightweight, zero-dependency 3D Canvas rendering a tumbling
 * cybernetic polyhedron (Icosahedron + floating energy nodes) with neon vertices,
 * mouse parallax response, and glowing orbital rings.
 */
export default function ThreeDCore({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 280);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 280);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 280;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 280;
    };
    window.addEventListener('resize', handleResize);

    // 12 Vertices of an Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio ~1.618
    const baseVertices = [
      [-1,  phi, 0],
      [ 1,  phi, 0],
      [-1, -phi, 0],
      [ 1, -phi, 0],
      [0, -1,  phi],
      [0,  1,  phi],
      [0, -1, -phi],
      [0,  1, -phi],
      [ phi, 0, -1],
      [ phi, 0,  1],
      [-phi, 0, -1],
      [-phi, 0,  1],
    ];

    // Normalize scale
    const scale = 54 * (window.devicePixelRatio || 1);
    const vertices = baseVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [(x / len) * scale, (y / len) * scale, (z / len) * scale];
    });

    // Edges of the icosahedron (pairs of vertex indices)
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // In normalized icosahedron, connected vertices have distance ~ 1.05
        if (dist < scale * 1.15) {
          edges.push([i, j]);
        }
      }
    }

    // Orbiting energy particles
    const particles = Array.from({ length: 18 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      radius: (scale * 1.35) + Math.random() * (scale * 0.5),
      yOffset: (Math.random() - 0.5) * scale,
      size: 1.5 + Math.random() * 2,
      color: Math.random() > 0.5 ? '#00f0ff' : '#ffd31e'
    }));

    let rotX = 0.4;
    let rotY = 0.6;
    let rotZ = 0.2;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.6;
      mouseY = y * 0.6;
    };
    window.addEventListener('pointermove', handlePointerMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotX += 0.008 + mouseY * 0.03;
      rotY += 0.012 + mouseX * 0.03;
      rotZ += 0.005;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // Project vertices to 2D screen
      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * cosY + z * sinY;
        let y1 = y;
        let z1 = -x * sinY + z * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        // Perspective projection
        const fov = 320 * (window.devicePixelRatio || 1);
        const distance = fov + z3;
        const pScale = fov / distance;
        const px = width / 2 + x3 * pScale;
        const py = height / 2 + y3 * pScale;

        return { px, py, z: z3, pScale };
      });

      // Draw glowing background energy ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, scale * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.restore();

      // Draw Edges with depth-based opacity and neon gradient
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.9, (avgZ + scale) / (2 * scale)));

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.75})`;
        ctx.lineWidth = Math.max(1, (1.8 * (p1.pScale + p2.pScale)) / 2);
        ctx.stroke();
      });

      // Draw Vertices as glowing neon nodes
      projected.forEach((p, idx) => {
        const radius = Math.max(2, 3.5 * p.pScale);
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? '#ffd31e' : '#00f0ff';
        ctx.shadowColor = idx % 2 === 0 ? '#ffd31e' : '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw orbiting particles
      particles.forEach((part) => {
        part.angle += part.speed;
        const px = width / 2 + Math.cos(part.angle) * part.radius;
        const py = height / 2 + Math.sin(part.angle) * (part.radius * 0.45) + part.yOffset;

        ctx.beginPath();
        ctx.arc(px, py, part.size * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.shadowColor = part.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[280px] max-h-[280px]"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
