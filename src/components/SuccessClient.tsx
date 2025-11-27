// app/success/SuccessClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from './CartContext';

export default function SuccessClient() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentIntentId = searchParams?.get('payment_intent');

  const [loading, setLoading] = useState<boolean>(!!paymentIntentId);
  const [error, setError] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<any>(null);

  useEffect(() => {
    if (!paymentIntentId) {
      setLoading(false);
      setError('No payment_intent found in URL. Make sure return_url contains ?payment_intent={PAYMENT_INTENT_ID}');
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/payment-status?payment_intent=${encodeURIComponent(paymentIntentId)}`, {
          method: 'GET',
          signal: controller.signal,
        });

        const data = await res.json();
        console.log('GET /api/payment-intent response:', res.status, data);

        if (!res.ok) {
          setError(data?.error || `Server returned ${res.status}`);
          return;
        }

        if (data.status === 'succeeded') {
          clearCart();
        }

        setPaymentIntent(data);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error('Fetch /api/payment-intent failed:', err);
        setError(err?.message || 'Network error while fetching payment');
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [paymentIntentId]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#12b190] border-b-transparent mb-6 mx-auto" />
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-gray-200 mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Behandler din bestilling...</h2>
        <p className="text-gray-600">Dette tar bare noen sekunder</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Kunne ikke laste bestillingsdetaljer</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => router.push('/')} 
          className="px-6 py-3 bg-[#12b190] text-white rounded-xl font-semibold hover:bg-[#0f9a7a] transition-all duration-200 shadow-lg"
        >
          Tilbake til butikken
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full mt-32">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center relative overflow-hidden">
          
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#12b190] to-[#0f9a7a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            Takk for ditt kjøp!
          </h1>
          <p className="text-base text-gray-600 mb-6">
            Din bestilling er bekreftet og vil bli behandlet snart.
          </p>

          {paymentIntent && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Bestillingsdetaljer
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Bestillings-ID:</span>
                  <span className="font-mono text-xs break-all text-gray-900">{paymentIntent.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {paymentIntent.status === 'succeeded' ? 'Betalt' : paymentIntent.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Beløp:</span>
                  <span className="text-xl font-bold text-[#12b190]">
                    {paymentIntent.amount ? `${(paymentIntent.amount / 100).toLocaleString('no-NO')} NOK` : '—'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hva skjer nå?</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#12b190] rounded-full mr-3" />
                <span>Du vil motta en bekreftelse på e-post</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#12b190] rounded-full mr-3" />
                <span>Vi forbereder din bestilling for levering</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#12b190] rounded-full mr-3" />
                <span>Sporingsinformasjon sendes når pakken er på vei</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/')} 
              className="px-8 py-3 bg-[#12b190] text-white rounded-xl font-semibold hover:bg-[#0f9a7a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Fortsett å handle
            </button>
            <button 
              onClick={() => router.push('/kontakt-oss')} 
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-[#12b190] hover:text-[#12b190] transition-all duration-200"
            >
              Kontakt oss
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Har du spørsmål? Kontakt oss på{' '}
            <a href="mailto:support@jobobike.no" className="text-[#12b190] hover:underline font-medium">
              support@jobobike.no
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}