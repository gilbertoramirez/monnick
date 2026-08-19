'use client';

import { useEffect, useRef, useState } from 'react';
import { EVENT } from '@/lib/config';
import { useToast } from '@/lib/toast-context';
import { useScrollReveal } from '@/lib/use-scroll-reveal';
import QRCode from 'qrcode';

const TIPS = [
  { icon: '📱', title: 'POV', desc: 'Graba tu punto de vista llegando a la fiesta y súbelo al álbum' },
  { icon: '📸', title: 'Photo dump', desc: 'Sube todas tus fotos y videos sin filtro' },
  { icon: '✨', title: 'Lypse', desc: 'Los mejores momentos los editamos juntos después' },
  { icon: '🎬', title: EVENT.hashtag, desc: 'Usa el hashtag en todas tus historias y posts' },
];

export default function Photos() {
  const ref = useScrollReveal<HTMLElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, EVENT.photoAlbum, {
        width: 200,
        margin: 2,
        color: { dark: '#1E0E2B', light: '#FFFFFF' },
        errorCorrectionLevel: 'M',
      });
    }
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(EVENT.photoAlbum).then(() => {
      setCopied(true);
      show('Link copiado al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

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
        <div className="card flex flex-col items-center gap-5 text-center">
          <div className="qr-wrap">
            <canvas ref={canvasRef} className="block rounded-[var(--radius-xs)]" />
          </div>
          <p className="text-sm text-text-soft max-w-[30ch]">
            Escanea para acceder al álbum compartido de Google Photos
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href={EVENT.photoAlbum} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-sm !py-2.5 !px-5">
              Abrir álbum
            </a>
            <button onClick={copyLink} className="btn btn-outline text-sm !py-2.5 !px-5">
              {copied ? 'Copiado ✓' : 'Copiar link'}
            </button>
          </div>
        </div>

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
