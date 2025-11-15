'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { PRODUCTS_DATA } from '@/lib/productData';
import { getCombinedProducts } from '@/lib/productVariants';
import { formatCurrency } from '@/utils/currency';
import EbikeCalculator from './EbikeFinder/EbikeCalculator';

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
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white pt-10 md:pt-[135px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#12b190]/10 text-[#12b190] px-4 py-2 rounded-full text-sm font-medium font-sans">Limited Time Offer</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans">
                <span className="text-[#12b190]">End of Summer Sale</span>
                <span className="block text-[#12b190] mt-2 text-3xl md:text-4xl lg:text-5xl">Upto 30% OFF</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl font-sans">
                Premium electric bikes designed for your lifestyle. Lightweight, powerful, and perfect for every journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cycle">
                  <button className="group bg-[#12b190] text-white font-bold px-10 py-5 rounded-full text-xl hover:bg-[#0f9d7d] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl">
                    Shop Now
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img src="/images/eurobike.png" alt="Eurobike" className="w-[140%] h-auto object-contain rounded-lg" />
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
          {combinedProducts.map((combined) => {
            const selectedIndex = getSelectedVariantIndex(combined.baseId);
            const selectedVariant = combined.variants[selectedIndex];
            const baseProduct = selectedVariant.originalProduct;
            const displayName = selectedVariant.variantName === 'Standard' 
              ? baseProduct.name 
              : `${combined.name} ${selectedVariant.variantName} - JoboBike`;
            const displayFeatures = baseProduct.features || combined.features;

            return (
              <li
                key={combined.baseId}
                className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black h-[360px] sm:h-[360px] flex flex-col cursor-pointer"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('button')) {
                    window.location.href = `/products/${combined.baseSlug}`;
                  }
                }}
              >
                <div className="relative mb-2 sm:mb-8 h-[140px] sm:h-[160px] flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      className="object-contain rounded-lg sm:rounded-xl max-w-full max-h-full"
                      src={baseProduct.image}
                      alt={displayName}
                      width={250}
                      height={250}
                      priority
                      loading="eager"
                      sizes="(max-width: 640px) 140px, 250px"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-xs sm:text-sm font-medium text-black group-hover:underline leading-tight h-[32px] sm:h-[36px] flex items-start">
                    <span className="break-words line-clamp-2">{displayName}</span>
                  </h3>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex-1 min-w-0">
                      {combined.variants.length > 1 && (
                        <div className="mb-1">
                          <div className="flex flex-wrap gap-1">
                            {combined.variants.map((variant, index) => (
                              <button
                                key={variant.variantSlug}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateSelectedVariant(combined.baseId, index);
                                }}
                                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
                                  selectedIndex === index
                                    ? 'bg-[#12b190] text-white'
                                    : 'bg-gray-100 text-[#12b190] hover:bg-gray-200'
                                }`}
                                title={variant.variantName}
                              >
                                {variant.variantName}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {combined.variants.length === 1 && baseProduct.availableSizes && baseProduct.availableSizes.length > 1 && (
                        <div className="mb-1">
                          <div className="flex flex-wrap gap-1">
                            {baseProduct.availableSizes.map((size) => (
                              <button
                                key={size}
                                onClick={(e) => e.stopPropagation()}
                                className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-100 text-[#12b190] hover:bg-gray-200 transition-all"
                                title={size}
                              >
                                {size.split('(')[0].trim()}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <span className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
                        {formatCurrency(baseProduct.price)}
                      </span>

                      {displayFeatures?.length && (
                        <ul className="mt-1 flex flex-col gap-1 text-[8px] sm:text-[10px] text-gray-700">
                          {displayFeatures.slice(0, 2).map((f, i) => (
                            <li
                              key={i}
                              className="rounded-md border border-gray-200 px-1 sm:px-1.5 py-0.5 w-fit text-ellipsis overflow-hidden max-w-full"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center border border-gray-200 rounded-md w-fit">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(baseProduct.id, getQuantity(baseProduct.id) - 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="text-xs font-semibold min-w-[16px] text-center text-black px-1">
                          {getQuantity(baseProduct.id)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(baseProduct.id, getQuantity(baseProduct.id) + 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>

                      <AddToCartButton
                        product={baseProduct}
                        quantity={getQuantity(baseProduct.id)}
                        className="w-full sm:flex-1 rounded-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white sm:bg-[#12b190] sm:hover:bg-[#29ecc5] transition md:text-white md:hover:border-black md:bg-black md:hover:bg-gray-50 sm:hover:text-black whitespace-nowrap"
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
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
