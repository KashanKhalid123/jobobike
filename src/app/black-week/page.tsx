'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Shield, Truck, Plus } from 'lucide-react';
import { PRODUCTS_DATA } from '@/lib/productData';
import { useCart } from '@/components/CartContext';

export default function BlackWeekPage() {
  const { addToCart } = useCart();
  const [selectedColors, setSelectedColors] = useState<{[key: string]: string}>({});
  const [transerPackageColor, setTranserPackageColor] = useState<string>('Grønn');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const endDate = nextWeek.getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#12b190] via-[#0fa080] to-[#0e9a7a] py-12 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 md:space-y-10">
            <div className="space-y-4">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
                <p className="text-white text-sm font-medium">⚡ Eksklusivt tilbud</p>
              </div>
              <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white">
                BLACK WEEK
              </h1>
              <p className="text-lg md:text-3xl font-light text-white/90">
                Opptil 60% rabatt på el-sykler
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-2 md:gap-6 py-4 md:py-8">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 md:p-8 min-w-[70px] md:min-w-[130px] shadow-2xl transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-6xl font-bold text-[#12b190] tabular-nums">{timeLeft.days}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">DAGER</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 md:p-8 min-w-[70px] md:min-w-[130px] shadow-2xl transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-6xl font-bold text-[#12b190] tabular-nums">{timeLeft.hours}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">TIMER</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 md:p-8 min-w-[70px] md:min-w-[130px] shadow-2xl transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-6xl font-bold text-[#12b190] tabular-nums">{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">MIN</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 md:p-8 min-w-[70px] md:min-w-[130px] shadow-2xl transform hover:scale-105 transition-transform">
                <div className="text-3xl md:text-6xl font-bold text-[#12b190] tabular-nums animate-pulse">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">SEK</div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <p className="text-base md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                Begrenset tilbud - kun denne uken
              </p>
              
              <Link 
                href="/cycle"
                className="inline-block bg-white hover:bg-gray-100 text-[#12b190] text-lg font-semibold px-12 py-5 rounded-full transition-all transform hover:scale-105 shadow-2xl"
              >
                Handle nå →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered Value Proposition */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-all">
              <div className="flex justify-center mb-4">
                <Truck className="w-12 h-12 text-[#12b190]" />
              </div>
              <h3 className="text-xl font-normal text-gray-900 mb-2">Gratis frakt</h3>
              <p className="text-sm text-gray-600">På alle el-sykkel bestillinger</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-all">
              <div className="flex justify-center mb-4">
                <Package className="w-12 h-12 text-[#12b190]" />
              </div>
              <h3 className="text-xl font-normal text-gray-900 mb-2">14 dagers åpent kjøp</h3>
              <p className="text-sm text-gray-600">Returner enkelt innen 14 dager</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-all">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-[#12b190]" />
              </div>
              <h3 className="text-xl font-normal text-gray-900 mb-2">2-5 års garanti</h3>
              <p className="text-sm text-gray-600">Omfattende garantidekning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Deals Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-12">
            Mest populære tilbud
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS_DATA
              .filter(product => product.inStock !== false)
              .sort((a, b) => b.originalPrice - a.originalPrice)
              .slice(0, 4)
              .map((product, index) => {
                const discountedPrice = Math.round(product.originalPrice * 0.4);
                const discountPercent = 60;
                
                const currentColor = selectedColors[product.id] || product.colors?.[0] || '';
                const displayImage = product.colorImages && currentColor ? product.colorImages[currentColor] || product.image : product.image;
                
                return (
                  <Link key={product.id} href={`/products/${product.slug}`} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full hover:shadow-lg transition-shadow">
                    <div className="relative h-40 md:h-56 flex items-center justify-center p-4 md:p-8" style={{backgroundColor: product.backgroundColor || '#ffffff'}}>
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold">
                        -{discountPercent}%
                      </div>
                      <Image 
                        src={displayImage} 
                        alt={product.name}
                        width={280}
                        height={280}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="p-3 md:p-5 bg-white flex flex-col flex-1">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2 md:mb-3 line-clamp-2 h-10 md:h-12">{product.name}</h3>
                      <div className="h-6 mb-2">
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex gap-1">
                            {product.colors.slice(0, 4).map((colorName, idx) => {
                              const colorMap: {[key: string]: string} = {
                                'Hvit': '#FFFFFF', 'Grå': '#808080', 'Svart': '#000000',
                                'Grønn': '#22c55e', 'Blå': '#3b82f6', 'Lys Grønn': '#86efac',
                                'Black Olive': '#3b3b3b', 'Special': '#ef4444', 'Peach': '#fbbf24'
                              };
                              const isSelected = currentColor === colorName;
                              return <button key={idx} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColors({...selectedColors, [product.id]: colorName}); }} className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'border-[#12b190]' : 'border-gray-400'} hover:border-[#12b190] transition-colors`} style={{backgroundColor: colorMap[colorName] || '#cccccc'}} title={colorName}></button>;
                            })}
                            {product.colors.length > 4 && <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 mb-3 md:mb-4 flex-1">
                        <span className="text-lg md:text-xl font-bold text-[#12b190]">{discountedPrice.toLocaleString('no-NO')} kr</span>
                        <span className="text-xs md:text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString('no-NO')} kr</span>
                        <span className="text-xs text-green-600 font-medium">Spar {(product.originalPrice - discountedPrice).toLocaleString('no-NO')} kr</span>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); addToCart(product as any, 1); }}
                        className="w-full bg-[#12b190] hover:bg-[#0e9a7a] text-white font-medium py-2 md:py-2.5 rounded-md text-center text-xs md:text-sm transition-colors mt-auto"
                      >
                        Legg til handlekurv
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Bundle & Save Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-6">
            Kombiner & spar
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto font-light">
            Kombiner dine favoritter og få dem til rekordlave priser. Jo større pakke, jo mer sparer du!
          </p>

          <div className="space-y-6 max-w-6xl mx-auto">
            {/* TRANSER Bundle */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all max-h-[600px] overflow-y-auto lg:max-h-none lg:overflow-visible">
              <div className="flex flex-col lg:flex-row gap-2 items-center">
                <div className="flex-shrink-0 w-56">
                  <div className="relative h-40 mb-3">
                    <Image src={(() => {
                      const transerProduct = PRODUCTS_DATA.find(p => p.id === 'transer-001');
                      return transerProduct?.colorImages?.[transerPackageColor] || '/images/transer/transer-1.png';
                    })()} alt="TRANSER" width={250} height={250} className="object-contain w-full h-full" />
                  </div>
                  <div className="text-center">
                    <div className="flex gap-1 justify-center mb-2">
                      {['Grønn', 'Hvit', 'Grå'].map((color) => {
                        const colorMap: {[key: string]: string} = {'Hvit': '#FFFFFF', 'Grå': '#808080', 'Grønn': '#22c55e'};
                        return <button key={color} onClick={() => setTranserPackageColor(color)} className={`w-5 h-5 rounded-full border-2 ${transerPackageColor === color ? 'border-[#12b190]' : 'border-gray-400'} hover:border-[#12b190] transition-colors`} style={{backgroundColor: colorMap[color]}} title={color}></button>;
                      })}
                    </div>
                    <p className="text-xs font-medium text-gray-900">TRANSER - JoboBike</p>
                    <p className="text-sm text-[#12b190] font-semibold">43 999 kr</p>
                  </div>
                </div>
                <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col items-center gap-2 p-3 rounded flex-1">
                      <Image src="/images/canopy/c.jpg" alt="Værtak" width={80} height={80} className="object-contain" />
                      <div className="text-center">
                        <p className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-1">Værtak</p>
                        <p className="text-sm lg:text-base text-[#12b190] font-semibold">1 799 kr</p>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 self-center" />
                    <div className="flex flex-col items-center gap-2 p-3 rounded flex-1">
                      <Image src="/images/monkey-bar/m.jpg" alt="Barnestyre" width={80} height={80} className="object-contain" />
                      <div className="text-center">
                        <p className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-1">Barnestyre</p>
                        <p className="text-sm lg:text-base text-[#12b190] font-semibold">1 499 kr</p>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 self-center" />
                    <div className="flex flex-col items-center gap-2 p-3 rounded flex-1">
                      <Image src="/images/chair/ch.jpg" alt="Kaptein Stol" width={80} height={80} className="object-contain" />
                      <div className="text-center">
                        <p className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-1">Kaptein Stol</p>
                        <p className="text-sm lg:text-base text-[#12b190] font-semibold">1 679 kr</p>
                      </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full lg:w-auto self-center">
                  <div className="text-center">
                    <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">40% OFF</div>
                    <p className="text-xs text-gray-600 mb-1">Total pakke pris:</p>
                    <p className="text-sm text-red-500 line-through">48 976 kr</p>
                    <p className="text-xl font-bold text-[#12b190]">29 386 kr</p>
                  </div>
                  <button
                    onClick={() => {
                      const transerProduct = PRODUCTS_DATA.find(p => p.id === 'transer-001');
                      const imageUrl = transerProduct?.colorImages?.[transerPackageColor] || '/images/transer/transer-1.png';
                      addToCart({ id: `transer-package-${transerPackageColor}`, name: `TRANSER Pakke (${transerPackageColor})`, price: 29386, image: imageUrl, category: ['Pakke'] } as any, 1);
                    }}
                    className="bg-[#12b190] hover:bg-[#0e9a7a] text-white px-4 py-3 rounded-md font-semibold text-sm lg:text-sm transition-all w-full lg:w-auto"
                  >
                    Legg til pakke
                  </button>
                </div>
              </div>
            </div>

            {/* SAM Bundle */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all max-h-[600px] overflow-y-auto lg:max-h-none lg:overflow-visible">
              <div className="flex flex-col lg:flex-row gap-2 items-center">
                <div className="flex-shrink-0 w-56">
                  <div className="relative h-40 mb-3">
                    <Image src="/images/sam/sam-1.png" alt="SAM" width={250} height={250} className="object-contain w-full h-full" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">SAM - JoboBike</p>
                    <p className="text-sm text-[#12b190] font-semibold">22 999 kr</p>
                  </div>
                </div>
                <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col items-center gap-2 p-3 rounded flex-1">
                      <Image src="/images/basket/basket-1.png" alt="Kurv med Tre Håndtak" width={80} height={80} className="object-contain" />
                      <div className="text-center">
                        <p className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-1">Kurv med Tre Håndtak</p>
                        <p className="text-sm lg:text-base text-[#12b190] font-semibold">599 kr</p>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 self-center" />
                    <div className="flex flex-col items-center gap-2 p-3 rounded flex-1">
                      <Image src="/images/bottle-logo/b.jpg" alt="Logo Flaskeholder" width={80} height={80} className="object-contain" />
                      <div className="text-center">
                        <p className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-1">Logo Flaskeholder</p>
                        <p className="text-sm lg:text-base text-[#12b190] font-semibold">155 kr</p>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 self-center" />
                    <div className="flex flex-col items-center gap-2 p-3 rounded flex-1">
                      <Image src="/images/bikebag/bag-1.jpg" alt="Sammenleggbar Sykkel Deksel Bag" width={80} height={80} className="object-contain" />
                      <div className="text-center">
                        <p className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-1">Deksel Bag</p>
                        <p className="text-sm lg:text-base text-[#12b190] font-semibold">539 kr</p>
                      </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full lg:w-auto self-center">
                  <div className="text-center">
                    <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">40% OFF</div>
                    <p className="text-xs text-gray-600 mb-1">Total pakke pris:</p>
                    <p className="text-sm text-red-500 line-through">24 092 kr</p>
                    <p className="text-xl font-bold text-[#12b190]">14 455 kr</p>
                  </div>
                  <button
                    onClick={() => {
                      addToCart({ id: 'sam-package-001', name: 'SAM Pakke', price: 14455, image: '/images/sam/sam-1.png', category: ['Pakke'] } as any, 1);
                    }}
                    className="bg-[#12b190] hover:bg-[#0e9a7a] text-white px-4 py-3 rounded-md font-semibold text-sm lg:text-sm transition-all w-full lg:w-auto"
                  >
                    Legg til pakke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#12b190] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
            Ikke gå glipp av tilbudet
          </h2>
          <p className="text-lg md:text-xl text-white mb-8 font-light">
            Tilbudet gjelder kun så lenge lageret rekker
          </p>
          <Link 
            href="/cycle"
            className="inline-block bg-white hover:bg-gray-100 text-[#12b190] text-lg font-normal px-10 py-4 rounded-md transition-all"
          >
            Handle nå
          </Link>
        </div>
      </section>
    </div>
  );
}
