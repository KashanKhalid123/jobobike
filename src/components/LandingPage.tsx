'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '@/lib/productData';
import { getCombinedProducts } from '@/lib/productVariants';
import EbikeCalculator from './EbikeFinder/EbikeCalculator';
import ProductCardItem from './ProductCardItem';

const LandingPage = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: number }>({});
  const combinedProducts = getCombinedProducts().slice(0, 6);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;
  const getSelectedVariantIndex = (baseId: string) => selectedVariants[baseId] || 0;
  const updateSelectedVariant = (baseId: string, index: number) => {
    setSelectedVariants(prev => ({ ...prev, [baseId]: index }));
  };

  useEffect(() => {
    const criticalImages = [
      '/images/banner.jpg',
      '/images/mover/mover-1.png',
      '/images/lyon/lyon-1.png',
      '/images/eddy-x/eddy-1.png',
      ...PRODUCTS_DATA.slice(0, 6).map((p) => p.image),
    ];

    criticalImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full min-h-screen lg:h-screen flex items-center bg-white relative overflow-hidden py-20 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-[#12b190]/10 text-[#12b190] px-4 py-2 rounded-full text-sm font-medium font-sans">Tidsbegrenset tilbud</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans">
                <span className="text-[#12b190]">Slutt på sommersalg</span>
                <span className="block text-[#12b190] mt-2 text-2xl md:text-3xl lg:text-4xl">Opptil 30% RABATT</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl font-sans">
                Premium el-sykler designet for din livsstil. Lette, kraftige og perfekte for enhver reise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cycle">
                  <button className="group bg-[#12b190] text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg hover:bg-[#0f9d7d] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl">
                    Handle nå
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center border border-gray-100 hover:border-[#12b190]/30 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12b190]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 mb-3 bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v1m6-1v1m-8 2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2zm-1 6h12M9 16h6" />
                  </svg>
                </div>
                <h3 className="relative font-bold text-gray-900 text-center text-sm mb-1">Lang rekkevidde</h3>
                <p className="relative text-xs text-[#12b190] font-semibold text-center">Opptil 120km</p>
              </div>

              <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center border border-gray-100 hover:border-[#12b190]/30 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12b190]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 mb-3 bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="relative font-bold text-gray-900 text-center text-sm mb-1">Kraftig motor</h3>
                <p className="relative text-xs text-[#12b190] font-semibold text-center">250W - 750W</p>
              </div>

              <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center border border-gray-100 hover:border-[#12b190]/30 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12b190]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 mb-3 bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="relative font-bold text-gray-900 text-center text-sm mb-1">Miljøvennlig</h3>
                <p className="relative text-xs text-[#12b190] font-semibold text-center">0% utslipp</p>
              </div>

              <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center border border-gray-100 hover:border-[#12b190]/30 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12b190]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 mb-3 bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="relative font-bold text-gray-900 text-center text-sm mb-1">2-5 års garanti</h3>
                <p className="relative text-xs text-[#12b190] font-semibold text-center">Premium kvalitet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-black mb-8">
            POPULÆRE KATEGORIER
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-center text-center">
            <Link href="/category/Pendler">
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/images/henry/henry-1.png"
                  alt="Pendler"
                  width={200}
                  height={200}
                  priority
                  className="mx-auto w-48 h-48 object-contain"
                />
                <div className="mt-3 flex justify-center items-center gap-1 text-black font-medium text-base">
                  <span>Pendler</span>
                  <span className="text-[#12b190]">➜</span>
                </div>
              </div>
            </Link>

            <Link href="/category/Fatbike">
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/images/mover/mover-1.png"
                  alt="Fatbike"
                  width={200}
                  height={200}
                  priority
                  className="mx-auto w-48 h-48 object-contain"
                />
                <div className="mt-3 flex justify-center items-center gap-1 text-black font-medium text-base">
                  <span>Fatbike</span>
                  <span className="text-[#12b190]">➜</span>
                </div>
              </div>
            </Link>

            <Link href="/category/Sammenleggbar">
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/images/ace/ace-1.png"
                  alt="Sammenleggbar"
                  width={200}
                  height={200}
                  priority
                  className="mx-auto w-48 h-48 object-contain"
                />
                <div className="mt-3 flex justify-center items-center gap-1 text-black font-medium text-base">
                  <span>Sammenleggbar</span>
                  <span className="text-[#12b190]">➜</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/cycle"
              className="inline-flex items-center gap-2 bg-[#12b190] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f9a7a] transition-colors"
            >
              Se alle sykler<span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-2 mb-16">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-2">Bestselgere</h2>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-3 overflow-hidden"
        >
          {combinedProducts.map((combined) => (
            <ProductCardItem
              key={combined.baseId}
              combined={combined}
              selectedVariantIndex={getSelectedVariantIndex(combined.baseId)}
              onVariantChange={(index) => updateSelectedVariant(combined.baseId, index)}
              quantity={getQuantity(combined.variants[getSelectedVariantIndex(combined.baseId)].originalProduct.id)}
              onQuantityChange={(newQuantity) => handleQuantityChange(combined.variants[getSelectedVariantIndex(combined.baseId)].originalProduct.id, newQuantity)}
            />
          ))}
        </ul>

        <div className="text-center mt-8">
          <Link
            href="/cycle"
            className="inline-flex items-center gap-2 bg-[#12b190] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f9a7a] transition-colors"
          >
            Se alle sykler<span>→</span>
          </Link>
        </div>
      </section>

      {/* <section className="py-8 md:py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">14 dager åpent kjøp!</h3>
              <p className="text-white/90 text-sm md:text-base">Prøv sykkelen risikofritt</p>
            </div>
            <div className="bg-gradient-to-br from-[#12b190] to-[#0f9a7a] rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">2 års garanti</h3>
              <p className="text-white/90 text-sm md:text-base">Full trygghet på ditt kjøp</p>
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <EbikeCalculator products={PRODUCTS_DATA} />
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
              HVORFOR STOLE PÅ JOBOBIKE?
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#12b190] mb-2 md:mb-3">300+</div>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 font-medium">Partnere i Europa</p>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#12b190] mb-2 md:mb-3">50000+</div>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 font-medium">Solgte el-sykler</p>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#12b190] mb-2 md:mb-3">100000+</div>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 font-medium">Jobobike fans</p>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#12b190] mb-2 md:mb-3">20+</div>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 font-medium">
                Års erfaring med el-sykkel produksjon
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-800 mb-4">Jobobike – spesialisten på el-sykler i Norge</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oppdag el-sykler som kombinerer sykkelglede med smart teknologi. Hos Jobobike får du kvalitet, service og
              trygg handel – derfor velger flere oss.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                ['Miljøvennlig transport', 'Reduser karbonavtrykket ditt med null utslipp og bidra til en renere fremtid'],
                ['Spar tid og penger', 'Unngå trafikk, parkeringsavgifter og drivstoffkostnader med smart pendling'],
                ['Bedre helse og kondisjon', 'Få mosjon mens du pendler - perfekt balanse mellom trening og transport'],
                ['Kraftig assistanse', 'Elektrisk motor gir deg ekstra kraft på bakker og lange turer'],
              ].map(([title, text]) => (
                <div className="flex items-start space-x-4" key={title}>
                  <div className="flex-shrink-0 w-12 h-12 bg-[#12b190] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-[#12b190] to-[#0f9a7a] rounded-2xl p-8 text-white">
                <h3 className="text-2xl mb-6">Perfekt for alle</h3>
                <div className="space-y-4">
                  {[
                    ['Pendlere', 'som vil spare tid og komme raskere frem.'],
                    ['Deg', 'som ønsker en lettere og mer behagelig sykkeltur'],
                    ['Familier', 'med barn og bagasje som trenger ekstra kraft.'],
                    ['Miljøbevisste', 'som vil gjøre en grønn forskjell i hverdagen.'],
                    ['Sykkelentusiaster', 'som bare elsker friheten på to hjul.'],
                    ['Eventyrlystne', 'som vil på tur og utforske naturen.'],
                    ['Byutforskere', 'som vil oppdage nye steder på en enkel og morsom måte.'],
                  ].map(([who, why]) => (
                    <div className="flex items-center space-x-3" key={who}>
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span>
                        <strong>{who}</strong> {why}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden md:block py-16 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-800 mb-12">Jobobike – valgt av kunder over hele Norge</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['Kraftig ytelse', 'Opptil 60km rekkevidde med våre avanserte batterier'],
              ['Angrerett', '14 dager etter levering'],
              ['Gratis frakt', 'Fri levering til hele Norge på alle bestillinger'],
            ].map(([title, text]) => (
              <div className="text-center" key={title}>
                <div className="w-16 h-16 bg-[#12b190] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-800 mb-12">Hva kundene sier</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              ['"Fantastisk sykkel! Perfekt for daglige turer til jobb. Batteriet holder lenge og sykkelen er lett å håndtere."', 'Maria, Oslo'],
              ['"Kjøpte Jobobike for 6 måneder siden. Fortsatt like fornøyd! Kvaliteten er topp og kundeservicen er utmerket."', 'Lars, Bergen'],
              ['"Elsker min nye e-bike! Gjør pendlingen så mye mer behagelig. Anbefaler Jobobike til alle."', 'Anne, Trondheim'],
            ].map(([text, who]) => (
              <div className="bg-white p-6 rounded-xl shadow-sm border" key={who}>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#12b190]">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{text}</p>
                <div className="text-sm text-gray-500">- {who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <path
              d="M 200 50 Q 350 200 200 350 Q 50 200 200 50"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-400"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-start mb-8">
            <svg className="w-20 h-20 md:w-24 md:h-24 text-gray-300" fill="currentColor" viewBox="0 0 100 100">
              <path d="M20,45 Q15,30 25,25 Q35,20 40,30 L35,45 L45,45 L45,70 L20,70 Z" />
              <path d="M55,45 Q50,30 60,25 Q70,20 75,30 L70,45 L80,45 L80,70 L55,70 Z" />
            </svg>
          </div>

          <div className="mb-12">
            <p className="text-[#12b190] text-base md:text-lg font-medium mb-3">Transport og trening</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              SERTIFISERINGER
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl leading-relaxed">
              JOBOBIKE oppnår en flott kombinasjon av transport og trening. Våre el-sykler har fått følgende
              profesjonelle sertifiseringer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
            {[
              ['/images/certification-iso.webp', 'ISO Certificate'],
              ['/images/certification-ce.webp', 'CE EN15194 Certificate'],
              ['/images/certification-rohs.webp', 'RoHS Certificate'],
            ].map(([src, alt]) => (
              <div className="flex flex-col items-center text-center" key={alt}>
                <div className="mb-4">
                  <img src={src} alt={alt} className="w-28 h-28 md:w-32 md:h-32 object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
