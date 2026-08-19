'use client';

import { useRef, useState } from 'react';
import Hero from '@/components/Hero';
import FloatingNav from '@/components/FloatingNav';
import Rsvp from '@/components/Rsvp';
import Location from '@/components/Location';
import Playlist from '@/components/Playlist';
import GuestList from '@/components/GuestList';
import Photos from '@/components/Photos';
import Calendar from '@/components/Calendar';
import Footer from '@/components/Footer';
import Confetti, { type ConfettiHandle } from '@/components/Confetti';

export default function Home() {
  const confettiRef = useRef<ConfettiHandle>(null);
  const [guestRefresh, setGuestRefresh] = useState(0);

  return (
    <>
      <Confetti ref={confettiRef} />
      <Hero />
      <FloatingNav />
      <main>
        <Rsvp
          onConfirm={() => confettiRef.current?.fire()}
          onSubmit={() => setGuestRefresh(k => k + 1)}
        />
        <GuestList refreshKey={guestRefresh} />
        <Location />
        <Playlist />
        <Photos />
        <Calendar />
      </main>
      <Footer />
    </>
  );
}
