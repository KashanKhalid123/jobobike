'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineBuildingOffice2, HiOutlineClock } from 'react-icons/hi2';

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
  const [errors, setErrors] = useState<{[key: string]: string}>({});



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firmanavn || formData.firmanavn.length < 2) {
      newErrors.firmanavn = 'Firmanavn må være minst 2 tegn';
    }
    
    if (!formData.orgnr || !/^[0-9]{9}$/.test(formData.orgnr)) {
      newErrors.orgnr = 'Organisasjonsnummer må være 9 siffer';
    }
    
    if (!formData.kontaktperson || formData.kontaktperson.length < 2) {
      newErrors.kontaktperson = 'Kontaktperson må være minst 2 tegn';
    }
    if (formData.kontaktperson && !/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.kontaktperson)) {
      newErrors.kontaktperson = 'Kontaktperson kan kun inneholde bokstaver';
    }
    
    if (!formData.epost || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.epost)) {
      newErrors.epost = 'Vennligst skriv inn en gyldig e-postadresse';
    }
    
    const hasDigit = /\d/.test(formData.telefon)
    if (formData.telefon && hasDigit) {
      const digitsOnly = formData.telefon.replace(/[^0-9]/g, '')
      if (digitsOnly.length < 8 || digitsOnly.length > 15) {
        newErrors.telefon = 'Telefonnummer må være 8-15 siffer (kan inkludere landskode)';
      }
    }
    
    if (!formData.typeVirksomhet) {
      newErrors.typeVirksomhet = 'Vennligst velg type virksomhet';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xldozejn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-[#12b190] rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">Takk for din interesse!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Vi kontakter deg snart med informasjon om forhandlerbetingelser.
              </p>
              <button
                onClick={() => {
                  setSubmitStatus('idle');
                  setFormData({
                    firmanavn: '',
                    orgnr: '',
                    kontaktperson: '',
                    epost: '',
                    telefon: '',
                    typeVirksomhet: '',
                    beskrivelse: ''
                  });
                }}
                className="px-8 py-3 rounded-lg font-medium text-white bg-[#12b190] hover:bg-[#0f9a7a] transition-colors"
              >
                Send ny forespørsel
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-black mb-8 text-center">
                Registrer din interesse
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firmanavn" className="block text-sm font-medium text-gray-700 mb-2">
                  Firmanavn *
                </label>
                {errors.firmanavn && <p className="text-red-600 text-sm mb-1">{errors.firmanavn}</p>}
                <input
                  type="text"
                  id="firmanavn"
                  name="firmanavn"
                  value={formData.firmanavn}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.firmanavn ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Skriv inn firmanavn"
                />
              </div>
              
              <div>
                <label htmlFor="orgnr" className="block text-sm font-medium text-gray-700 mb-2">
                  Org.nr. *
                </label>
                {errors.orgnr && <p className="text-red-600 text-sm mb-1">{errors.orgnr}</p>}
                <input
                  type="text"
                  id="orgnr"
                  name="orgnr"
                  value={formData.orgnr}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.orgnr ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="123456789"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="kontaktperson" className="block text-sm font-medium text-gray-700 mb-2">
                  Kontaktperson *
                </label>
                {errors.kontaktperson && <p className="text-red-600 text-sm mb-1">{errors.kontaktperson}</p>}
                <input
                  type="text"
                  id="kontaktperson"
                  name="kontaktperson"
                  value={formData.kontaktperson}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.kontaktperson ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ola Nordmann"
                />
              </div>
              
              <div>
                <label htmlFor="epost" className="block text-sm font-medium text-gray-700 mb-2">
                  E-post *
                </label>
                {errors.epost && <p className="text-red-600 text-sm mb-1">{errors.epost}</p>}
                <input
                  type="email"
                  id="epost"
                  name="epost"
                  value={formData.epost}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.epost ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="din@epost.no"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                {errors.telefon && <p className="text-red-600 text-sm mb-1">{errors.telefon}</p>}
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.telefon ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+47 123 45 678"
                />
              </div>
              
              <div>
                <label htmlFor="typeVirksomhet" className="block text-sm font-medium text-gray-700 mb-2">
                  Type virksomhet *
                </label>
                {errors.typeVirksomhet && <p className="text-red-600 text-sm mb-1">{errors.typeVirksomhet}</p>}
                <select
                  id="typeVirksomhet"
                  name="typeVirksomhet"
                  value={formData.typeVirksomhet}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.typeVirksomhet ? 'border-red-500' : 'border-gray-300'}`}
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

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">
                      Det oppstod en feil ved innsending. Vennligst prøv igjen eller kontakt oss direkte.
                    </p>
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg font-medium transition-colors bg-[#12b190] text-white hover:bg-[#0f9a7a] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sender...' : 'Send inn forhandlerforespørsel'}
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  Ved å sende inn godtar du at vi kontakter deg med informasjon om forhandlerbetingelser.
                </p>
              </form>
            </>
          )}
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
            
            {/* Contact Details */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-3 text-center">
                Kontakt oss direkte
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineBuildingOffice2 className="w-4 h-4 text-[#12b190]" />
                  <span className="text-gray-800">Niels Juels Gate 70, Oslo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineClock className="w-4 h-4 text-[#12b190]" />
                  <span className="text-gray-800">Man-Fre: 08:00-16:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineEnvelope className="w-4 h-4 text-[#12b190]" />
                  <span className="text-gray-800">support@jobobike.no</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlinePhone className="w-4 h-4 text-[#12b190]" />
                  <span className="text-gray-800">+47 40 55 63 33</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}