'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

interface Guest {
  name: string;
  attendance: string;
  companion: string;
}

const LABELS: Record<string, { emoji: string; text: string }> = {
  yes: { emoji: '🎉', text: 'Confirmado' },
  maybe: { emoji: '🤔', text: 'Tal vez' },
  no: { emoji: '😢', text: 'No puede' },
};

export default function GuestList({ refreshKey }: { refreshKey?: number }) {
  const ref = useScrollReveal<HTMLElement>();
  const [guests, setGuests] = useState<Guest[]>([]);

  const loadGuests = useCallback(() => {
    fetch('/api/guests')
      .then(r => r.json())
      .then((data: Guest[]) => setGuests(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadGuests();
  }, [loadGuests, refreshKey]);

  const confirmed = guests.filter(g => g.attendance === 'yes');
  const maybe = guests.filter(g => g.attendance === 'maybe');
  const visible = guests.filter(g => g.attendance !== 'no');

  return (
    <section id="invitados" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          La crew
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          Invitados
        </h2>
        {guests.length > 0 ? (
          <p className="text-text-soft">
            {confirmed.length} confirmado{confirmed.length !== 1 ? 's' : ''}
            {maybe.length > 0 && ` · ${maybe.length} tal vez`}
          </p>
        ) : (
          <p className="text-text-soft">
            Aún no hay confirmaciones. ¡Sé el primero en confirmar! 🎉
          </p>
        )}
      </div>

      {visible.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-8 reveal">
          {visible.map((g, i) => {
            const label = LABELS[g.attendance] || LABELS.yes;
            return (
              <div key={i} className="card !p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary mx-auto mb-3 flex items-center justify-center text-white text-lg font-bold">
                  {g.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-sm truncate">{g.name}</p>
                {g.companion && (
                  <p className="text-text-soft text-xs truncate mt-1">+ {g.companion}</p>
                )}
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-glow text-accent font-semibold">
                  {label.emoji} {label.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
