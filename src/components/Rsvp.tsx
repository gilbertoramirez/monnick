'use client';

import { useState, useEffect } from 'react';
import { EVENT } from '@/lib/config';
import { useToast } from '@/lib/toast-context';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

export default function Rsvp({ onConfirm, onSubmit }: { onConfirm?: () => void; onSubmit?: () => void }) {
  const { show } = useToast();
  const ref = useScrollReveal<HTMLElement>();
  const [done, setDone] = useState(false);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [hasCompanion, setHasCompanion] = useState(false);
  const [companionName, setCompanionName] = useState('');
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (localStorage.getItem('monnick_rsvp_done')) {
      setDone(true);
    }
  }, []);

  async function handleSubmit() {
    if (!name.trim()) { show('Escribe tu nombre'); return; }
    if (!attendance) { show('Selecciona tu asistencia'); return; }
    if (hasCompanion && !companionName.trim() && attendance === 'yes') {
      show('Escribe el nombre de tu acompañante');
      return;
    }

    const guestData = {
      name: name.trim(),
      attendance,
      companion: hasCompanion && attendance === 'yes' ? companionName.trim() : '',
    };

    try {
      const res = await fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guestData),
      });
      const data = await res.json();
      if (data.count) setConfirmedCount(data.count);
    } catch {}

    localStorage.setItem('monnick_rsvp_done', '1');
    localStorage.setItem('monnick_guest_name', name.trim());

    const msgs: Record<string, string> = {
      yes: `¡Te esperamos con todo, ${name.trim()}!`,
      no: `Te vamos a extrañar, ${name.trim()}.`,
    };
    setSuccessMsg(msgs[attendance] || msgs.yes);
    setDone(true);

    if (attendance === 'yes') onConfirm?.();
    onSubmit?.();
    show('RSVP confirmado ✓');
  }

  return (
    <section id="rsvp" className="max-w-[500px] mx-auto px-6 py-10 md:py-14" ref={ref}>
      <div className="reveal text-center">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          Confirma tu asistencia
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          RSVP
        </h2>
        <p className="text-text-soft mx-auto max-w-[50ch]">
          Confirma antes del {EVENT.rsvpDeadline} para que no te quedes sin lugar.
        </p>
      </div>

      <div className="flex flex-col gap-8 mt-8">
        {!done && (
          <div className="card reveal">
            <div className="flex flex-col gap-1 mb-5">
              <label className="text-[0.8rem] font-semibold">Tu nombre</label>
              <input
                className="form-input"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 mb-5">
              <label className="text-[0.8rem] font-semibold">¿Vas a ir?</label>
              <div className="flex gap-2">
                {[
                  { value: 'yes', label: 'Sí, voy' },
                  { value: 'no', label: 'No puedo' },
                ].map((opt) => (
                  <label key={opt.value} className="flex-1">
                    <input
                      type="radio"
                      name="attendance"
                      value={opt.value}
                      className="att-input sr-only"
                      checked={attendance === opt.value}
                      onChange={() => setAttendance(opt.value)}
                    />
                    <span className="att-label">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {attendance === 'yes' && (
              <>
                <div className="flex items-center gap-3 mb-5 cursor-pointer select-none" onClick={() => setHasCompanion(!hasCompanion)}>
                  <div className={`toggle-track ${hasCompanion ? 'active' : ''}`} />
                  <span className="text-[0.8rem] font-semibold">Llevo acompañante</span>
                </div>

                <div className={`companion-fields ${hasCompanion ? 'open' : ''}`}>
                  <div className="flex flex-col gap-1 mb-5">
                    <label className="text-[0.8rem] font-semibold">Nombre del acompañante</label>
                    <input
                      className="form-input"
                      placeholder="Nombre"
                      value={companionName}
                      onChange={(e) => setCompanionName(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <button className="btn btn-primary w-full mt-2" onClick={handleSubmit}>
              Confirmar
            </button>
          </div>
        )}

        {done && (
          <div className="card text-center py-12 reveal visible">
            <span className="text-6xl block mb-4">🎉</span>
            <h3 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold mb-2">Confirmado</h3>
            <p className="text-text-soft">{successMsg || '¡Te esperamos con todo!'}</p>
            {confirmedCount > 0 && (
              <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-glow rounded-full text-sm font-semibold text-accent">
                <span>✨</span>
                <span>{confirmedCount} confirmado{confirmedCount !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
