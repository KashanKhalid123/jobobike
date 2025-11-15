'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS_DATA } from '@/lib/productData';

const Hero = () => {
  const featuredProducts = PRODUCTS_DATA.slice(0, 3);

  return (
    <section className="w-full py-12 md:py-20 bg-gray-50">
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

          {/* Right: Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-[#12b190] font-bold">{product.price.toLocaleString('no-NO')} kr</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
