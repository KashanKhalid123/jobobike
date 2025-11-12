import React from 'react';

import LandingPage from '@/components/LandingPage';
import PromoPopup from '@/components/PromoPopup';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <PromoPopup />
      <LandingPage/>
    </main>
  );
}
