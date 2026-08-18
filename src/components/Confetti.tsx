'use client';

import { useRef, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';

export interface ConfettiHandle {
  fire: () => void;
}

const COLORS = ['#FF2D78', '#C792EA', '#FFD700', '#FF85AD', '#E8D4F5', '#FF6BA6'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  w: number; h: number;
  color: string;
  rotation: number; rv: number;
  life: number;
}

const Confetti = forwardRef<ConfettiHandle>(function Confetti(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const running = useRef(false);

  useEffect(() => {
    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const animate = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);

    let alive = false;
    for (const p of particles.current) {
      if (p.life <= 0) continue;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4;
      p.vx *= 0.99;
      p.rotation += p.rv;
      p.life -= 0.008;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (alive) {
      requestAnimationFrame(animate);
    } else {
      running.current = false;
      ctx.clearRect(0, 0, c.width, c.height);
    }
  }, []);

  const fire = useCallback(() => {
    const ps: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      ps.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 18 - 5,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        rv: (Math.random() - 0.5) * 12,
        life: 1,
      });
    }
    particles.current = ps;
    if (!running.current) {
      running.current = true;
      animate();
    }
  }, [animate]);

  useImperativeHandle(ref, () => ({ fire }), [fire]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
});

export default Confetti;
