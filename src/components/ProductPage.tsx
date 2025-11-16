"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PRODUCTS_DATA } from "@/lib/productData";
import { getCombinedProducts } from "@/lib/productVariants";
import { useCart } from "./CartContext";
import ProductCardItem from "./ProductCardItem";

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
  const [selectedColors, setSelectedColors] = useState<{[key: string]: string}>({});
  const [productImages, setProductImages] = useState<{[key: string]: string}>({});
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
  const getSelectedColor = (productId: string, defaultColor?: string) => selectedColors[productId] || defaultColor || '';
  const getProductImage = (productId: string, defaultImage: string) => productImages[productId] || defaultImage;
  const updateSelectedColor = (productId: string, color: string, image: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
    setProductImages(prev => ({ ...prev, [productId]: image }));
  };
  const getDefaultColor = (product: any) => {
    if (!product.colors || !product.colorImages) return '';
    return product.colors[0];
  };

  // Preload all visible images immediately
  useEffect(() => {
    products.forEach(product => {
      const img = new window.Image();
      img.src = product.image;
    });
  }, [products]);

  return (
    <main className="bg-white text-gray-900 pt-8 lg:pt-20">     
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
          {products.map((combined) => (
            <ProductCardItem
              key={combined.baseId}
              combined={combined}
              selectedVariantIndex={getSelectedVariantIndex(combined.baseId)}
              onVariantChange={(index) => updateSelectedVariant(combined.baseId, index)}
              quantity={getQuantity(combined.variants[getSelectedVariantIndex(combined.baseId)].originalProduct.id)}
              onQuantityChange={(newQuantity) => handleQuantityChange(combined.variants[getSelectedVariantIndex(combined.baseId)].originalProduct.id, newQuantity)}
            />
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