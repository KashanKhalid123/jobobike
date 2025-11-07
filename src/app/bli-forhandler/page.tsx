'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function BliForhandlerPage() {
  const [formData, setFormData] = useState({
    firmanavn: '',
    orgnr: '',
    kontaktperson: '',
    epost: '',
    telefon: '',
    typeVirksomhet: '',
    beskrivelse: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white mt-32 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Bli forhandler av våre elsykler
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vil du tilby kundene dine moderne og pålitelige elsykler?<br/>
            Vi tilbyr et enkelt, lønnsomt og fleksibelt samarbeid for butikker, verksteder og<br/>
            forhandlere over hele Norge.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section - Left */}
          <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">
            Registrer din interesse
          </h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                Takk for din interesse! Vi kontakter deg snart med informasjon om forhandlerbetingelser.
              </p>
            </div>
          )}

          <form action="https://formspree.io/f/xldozejn" method="POST" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firmanavn" className="block text-sm font-medium text-gray-700 mb-2">
                  Firmanavn *
                </label>
                <input
                  type="text"
                  id="firmanavn"
                  name="firmanavn"
                  required
                  value={formData.firmanavn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black"
                />
              </div>
              
              <div>
                <label htmlFor="orgnr" className="block text-sm font-medium text-gray-700 mb-2">
                  Org.nr. *
                </label>
                <input
                  type="text"
                  id="orgnr"
                  name="orgnr"
                  required
                  value={formData.orgnr}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="kontaktperson" className="block text-sm font-medium text-gray-700 mb-2">
                  Kontaktperson *
                </label>
                <input
                  type="text"
                  id="kontaktperson"
                  name="kontaktperson"
                  required
                  value={formData.kontaktperson}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black"
                />
              </div>
              
              <div>
                <label htmlFor="epost" className="block text-sm font-medium text-gray-700 mb-2">
                  E-post *
                </label>
                <input
                  type="email"
                  id="epost"
                  name="epost"
                  required
                  value={formData.epost}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  required
                  value={formData.telefon}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black"
                />
              </div>
              
              <div>
                <label htmlFor="typeVirksomhet" className="block text-sm font-medium text-gray-700 mb-2">
                  Type virksomhet *
                </label>
                <select
                  id="typeVirksomhet"
                  name="typeVirksomhet"
                  required
                  value={formData.typeVirksomhet}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black"
                >
                  <option value="">Velg type virksomhet</option>
                  <option value="butikk">Butikk</option>
                  <option value="verksted">Verksted</option>
                  <option value="nettbutikk">Nettbutikk</option>
                  <option value="utleie">Utleie</option>
                  <option value="annet">Annet</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="beskrivelse" className="block text-sm font-medium text-gray-700 mb-2">
                Kort beskrivelse
              </label>
              <textarea
                id="beskrivelse"
                name="beskrivelse"
                rows={4}
                value={formData.beskrivelse}
                onChange={handleChange}
                placeholder="Fortell oss litt om din virksomhet og hvorfor du ønsker å bli forhandler..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-medium transition-colors bg-[#12b190] text-white hover:bg-[#0f9a7a]"
              >
                Send inn forhandlerforespørsel
              </button>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Ved å sende inn godtar du at vi kontakter deg med informasjon om forhandlerbetingelser.
            </p>
          </form>
          </div>

          {/* Benefits Section - Right */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-8 text-center">
              Fordeler som forhandler
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-[#12b190] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-medium">Konkurransedyktige innkjøpspriser</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-[#12b190] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-medium">Norsk garanti og support</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-[#12b190] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-medium">Tilgang til produktbilder og markedsmateriell</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-[#12b190] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-medium">Rask levering fra Norge/EU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}