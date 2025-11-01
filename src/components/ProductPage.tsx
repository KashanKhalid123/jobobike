"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";
import { PRODUCTS_DATA } from "@/lib/productData";
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
  const { updateQuantity } = useCart();

  const perPage = 24;
  const total = PRODUCTS_DATA.length;

  const products = useMemo(() => {
    let arr = [...PRODUCTS_DATA];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "new") arr.reverse();
    return arr.slice((page - 1) * perPage, page * perPage);
  }, [sort, page]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;

  // Preload first 6 images for faster loading
  useEffect(() => {
    products.slice(0, 6).forEach(product => {
      const img = new window.Image();
      img.src = product.image;
    });
  }, [products]);

  return (
    <main className="bg-white text-gray-900 mt-52 md:mt-36">     
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
          {PRODUCTS_DATA.map((product) => (
            <li key={product.id} className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black">
              <div className="relative mb-2 sm:mb-3">
                <div className="w-full rounded-lg sm:rounded-xl bg-white" />
                <Link href={`/products/${product.slug}`}>
                  <Image 
                    className='object-cover w-[85%] h-[85%] sm:w-full sm:h-full m-auto sm:m-0 rounded-lg sm:rounded-xl'
                    src={product.image} 
                    alt={product.name}
                    width={300}
                    height={300}
                    priority
                    loading="eager"
                    sizes="(max-width: 640px) 150px, 300px"
                  />
                </Link>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-medium text-black group-hover:underline leading-tight">
                  <Link href="#" className="break-words">{product.name}</Link>
                </h3>
              </div>

              <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1 min-w-0">
                  <span className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
                    {formatCurrency(product.price)}
                  </span>

                  {product.features?.length && (
                    <ul className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-gray-700">
                      {product.features.slice(0, 2).map((f, i) => (
                        <li key={i} className="rounded-md border border-gray-200 px-1.5 sm:px-2 py-0.5 whitespace-nowrap">
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
                      onClick={() => handleQuantityChange(product.id, getQuantity(product.id) - 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="text-xs font-semibold min-w-[16px] text-center text-black px-1">
                      {getQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, getQuantity(product.id) + 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <AddToCartButton 
                    product={product}
                    quantity={getQuantity(product.id)}
                    className="w-full sm:flex-1 rounded-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white sm:bg-[#12b190] sm:hover:bg-[#29ecc5] transition md:text-white md:hover:border-black md:bg-black md:hover:bg-gray-50 sm:hover:text-black whitespace-nowrap"
                  />
                </div>
              </div> 
              
            </li>
          ))}
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