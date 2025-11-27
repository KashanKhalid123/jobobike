'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { accessoriesProducts, } from '@/lib/accessoriesProducts';
import { AddToCartButton } from '@/components/AddToCartButton';
import { formatCurrency } from '@/utils/currency';

export default function AccessoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});
    const [selectedImages, setSelectedImages] = useState<{ [key: string]: number }>({});

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    };

    const getQuantity = (productId: string) => quantities[productId] || 1;
    
    const getSelectedColor = (productId: string) => selectedColors[productId] || (accessoriesProducts.find(p => p.id === productId)?.colors?.[0] || '');
    const getSelectedImageIndex = (productId: string) => selectedImages[productId] || 0;
    
    const updateSelectedColor = (productId: string, color: string) => {
        setSelectedColors(prev => ({ ...prev, [productId]: color }));
        const product = accessoriesProducts.find(p => p.id === productId);
        if (product && product.colorImages && product.colorImages[color]) {
            const colorImageUrl = product.colorImages[color];
            const imageIndex = product.images.findIndex(img => img === colorImageUrl);
            if (imageIndex !== -1) {
                setSelectedImages(prev => ({ ...prev, [productId]: imageIndex }));
            }
        }
    };
    
    const colorMap: { [key: string]: string } = {
        'Svart': '#000000',
        'Blå': '#0066CC',
        'Rød': '#CC0000',
        'Grå': '#808080',
        'Hvit': '#FFFFFF'
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'All'
        ? accessoriesProducts
        : accessoriesProducts.filter(product =>
            Array.isArray(product.category)
                ? product.category.includes(selectedCategory) // if category is an array, check if it contains the selectedCategory
                : product.category === selectedCategory // if category is a single string, compare directly
        );

    // Preload all visible images immediately
    useEffect(() => {
        filteredProducts.forEach(product => {
            const img = new window.Image();
            img.src = product.image;
        });
    }, [filteredProducts]);


    return (
        <div className="min-h-screen bg-white pt-8 lg:pt-20">
            {/* Breadcrumb */}
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:pt-10">
                    <nav className="text-sm text-gray-600">
                        <Link href="/" className="hover:text-gray-900">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">Tilbehør</span>
                    </nav>
                </div>
            </div>

            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
                    Tilbehør
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : 'produkter'}
                </p>




                {/* Products Grid */}
                <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-2 mb-16">

                    <ul
                        role="list"
                        className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-3 overflow-hidden"
                    >
                        {filteredProducts.map((product) => {
                            const selectedColor = getSelectedColor(product.id);
                            const isColorOutOfStock = product.colorStock && selectedColor ? product.colorStock[selectedColor] === false : false;
                            const isProductOutOfStock = !product.inStock || isColorOutOfStock;
                            
                            return (
                            <li
                                key={product.id}
                                className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black h-[330px] sm:h-[330px] flex flex-col cursor-pointer"
                                onClick={(e) => {
                                    if (!(e.target as HTMLElement).closest('button')) {
                                        window.location.href = `/accessories/${product.slug}`;
                                    }
                                }}
                            >
                                <div className="relative mb-2 sm:mb-16 h-[110px] sm:h-[150px] flex items-center justify-center p-1">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Image
                                            className={`object-contain rounded-lg sm:rounded-xl ${!product.inStock ? 'opacity-60' : ''}`}
                                            src={product.images[getSelectedImageIndex(product.id)] || product.image}
                                            alt={product.name}
                                            width={200}
                                            height={200}
                                            unoptimized
                                            sizes="(max-width: 640px) 120px, 200px"
                                            style={{ maxWidth: '90%', maxHeight: '90%' }}
                                        />
                                        {product.inStock && product.originalPrice && product.originalPrice !== product.price && (
                                            <div className="absolute top-2 right-2 bg-red-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[8px] sm:text-xs font-semibold">
                                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                            </div>
                                        )}
                                        {!product.inStock && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                                                OUT OF STOCK
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xs sm:text-sm font-medium text-black group-hover:underline leading-tight mb-1 h-[32px] sm:h-[36px] flex items-start">
                                        <span className="break-words line-clamp-2">
                                            {product.name}
                                        </span>
                                    </h3>

                                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                {product.originalPrice && product.originalPrice !== product.price && (
                                                    <span className="text-[10px] sm:text-xs text-red-500 line-through">
                                                        {formatCurrency(product.originalPrice)}
                                                    </span>
                                                )}
                                                <span className={`text-sm sm:text-base font-semibold whitespace-nowrap ${product.originalPrice && product.originalPrice !== product.price ? 'text-[#12b190]' : 'text-black'}`}>
                                                    {formatCurrency(product.price)}
                                                </span>
                                            </div>
                                            
                                            {/* Color Selection */}
                                            {product.colors && product.colors.length > 1 && (
                                                <div className="mt-1">
                                                    <div className="flex gap-1">
                                                        {product.colors.map((color) => {
                                                            const isColorOutOfStock = product.colorStock ? product.colorStock[color] === false : false;
                                                            return (
                                                                <button
                                                                    key={color}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        if (!isColorOutOfStock) {
                                                                            updateSelectedColor(product.id, color);
                                                                        }
                                                                    }}
                                                                    disabled={isColorOutOfStock}
                                                                    className={`w-4 h-4 rounded-full border transition-all relative ${
                                                                        isColorOutOfStock
                                                                            ? 'opacity-40 cursor-not-allowed border-gray-300'
                                                                            : getSelectedColor(product.id) === color
                                                                            ? 'border-black scale-110'
                                                                            : 'border-gray-300'
                                                                    }`}
                                                                    style={{ backgroundColor: colorMap[color] || color }}
                                                                    title={isColorOutOfStock ? `${color} (Out of Stock)` : color}
                                                                >
                                                                    {isColorOutOfStock && (
                                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                                            <div className="w-full h-[1px] bg-red-500 rotate-45"></div>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {product.features?.length && (
                                                <ul className="mt-1 flex flex-col gap-1 text-[8px] text-gray-700 sm:hidden">
                                                    {product.features.slice(0, 2).map((f: string, i: number) => (
                                                        <li
                                                            key={i}
                                                            className="rounded-md border border-gray-200 px-1 py-0.5 w-fit text-ellipsis overflow-hidden max-w-full"
                                                        >
                                                            {f.split(' ').slice(0, 3).join(' ')}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Quantity + Add to Cart */}
                                        <div className="mt-1 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-1">
                                            {/* Compact Quantity Selector */}
                                            <div className="flex items-center border border-gray-200 rounded-md w-fit">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(product.id, getQuantity(product.id) - 1);
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                    disabled={getQuantity(product.id) <= 1}
                                                >
                                                    <span className="text-gray-600 text-sm">−</span>
                                                </button>
                                                <span className="text-xs font-semibold min-w-[16px] text-center text-black px-1">
                                                    {getQuantity(product.id)}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(product.id, getQuantity(product.id) + 1);
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="text-gray-600 text-sm">+</span>
                                                </button>
                                            </div>
                                            
                                            {/* Add to Cart Button */}
                                            <AddToCartButton
                                                product={product}
                                                quantity={getQuantity(product.id)}
                                                disabled={isProductOutOfStock}
                                                className={`w-full sm:flex-1 rounded-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium transition whitespace-nowrap ${
                                                    isProductOutOfStock
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'text-white bg-[#12b190] hover:bg-[#0f9a7a]'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            );
                        })}
                    </ul>
                </section>

            </div>
        </div>

    );
}
