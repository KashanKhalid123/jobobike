'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { formatCurrency } from '@/utils/currency';

interface ProductCardItemProps {
  combined: any;
  selectedVariantIndex?: number;
  onVariantChange?: (index: number) => void;
  quantity?: number;
  onQuantityChange?: (newQuantity: number) => void;
}

export default function ProductCardItem({
  combined,
  selectedVariantIndex = 0,
  onVariantChange,
  quantity = 1,
  onQuantityChange,
}: ProductCardItemProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [displayImage, setDisplayImage] = useState<string>('');

  const selectedVariant = combined.variants[selectedVariantIndex];
  const baseProduct = selectedVariant.originalProduct;
  const displayName = selectedVariant.variantName === 'Standard' 
    ? baseProduct.name 
    : `${combined.name} ${selectedVariant.variantName} - JoboBike`;
  const displayFeatures = baseProduct.features || combined.features;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    onQuantityChange?.(newQuantity);
  };

  const handleColorChange = (color: string, image: string) => {
    setSelectedColor(color);
    setDisplayImage(image);
  };

  const currentImage = displayImage || (baseProduct.colors && baseProduct.colorImages 
    ? baseProduct.colorImages[baseProduct.colors[0]] 
    : baseProduct.image);

  return (
    <li
      className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black h-[360px] sm:h-[360px] flex flex-col cursor-pointer"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('button')) {
          window.location.href = `/products/${combined.baseSlug}`;
        }
      }}
    >
      <div className="relative mb-2 sm:mb-8 h-[140px] sm:h-[160px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            className="object-contain rounded-lg sm:rounded-xl max-w-full max-h-full"
            src={currentImage}
            alt={displayName}
            width={250}
            height={250}
            unoptimized
            sizes="(max-width: 640px) 140px, 250px"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xs sm:text-sm font-medium text-black group-hover:underline leading-tight h-[32px] sm:h-[36px] flex items-start">
          <span className="break-words line-clamp-2">{displayName}</span>
        </h3>

        <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1 min-w-0">
            {baseProduct.colors && baseProduct.colors.length > 0 ? (
              <div className="mb-1 flex gap-1">
                {baseProduct.colors.map((color: string) => {
                  const colorMap: { [key: string]: string } = {
                    "Svart": "#000000",
                    "Hvit": "#FFFFFF",
                    "Grå": "#808080",
                    "Grønn": "#22c55e",
                    "Blå": "#3b82f6",
                    "Rød": "#ef4444",
                  };
                  return (
                    <button
                      key={color}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (baseProduct.colorImages && baseProduct.colorImages[color]) {
                          handleColorChange(color, baseProduct.colorImages[color]);
                        }
                      }}
                      className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-black transition-all"
                      style={{ backgroundColor: colorMap[color] || color }}
                      title={color}
                    />
                  );
                })}
              </div>
            ) : null}
            {combined.variants.length > 1 && (
              <div className="mb-1">
                <div className="flex flex-wrap gap-1">
                  {combined.variants.map((variant: any, index: number) => (
                    <button
                      key={variant.variantSlug}
                      onClick={(e) => {
                        e.stopPropagation();
                        onVariantChange?.(index);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
                        selectedVariantIndex === index
                          ? 'bg-[#12b190] text-white'
                          : 'bg-gray-100 text-[#12b190] hover:bg-gray-200'
                      }`}
                      title={variant.variantName}
                    >
                      {variant.variantName}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {combined.variants.length === 1 && !baseProduct.colors && baseProduct.availableSizes && baseProduct.availableSizes.length > 1 && (
              <div className="mb-1">
                <div className="flex flex-wrap gap-1">
                  {baseProduct.availableSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-100 text-[#12b190] hover:bg-gray-200 transition-all"
                      title={size}
                    >
                      {size.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <span className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
              {formatCurrency(baseProduct.price)}
            </span>

            {displayFeatures?.length && (
              <ul className="mt-1 flex flex-col gap-1 text-[8px] sm:text-[10px] text-gray-700">
                {displayFeatures.slice(0, 2).map((f: string, i: number) => (
                  <li
                    key={i}
                    className="rounded-md border border-gray-200 px-1 sm:px-1.5 py-0.5 w-fit text-ellipsis overflow-hidden max-w-full"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center border border-gray-200 rounded-md w-fit">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(quantity - 1);
                }}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3 text-gray-600" />
              </button>
              <span className="text-xs font-semibold min-w-[16px] text-center text-black px-1">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(quantity + 1);
                }}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3 text-gray-600" />
              </button>
            </div>

            <AddToCartButton
              product={baseProduct}
              quantity={quantity}
              className="w-full sm:flex-1 rounded-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white sm:bg-[#12b190] sm:hover:bg-[#29ecc5] transition md:text-white md:hover:border-black md:bg-black md:hover:bg-gray-50 sm:hover:text-black whitespace-nowrap"
            />
          </div>
        </div>
      </div>
    </li>
  );
}
