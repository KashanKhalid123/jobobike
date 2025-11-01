"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";

interface CategoryClientProps {
  products: any[];
  slug: string;
}

const SORTS = [
  { value: "recommended", label: "Anbefalt" },
  { value: "new", label: "Nyheter" },
  { value: "price-asc", label: "Pris: Lavâ€“HÃ¸y" },
  { value: "price-desc", label: "Pris: HÃ¸yâ€“Lav" },
];

export default function CategoryClient({ products, slug }: CategoryClientProps) {
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const perPage = 24;
  const total = products.length;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const sortedProducts = useMemo(() => {
    let arr = [...products];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "new") arr.reverse();
    return arr.slice((page - 1) * perPage, page * perPage);
  }, [sort, page, products]);

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
          {sortedProducts.map((product) => (
            <li
              key={product.id}
              className="group rounded-xl sm:rounded-2xl border border-gray-200 p-2 sm:p-3 transition hover:border-black min-h-[280px] sm:min-h-[320px] flex flex-col"
            >
              <div className="relative mb-2 sm:mb-3">
                <Link href={`/products/${product.slug}`}>
                  <Image
                    className="object-cover w-[85%] h-[85%] sm:w-full sm:h-full m-auto sm:m-0 rounded-lg sm:rounded-xl"
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    unoptimized
                    sizes="(max-width: 640px) 150px, 300px"
                  />
                </Link>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xs sm:text-sm font-medium text-black group-hover:underline leading-tight mb-2 mt-3 sm:mt-4">
                  <Link href={`/products/${product.slug}`} className="break-words">
                    {product.name}
                  </Link>
                </h3>

              <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1 min-w-0">
                  <span className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
                    {formatCurrency(product.price)}
                  </span>

                  
                  {product.features?.length && (
                    <ul className="mt-1 flex flex-col gap-1 text-[8px] text-gray-700 sm:hidden">
                      {product.features.slice(0, 2).map((f: string, i: number) => (
                        <li
                          key={i}
                          className="rounded-md border border-gray-200 px-1 py-0.5 whitespace-nowrap w-fit"
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
              </div>
            </li>
          ))}
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
