'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    function observeAll() {
      el!.querySelectorAll('.reveal:not(.visible)').forEach((t) => io.observe(t));
      if (el!.classList.contains('reveal') && !el!.classList.contains('visible')) io.observe(el!);
    }

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(el, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  return ref;
}
