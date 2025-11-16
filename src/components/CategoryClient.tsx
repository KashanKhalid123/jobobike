"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { CombinedProduct } from "@/lib/productVariants";
import ProductCardItem from "@/components/ProductCardItem";

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
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: number }>({});

  const perPage = 24;
  const total = combinedProducts.length;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;
  const getSelectedVariantIndex = (baseId: string) => selectedVariants[baseId] || 0;
  const updateSelectedVariant = (baseId: string, index: number) => {
    setSelectedVariants(prev => ({ ...prev, [baseId]: index }));
  };

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
    <main className="bg-white text-gray-900 pt-8 lg:pt-20">
      <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-2 py-3 lg:pt-10 text-sm">
          <li>
            <Link href="/" className="text-gray-600 hover:text-black transition">
              Hjem
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-black font-medium capitalize">{slug.replace("-", " ")}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 sm:px-2 pt-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-center">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-black text-center sm:text-left capitalize">
            {slug.replace("-", " ")}
          </h1>
        </header>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-2 mb-16">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
          <div className="text-xs sm:text-sm">{total} produkter</div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-3 overflow-hidden"
        >
          {sortedProducts.map((combined) => (
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
      </section>
    </main>
  );
}
