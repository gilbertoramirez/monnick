'use client';

import { useRef, useState } from 'react';
import Hero from '@/components/Hero';
import FloatingNav from '@/components/FloatingNav';
import MonnickImage from '@/components/MonnickImage';
import Rsvp from '@/components/Rsvp';
import GuestList from '@/components/GuestList';
import Photos from '@/components/Photos';
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
        <MonnickImage />
        <Rsvp
          onConfirm={() => confettiRef.current?.fire()}
          onSubmit={() => setGuestRefresh(k => k + 1)}
        />
        <GuestList refreshKey={guestRefresh} />
        <Photos />
      </main>
      <Footer />
    </>
  );
}
