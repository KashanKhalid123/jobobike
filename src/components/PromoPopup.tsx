'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PromoPopupProps {
  onClose?: () => void;
}

export default function PromoPopup({ onClose }: PromoPopupProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenPromo', 'true');
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('BLACKFRIDAY60');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Vennligst oppgi en gyldig e-postadresse');
      return;
    }

    setShowCode(true);
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
              OPPTIL 60% AVSLAG
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            BLACK MONTH ER HER NÅ!
          </h2>
          
          <p className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg">
            Oppgi e-postadressen din for å låse opp rabatten!
          </p>

          {!showCode ? (
            <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <label className="text-gray-600 text-xs sm:text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#12b190] mb-3"
                  required
                />
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#12b190] text-white rounded-lg hover:bg-[#0f9a7a] transition text-sm font-semibold"
                >
                  LÅS OPP RABATTEN
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">GRATULERER!</h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4 font-medium">
                DU FÅR NÅ TILGANG TIL ÅRETS BESTE PRISER, OG MULIGHETEN TIL Å FÅ:
              </p>
              <ul className="text-left space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#12b190] font-bold">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">GRATIS FRAKT</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#12b190] font-bold">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">14 DAGERS ÅPENT KJØP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#12b190] font-bold">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">2-5 ÅRS GARANTI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#12b190] font-bold">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base font-bold">OPPTIL 60% RABATT PÅ HELE BUTIKKEN</span>
                </li>
              </ul>
            </div>
          )}

          {showCode ? (
            <button
              onClick={() => window.location.href = '/black-week'}
              className="w-full bg-white text-[#12b190] py-3 rounded-lg font-bold hover:bg-gray-100 transition text-sm sm:text-base"
            >
              SE ALLE TILBUD HER
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="w-full bg-transparent text-white py-3 rounded-lg font-normal hover:underline transition text-sm sm:text-base"
            >
              Nei, jeg vil betale full pris
            </button>
          )}

          <p className="text-white/70 text-xs mt-3 sm:mt-4">
            * Tilbudet gjelder så lenge lageret rekker
          </p>
        </div>
      </div>
    </div>
  );
}
