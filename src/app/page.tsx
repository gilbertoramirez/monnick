'use client';

import { useRef } from 'react';
import Hero from '@/components/Hero';
import FloatingNav from '@/components/FloatingNav';
import Rsvp from '@/components/Rsvp';
import Location from '@/components/Location';
import DressCode from '@/components/DressCode';
import Playlist from '@/components/Playlist';
import Guestbook from '@/components/Guestbook';
import Photos from '@/components/Photos';
import Calendar from '@/components/Calendar';
import Footer from '@/components/Footer';
import Confetti, { type ConfettiHandle } from '@/components/Confetti';

export default function Home() {
  const confettiRef = useRef<ConfettiHandle>(null);

  return (
    <>
      <Confetti ref={confettiRef} />
      <Hero />
      <FloatingNav />
      <main>
        <Rsvp onConfirm={() => confettiRef.current?.fire()} />
        <Location />
        <DressCode />
        <Playlist />
        <Guestbook />
        <Photos />
        <Calendar />
      </main>
      <Footer />
    </>
  );
}
