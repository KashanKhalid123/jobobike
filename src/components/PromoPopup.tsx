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
    navigator.clipboard.writeText('JOBO-40');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Vennligst oppgi en gyldig e-postadresse');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/promo-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.status === 409) {
        setError('Denne e-postadressen er allerede brukt');
        setIsSubmitting(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setShowCode(true);
    } catch (err) {
      setError('Noe gikk galt. Prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-gradient-to-br from-[#c41e3a] via-[#165b33] to-[#c41e3a] rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-white animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="text-center">
          <div className="mb-3 sm:mb-4">
            <span className="inline-block bg-yellow-400 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-3 sm:mb-4 animate-pulse">
              🎀 JULE SALG - OPPTIL 40% RABATT
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            GRATULERER!
          </h2>
          
          <p className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg">
            Du får opptil 40% rabatt på utvalgte produkter. Bruk rabattkoden nedenfor for å få rabatten.
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#12b190] mb-2"
                  required
                />
                <p className="text-gray-600 text-xs mb-3">Denne rabatten kan ikke kombineres med andre kampanjer</p>
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#c41e3a] to-[#165b33] text-white rounded-lg hover:scale-105 transition text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'VENNLIGST VENT...' : 'LÅS OPP RABATTEN'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <p className="text-gray-700 text-sm sm:text-base mb-4 font-medium">
                Bruk denne koden i kassen:
              </p>
              <div className="bg-gray-100 border-2 border-dashed border-red-600 rounded-lg p-4 mb-4">
                <p className="text-2xl sm:text-3xl font-bold text-red-600 tracking-wider">JOBO-40</p>
              </div>
              <button
                onClick={handleCopy}
                className="w-full bg-gradient-to-r from-[#c41e3a] to-[#165b33] text-white py-2 rounded-lg hover:scale-105 transition text-sm font-semibold"
              >
                {copied ? '✅ KOPIERT!' : 'KOPIER KODE'}
              </button>
            </div>
          )}

          {!showCode && (
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
