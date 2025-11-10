"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCard } from "@/lib/productData";
import { accessoriesProducts, AccessoryProduct } from "@/lib/accessoriesProducts";
import { formatCurrency } from "@/utils/currency";
import { AddToCartButton } from "./AddToCartButton";

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
  // Get accessories specifically compatible with this bike
  // Match by checking if compatibility array includes the bike name or a partial match
  const bikeSpecificAccessories = accessoriesProducts.filter((accessory) => {
    return accessory.compatibility.some((compat) => {
      // Check for exact match or if bike name contains the compatibility name
      const bikeName = product.name.toUpperCase();
      const compatName = compat.toUpperCase();
      return (
        bikeName.includes(compatName) ||
        compatName.includes(bikeName.split(' ')[0]) || // Match first word (e.g., "ROBIN")
        compat === product.name
      );
    });
  });

  // Get universal accessories (not bike-specific)
  const universalAccessories = accessoriesProducts.filter((accessory) => {
    return accessory.compatibility.some((compat) =>
      compat.includes("Universal") || compat.includes("All models")
    );
  });

  // Combine: bike-specific accessories + universal accessories
  const compatibleAccessories = [...bikeSpecificAccessories, ...universalAccessories];

  // Create suggested package (bike + top accessories)
  const suggestedAccessories = compatibleAccessories.slice(0, 5);

  // Initialize package items
  const [packageItems, setPackageItems] = useState<PackageItem[]>([
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: "bike",
      selected: true,
    },
    ...suggestedAccessories.map((acc) => ({
      id: acc.id,
      name: acc.name,
      price: acc.price,
      image: acc.image,
      type: "accessory" as const,
      accessory: acc,
      selected: false,
    })),
  ]);

  const toggleItem = (id: string) => {
    // Bike is always included
    if (id === product.id) return;

    setPackageItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const {
    basePrice,
    accessoriesTotal,
    accessoriesOriginalTotal,
    totalPrice,
    totalOriginal,
  } = useMemo(() => {
    const bikeItem = packageItems.find((i) => i.type === "bike");

    if (!bikeItem) {
      return {
        basePrice: 0,
        accessoriesTotal: 0,
        accessoriesOriginalTotal: 0,
        totalPrice: 0,
        totalOriginal: 0,
      };
    }

    const basePrice = bikeItem.price;
    const baseOriginalPrice =
      (bikeItem as any).originalPrice ?? bikeItem.price; // optional support

    const selectedAccessories = packageItems.filter(
      (i) => i.selected && i.type === "accessory"
    );

    let accessoriesTotal = 0;
    let accessoriesOriginalTotal = 0;

    selectedAccessories.forEach((item) => {
      const original = (item as any).originalPrice ?? item.price;
      accessoriesTotal += item.price;
      accessoriesOriginalTotal += original;
    });

    const totalPrice = basePrice + accessoriesTotal;
    const totalOriginal = baseOriginalPrice + accessoriesOriginalTotal;

    return {
      basePrice,
      accessoriesTotal,
      accessoriesOriginalTotal,
      totalPrice,
      totalOriginal,
    };
  }, [packageItems]);

  const selectedItems = packageItems.filter((item) => item.selected);
  const selectedCount = selectedItems.length;

  const handleRowClick = (item: PackageItem) => {
    if (item.type === "bike") return;
    toggleItem(item.id);
  };

  return (
    <section className="h-full bg-white">
      {/* Top image slider */}
      <div className="mb-3 pb-2">
        <div className="flex items-center gap-3 overflow-x-auto" style={{scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent'}}>
          {packageItems.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3 flex-shrink-0">
              <div className="relative w-24 h-24 rounded-sm bg-white flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={`object-contain p-1 transition-all duration-200 ${
                    !item.selected ? 'grayscale opacity-70' : ''
                  }`}
                />
              </div>
              {index < packageItems.length - 1 && (
                <span className="text-lg font-semibold text-gray-400">+</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Items list */}
      <div className="mb-4 text-sm">
        {packageItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 py-2 transition-all duration-200 ${
              item.type === "bike" ? "cursor-default" : "cursor-pointer hover:bg-gray-50"
            } ${
              item.selected ? "" : "opacity-60"
            }`}
            onClick={() => handleRowClick(item)}
          >
            <div className="flex-1 flex items-baseline justify-between gap-1">
              <span
                className={`truncate ${
                  item.type === "bike"
                    ? "text-gray-800 font-semibold"
                    : item.selected
                    ? "text-gray-800 font-medium"
                    : "text-gray-500"
                }`}
              >
                {item.selected ? <span className="text-[#12b190]">✓ </span> : ""}{item.name}
              </span>

              <div className="flex items-baseline gap-1 whitespace-nowrap">
                {(item as any).originalPrice &&
                  (item as any).originalPrice > item.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatCurrency((item as any).originalPrice)}
                    </span>
                  )}
                <span className={`text-sm font-semibold ${
                  item.selected ? "text-gray-900" : "text-gray-400"
                }`}>
                  {formatCurrency(item.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary (Tilleggspris / Totalt) */}
      <div className="mb-3 text-sm">
        <div className="mb-2">
          <div className="text-gray-700">Tilleggspris:</div>
          <div className="flex items-center gap-2">
            {accessoriesOriginalTotal > 0 &&
              accessoriesOriginalTotal > accessoriesTotal && (
                <span className="text-xs text-gray-400 line-through">
                  {formatCurrency(accessoriesOriginalTotal)}
                </span>
              )}
            <span className="font-bold text-black">
              {formatCurrency(accessoriesTotal)}
            </span>
          </div>
        </div>

        <div>
          <div className="font-bold text-black">Totalt:</div>
          <div className="flex items-center gap-2">
            {totalOriginal > 0 && totalOriginal > totalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(totalOriginal)}
              </span>
            )}
            <span className="text-xl font-bold text-black">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Add to cart button */}
      <AddToCartButton
        product={{
          id: `package-${product.id}-${Date.now()}`,
          name: `${product.name} - Pakke`,
          price: totalPrice,
          image: product.image,
        }}
        className="w-full bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0e9a7a]"
      >
        LEGG ALT I HANDLEKURV ({selectedCount})
      </AddToCartButton>

      <div className="mt-2 text-[11px] text-gray-600">
        <p><span className="text-[#12b190]">✓</span> Fri frakt</p>
        <p><span className="text-[#12b190]">✓</span> 2 års garanti</p>
      </div>
    </section>
  );
}
