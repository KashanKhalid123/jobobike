"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductCard, PRODUCTS_DATA } from "@/lib/productData";
import { CombinedProduct } from "@/lib/productVariants";
import { accessoriesProducts } from "@/lib/accessoriesProducts";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Minus, Plus , Star} from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "./CartContext";
import TechnicalSpecifications from "./TechnicalSpecs";
import BikePackageBuilder from "./BikePackageBuilder";

import { formatCurrency } from "@/utils/currency";

function ReviewStars({ rating = 5, reviewCount = 14 }: { rating?: number; reviewCount?: number }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-[#12b190] text-[#12b190]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">{reviewCount} anmeldelser</span>
    </div>
  );
}

interface ProductDetailsProps {
  product?: ProductCard;
  combinedProduct?: CombinedProduct;
  initialVariantIndex?: number;
}

export default function ProductDetails({ product: singleProduct, combinedProduct, initialVariantIndex = 0 }: ProductDetailsProps) {
  const router = useRouter();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(initialVariantIndex);
  const [selectedAccessories, setSelectedAccessories] = useState<{id: string; name: string; price: number; image: string}[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  
  // Determine current product
  const product = combinedProduct 
    ? combinedProduct.variants[selectedVariantIndex].originalProduct 
    : singleProduct!;
  
  const hasVariants = combinedProduct && combinedProduct.variants.length > 1;
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.image || "");
  const [currentImages, setCurrentImages] = useState(product.images || [product.image]);
  
  // Update image when variant changes
  useEffect(() => {
    const initialImages = product.images || [product.image];
    setCurrentImages(initialImages);
    setSelectedImage(initialImages[0] || "");
    setSelectedColor(product.colors?.[0] || "");
  }, [selectedVariantIndex, product]);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || "");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { updateQuantity, addToCart } = useCart();
  
  const totalPrice = product.originalPrice + selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
  const isProductOutOfStock = product.inStock === false;

  const [quantity, setQuantity] = useState<number>(1);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return; // don't allow 0 or negative
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity); // keep cart in sync
  };

  return (
    <div className="md:pt-12 w-full overflow-x-hidden">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm overflow-x-auto">
          <li className="flex-shrink-0">
            <Link href="/cycle" className="text-gray-600 hover:text-black transition">
              Sykkel
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400 flex-shrink-0">/</li>
          <li className="text-black font-medium truncate min-w-0">{product.name}</li>
        </ol>
      </nav>

      {/* MOBILE LAYOUT (sm and below) */}
      <div className="lg:hidden w-full max-w-full overflow-x-hidden">
        {/* MOBILE IMAGE SECTION */}
        <div className="mt-6 px-4">
          {/* Main Image */}
          <div className="mb-4 relative rounded-lg bg-white">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className={`w-full h-[400px] object-contain p-6 ${isProductOutOfStock ? 'opacity-60' : ''}`}
            />
            {!isProductOutOfStock && product.originalPrice && product.originalPrice !== product.price && (
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-20">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            )}
            {!isProductOutOfStock && ['henry-001', 'transer-001', 'robin-pro-001', 'dyno-001', 'luxe-snow-001'].includes(product.id) && (
              <div className="absolute top-3 left-3 bg-orange-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-20">
                BLACK WEEK
              </div>
            )}
            {isProductOutOfStock && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                UTSOLGT
              </div>
            )}
            {/* Navigation Arrows */}
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const currentIndex = currentImages.indexOf(selectedImage);
                    const prevIndex = currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1;
                    setSelectedImage(currentImages[prevIndex]);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-lg z-20"
                >
                  <ChevronLeft size={16} className="text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    const currentIndex = currentImages.indexOf(selectedImage);
                    const nextIndex = currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1;
                    setSelectedImage(currentImages[nextIndex]);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-lg z-20"
                >
                  <ChevronRight size={16} className="text-gray-700" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Thumbnails - Arrow Navigation */}
          <div className="relative">
            <div
              id="thumbnailContainer"
              className="flex gap-3 overflow-x-hidden pb-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {currentImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 border rounded-md p-1 ${selectedImage === img ? "border-black" : "border-gray-300"
                    }`}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="object-contain w-[60px] h-[60px]"
                  />
                </button>
              ))}
            </div>

            {/* Left Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById('thumbnailContainer');
                if (container) container.scrollBy({ left: -150, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md z-10"
            >
              <ChevronLeft size={16} className="text-gray-700" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById('thumbnailContainer');
                if (container) container.scrollBy({ left: 150, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md z-10"
            >
              <ChevronRight size={16} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* MOBILE PRODUCT INFO */}
        <div className="mt-6 space-y-4 px-4 w-full max-w-full">
          <div>
            <h1 className="text-xl font-bold text-black">{product.name}</h1>
            <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
            
            {/* VARIANT SELECTOR - Mobile */}
            {hasVariants && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Velg variant:</label>
                <div className="flex flex-wrap gap-2">
                  {combinedProduct!.variants.map((variant, idx) => (
                    <button
                      key={variant.variantSlug}
                      onClick={() => {
                        setSelectedVariantIndex(idx);
                        router.push(`/products/${variant.variantSlug}`, { scroll: false });
                      }}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        selectedVariantIndex === idx
                          ? 'bg-[#12b190] text-white border-[#12b190]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#12b190]'
                      }`}
                    >
                      {variant.variantName}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* COLOR SELECTOR - Mobile */}
            {product.colors && product.colors.length > 1 && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Farge:</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const colorMap: { [key: string]: string } = {
                      "Svart": "#000000",
                      "Hvit": "#FFFFFF",
                      "Grå": "#808080",
                      "Grønn": "#22c55e",
                      "Lys Grønn": "#90EE90",
                      "Blå": "#3b82f6",
                      "Rød": "#ef4444",
                      "Jungle Green": "#006400",
                      "Black Olive": "#3b3c36",
                      "Special": "#ef4444",
                      "Peach": "#FFDAB9"
                    };
                    const colorValue = colorMap[color];
                    const isGradient = colorValue === "gradient";
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          if (product.colorImageArrays && product.colorImageArrays[color]) {
                            const colorImages = product.colorImageArrays[color];
                            setCurrentImages(colorImages);
                            setSelectedImage(colorImages[0]);
                          } else if (product.colorImages && product.colorImages[color]) {
                            setCurrentImages([product.colorImages[color]]);
                            setSelectedImage(product.colorImages[color]);
                          }
                        }}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${isSelected ? 'border-black ring-2 ring-black' : 'border-gray-300 hover:border-black'}`}
                        style={isGradient ? { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } : { backgroundColor: colorValue || "#FFFFFF" }}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Description */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3 text-black">Om produktet</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Mobile Key Features */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-black">Hovedfunksjoner:</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm">
              {product.keyFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Mobile Compatible Accessories */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-black">Kompatible tilbehør:</h3>
            <div className="relative overflow-hidden">
              <div id="mobileAccessoriesCarousel" className="overflow-hidden scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="inline-flex gap-2">
              {(() => {
                const productName = product.name.split(' - ')[0].trim().split(' ')[0];
                const specificAccessories = accessoriesProducts.filter(acc => 
                  acc.inStock !== false &&
                  acc.compatibility.some(comp => {
                    const compName = comp.split(' ')[0].toUpperCase();
                    return compName === productName.toUpperCase() || 
                           comp.toUpperCase().includes(productName.toUpperCase());
                  })
                );
                const universalAccessories = accessoriesProducts.filter(acc => 
                  acc.inStock !== false &&
                  acc.compatibility.some(comp => 
                    comp.includes('Universal') || comp.includes('All')
                  )
                );
                
                const displayAccessories = [...specificAccessories, ...universalAccessories];
                
                return displayAccessories.length > 0 ? (
                  Array.from({ length: Math.ceil(displayAccessories.length / 4) }).map((_, pageIndex) => (
                    <div key={pageIndex} className="grid grid-cols-2 grid-rows-2 gap-2 min-w-full flex-shrink-0 snap-start">
                      {displayAccessories.slice(pageIndex * 4, pageIndex * 4 + 4).map((accessory) => {
                        const isSelected = selectedAccessories.some(acc => acc.id === accessory.id);
                        return (
                          <button
                            key={accessory.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedAccessories(prev => prev.filter(acc => acc.id !== accessory.id));
                              } else {
                                setSelectedAccessories(prev => [...prev, {
                                  id: accessory.id,
                                  name: accessory.name,
                                  price: accessory.price,
                                  image: accessory.image
                                }]);
                              }
                            }}
                            className={`border rounded-md p-2 transition-colors bg-white text-left ${
                              isSelected ? 'border-[#12b190] ring-2 ring-[#12b190]' : 'border-gray-200 hover:border-[#12b190]'
                            }`}
                          >
                            <div className="aspect-square bg-white rounded mb-1 overflow-hidden flex items-center justify-center">
                              <Image
                                src={accessory.image}
                                alt={accessory.name}
                                width={100}
                                height={100}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-xs text-gray-700 text-center line-clamp-2">{accessory.name}</p>
                            <p className="text-xs font-semibold text-center text-[#12b190] mt-1">{formatCurrency(accessory.price)}</p>
                          </button>
                        );
                      })}
                    </div>
                  ))
                ) : null;
              })()}
                </div>
              </div>
              <button
                onClick={() => {
                  const container = document.getElementById('mobileAccessoriesCarousel');
                  const scrollAmount = container?.offsetWidth || 0;
                  if (container) container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md z-10"
              >
                <ChevronLeft size={16} className="text-gray-700" />
              </button>
              <button
                onClick={() => {
                  const container = document.getElementById('mobileAccessoriesCarousel');
                  const scrollAmount = container?.offsetWidth || 0;
                  if (container) container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md z-10"
              >
                <ChevronRight size={16} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Price and Cart - After Accessories */}
          <div className="mt-6 p-3 bg-white relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-black">
                {formatCurrency(product.price + selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}
              </span>
              {product.originalPrice !== product.price && (
                <span className="text-sm text-red-500 line-through">
                  {formatCurrency(product.originalPrice + selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-gray-600">Antall:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <Minus className="h-3 w-3 text-gray-600" />
                </button>
                <span className="text-sm font-semibold min-w-[24px] text-center text-black">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <Plus className="h-3 w-3 text-gray-600" />
                </button>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (!isProductOutOfStock) {
                  addToCart(product, quantity);
                  selectedAccessories.forEach(acc => {
                    addToCart(acc as any, 1);
                  });
                }
              }}
              disabled={isProductOutOfStock}
              className={`w-full px-4 py-2 rounded-md text-sm font-semibold ${
                isProductOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#12b190] text-white hover:bg-[#0e9a7a]'
              }`}
            >
              {isProductOutOfStock ? 'UTSOLGT' : 'Legg til i handlekurv'}
            </button>
          </div>

        </div>
      </div>

      {/* DESKTOP LAYOUT (lg and above) - UNCHANGED */}
      <div className="hidden lg:block overflow-visible">
        {/* IMAGE + THUMBNAILS */}
        <div className="justify-center grid grid-cols-[3fr_2fr] gap-6 w-full">
          <div className=" w-full max-w-5xl ">
            {/* MAIN IMAGE */}
            <div className="relative rounded-lg bg-white">
              <Image
                src={selectedImage}
                alt={product.name}
                width={1000}
                height={800}
                className={`w-full h-[500px] object-contain p-8 ${isProductOutOfStock ? 'opacity-60' : ''}`}
              />
              {!isProductOutOfStock && product.originalPrice && product.originalPrice !== product.price && (
                <div className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold z-20">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
              {!isProductOutOfStock && ['henry-001', 'transer-001', 'robin-pro-001', 'dyno-001', 'luxe-snow-001'].includes(product.id) && (
                <div className="absolute top-3 left-3 bg-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                  BLACK WEEK
                </div>
              )}
              {isProductOutOfStock && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                  UTSOLGT
                </div>
              )}
              {/* Navigation Arrows */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const currentIndex = currentImages.indexOf(selectedImage);
                      const prevIndex = currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1;
                      setSelectedImage(currentImages[prevIndex]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = currentImages.indexOf(selectedImage);
                      const nextIndex = currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1;
                      setSelectedImage(currentImages[nextIndex]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </>
              )}
            </div>

            <div className="relative mb-0">
              <div
                id="thumbnailContainer"
                className="flex gap-3 w-full justify-center mb-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {currentImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 border rounded-md p-1 ${selectedImage === img ? "border-black" : "border-gray-300"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="object-contain w-[60px] h-[60px]"
                    />
                  </button>
                ))}
              </div>

              {/* Left Arrow */}
              {/* <button
                onClick={() => {
                  const container = document.getElementById('thumbnailContainer');
                  if (container) container.scrollBy({ left: -150, behavior: 'smooth' });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md z-10"
              >
                <ChevronLeft size={16} className="text-gray-700" />
              </button> */}

              {/* Right Arrow */}
              {/* <button
                onClick={() => {
                  const container = document.getElementById('thumbnailContainer');
                  if (container) container.scrollBy({ left: 150, behavior: 'smooth' });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md z-10"
              >
                <ChevronRight size={16} className="text-gray-700" />
              </button> */}
            </div>


          </div>

          {/* PRODUCT DETAILS */}

          <div className="mt-10 space-y-6 mb-0">
          <div>
  <h1 className="text-2xl font-bold text-black">{product.name}</h1>
  <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
</div>

            {/* VARIANT SELECTOR - Desktop */}
            {hasVariants && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Velg variant:</label>
                <div className="flex flex-wrap gap-2">
                  {combinedProduct!.variants.map((variant, idx) => (
                    <button
                      key={variant.variantSlug}
                      onClick={() => {
                        setSelectedVariantIndex(idx);
                        router.push(`/products/${variant.variantSlug}`, { scroll: false });
                      }}
                      className={`px-4 py-2 rounded-full border text-base font-medium transition-colors ${
                        selectedVariantIndex === idx
                          ? 'bg-[#12b190] text-white border-[#12b190]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#12b190]'
                      }`}
                    >
                      {variant.variantName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COLOR SELECTOR - Desktop */}
            {product.colors && product.colors.length > 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Farge:</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const colorMap: { [key: string]: string } = {
                      "Svart": "#000000",
                      "Hvit": "#FFFFFF",
                      "Grå": "#808080",
                      "Grønn": "#22c55e",
                      "Lys Grønn": "#90EE90",
                      "Blå": "#3b82f6",
                      "Rød": "#ef4444",
                      "Jungle Green": "#006400",
                      "Black Olive": "#3b3c36",
                      "Special": "#ef4444",
                      "Peach": "#FFDAB9"
                    };
                    const colorValue = colorMap[color];
                    const isGradient = colorValue === "gradient";
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          if (product.colorImageArrays && product.colorImageArrays[color]) {
                            const colorImages = product.colorImageArrays[color];
                            setCurrentImages(colorImages);
                            setSelectedImage(colorImages[0]);
                          } else if (product.colorImages && product.colorImages[color]) {
                            setCurrentImages([product.colorImages[color]]);
                            setSelectedImage(product.colorImages[color]);
                          }
                        }}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${isSelected ? 'border-black ring-2 ring-black' : 'border-gray-300 hover:border-black'}`}
                        style={isGradient ? { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } : { backgroundColor: colorValue || "#FFFFFF" }}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>
            )}


            {/* DESCRIPTION */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2 text-black">Om produktet</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* KEY FEATURES & ACCESSORIES GRID */}
            <div className="mt-2 lg:-mt-12 grid grid-cols-2 gap-4">
              {/* KEY FEATURES */}
              <div>
                <h3 className="font-semibold mb-1 text-black">Hovedfunksjoner:</h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  {product.keyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              
              {/* COMPATIBLE ACCESSORIES */}
              <div className="-ml-4">
                <h3 className="font-semibold mb-2 text-black">Kompatible tilbehør:</h3>
                <div className="relative overflow-hidden">
                  <div id="accessoriesCarousel" className="overflow-hidden scroll-smooth pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="inline-flex gap-2">
                  {(() => {
                    const productName = product.name.split(' - ')[0].trim().split(' ')[0];
                    const specificAccessories = accessoriesProducts.filter(acc => 
                      acc.compatibility.some(comp => {
                        const compName = comp.split(' ')[0].toUpperCase();
                        return compName === productName.toUpperCase() || 
                               comp.toUpperCase().includes(productName.toUpperCase());
                      })
                    );
                    const universalAccessories = accessoriesProducts.filter(acc => 
                      acc.compatibility.some(comp => 
                        comp.includes('Universal') || comp.includes('All')
                      )
                    );
                    
                    const displayAccessories = [...specificAccessories, ...universalAccessories];
                    
                    return displayAccessories.length > 0 ? (
                      Array.from({ length: Math.ceil(displayAccessories.length / 4) }).map((_, pageIndex) => (
                        <div key={pageIndex} className="grid grid-cols-2 grid-rows-2 gap-2 min-w-full flex-shrink-0 snap-start">
                          {displayAccessories.slice(pageIndex * 4, pageIndex * 4 + 4).map((accessory) => {
                            const isSelected = selectedAccessories.some(acc => acc.id === accessory.id);
                            return (
                              <button
                                key={accessory.id}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedAccessories(prev => prev.filter(acc => acc.id !== accessory.id));
                                  } else {
                                    setSelectedAccessories(prev => [...prev, {
                                      id: accessory.id,
                                      name: accessory.name,
                                      price: accessory.price,
                                      image: accessory.image
                                    }]);
                                  }
                                }}
                                className={`border-2 rounded-lg p-1 transition-all flex flex-col ${
                                  isSelected ? 'border-[#12b190] bg-[#12b190]/5' : 'border-gray-200 hover:border-[#12b190]'
                                }`}
                              >
                                <div className="w-full aspect-square bg-white rounded mb-1 overflow-hidden flex items-center justify-center flex-shrink-0">
                                  <Image
                                    src={accessory.image}
                                    alt={accessory.name}
                                    width={60}
                                    height={60}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <h3 className="text-[10px] font-medium text-gray-900 line-clamp-2 mb-1 flex-1">
                                  {accessory.name}
                                </h3>
                                <p className="text-[10px] font-bold text-[#12b190]">{formatCurrency(accessory.price)}</p>
                              </button>
                            );
                          })}
                        </div>
                      ))
                    ) : null;
                  })()}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const container = document.getElementById('accessoriesCarousel');
                      const scrollAmount = container?.offsetWidth || 0;
                      if (container) container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
                  >
                    <ChevronLeft size={16} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => {
                      const container = document.getElementById('accessoriesCarousel');
                      const scrollAmount = container?.offsetWidth || 0;
                      if (container) container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
                  >
                    <ChevronRight size={16} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            {/* Price Section */}
            <div className="flex flex-col gap-2 -mt-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black">{formatCurrency(product.price + selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}</span>
                {product.originalPrice !== product.price && (
                  <span className="text-base text-red-500 line-through">
                    {formatCurrency(product.originalPrice + selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}
                  </span>
                )}
                {selectedAccessories.length > 0 && (
                  <span className="text-sm text-gray-500">({selectedAccessories.length} tilbehør)</span>
                )}
              </div>
              {selectedAccessories.length > 0 && (
                <div className="text-sm text-gray-600">
                  Sykkel: {formatCurrency(product.price)} + Tilbehør: {formatCurrency(selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}
                </div>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-6 mt-1">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Antall:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="text-base font-semibold min-w-[32px] text-center text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  if (!isProductOutOfStock) {
                    addToCart(product, quantity);
                    selectedAccessories.forEach(acc => {
                      addToCart(acc as any, 1);
                    });
                  }
                }}
                disabled={isProductOutOfStock}
                className={`w-44 px-6 py-3 rounded-md font-semibold whitespace-nowrap ${
                  isProductOutOfStock
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#12b190] text-white hover:bg-[#0e9a7a]'
                }`}
              >
                {isProductOutOfStock ? 'UTSOLGT' : 'Legg til i handlekurv'}
              </button>
            </div>






          </div>
        </div>
      </div>
      
      {/* PACKAGE AND SPECIFICATIONS LAYOUT */}
      <div className="w-full max-w-full -mt-24">
        {/* PROMOTIONAL AD BANNERS - Above specifications */}
        {(() => {
          const currentVariantSlugs = product.modelVariants?.map(v => v.slug) || [];
          const usedVariantFamilies = new Set<string>();
          const foreslatteBikes = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0, 3).map(p => p.id);
          
          const eligibleProducts = PRODUCTS_DATA.filter(p => 
            p.slug !== product.slug && p.inStock !== false && !currentVariantSlugs.includes(p.slug) && !foreslatteBikes.includes(p.id)
          );
          
          const bestseller = eligibleProducts.find(p => {
            if (p.rating >= 4.8) {
              const variantSlugs = p.modelVariants?.map(v => v.slug) || [p.slug];
              const hasUsedVariant = variantSlugs.some(slug => usedVariantFamilies.has(slug));
              if (!hasUsedVariant) {
                variantSlugs.forEach(slug => usedVariantFamilies.add(slug));
                return true;
              }
            }
            return false;
          });
          
          const popular = eligibleProducts.find(p => {
            if (p.reviewCount > 100 && p.rating < 4.8) {
              const variantSlugs = p.modelVariants?.map(v => v.slug) || [p.slug];
              const hasUsedVariant = variantSlugs.some(slug => usedVariantFamilies.has(slug));
              if (!hasUsedVariant) {
                variantSlugs.forEach(slug => usedVariantFamilies.add(slug));
                return true;
              }
            }
            return false;
          });
          
          const hasVariantsAndColors = hasVariants && product.colors && product.colors.length > 1;
          const additionalProducts = eligibleProducts.filter(p => {
            const variantSlugs = p.modelVariants?.map(v => v.slug) || [p.slug];
            return !variantSlugs.some(slug => usedVariantFamilies.has(slug));
          }).slice(0, hasVariantsAndColors ? 4 : 2);
          
          const availableAds = [bestseller, popular, ...additionalProducts].filter(Boolean) as typeof PRODUCTS_DATA;
          const displayAds = availableAds.slice(0, hasVariantsAndColors ? 6 : 3);
          
          return displayAds.length > 0 && (
            <>
              <div className={`hidden lg:block absolute left-8 ${hasVariantsAndColors ? 'top-[720px]' : 'top-[750px]'} z-10 mt-20 pl-4`}>
                <h2 className="text-xl font-bold text-[#12b190] mb-4">Andre kjøpte også</h2>
              </div>
              <div className={`hidden lg:block absolute left-8 ${hasVariantsAndColors ? 'top-[760px]' : 'top-[790px]'} z-10 mt-20 pl-4`}>
                <div className={`grid gap-3 ${hasVariantsAndColors ? 'grid-cols-3 grid-rows-2 w-[650px]' : 'grid-cols-3 w-[650px]'}`}>
                  {displayAds.map((ad) => {
                    return (
                      <Link key={ad.slug} href={`/products/${ad.slug}`} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                        <div className={`relative bg-white p-4 ${hasVariantsAndColors ? 'h-28' : 'h-40'}`}>
                          <Image src={ad.image} alt={ad.name} width={150} height={150} className="w-full h-full object-contain" />
                        </div>
                        <div className={`border-t border-gray-100 ${hasVariantsAndColors ? 'p-2' : 'p-4'}`}>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-3 h-3 ${star <= (ad.rating || 5) ? 'fill-[#12b190] text-[#12b190]' : 'fill-gray-200 text-gray-200'}`} />
                            ))}
                            <span className="text-xs text-gray-600 ml-1">({ad.reviewCount || 0})</span>
                          </div>
                          <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug ${hasVariantsAndColors ? 'text-xs' : 'text-sm'}`}>{ad.name}</h3>
                          <div className="flex items-center gap-2">
                            {ad.originalPrice !== ad.price && (
                              <span className="text-xs text-red-500 line-through">{formatCurrency(ad.originalPrice).replace(' kr', ',-')}</span>
                            )}
                            <p className={`font-bold text-gray-900 ${hasVariantsAndColors ? 'text-sm' : 'text-base'}`}>{formatCurrency(ad.price).replace(' kr', ',-')}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })()}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full max-w-full mt-24 lg:mt-28">
          {/* SPECIFICATIONS HALF - First on mobile, right on desktop */}
          <div className="w-full max-w-full lg:order-1 lg:pt-2 px-4 lg:px-0">
            <TechnicalSpecifications product={product} hasVariantsAndColors={hasVariants && product.colors && product.colors.length > 1} hasVariantOrColor={hasVariants || (product.colors && product.colors.length > 1)} />
          </div>
          
          {/* PACKAGE BUILDER HALF - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block px-4 lg:px-8 py-6 lg:pt-2 lg:order-2 w-full max-w-full">
            <BikePackageBuilder product={product} />
          </div>
        </div>
        
        {/* PACKAGE BUILDER - Show at end on mobile only */}
        <div className="lg:hidden px-4 py-6 w-full max-w-full">
          <BikePackageBuilder product={product} />
        </div>
      </div>

    </div>
  );
}