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

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    };

    const getQuantity = (productId: string) => quantities[productId] || 1;

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
        <div className="min-h-screen bg-white mt-32">
            {/* Breadcrumb */}
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                        {filteredProducts.map((product) => (
                            <li
                                key={product.id}
                                className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black min-h-[280px] sm:min-h-[320px] flex flex-col"
                            >
                                <div className="relative mb-2 sm:mb-3">
                                    <Link href={`/accessories/${product.slug}`}>
                                        <Image
                                            className="object-cover w-[85%] h-[85%] sm:w-full sm:h-full m-auto sm:m-0 rounded-lg sm:rounded-xl"
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            unoptimized
                                            sizes="(max-width: 640px) 150px, 300px"
                                        />
                                        {!product.inStock && (
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                                <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm">
                                                    Out of Stock
                                                </span>
                                            </div>
                                        )}
                                    </Link>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xs sm:text-sm font-medium text-black group-hover:underline leading-tight mb-1 mt-1 sm:mt-4">
                                        <Link href={`/accessories/${product.slug}`} className="break-words">
                                            {product.name}
                                        </Link>
                                    </h3>

                                    <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between">
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
                                                {formatCurrency(product.price)}
                                            </span>
                                            
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
                                        <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-2">
                                            {/* Compact Quantity Selector */}
                                            <div className="flex items-center border border-gray-200 rounded-md w-fit">
                                                <button
                                                    onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                    disabled={getQuantity(product.id) <= 1}
                                                >
                                                    <span className="text-gray-600 text-sm">−</span>
                                                </button>
                                                <span className="text-xs font-semibold min-w-[16px] text-center text-black px-1">
                                                    {getQuantity(product.id)}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="text-gray-600 text-sm">+</span>
                                                </button>
                                            </div>
                                            
                                            {/* Add to Cart Button */}
                                            <AddToCartButton
                                                product={product}
                                                quantity={getQuantity(product.id)}
                                                className="w-full sm:flex-1 rounded-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white bg-[#12b190] hover:bg-[#0f9a7a] transition whitespace-nowrap"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

            </div>
        </div>

    );
}
