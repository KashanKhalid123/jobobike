"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCard, PRODUCTS_DATA } from "@/lib/productData";
import { accessoriesProducts, AccessoryProduct } from "@/lib/accessoriesProducts";
import { formatCurrency } from "@/utils/currency";
import { useCart } from "./CartContext";

interface BikePackageBuilderProps {
  product: ProductCard;
}

interface PackageItem {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "bike" | "accessory";
  accessory?: AccessoryProduct;
  selected: boolean;
}

export default function BikePackageBuilder({ product }: BikePackageBuilderProps) {
  const { addToCart } = useCart();
  const productNameParts = product.name.split(' - ')[0].trim().split(' ');
  const baseName = productNameParts[0].toUpperCase();
  const fullName = productNameParts.join(' ').toUpperCase();
  
  const allCompatibleAccessories = accessoriesProducts.filter(acc => 
    acc.compatibility.some(comp => {
      const compUpper = comp.toUpperCase();
      if (compUpper.includes('UNIVERSAL') || compUpper.includes('ALL')) return false;
      return compUpper.includes(fullName) || compUpper.includes(baseName);
    })
  );
  
  const universalAccessories = accessoriesProducts.filter(acc => 
    acc.compatibility.some(comp => 
      comp.toUpperCase().includes('UNIVERSAL') || comp.toUpperCase().includes('ALL')
    )
  );
  
  let carouselAccessories = allCompatibleAccessories;
  if (allCompatibleAccessories.length < 5) {
    carouselAccessories = [...allCompatibleAccessories, ...universalAccessories];
  }
  
  const carouselAccessoryIds = new Set(carouselAccessories.map(acc => acc.id));
  
  const otherAccessories = accessoriesProducts.filter(acc => !carouselAccessoryIds.has(acc.id));
  
  const specificAccessories = otherAccessories.filter(acc => 
    acc.compatibility.some(comp => {
      const compUpper = comp.toUpperCase();
      if (compUpper.includes('UNIVERSAL') || compUpper.includes('ALL')) return false;
      return compUpper.includes(baseName);
    })
  );
  
  let suggestedAccessories = specificAccessories.slice(0, 3);
  if (suggestedAccessories.length < 3) {
    const universalAccessories = otherAccessories.filter(acc => 
      acc.compatibility.some(comp => 
        comp.includes('Universal') || comp.includes('All')
      )
    );
    suggestedAccessories = [
      ...suggestedAccessories,
      ...universalAccessories.slice(0, 3 - suggestedAccessories.length)
    ];
  }
  
  const otherBikes = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0, 3);
  
  const suggestedItems = [
    ...otherBikes.map(bike => ({
      id: bike.id,
      name: bike.name,
      price: bike.price,
      image: bike.image,
      type: "bike" as const,
      selected: false
    })),
    ...suggestedAccessories.map(acc => ({
      id: acc.id,
      name: acc.name,
      price: acc.price,
      image: acc.image,
      type: "accessory" as const,
      accessory: acc,
      selected: false
    }))
  ];
  
  const finalSuggestedItems = suggestedItems;

  const [packageItems, setPackageItems] = useState<PackageItem[]>(finalSuggestedItems);

  const toggleItem = (id: string) => {
    setPackageItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const { totalPrice } = useMemo(() => {
    const selectedItems = packageItems.filter(i => i.selected);
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
    return { totalPrice };
  }, [packageItems]);

  const selectedItems = packageItems.filter((item) => item.selected);
  const selectedCount = selectedItems.length;

  if (finalSuggestedItems.length < 2) return null;
  
  return (
    <section className="h-full bg-white">
      <h3 className="font-semibold mb-2 text-black text-lg lg:text-2xl">Foreslåtte produkter:</h3>
      <div className="grid grid-cols-3 lg:grid-cols-3 gap-1 lg:gap-2 mb-3">
        {packageItems.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`border rounded lg:rounded-lg p-1 lg:p-2 transition-all flex flex-col text-left ${
              item.selected ? 'border-[#12b190] bg-[#12b190]/5' : 'border-gray-200 hover:border-[#12b190]'
            }`}
          >
            <div className="w-full aspect-square bg-white rounded mb-0.5 lg:mb-1 overflow-hidden flex items-center justify-center flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
            <p className="text-[10px] lg:text-xs text-gray-900 text-center line-clamp-2 leading-tight font-medium">{item.name}</p>
            <p className="text-xs lg:text-sm font-bold text-center text-[#12b190]">{formatCurrency(item.price)}</p>
          </button>
        ))}
      </div>



      <div className="flex items-end gap-2 lg:gap-3 px-4 lg:px-0">
        <div className="flex-1">
          <div className="text-[10px] lg:text-sm font-bold text-black mb-0.5">Totalt:</div>
          <span className="text-base lg:text-2xl font-bold text-black">{formatCurrency(totalPrice)}</span>
        </div>
        
        <button
          onClick={() => {
            const selectedItems = packageItems.filter(i => i.selected);
            selectedItems.forEach(item => {
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                originalPrice: item.price,
                image: item.image,
                category: item.type === 'bike' ? ['Sykkel'] : ['Tilbehør']
              }, 1);
            });
          }}
          disabled={selectedCount === 0}
          className="bg-[#12b190] text-white px-3 lg:px-6 py-2 lg:py-3 rounded-md font-semibold hover:bg-[#0e9a7a] disabled:bg-gray-300 disabled:cursor-not-allowed text-[11px] lg:text-base whitespace-nowrap"
        >
          LEGG I KURV ({selectedCount})
        </button>
      </div>

      <div className="mt-2 px-4 lg:px-0 text-[9px] lg:text-sm text-gray-600">
        <p><span className="text-[#12b190]">✓</span> Fri frakt</p>
        <p><span className="text-[#12b190]">✓</span> 2 års garanti</p>
      </div>
    </section>
  );
}
