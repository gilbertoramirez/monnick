import { EVENT } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="text-center px-6 pt-12 pb-28 text-text-soft text-sm">
      <p className="font-[family-name:var(--font-syne)] text-2xl font-extrabold text-accent mb-2">
        {EVENT.hashtag}
      </p>
      <p>Nos vemos el 19 de septiembre &#9829;</p>
    </footer>
  );
}
