'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/lib/toast-context';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

interface Message {
  name: string;
  text: string;
  time: string;
}

const DEFAULT_MESSAGES: Message[] = [
  { name: 'Monnick', text: '¡Gracias por venir a celebrar conmigo! Los quiero mucho.', time: '2026-08-18T10:00:00' },
];

function getMessages(): Message[] {
  try {
    const m = JSON.parse(localStorage.getItem('monnick_messages') || 'null');
    return m?.length ? m : DEFAULT_MESSAGES;
  } catch { return DEFAULT_MESSAGES; }
}

export default function Guestbook() {
  const { show } = useToast();
  const ref = useScrollReveal<HTMLElement>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  const submit = useCallback(() => {
    if (!name.trim() || !text.trim()) { show('Escribe tu nombre y mensaje'); return; }
    const updated = [{ name: name.trim(), text: text.trim(), time: new Date().toISOString() }, ...messages];
    localStorage.setItem('monnick_messages', JSON.stringify(updated));
    setMessages(updated);
    setName('');
    setText('');
    show('Mensaje publicado ♡');
  }, [name, text, messages, show]);

  return (
    <section id="guestbook" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          Deja tu huella
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          Muro de Mensajes
        </h2>
        <p className="text-text-soft max-w-[50ch]">
          Escríbele un mensaje a Monnick. Todos los mensajes se mostrarán el día de la fiesta.
        </p>
      </div>

      <div className="reveal mt-8">
        <div className="flex flex-col gap-3 mb-8">
          <input
            className="form-input"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="form-textarea"
            placeholder="Tu mensaje para Monnick..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary" onClick={submit}>Dejar mensaje</button>
        </div>

        <div className="columns-1 sm:columns-2 gap-4">
          {messages.map((msg, i) => (
            <div key={`${msg.name}-${i}`} className="guestbook-msg break-inside-avoid mb-4 p-5 rounded-[var(--radius-sm)] bg-surface border border-border">
              <p className="font-bold text-[0.85rem] mb-1">{msg.name}</p>
              <p className="text-[0.9rem] text-text-soft leading-relaxed">{msg.text}</p>
              <p className="text-[0.7rem] text-accent-soft mt-2">
                {new Date(msg.time).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
