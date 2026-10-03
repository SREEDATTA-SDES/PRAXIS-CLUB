import React, { useEffect, useRef } from 'react';

export const AtmosphericBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system (subtle dust motes & blue luminescence)
    const particleCount = window.innerWidth < 768 ? 25 : 55;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.4 ? 'rgba(32, 217, 255,' : 'rgba(40, 118, 184,'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(32, 217, 255, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep navy vignette & atmospheric lighting */}
      <div className="absolute inset-0 bg-[#07090D]" />
      <div className="absolute inset-0 cinematic-glow-top opacity-70" />
      <div className="absolute inset-0 cinematic-glow-cyan opacity-40" />
      <div className="absolute inset-0 cinematic-glow-amber opacity-30" />
      <div className="absolute inset-0 cinematic-vignette" />
      
      {/* Fine particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 bg-subtle-grid opacity-15 pointer-events-none" />
    </div>
  );
};
