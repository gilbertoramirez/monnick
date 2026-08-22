'use client';

import { EVENT } from '@/lib/config';

export default function Hero() {
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
          Estás invitad@ a mis 18
        </p>
        <div className="mt-10 flex flex-col gap-2">
          <p className="text-text-soft font-medium">{EVENT.dateDisplay} · {EVENT.timeDisplay}</p>
          <p className="text-text-soft text-sm">{EVENT.address}</p>
        </div>
      </div>
    </section>
  );
}
