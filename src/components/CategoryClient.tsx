"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { CombinedProduct } from "@/lib/productVariants";

interface CategoryClientProps {
  combinedProducts: CombinedProduct[];
  slug: string;
}

const SORTS = [
  { value: "recommended", label: "Anbefalt" },
  { value: "new", label: "Nyheter" },
  { value: "price-asc", label: "Pris: Lav-Høy" },
  { value: "price-desc", label: "Pris: Høy-Lav" },
];

export default function CategoryClient({ combinedProducts, slug }: CategoryClientProps) {
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const perPage = 24;
  const total = combinedProducts.length;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const sortedProducts = useMemo(() => {
    let arr = [...combinedProducts];
    if (sort === "price-asc") arr.sort((a, b) => a.variants[0].originalProduct.price - b.variants[0].originalProduct.price);
    if (sort === "price-desc") arr.sort((a, b) => b.variants[0].originalProduct.price - a.variants[0].originalProduct.price);
    if (sort === "new") arr.reverse();
    return arr.slice((page - 1) * perPage, page * perPage);
  }, [sort, page, combinedProducts]);

  useEffect(() => {
    sortedProducts.forEach(product => {
      const img = new window.Image();
      img.src = product.image;
    });
  }, [sortedProducts]);

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
          <li className="text-black font-medium capitalize">{slug.replace("-", " ")}</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-2 pt-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-center">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black text-center sm:text-left capitalize">
            {slug.replace("-", " ")}
          </h1>
        </header>
      </section>

      {/* Product grid */}
      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-2 mb-16">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
          <div className="text-xs sm:text-sm">{total} produkter</div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-3 overflow-hidden"
        >
          {sortedProducts.map((combined) => {
            const baseProduct = combined.variants[0].originalProduct;
            return (
            <li
              key={combined.baseId}
              className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black h-[360px] sm:h-[360px] flex flex-col"
            >
              <div className="relative mb-2 sm:mb-8 h-[140px] sm:h-[160px] flex items-center justify-center">
                <Link href={`/products/${combined.baseSlug}`} className="relative w-full h-full flex items-center justify-center">
                  <Image
                    className="object-contain rounded-lg sm:rounded-xl max-w-full max-h-full"
                    src={combined.image}
                    alt={combined.name}
                    width={250}
                    height={250}
                    unoptimized
                    sizes="(max-width: 640px) 140px, 250px"
                  />
                </Link>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xs sm:text-sm font-medium text-black group-hover:underline leading-tight h-[32px] sm:h-[36px] flex items-start">
                  <Link href={`/products/${combined.baseSlug}`} className="break-words line-clamp-2">
                    {baseProduct.name}
                  </Link>
                </h3>

              <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1 min-w-0">
                  <span className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
                    {formatCurrency(baseProduct.price)}
                  </span>

                  
                  {combined.features?.length && (
                    <ul className="mt-1 flex flex-col gap-1 text-[8px] sm:text-[10px] text-gray-700">
                      {combined.features.slice(0, 2).map((f: string, i: number) => (
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

                {/* Quantity + Add to Cart */}
                <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-2">
                  {/* Compact Quantity Selector */}
                  <div className="flex items-center border border-gray-200 rounded-md w-fit">
                    <button
                      onClick={() => handleQuantityChange(baseProduct.id, getQuantity(baseProduct.id) - 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="text-xs font-semibold min-w-[16px] text-center text-black px-1">
                      {getQuantity(baseProduct.id)}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(baseProduct.id, getQuantity(baseProduct.id) + 1)}
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
          )})}
        </ul>
      </section>
    </main>
  );
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(n);
}
