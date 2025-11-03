'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AccessoryProduct } from '@/lib/accessoriesProducts';
import { formatCurrency } from '@/utils/currency';

interface AccessoryProductClientProps {
  product: AccessoryProduct;
}

export default function AccessoryProductClient({ product }: AccessoryProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', {
      product: product.slug,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
    alert('Product added to cart!');
  };

  return (
    <div className="min-h-screen bg-white mt-32">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Hjem</Link>
          <span className="mx-2">/</span>
          <Link href="/accessorie" className="hover:text-gray-900">Tilbehør</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const prevIndex = selectedImage === 0 ? product.images.length - 1 : selectedImage - 1;
                      setSelectedImage(prevIndex);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const nextIndex = selectedImage === product.images.length - 1 ? 0 : selectedImage + 1;
                      setSelectedImage(nextIndex);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-6 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Compatibility - Desktop Only */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="hidden lg:block border-t pt-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Kompatibilitet</h2>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((model, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features - Desktop Only */}
            {product.features && product.features.length > 0 && (
              <div className="hidden lg:block border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Funksjoner</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
            </div>

            {/* Price and Quantity - Mobile */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between gap-4 mb-4 px-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  {!product.inStock && (
                    <span className="text-red-600 text-sm font-medium">Ikke på lager</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-[#12b190] rounded-lg bg-[#12b190] text-white hover:bg-[#0f9a7a] transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-8 text-center text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-[#12b190] rounded-lg bg-[#12b190] text-white hover:bg-[#0f9a7a] transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart - Mobile */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-lg font-medium transition-all mb-6 ${
                  product.inStock
                    ? 'bg-[#12b190] text-white hover:bg-[#0f9a7a]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'LEGG I HANDLEKURV' : 'IKKE PÅ LAGER'}
              </button>
            </div>

            {/* Price - Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {!product.inStock && (
                  <span className="text-red-600 text-sm font-medium">Ikke på lager</span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Størrelse:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-900 border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

             {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Farge:
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => {
                    const colorMap: { [key: string]: string } = {
                      'Svart': '#000000',
                      'Blå': '#0066CC',
                      'Rød': '#CC0000',
                      'Grå': '#808080',
                      'Hvit': '#FFFFFF'
                    };
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          if (product.colorImages && product.colorImages[color]) {
                            const colorImageUrl = product.colorImages[color];
                            const imageIndex = product.images.findIndex(img => img === colorImageUrl);
                            if (imageIndex !== -1) {
                              setSelectedImage(imageIndex);
                            }
                          }
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-black scale-110 shadow-lg'
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: colorMap[color] || color }}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector - Desktop Only */}
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Antall:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#12b190] rounded-lg bg-[#12b190] text-white hover:bg-[#0f9a7a] transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#12b190] rounded-lg bg-[#12b190] text-white hover:bg-[#0f9a7a] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

           

            {/* Add to Cart - Desktop */}
            <div className="hidden lg:block space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-lg font-medium transition-all ${
                  product.inStock
                    ? 'bg-[#12b190] text-white hover:bg-[#0f9a7a]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'LEGG I HANDLEKURV' : 'IKKE PÅ LAGER'}
              </button>
            </div>

            {/* Full Description */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Beskrivelse</h2>
              <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border-t pt-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Spesifikasjoner</h2>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">{spec.label}</span>
                      <span className="text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compatibility - Mobile Only */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="lg:hidden border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Kompatibilitet</h2>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((model, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features - Mobile Only */}
            {product.features && product.features.length > 0 && (
              <div className="lg:hidden border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Funksjoner</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}