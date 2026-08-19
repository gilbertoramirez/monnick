'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { href: '#rsvp', icon: '💌', label: 'RSVP' },
  { href: '#invitados', icon: '✨', label: 'Crew' },
  { href: '#ubicacion', icon: '📍', label: 'Lugar' },
  { href: '#fotos', icon: '📸', label: 'Fotos' },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById('hero');
      if (hero) setVisible(hero.getBoundingClientRect().bottom < 100);

      const sections = document.querySelectorAll('main section');
      const mid = window.scrollY + window.innerHeight / 2;
      let current = '';
      sections.forEach((s) => {
        if ((s as HTMLElement).offsetTop <= mid) current = s.id;
      });
      setActive(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`floating-nav ${visible ? '' : 'hidden'}`}>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`nav-item ${active === item.href.slice(1) ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-lg leading-none">{item.icon}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
