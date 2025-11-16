// src/lib/productVariants.ts
import { PRODUCTS_DATA, ProductCard } from './productData';

export interface CombinedProductVariant {
  variantName: string;
  variantSlug: string;
  originalProduct: ProductCard;
}

export interface CombinedProduct {
  baseId: string;
  name: string;
  baseSlug: string;
  variants: CombinedProductVariant[];
  rating: number;
  reviewCount: number;
  badge?: string;
  category: string[];
  availableSizes: string[];
  image: string;
  features: string[];
}

function extractBaseName(productName: string): string {
  const cleaned = productName.replace(/\s*-\s*jobobike\s*$/i, '').trim();
  const firstWord = cleaned.split(/\s+/)[0];
  return firstWord.toUpperCase();
}

function extractVariantName(productName: string, baseName: string): string {
  const cleaned = productName.replace(/\s*-\s*jobobike\s*$/i, '').trim();
  const rest = cleaned.substring(baseName.length).trim();
  return rest || 'Standard';
}

function extractBrand(slug: string): string {
  return slug.split('-')[0];
}

function groupProductsByBase(): Map<string, ProductCard[]> {
  const groups = new Map<string, ProductCard[]>();
  
  PRODUCTS_DATA.forEach(product => {
    const baseName = extractBaseName(product.name);
    const brand = extractBrand(product.slug);
    const key = `${brand}-${baseName.toLowerCase()}`;
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(product);
  });
  
  return groups;
}

export function getCombinedProducts(): CombinedProduct[] {
  const groups = groupProductsByBase();
  const combined: CombinedProduct[] = [];
  
  groups.forEach((products, baseSlug) => {
    if (products.length === 0) return;
    
    const baseName = extractBaseName(products[0].name);
    const variants: CombinedProductVariant[] = products.map(p => ({
      variantName: extractVariantName(p.name, baseName),
      variantSlug: p.slug,
      originalProduct: p
    }));
    
    // Sort variants: Grønn first for Transer, Standard first for others, then alphabetically
    variants.sort((a, b) => {
      if (baseName === 'TRANSER') {
        if (a.variantName === 'Grønn') return -1;
        if (b.variantName === 'Grønn') return 1;
        if (a.variantName === 'Grå') return b.variantName === 'Hvit' ? -1 : 1;
        if (b.variantName === 'Grå') return a.variantName === 'Hvit' ? 1 : -1;
      }
      if (a.variantName === 'Standard') return -1;
      if (b.variantName === 'Standard') return 1;
      return a.variantName.localeCompare(b.variantName);
    });
    
    const maxRating = Math.max(...products.map(p => p.rating));
    const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);
    const premiumVariant = products.find(p => p.badge) || products[0];
    const allCategories = [...new Set(products.flatMap(p => p.category))];
    const allSizes = [...new Set(products.flatMap(p => p.availableSizes))];
    
    combined.push({
      baseId: baseSlug,
      name: baseName,
      baseSlug,
      variants,
      rating: maxRating,
      reviewCount: totalReviews,
      badge: premiumVariant.badge,
      category: allCategories,
      availableSizes: allSizes,
      image: products[0].image,
      features: products[0].features
    });
  });
  
  return combined;
}

export function getCombinedProductByBaseSlug(baseSlug: string): CombinedProduct | undefined {
  const combined = getCombinedProducts();
  return combined.find(p => p.baseSlug === baseSlug);
}

export function getAllBaseSlugs(): string[] {
  return getCombinedProducts().map(p => p.baseSlug);
}

export function getCombinedByAnySlug(slug: string): { product: CombinedProduct; selectedIndex: number } | undefined {
  const combined = getCombinedProducts();
  
  // Try as base slug first
  let product = combined.find(p => p.baseSlug === slug);
  if (product) {
    return { product, selectedIndex: 0 };
  }
  
  // Try as variant slug
  for (const p of combined) {
    const variantIndex = p.variants.findIndex(v => v.variantSlug === slug);
    if (variantIndex !== -1) {
      return { product: p, selectedIndex: variantIndex };
    }
  }
  
  return undefined;
}

export function resolveBaseSlug(slug: string): string | undefined {
  const result = getCombinedByAnySlug(slug);
  return result?.product.baseSlug;
}

// Helper to check if a product has variants
export function hasVariants(baseSlug: string): boolean {
  const product = getCombinedProductByBaseSlug(baseSlug);
  return product ? product.variants.length > 1 : false;
}
