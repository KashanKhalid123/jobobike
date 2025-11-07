"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCard } from "@/lib/productData";
import { accessoriesProducts } from "@/lib/accessoriesProducts";
import { formatCurrency } from "@/utils/currency";
import { Package, Check, X } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

interface CompactPackagePreviewProps {
  product: ProductCard;
}

interface PackageItem {
  id: string;
  name: string;
  price: number;
  image: string;
  selected: boolean;
}

export default function CompactPackagePreview({ product }: CompactPackagePreviewProps) {
  const compatibleAccessories = accessoriesProducts.filter(accessory => 
    accessory.compatibility.includes(product.name) || 
    accessory.compatibility.includes("Universal - All JOBOBIKE Models") ||
    accessory.compatibility.includes("Universal")
  ).slice(0, 3);

  const [items, setItems] = useState<PackageItem[]>([
    { id: product.id, name: product.name, price: product.price, image: product.image, selected: true },
    ...compatibleAccessories.map(acc => ({
      id: acc.id, name: acc.name, price: acc.price, image: acc.image, selected: true
    }))
  ]);

  const toggleItem = (id: string) => {
    if (id === product.id) return;
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const { totalPrice, savings } = useMemo(() => {
    const selected = items.filter(item => item.selected);
    const total = selected.reduce((sum, item) => sum + item.price, 0);
    const discount = selected.length > 1 ? Math.floor(total * 0.05) : 0;
    return { totalPrice: total - discount, savings: discount };
  }, [items]);

  return (
    <div className="mt-4 border border-[#12b190] rounded-lg p-4 bg-gradient-to-r from-[#12b190]/5 to-[#12b190]/10 max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-[#12b190]" />
        <span className="font-semibold text-black">Komplett Pakke</span>
        {savings > 0 && <span className="text-sm text-green-600 font-medium">Spar {formatCurrency(savings)}</span>}
      </div>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <button
              onClick={() => toggleItem(item.id)}
              disabled={item.id === product.id}
              className={`w-5 h-5 rounded border flex items-center justify-center ${
                item.selected ? 'bg-[#12b190] border-[#12b190]' : 'border-gray-300'
              } ${item.id === product.id ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {item.selected && <Check className="w-3 h-3 text-white" />}
            </button>
            <Image src={item.image} alt={item.name} width={32} height={32} className="object-contain" />
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${item.selected ? 'text-gray-700' : 'text-gray-400'}`}>
                {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
              </div>
              <div className={`text-sm font-bold ${item.selected ? 'text-black' : 'text-gray-400'}`}>
                {formatCurrency(item.price)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4 border-t pt-3">
        <span className="font-bold text-[#12b190]">Total:</span>
        <span className="font-bold text-lg text-[#12b190]">{formatCurrency(totalPrice)}</span>
      </div>

      <AddToCartButton
        product={{
          ...product,
          name: `${product.name} - Pakke`,
          price: totalPrice,
          description: `Inkluderer: ${items.filter(i => i.selected).map(i => i.name).join(', ')}`
        }}
        className="w-full bg-[#12b190] text-white px-4 py-3 rounded font-medium hover:bg-[#0f9a7a]"
      />
    </div>
  );
}