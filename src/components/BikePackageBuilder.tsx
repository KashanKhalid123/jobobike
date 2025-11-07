"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCard } from "@/lib/productData";
import { accessoriesProducts, AccessoryProduct } from "@/lib/accessoriesProducts";
import { formatCurrency } from "@/utils/currency";
import { Check, X } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

interface BikePackageBuilderProps {
  product: ProductCard;
}

interface PackageItem {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'bike' | 'accessory';
  accessory?: AccessoryProduct;
  selected: boolean;
}

export default function BikePackageBuilder({ product }: BikePackageBuilderProps) {
  // Get compatible accessories
  const compatibleAccessories = accessoriesProducts.filter(accessory => 
    accessory.compatibility.includes(product.name) || 
    accessory.compatibility.includes("Universal - All JOBOBIKE Models") ||
    accessory.compatibility.includes("Universal")
  );

  // Create suggested package (bike + top accessories)
  const suggestedAccessories = compatibleAccessories.slice(0, 5);

  // Initialize package items
  const [packageItems, setPackageItems] = useState<PackageItem[]>([
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'bike',
      selected: true
    },
    ...suggestedAccessories.map(acc => ({
      id: acc.id,
      name: acc.name,
      price: acc.price,
      image: acc.image,
      type: 'accessory' as const,
      accessory: acc,
      selected: true
    }))
  ]);

  const toggleItem = (id: string) => {
    if (id === product.id) return; // Can't deselect the bike
    setPackageItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const { totalPrice, savings } = useMemo(() => {
    const selectedItems = packageItems.filter(item => item.selected);
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const originalTotal = packageItems.reduce((sum, item) => sum + item.price, 0);
    const packageDiscount = Math.floor(originalTotal * 0.05); // 5% package discount
    const finalTotal = total - (selectedItems.length > 1 ? packageDiscount : 0);
    
    return {
      totalPrice: finalTotal,
      savings: selectedItems.length > 1 ? packageDiscount : 0
    };
  }, [packageItems]);

  const selectedItems = packageItems.filter(item => item.selected);

  return (
    <section className="mt-8 md:mt-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-2">Komplett Pakke</h2>
        <p className="text-sm md:text-base text-gray-600">Velg tilbehør og spar penger med vår pakkerabatt</p>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Mobile Package Items */}
        <div className="space-y-3 mb-6">
          {packageItems.map((item) => (
            <div 
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                item.selected 
                  ? 'border-[#12b190] bg-white shadow-sm' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleItem(item.id)}
                disabled={item.type === 'bike'}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  item.selected
                    ? 'bg-[#12b190] border-[#12b190]'
                    : 'border-gray-300 hover:border-gray-400'
                } ${item.type === 'bike' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {item.selected && <Check className="w-3 h-3 text-white" />}
              </button>

              {/* Product Image */}
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain rounded"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-sm leading-tight ${item.selected ? 'text-black' : 'text-gray-500'}`}>
                  {item.name}
                  {item.type === 'bike' && <span className="text-[#12b190] ml-1 text-xs block">(Hovedprodukt)</span>}
                </h3>
                <p className={`text-xs mt-1 ${item.selected ? 'text-gray-600' : 'text-gray-400'} line-clamp-2`}>
                  {item.type === 'accessory' ? item.accessory?.description.substring(0, 40) + '...' : product.description.substring(0, 40) + '...'}
                </p>
              </div>

              {/* Price */}
              <div className={`text-right flex-shrink-0 ${item.selected ? 'text-black' : 'text-gray-400'}`}>
                <span className="font-bold text-sm">{formatCurrency(item.price)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Package Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-base font-bold text-black mb-3">Pakke Sammendrag</h3>
          
          <div className="space-y-2 mb-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-gray-600 truncate mr-2">{item.name}</span>
                <span className="text-black font-medium">{formatCurrency(item.price)}</span>
              </div>
            ))}
          </div>

          {savings > 0 && (
            <div className="border-t pt-3 mb-3">
              <div className="flex justify-between text-xs text-green-600">
                <span>Pakkerabatt (5%)</span>
                <span>-{formatCurrency(savings)}</span>
              </div>
            </div>
          )}

          <div className="border-t pt-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-black">Total</span>
              <span className="text-lg font-bold text-[#12b190]">{formatCurrency(totalPrice)}</span>
            </div>
            {savings > 0 && (
              <p className="text-xs text-green-600 mt-1">Du sparer {formatCurrency(savings)}!</p>
            )}
          </div>

          <AddToCartButton
            product={{
              ...product,
              name: `${product.name} - Komplett Pakke`,
              price: totalPrice,
              description: `Inkluderer: ${selectedItems.map(item => item.name).join(', ')}`
            }}
            className="w-full bg-[#12b190] text-white px-4 py-2.5 rounded-md font-semibold hover:bg-[#0f9a7a] transition-colors text-sm"
          />

          <div className="mt-3 text-xs text-gray-500 space-y-1">
            <p>✓ Fri frakt på hele pakken</p>
            <p>✓ Alle produkter er kompatible</p>
            <p>✓ 2 års garanti inkludert</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Package Items */}
        <div className="lg:col-span-2 space-y-3">
          {packageItems.map((item) => (
            <div 
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                item.selected 
                  ? 'border-[#12b190] bg-white shadow-sm' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleItem(item.id)}
                disabled={item.type === 'bike'}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  item.selected
                    ? 'bg-[#12b190] border-[#12b190]'
                    : 'border-gray-300 hover:border-gray-400'
                } ${item.type === 'bike' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {item.selected && <Check className="w-4 h-4 text-white" />}
              </button>

              {/* Product Image */}
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain rounded"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium ${item.selected ? 'text-black' : 'text-gray-500'}`}>
                  {item.name}
                  {item.type === 'bike' && <span className="text-[#12b190] ml-2">(Hovedprodukt)</span>}
                </h3>
                <p className={`text-sm ${item.selected ? 'text-gray-600' : 'text-gray-400'}`}>
                  {item.type === 'accessory' ? item.accessory?.description.substring(0, 60) + '...' : product.description.substring(0, 60) + '...'}
                </p>
              </div>

              {/* Price */}
              <div className={`text-right ${item.selected ? 'text-black' : 'text-gray-400'}`}>
                <span className="font-bold">{formatCurrency(item.price)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Package Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-4">
          <h3 className="text-lg font-bold text-black mb-4">Pakke Sammendrag</h3>
          
          <div className="space-y-2 mb-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate mr-2">{item.name}</span>
                <span className="text-black font-medium">{formatCurrency(item.price)}</span>
              </div>
            ))}
          </div>

          {savings > 0 && (
            <div className="border-t pt-3 mb-3">
              <div className="flex justify-between text-sm text-green-600">
                <span>Pakkerabatt (5%)</span>
                <span>-{formatCurrency(savings)}</span>
              </div>
            </div>
          )}

          <div className="border-t pt-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">Total</span>
              <span className="text-xl font-bold text-[#12b190]">{formatCurrency(totalPrice)}</span>
            </div>
            {savings > 0 && (
              <p className="text-sm text-green-600 mt-1">Du sparer {formatCurrency(savings)}!</p>
            )}
          </div>

          <AddToCartButton
            product={{
              ...product,
              name: `${product.name} - Komplett Pakke`,
              price: totalPrice,
              description: `Inkluderer: ${selectedItems.map(item => item.name).join(', ')}`
            }}
            className="w-full bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0f9a7a] transition-colors"
          />

          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p>✓ Fri frakt på hele pakken</p>
            <p>✓ Alle produkter er kompatible</p>
            <p>✓ 2 års garanti inkludert</p>
          </div>
        </div>
      </div>
    </section>
  );
}