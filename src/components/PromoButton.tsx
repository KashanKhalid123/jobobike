'use client';

import { useState } from 'react';
import { Tag } from 'lucide-react';
import PromoPopup from './PromoPopup';

export default function PromoButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 z-40 w-20 h-20 bg-gradient-to-br from-[#c41e3a] to-[#165b33] rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Få rabattkode"
      >
        <span className="text-4xl">🎁</span>
        <span className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
          %
        </span>
      </button>
      {showPopup && <PromoPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}
