'use client';

import React, { useState, useEffect } from 'react';
import PromoPopup from './PromoPopup';

const PromotionalGiftBox = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      setShowPopup(true);
      setIsOpening(false);
    }, 1500);
  };

  return (
    <>
      {/* Confetti/Ribbons Animation */}
      {isOpening && !showPopup && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall rounded-sm"
              style={{
                left: `${(i * 1.25) % 100}%`,
                top: '-100px',
                width: `${8 + Math.random() * 8}px`,
                height: `${20 + Math.random() * 30}px`,
                backgroundColor: ['#12b190', '#0f9a7a', '#10b981', '#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6'][Math.floor(Math.random() * 9)],
                animationDelay: `${Math.random() * 0.8}s`,
                animationDuration: `${1.2 + Math.random() * 0.6}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.9
              }}
            />
          ))}
        </div>
      )}

      <div className="fixed left-4 md:left-8 bottom-8 z-50">
        <button
          onClick={handleClick}
          className="relative group hover:scale-110 transition-all duration-300"
          disabled={isOpening}
        >
          {/* Circular button with icon */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-full shadow-2xl flex items-center justify-center">
            {/* Gift icon */}
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          
          {/* Badge */}
          {!showPopup && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white w-7 h-7 rounded-full shadow-lg text-xs font-bold flex items-center justify-center animate-pulse">
              60%
            </div>
          )}
        </button>
      </div>
      {showPopup && <PromoPopup onClose={() => setShowPopup(false)} />}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0.9;
          }
        }
        .animate-fall {
          animation: fall 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </>
  );
};

export default PromotionalGiftBox;
