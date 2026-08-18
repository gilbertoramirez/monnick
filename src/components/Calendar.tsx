'use client';

import { EVENT, getGoogleCalendarUrl, generateICS } from '@/lib/config';
import { useToast } from '@/lib/toast-context';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

export default function Calendar() {
  const { show } = useToast();
  const ref = useScrollReveal<HTMLElement>();

  function downloadICS() {
    const blob = new Blob([generateICS()], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monnick-xviii.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    show('Archivo .ics generado');
  }

  return (
    <section id="calendario" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          No se te olvide
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          Agrega al Calendario
        </h2>
        <p className="text-text-soft max-w-[50ch]">
          Bloquea la fecha para que no te la pierdas por nada.
        </p>
      </div>

      <div className="reveal">
        <div className="flex gap-4 mt-8 flex-wrap">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex-1 min-w-[200px]"
          >
            Google Calendar
          </a>
          <button className="btn btn-outline flex-1 min-w-[200px]" onClick={downloadICS}>
            Apple Calendar
          </button>
        </div>

        <div className="mt-6 p-5 bg-surface rounded-[var(--radius-sm)] flex flex-col gap-2 text-[0.9rem] text-text-soft">
          <div className="flex gap-3 items-start"><span className="shrink-0 text-lg">📅</span> {EVENT.dateDisplay}</div>
          <div className="flex gap-3 items-start"><span className="shrink-0 text-lg">🕗</span> {EVENT.timeDisplay} en adelante</div>
          <div className="flex gap-3 items-start"><span className="shrink-0 text-lg">📍</span> {EVENT.venue}, {EVENT.address}</div>
          <div className="flex gap-3 items-start"><span className="shrink-0 text-lg">👗</span> Elegante casual</div>
        </div>
      </div>
    </section>
  );
}
