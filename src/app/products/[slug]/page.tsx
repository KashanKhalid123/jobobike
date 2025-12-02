// src/app/products/[slug]/page.tsx
import { getAllProductSlugs, getProductBySlug } from "@/lib/productData";
import { getAllBaseSlugs, getCombinedByAnySlug } from "@/lib/productVariants";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetails from "@/components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const combined = getCombinedByAnySlug(slug);
  const product = combined ? combined.product.variants[combined.selectedIndex].originalProduct : getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Produkt ikke funnet',
    };
  }

  return {
    title: `${product.name} | JOBOBIKE Norge - Premium El-sykkel`,
    description: `${product.description} Kjøp ${product.name} med gratis frakt og 2 års garanti. Pris: ${product.price} kr. Bestill nå!`,
    keywords: `${product.name}, el-sykkel, ${product.category.join(', ')}, jobobike, kjøp el-sykkel`,
    openGraph: {
      title: `${product.name} - JOBOBIKE Norge`,
      description: product.description,
      images: [product.image],
      url: `https://jobobike.no/products/${slug}`,
    },
  };
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
      <ProductDetails 
        combinedProduct={combined.product} 
        initialVariantIndex={combined.selectedIndex}
      />
    );
  }
  
  // Fallback to single product (no variants)
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <ProductDetails product={product} />
  );
}
