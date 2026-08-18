'use client';

import { useState, useEffect } from 'react';
import { EVENT } from '@/lib/config';
import { useToast } from '@/lib/toast-context';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

interface Guest {
  name: string;
  attendance: string;
  companion: string;
  dietary: string;
  timestamp: string;
}

function getGuests(): Guest[] {
  try { return JSON.parse(localStorage.getItem('monnick_guests') || '[]'); }
  catch { return []; }
}

export default function Rsvp({ onConfirm, onSubmit }: { onConfirm?: () => void; onSubmit?: () => void }) {
  const { show } = useToast();
  const ref = useScrollReveal<HTMLElement>();
  const [done, setDone] = useState(false);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [hasCompanion, setHasCompanion] = useState(false);
  const [companionName, setCompanionName] = useState('');
  const [dietary, setDietary] = useState('');
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (localStorage.getItem('monnick_rsvp_done')) {
      setDone(true);
    }
    setConfirmedCount(getGuests().filter((g) => g.attendance === 'yes').length);
  }, []);

  function handleSubmit() {
    if (!name.trim()) { show('Escribe tu nombre'); return; }
    if (!attendance) { show('Selecciona tu asistencia'); return; }
    if (hasCompanion && !companionName.trim() && attendance !== 'no') {
      show('Escribe el nombre de tu acompañante');
      return;
    }

    const guestData = {
      name: name.trim(),
      attendance,
      companion: hasCompanion ? companionName.trim() : '',
      dietary: dietary.trim(),
    };

    fetch('/api/guests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guestData),
    }).catch(() => {});

    const guests = getGuests();
    guests.push({ ...guestData, timestamp: new Date().toISOString() });
    localStorage.setItem('monnick_guests', JSON.stringify(guests));
    localStorage.setItem('monnick_rsvp_done', '1');
    localStorage.setItem('monnick_guest_name', name.trim());

    const msgs: Record<string, string> = {
      yes: `¡Te esperamos con todo, ${name.trim()}!`,
      maybe: `¡Ojalá puedas venir, ${name.trim()}!`,
      no: `Te vamos a extrañar, ${name.trim()}.`,
    };
    setSuccessMsg(msgs[attendance] || msgs.yes);
    setConfirmedCount(guests.filter((g) => g.attendance === 'yes').length);
    setDone(true);

    if (attendance === 'yes') onConfirm?.();
    onSubmit?.();
    show('RSVP confirmado ✓');
  }

  return (
    <section id="rsvp" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          Confirma tu asistencia
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          RSVP
        </h2>
        <p className="text-text-soft max-w-[50ch]">
          Confirma antes del {EVENT.rsvpDeadline} para que no te quedes sin lugar.
          También puedes confirmar al{' '}
          <a href={`tel:${EVENT.phone.replace(/\s/g, '')}`} className="text-accent font-semibold hover:underline">{EVENT.phone}</a>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Form */}
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
              <label className="text-[0.8rem] font-semibold">Asistencia</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'yes', label: 'Voy seguro' },
                  { value: 'maybe', label: 'Tal vez' },
                  { value: 'no', label: 'No puedo' },
                ].map((opt) => (
                  <label key={opt.value} className="flex-1 min-w-[100px]">
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

            <div className="flex flex-col gap-1 mb-5">
              <label className="text-[0.8rem] font-semibold">Restricciones alimentarias (opcional)</label>
              <input
                className="form-input"
                placeholder="Vegano, sin gluten, alergias..."
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-full mt-2" onClick={handleSubmit}>
              Confirmar asistencia
            </button>
          </div>
        )}

        {/* Success */}
        {done && (
          <div className="card text-center py-12 reveal visible">
            <span className="text-6xl block mb-4">🎉</span>
            <h3 className="font-[family-name:var(--font-syne)] text-2xl font-extrabold mb-2">Confirmado</h3>
            <p className="text-text-soft">{successMsg || '¡Te esperamos con todo!'}</p>
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-glow rounded-full text-sm font-semibold text-accent">
              <span>✨</span>
              <span>{confirmedCount} confirmados</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
