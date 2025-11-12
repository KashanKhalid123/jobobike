'use client'

import React, { useState } from 'react'
import { 
  MapPinIcon, 
  PhoneIcon, 
  Mail, 
  ClockIcon,
  Check
} from 'lucide-react'
import Link from 'next/link'

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Fullt navn må være minst 2 tegn'
    }
    if (formData.fullName && !/^[a-zA-Z\u00c0-\u00ff\s]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Fullt navn kan kun inneholde bokstaver'
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Vennligst skriv inn en gyldig e-postadresse'
    }
    
    const hasDigit = /\d/.test(formData.phoneNumber)
    if (formData.phoneNumber && hasDigit) {
      const digitsOnly = formData.phoneNumber.replace(/[^0-9]/g, '')
      if (digitsOnly.length < 8 || digitsOnly.length > 15) {
        newErrors.phoneNumber = 'Telefonnummer må være 8-15 siffer (kan inkludere landskode)'
      }
    }
    
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Melding må være minst 10 tegn'
    }
    
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
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
    <div className="min-h-screen bg-gray-50 mt-36">
         <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-2 py-3 text-sm">
          <li>
            <Link href="/" className="text-gray-600 hover:text-black transition">
              Hjem
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-black font-medium">Kontakt</li>
        </ol>
      </nav>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontakt oss</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Har du spørsmål om våre el-sykler? Vi er her for å hjelpe! Ta kontakt med vårt team av eksperter for personlig assistanse.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {submitStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 mt-16 text-center">
                  <div className="w-20 h-20 bg-[#12b190] rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Takk for din melding!</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Vi kommer tilbake til deg innen 24 timer.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setFormData({
                        fullName: '',
                        email: '',
                        phoneNumber: '',
                        message: ''
                      });
                    }}
                    className="px-8 py-3 rounded-lg font-medium text-white bg-[#12b190] hover:bg-[#0f9a7a] transition-colors"
                  >
                    Send ny melding
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send oss en melding</h2>
                  <form onSubmit={handleSubmit} className="space-y-6 text-gray-600" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Fullt navn *
                    </label>
                    {errors.fullName && <p className="text-red-600 text-sm mb-1">{errors.fullName}</p>}
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ola Nordmann"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-postadresse *
                    </label>
                    {errors.email && <p className="text-red-600 text-sm mb-1">{errors.email}</p>}
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="din@epost.no"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefonnummer
                  </label>
                  {errors.phoneNumber && <p className="text-red-600 text-sm mb-1">{errors.phoneNumber}</p>}
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="+47 123 45 678"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Melding *
                  </label>
                  {errors.message && <p className="text-red-600 text-sm mb-1">{errors.message}</p>}
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#12b190] focus:border-[#12b190] text-black resize-vertical ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Fortell oss hvordan vi kan hjelpe deg..."
                  />
                </div>



                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800">
                          Beklager, det oppstod en feil ved sending av meldingen. Vennligst prøv igjen.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-lg font-medium text-white transition-colors bg-[#12b190] hover:bg-[#0f9a7a] disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sender...' : 'Send melding'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Kontaktinformasjon</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-[#12b190]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Adresse</h4>
                    <p className="text-gray-600 mt-1">
                     
                       Oslo Norge
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-[#12b190]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Telefon</h4>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:+4722334455" className="hover:text-[#12b190] transition-colors">
                        +47 405 56 333
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-[#12b190]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">E-post</h4>
                    <div className="text-gray-600 mt-1">
                      <p>
                        <a href="mailto:support@jobobike.no" className="hover:text-[#12b190] transition-colors">
                          support@jobobike.no
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-[#12b190]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Åpningstider</h4>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <p>Mandag - Fredag: 09:00 - 18:00</p>
                      <p>Lørdag: 10:00 - 16:00</p>
                      <p>Søndag: Stengt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            {/* Quick Response Note */}
            {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Quick Response Guarantee</h4>
              <p className="text-blue-800 text-sm">
                We respond to all messages within 8-24 hours on business days. For urgent matters, please call us directly.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
