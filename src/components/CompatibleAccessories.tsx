"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/lib/productData";
import { accessoriesProducts, AccessoryProduct } from "@/lib/accessoriesProducts";
import { AddToCartButton } from "./AddToCartButton";
import { formatCurrency } from "@/utils/currency";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CompatibleAccessoriesProps {
  product: ProductCard;
}

export default function CompatibleAccessories({ product }: CompatibleAccessoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter accessories that are compatible with this bike
  const compatibleAccessories = accessoriesProducts.filter(accessory => 
    accessory.compatibility.includes(product.name) || 
    accessory.compatibility.includes("Universal - All JOBOBIKE Models") ||
    accessory.compatibility.includes("Universal")
  );

  if (compatibleAccessories.length === 0) {
    return null;
  }

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, compatibleAccessories.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleAccessories = compatibleAccessories.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="mt-12 bg-gray-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-black">Kompatible tilbehør</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleAccessories.map((accessory) => (
          <div key={accessory.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <Link href={`/accessories/${accessory.slug}`}>
              <div className="aspect-square mb-3 relative overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={accessory.image}
                  alt={accessory.name}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
            
            <div className="space-y-2">
              <Link href={`/accessories/${accessory.slug}`}>
                <h3 className="font-medium text-black hover:text-[#12b190] transition-colors">
                  {accessory.name.length > 50 ? accessory.name.substring(0, 50) + '...' : accessory.name}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-600">
                {accessory.description.length > 80 ? accessory.description.substring(0, 80) + '...' : accessory.description}
              </p>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-black">
                  {formatCurrency(accessory.price)}
                </span>
                
                <AddToCartButton
                  product={{
                    id: accessory.id,
                    name: accessory.name,
                    slug: accessory.slug,
                    price: accessory.price,
                    originalPrice: accessory.price,
                    image: accessory.image,
                    images: accessory.images,
                    features: accessory.features,
                    category: accessory.category,
                    rating: 4.5,
                    reviewCount: 25,
                    specifications: {
                      motor: "",
                      battery: "",
                      range: "",
                      speed: "",
                      weight: "",
                      wheelSize: "",
                      foldable: false
                    },
                    tekniskeSpesifikasjoner: {} as any,
                    description: accessory.description,
                    keyFeatures: accessory.features,
                    availableSizes: accessory.sizes || [],
                    whatsInTheBox: [],
                    discount: ""
                  }}
                  className="bg-[#12b190] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0f9a7a] transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {compatibleAccessories.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(compatibleAccessories.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerPage) === index 
                    ? "bg-[#12b190]" 
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link 
          href="/accessories" 
          className="text-[#12b190] hover:text-[#0f9a7a] font-medium text-sm"
        >
          Se alle tilbehør →
        </Link>
      </div>
    </section>
  );
}