'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('BLACKFRIDAY60');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-white animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="text-center">
          <div className="mb-3 sm:mb-4">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 sm:mb-4">
              EKSKLUSIVT TILBUD
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Få 60% RABATT! 🎉
          </h2>
          
          <p className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg">
            Bruk koden ved kassen og spar stort på din neste el-sykkel!
          </p>

          <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-gray-600 text-xs sm:text-sm mb-2">Din rabattkode:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <code className="text-xl sm:text-2xl font-bold text-[#12b190] tracking-wider">
                BLACKFRIDAY60
              </code>
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-4 py-2 bg-[#12b190] text-white rounded-lg hover:bg-[#0f9a7a] transition text-sm font-semibold"
              >
                {copied ? '✓ Kopiert!' : 'Kopier'}
              </button>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-white text-[#12b190] py-3 rounded-lg font-bold hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Start å handle nå
          </button>

          <p className="text-white/70 text-xs mt-3 sm:mt-4">
            * Tilbudet gjelder så lenge lageret rekker
          </p>
        </div>
      </div>
    </div>
  );
}
