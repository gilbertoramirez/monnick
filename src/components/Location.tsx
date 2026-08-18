'use client';

import { EVENT } from '@/lib/config';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

export default function Location() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="ubicacion" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          Dónde nos vemos
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          Ubicación
        </h2>
      </div>

      <div className="card reveal mt-8 !p-0 overflow-hidden grid md:grid-cols-2 gap-0">
        {/* Map visual */}
        <div className="relative min-h-[260px] flex items-center justify-center bg-gradient-to-br from-secondary-soft to-highlight">
          <div className="map-grid" />
          <div className="relative z-10">
            <div className="map-pin-head" />
            <div className="w-[30px] h-[6px] bg-black/10 rounded-full mx-auto mt-1" />
          </div>
        </div>

        {/* Info */}
        <div className="p-8 flex flex-col justify-center gap-5">
          <h3 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold">{EVENT.venue}</h3>
          <p className="text-text-soft leading-relaxed">
            {EVENT.addressShort}<br />
            Col. Centro, CDMX<br />
            {EVENT.cp}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Google Maps
            </a>
            <a href={EVENT.wazeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Waze
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
