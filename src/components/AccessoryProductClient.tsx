'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Preload first image immediately
    const firstImg = new window.Image();
    firstImg.src = product.images[0];
    
    // Preload other images with slight delay
    setTimeout(() => {
      product.images.slice(1).forEach(src => {
        const img = new window.Image();
        img.src = src;
      });
    }, 100);
  }, [product.images]);

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
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/accessorie" className="hover:text-gray-900">Accessories</Link>
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
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
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
                    priority
                    loading="eager"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Compatibility - Desktop Only */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="hidden lg:block border-t pt-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-teal-500 mt-1">âœ“</span>
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
                    <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-[#12b190] rounded-lg bg-[#12b190] text-black hover:bg-[#12b190] transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-8 text-center text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-[#12b190] rounded-lg bg-[#12b190] text-black hover:bg-[#12b190] transition-colors text-sm"
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
                    ? 'bg-[#12b190] text-black hover:bg-[#12b190]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>
            </div>

            {/* Price - Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {!product.inStock && (
                  <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Size:
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
                  Color:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-900 border-gray-300 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector - Desktop Only */}
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#12b190] rounded-lg bg-[#12b190] text-black hover:bg-[#12b190] transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#12b190] rounded-lg bg-[#12b190] text-black hover:bg-[#12b190] transition-colors"
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
                    ? 'bg-[#12b190] text-black hover:bg-[#12b190]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>
            </div>

            {/* Full Description */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border-t pt-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Specifications</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
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
