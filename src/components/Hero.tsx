'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS_DATA } from '@/lib/productData';

const Hero = () => {
  const featuredProducts = PRODUCTS_DATA.slice(0, 3);

  return (
    <section className="w-full py-12 md:py-20 bg-white md:bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text and Button */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              End of Summer Sale
              <span className="block text-[#12b190] mt-2">Upto 30% OFF</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Premium electric bikes designed for your lifestyle. Lightweight, powerful, and perfect for every journey.
            </p>
            <Link href="/products">
              <button className="group bg-[#12b190] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#0f9d7d] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Right: Feature Icons */}
          <div className="grid grid-cols-2 gap-6">
            {/* Battery Icon */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
              <svg className="w-24 h-24 text-[#12b190] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v1m6-1v1m-8 2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2zm-1 6h12M9 16h6" />
              </svg>
              <h3 className="font-bold text-gray-900 text-center">Lang rekkevidde</h3>
              <p className="text-sm text-gray-600 text-center mt-2">Opptil 120km</p>
            </div>

            {/* Speed Icon */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
              <svg className="w-24 h-24 text-[#12b190] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="font-bold text-gray-900 text-center">Kraftig motor</h3>
              <p className="text-sm text-gray-600 text-center mt-2">250W - 750W</p>
            </div>

            {/* Eco Icon */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
              <svg className="w-24 h-24 text-[#12b190] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-gray-900 text-center">Miljøvennlig</h3>
              <p className="text-sm text-gray-600 text-center mt-2">0% utslipp</p>
            </div>

            {/* Quality Icon */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
              <svg className="w-24 h-24 text-[#12b190] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-bold text-gray-900 text-center">2-5 års garanti</h3>
              <p className="text-sm text-gray-600 text-center mt-2">Premium kvalitet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
