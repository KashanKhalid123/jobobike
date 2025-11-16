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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Vennligst oppgi en gyldig e-postadresse');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/promo-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setShowCode(true);
      } else {
        const data = await response.json();
        if (response.status === 409) {
          setError('Denne e-postadressen er allerede brukt.');
        } else {
          setError('Kunne ikke sende. Prøv igjen.');
        }
      }
    } catch (err) {
      setError('Kunne ikke sende. Prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
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

          {!showCode ? (
            <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <p className="text-gray-600 text-xs sm:text-sm mb-3">Oppgi e-postadressen din for å få rabattkoden:</p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@epost.no"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#12b190] mb-3"
                  required
                />
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-[#12b190] text-white rounded-lg hover:bg-[#0f9a7a] transition text-sm font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Sender...' : 'Få rabattkode'}
                </button>
              </div>
            </form>
          ) : (
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
          )}

          <button
            onClick={handleClose}
            className="w-full bg-white text-[#12b190] py-3 rounded-lg font-bold hover:bg-gray-100 transition text-sm sm:text-base"
          >
            {showCode ? 'Start å handle nå' : 'Lukk'}
          </button>

          <p className="text-white/70 text-xs mt-3 sm:mt-4">
            * Tilbudet gjelder så lenge lageret rekker
          </p>
        </div>
      </div>
    </div>
  );
}
