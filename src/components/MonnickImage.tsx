'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

export default function MonnickImage() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="imagen" className="max-w-[600px] mx-auto px-6 py-16 md:py-20" ref={ref}>
      <div className="reveal">
        <Image
          src="/monnick-18.png"
          alt="Monnick cumple 18"
          width={600}
          height={800}
          className="w-full h-auto rounded-[var(--radius)] shadow-lg"
          priority
        />
      </div>
    </section>
  );
}
