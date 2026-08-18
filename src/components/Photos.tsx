'use client';

import { useEffect, useRef } from 'react';
import { EVENT } from '@/lib/config';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

function drawQR(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const size = 180;
  const modules = 25;
  const cell = size / modules;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#1E0E2B';

  const fill = (r: number, c: number) => ctx.fillRect(c * cell, r * cell, cell, cell);

  function drawFinder(sr: number, sc: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const outer = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (outer || inner) fill(sr + r, sc + c);
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(0, modules - 7);
  drawFinder(modules - 7, 0);

  for (let i = 8; i < modules - 8; i++) {
    if (i % 2 === 0) { fill(6, i); fill(i, 6); }
  }

  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
        fill(18 + r, 18 + c);
      }
    }
  }

  let seed = 42;
  const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (row < 9 && col < 9) continue;
      if (row < 9 && col >= modules - 9) continue;
      if (row >= modules - 9 && col < 9) continue;
      if (row === 6 || col === 6) continue;
      if (row >= 16 && row <= 20 && col >= 16 && col <= 20) continue;
      if (rng() > 0.52) fill(row, col);
    }
  }
}

const TIPS = [
  { icon: '📱', title: 'POV', desc: 'Graba tu punto de vista llegando a la fiesta y súbelo al álbum' },
  { icon: '📸', title: 'Photo dump', desc: 'Sube todas tus fotos y videos sin filtro' },
  { icon: '✨', title: 'Lypse', desc: 'Los mejores momentos los editamos juntos después' },
  { icon: '🎬', title: EVENT.hashtag, desc: 'Usa el hashtag en todas tus historias y posts' },
];

export default function Photos() {
  const ref = useScrollReveal<HTMLElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) drawQR(canvasRef.current);
  }, []);

  return (
    <section id="fotos" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          Recuerdos compartidos
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          Fotos del Evento
        </h2>
        <p className="text-text-soft max-w-[50ch]">
          El día de la fiesta escanea el QR para subir tus fotos y videos al álbum compartido.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8 reveal">
        {/* QR */}
        <div className="card flex flex-col items-center gap-5 text-center">
          <div className="qr-wrap">
            <canvas ref={canvasRef} width={180} height={180} className="block rounded-[var(--radius-xs)]" />
          </div>
          <p className="text-sm text-text-soft max-w-[30ch]">
            Escanea el día del evento para acceder al álbum compartido de Google Photos
          </p>
        </div>

        {/* Tips */}
        <div className="flex flex-col gap-3">
          {TIPS.map((tip) => (
            <div key={tip.title} className="card flex items-start gap-3 !p-4">
              <span className="text-2xl shrink-0 leading-none">{tip.icon}</span>
              <p className="text-[0.88rem] text-text-soft">
                <strong className="text-text-main">{tip.title}</strong> — {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
