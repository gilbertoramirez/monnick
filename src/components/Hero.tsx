'use client';

import { useEffect, useState } from 'react';
import { EVENT } from '@/lib/config';

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

export default function Hero() {
  const cd = useCountdown(EVENT.date);

  const units: { value: number; label: string }[] = [
    { value: cd.days, label: 'Días' },
    { value: cd.hours, label: 'Horas' },
    { value: cd.mins, label: 'Min' },
    { value: cd.secs, label: 'Seg' },
  ];

  return (
    <section id="hero" className="relative min-h-dvh flex flex-col items-center justify-center text-center px-6 py-8 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-blob" />
        <div className="hero-blob" />
        <div className="hero-blob" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="font-[family-name:var(--font-syne)] text-[clamp(0.85rem,2vw,1.1rem)] font-semibold tracking-[0.25em] uppercase text-text-soft mb-4">
          Estás invitad@ a
        </p>
        <h1 className="hero-name font-[family-name:var(--font-syne)]">MONNICK</h1>
        <p className="font-[family-name:var(--font-syne)] text-[clamp(1.2rem,3.5vw,2rem)] font-bold text-text-main tracking-[0.05em] mb-12">
          cumple XVIII
        </p>

        {/* Countdown */}
        <div className="flex gap-4 justify-center flex-wrap mb-10">
          {units.map((u) => (
            <div
              key={u.label}
              className="bg-glass backdrop-blur-[20px] border border-glass-border rounded-[var(--radius)] px-6 py-5 min-w-[90px] text-center"
            >
              <div className="font-[family-name:var(--font-syne)] text-[2.5rem] font-extrabold text-accent leading-none tabular-nums">
                {u.value}
              </div>
              <div className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-text-soft mt-1">
                {u.label}
              </div>
            </div>
          ))}
        </div>

        <p className="text-text-soft font-medium">{EVENT.dateDisplay} · {EVENT.timeDisplay}</p>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-soft">
        <span className="w-px h-7 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
