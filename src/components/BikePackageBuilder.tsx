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
  
  const compatibleAccessoriesInDetail = accessoriesProducts.filter(acc => 
    acc.compatibility.some(comp => {
      const compUpper = comp.toUpperCase();
      if (compUpper.includes('UNIVERSAL') || compUpper.includes('ALL')) return false;
      return compUpper.includes(fullName) || compUpper.includes(baseName);
    })
  ).slice(0, 4);
  
  const compatibleAccessoryIds = new Set(compatibleAccessoriesInDetail.map(acc => acc.id));
  
  const otherAccessories = accessoriesProducts.filter(acc => !compatibleAccessoryIds.has(acc.id));
  
  const specificAccessories = otherAccessories.filter(acc => 
    acc.compatibility.some(comp => {
      const compUpper = comp.toUpperCase();
      if (compUpper.includes('UNIVERSAL') || compUpper.includes('ALL')) return false;
      return compUpper.includes(baseName);
    })
  );
  
  let suggestedAccessories = specificAccessories.slice(0, 4);
  if (suggestedAccessories.length < 4) {
    const universalAccessories = otherAccessories.filter(acc => 
      acc.compatibility.some(comp => 
        comp.includes('Universal') || comp.includes('All')
      )
    );
    suggestedAccessories = [
      ...suggestedAccessories,
      ...universalAccessories.slice(0, 4 - suggestedAccessories.length)
    ];
  }
  
  const otherBikes = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0, 2);
  
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
  
  const finalSuggestedItems = suggestedItems.length >= 2 ? suggestedItems.slice(0, 6) : suggestedItems;

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
      <h3 className="font-semibold mb-2 text-black text-xs">Foreslåtte produkter:</h3>
      <div className="grid grid-cols-3 gap-1 mb-2">
        {packageItems.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`border rounded p-0.5 transition-colors text-left ${
              item.selected ? 'border-[#12b190] ring-1 ring-[#12b190]' : 'border-gray-200 hover:border-[#12b190]'
            }`}
          >
            <div className="aspect-square bg-white rounded mb-0.5 overflow-hidden flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
            <p className="text-[10px] text-gray-700 text-center line-clamp-1 leading-tight">{item.name}</p>
            <p className="text-[10px] font-semibold text-center text-[#12b190]">{formatCurrency(item.price)}</p>
          </button>
        ))}
      </div>



      <div className="mb-2 text-xs">
        <div className="font-bold text-black">Totalt:</div>
        <span className="text-lg font-bold text-black">{formatCurrency(totalPrice)}</span>
      </div>

      <button
        onClick={() => {
          const selectedItems = packageItems.filter(i => i.selected);
          selectedItems.forEach(item => {
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              category: item.type === 'bike' ? ['Sykkel'] : ['Tilbehør']
            } as any, 1);
          });
        }}
        className="w-full bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0e9a7a]"
      >
        LEGG ALT I HANDLEKURV ({selectedCount})
      </button>

      <div className="mt-2 text-[11px] text-gray-600">
        <p><span className="text-[#12b190]">✓</span> Fri frakt</p>
        <p><span className="text-[#12b190]">✓</span> 2 års garanti</p>
      </div>
    </section>
  );
}
