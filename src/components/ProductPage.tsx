"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";
import { PRODUCTS_DATA } from "@/lib/productData";
import { getCombinedProducts } from "@/lib/productVariants";
import { useCart } from "./CartContext";

/**
 * ProductPage.tsx
 * Cycle "Product" Category Page clone of Anton Sport /sykkel layout.
 * - Theme: white, yellow (#facc15), black, gray
 * - All images replaced with gray placeholders
 * - Fully responsive
 * - Semantic HTML + accessible aria labels
 */



const SORTS = [
  { value: "recommended", label: "Anbefalt" },
  { value: "new", label: "Nyheter" },
  { value: "price-asc", label: "Pris: Lav–Høy" },
  { value: "price-desc", label: "Pris: Høy–Lav" },
];

export default function ProductPage() {
  const [sort, setSort] = useState(SORTS[0].value);
  const [page, setPage] = useState(1);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: number}>({});
  const { updateQuantity } = useCart();

  const perPage = 24;
  const combinedProducts = useMemo(() => getCombinedProducts(), []);
  const total = combinedProducts.length;

  const products = useMemo(() => {
    let arr = [...combinedProducts];
    if (sort === "price-asc") arr.sort((a, b) => a.variants[0].originalProduct.price - b.variants[0].originalProduct.price);
    if (sort === "price-desc") arr.sort((a, b) => b.variants[0].originalProduct.price - a.variants[0].originalProduct.price);
    if (sort === "new") arr.reverse();
    return arr.slice((page - 1) * perPage, page * perPage);
  }, [sort, page, combinedProducts]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;
  const getSelectedVariantIndex = (baseId: string) => selectedVariants[baseId] || 0;
  const updateSelectedVariant = (baseId: string, index: number) => {
    setSelectedVariants(prev => ({ ...prev, [baseId]: index }));
  };

  // Preload all visible images immediately
  useEffect(() => {
    products.forEach(product => {
      const img = new window.Image();
      img.src = product.image;
    });
  }, [products]);

  return (
    <main className="bg-white text-gray-900 pt-40 md:pt-44 lg:pt-20">     
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-2 py-3 text-sm">
          <li>
            <Link href="/" className="text-gray-600 hover:text-black transition">
              Hjem
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-black font-medium">El-sykler</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-2 pt-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-center">
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black text-center sm:text-left">El-sykler</h1>
          </div>
        </header>
      </section>

      {/* Product grid */}
      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-2">
        {/* Toolbar */}
        <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
          <div className="text-xs sm:text-sm">{total} produkter</div>
        
        </div>

        {/* Grid - Mobile: 2 columns, Desktop: 3 columns */}
        <ul role="list" className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-3 overflow-hidden">
          {products.map((combined) => {
            const selectedIndex = getSelectedVariantIndex(combined.baseId);
            const selectedVariant = combined.variants[selectedIndex];
            const baseProduct = selectedVariant.originalProduct;
            const displayName = selectedVariant.variantName === 'Standard' 
              ? baseProduct.name 
              : `${combined.name} ${selectedVariant.variantName} - JoboBike`;
            const displayFeatures = baseProduct.features || combined.features;
            return (
            <li key={combined.baseId} className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black h-[360px] sm:h-[360px] flex flex-col cursor-pointer" onClick={(e) => {
                if (!(e.target as HTMLElement).closest('button')) {
                  window.location.href = `/products/${combined.baseSlug}`;
                }
              }}>
              <div className="relative mb-2 sm:mb-8 h-[140px] sm:h-[160px] flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    className="object-contain rounded-lg sm:rounded-xl max-w-full max-h-full"
                    src={baseProduct.image} 
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
                  {combined.variants.length > 1 && (
                    <div className="mb-1">
                      <div className="flex flex-wrap gap-1">
                        {combined.variants.map((variant, index) => (
                          <button
                            key={variant.variantSlug}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateSelectedVariant(combined.baseId, index);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
                              selectedIndex === index
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
                  {combined.variants.length === 1 && baseProduct.availableSizes && baseProduct.availableSizes.length > 1 && (
                    <div className="mb-1">
                      <div className="flex flex-wrap gap-1">
                        {baseProduct.availableSizes.map((size, index) => (
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
                      {displayFeatures.slice(0, 2).map((f, i) => (
                        <li key={i} className="rounded-md border border-gray-200 px-1 sm:px-1.5 py-0.5 w-fit text-ellipsis overflow-hidden max-w-full">
                          {f}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(baseProduct.id, getQuantity(baseProduct.id) - 1);
                      }}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="text-xs font-semibold min-w-[16px] text-center text-black px-1">
                      {getQuantity(baseProduct.id)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(baseProduct.id, getQuantity(baseProduct.id) + 1);
                      }}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <AddToCartButton 
                    product={baseProduct}
                    quantity={getQuantity(baseProduct.id)}
                    className="w-full sm:flex-1 rounded-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white sm:bg-[#12b190] sm:hover:bg-[#29ecc5] transition md:text-white md:hover:border-black md:bg-black md:hover:bg-gray-50 sm:hover:text-black whitespace-nowrap"
                  />
                </div>
              </div>
              </div>
            </li>
          );})}
        </ul>

        {/* SEO text */}
        <section className="mt-8 sm:mt-10 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-black">Velg riktig sykkel</h2>
          <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700">
            Utforsk vårt utvalg av elsykler, terreng- og landeveissykler. Vi hjelper deg å finne en sykkel som passer ditt behov—til jobb, trening eller tur.
          </p>
          <ul className="mt-3 list-disc pl-4 sm:pl-5 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700 space-y-1">
            <li>Fri frakt over 1000 kr</li>
            <li>Click &amp; Collect i butikk</li>
            <li>Medlemspriser med bonus</li>
          </ul>
        </section>
      </section>
    </main>
  );
}

/* ---------- Helpers ---------- */
function SortSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm text-black hover:border-black transition">
        {SORTS.find((s) => s.value === value)?.label ?? "Sorter"}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {SORTS.map((s) => (
            <li key={s.value}>
              <button onClick={() => { onChange(s.value); setOpen(false); }} className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${s.value === value ? "bg-gray-50 font-medium" : ""}`}>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(n);
}