// src/app/products/[slug]/page.tsx
import { getAllProductSlugs, getProductBySlug } from "@/lib/productData";
import { getAllBaseSlugs, getCombinedByAnySlug } from "@/lib/productVariants";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const baseSlugs = getAllBaseSlugs();
  const allSlugs = getAllProductSlugs();
  return [...new Set([...baseSlugs, ...allSlugs])].map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  // Try to get combined product (with variants)
  const combined = getCombinedByAnySlug(slug);
  
  if (combined) {
    return (
      <div className="px-4 md:px-0">
        <ProductDetails 
          combinedProduct={combined.product} 
          initialVariantIndex={combined.selectedIndex}
        />
      </div>
    );
  }
  
  // Fallback to single product (no variants)
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="px-4 md:px-0">
      <ProductDetails product={product} />
    </div>
  );
}
