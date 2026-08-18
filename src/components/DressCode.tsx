'use client';

import { useScrollReveal } from '@/lib/use-scroll-reveal';

const STYLES = [
  {
    name: 'Glam Rosa',
    desc: 'Tonos rosa, brillo sutil, piezas statement',
    gradient: 'linear-gradient(160deg, #FFB5D0, #FF6BA6, #FF2D78)',
    palette: ['#FF2D78', '#FFB5D0', '#FFD700'],
  },
  {
    name: 'Lavender Dream',
    desc: 'Lilas, satín, accesorios delicados',
    gradient: 'linear-gradient(160deg, #E8D4F5, #C792EA, #9B59B6)',
    palette: ['#C792EA', '#E8D4F5', '#9B59B6'],
  },
  {
    name: 'Soft Girl',
    desc: 'Pasteles, texturas suaves, aesthetic minimalista',
    gradient: 'linear-gradient(160deg, #FFE0EC, #FFC2D4, #FF85AD)',
    palette: ['#FFE0EC', '#FFC2D4', '#FFECD2'],
  },
  {
    name: 'Clean Denim',
    desc: 'Jeans premium, camisa elegante, sneakers blancos',
    gradient: 'linear-gradient(160deg, #D4E5FF, #A8C6F0, #7BA3D9)',
    palette: ['#7BA3D9', '#FFFFFF', '#2C3E50'],
  },
  {
    name: 'Golden Hour',
    desc: 'Dorados, tierra, accesorios metálicos',
    gradient: 'linear-gradient(160deg, #FFD6A5, #FFB347, #FF8C42)',
    palette: ['#FFD700', '#FFB347', '#8B6914'],
  },
  {
    name: 'Street Chic',
    desc: 'Cargo pants, crop top, platforms, actitud',
    gradient: 'linear-gradient(160deg, #C9E4CA, #87BBA2, #55828B)',
    palette: ['#55828B', '#2D2D2D', '#C9E4CA'],
  },
];

export default function DressCode() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="dresscode" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          Qué me pongo
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          Dress Code & Inspo
        </h2>
        <p className="text-text-soft max-w-[50ch]">
          Elegante casual con vibras fresh. Aquí te dejamos inspiración para que llegues increíble.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 reveal">
        {STYLES.map((style) => (
          <div
            key={style.name}
            className="dresscode-card"
            style={{ background: style.gradient }}
          >
            <h4 className="font-[family-name:var(--font-syne)] text-base font-bold text-white mb-1">
              {style.name}
            </h4>
            <p className="text-xs text-white/80 leading-snug">{style.desc}</p>
            <div className="flex gap-1.5 mt-2">
              {style.palette.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 border-white/60"
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-6 p-5 bg-glow rounded-[var(--radius-sm)] text-center text-[0.9rem]">
        Lo importante es que te sientas increíble. No hay reglas estrictas, solo vibras buenas.
      </div>
    </section>
  );
}
