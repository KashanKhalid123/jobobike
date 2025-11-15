'use client';

import React, { useState, useEffect } from 'react';
import PromoPopup from './PromoPopup';

const PromotionalGiftBox = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      setShowPopup(true);
    }, 1500);
    setTimeout(() => {
      setIsOpening(false);
    }, 2000);
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

      <div className="fixed left-8 bottom-6 z-50">
        <button
          onClick={handleClick}
          className="relative group animate-bounce"
          disabled={isOpening}
        >
          {/* Gift Box */}
          <div className="relative w-16 h-16">
            {/* Box Base */}
            <div className="absolute bottom-0 w-full h-12 bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-lg shadow-xl"></div>
            
            {/* Box Lid */}
            <div className={`absolute top-0 w-full h-4 bg-gradient-to-br from-[#0f9a7a] to-[#12b190] rounded-t-lg shadow-lg transition-all duration-500 ${isOpening ? '-translate-y-8 rotate-12' : ''}`}></div>
            
            {/* Ribbon Vertical */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gradient-to-b from-yellow-400 to-yellow-500 shadow-md transition-all duration-500 ${isOpening ? 'h-[200%] -top-8 opacity-50' : ''}`}></div>
            
            {/* Ribbon Horizontal */}
            <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md transition-all duration-500 ${isOpening ? 'opacity-50 scale-110' : ''}`}></div>
            
            {/* Bow - Left Loop */}
            <div className={`absolute -top-2 left-1/4 w-4 h-4 bg-yellow-400 rounded-full shadow-lg transition-all duration-500 ${isOpening ? '-top-10 -left-2 opacity-0' : ''}`}></div>
            
            {/* Bow - Right Loop */}
            <div className={`absolute -top-2 right-1/4 w-4 h-4 bg-yellow-400 rounded-full shadow-lg transition-all duration-500 ${isOpening ? '-top-10 -right-2 opacity-0' : ''}`}></div>
            
            {/* Bow - Center */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full shadow-lg border border-yellow-300 transition-all duration-500 ${isOpening ? '-top-12 opacity-0' : ''}`}></div>
            
            {/* Sparkles */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 -left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          {/* "Open Me" Text */}
          {!isOpening && !showPopup && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#12b190] px-3 py-1 rounded-full shadow-lg text-xs font-bold border-2 border-[#12b190] animate-pulse">
              Åpne meg!
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
