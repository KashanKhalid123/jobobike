"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductCard } from "@/lib/productData";
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
    <div className="mt-16 md:mt-40 w-full overflow-x-hidden">
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
          <div className="mb-4 relative">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className={`w-full h-auto object-contain rounded-lg ${isProductOutOfStock ? 'opacity-60' : ''}`}
            />
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
            <div className="grid grid-cols-2 gap-3">
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
                
                let displayAccessories = [];
                if (specificAccessories.length >= 3) {
                  displayAccessories = [
                    ...specificAccessories.slice(0, 3),
                    universalAccessories[0]
                  ];
                } else {
                  displayAccessories = [
                    ...specificAccessories,
                    ...universalAccessories.slice(0, 4 - specificAccessories.length)
                  ];
                }
                displayAccessories = displayAccessories.filter(Boolean).slice(0, 4);
                
                return displayAccessories.length > 0 ? displayAccessories.map((accessory) => {
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
                }) : null;
              })()}
            </div>
          </div>

          {/* Mobile Price and Cart - After Accessories */}
          <div className="mt-6 p-3 bg-white">
            <div className="text-xl font-bold text-black mb-3">{formatCurrency(product.originalPrice + selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}</div>
            
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
            <div className="relative">
              <Image
                src={selectedImage}
                alt={product.name}
                width={1000}
                height={800}
                className={`w-full max-h-[600px] object-contain ${isProductOutOfStock ? 'opacity-60' : ''}`}
              />
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
            <div className="mt-2 grid grid-cols-2 gap-4">
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
            <div className="flex flex-col gap-2 -mt-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black">{formatCurrency(totalPrice)}</span>
                {selectedAccessories.length > 0 && (
                  <span className="text-sm text-gray-500">({selectedAccessories.length} tilbehør)</span>
                )}
              </div>
              {selectedAccessories.length > 0 && (
                <div className="text-sm text-gray-600">
                  Sykkel: {formatCurrency(product.originalPrice)} + Tilbehør: {formatCurrency(selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}
                </div>
              )}
            </div>



            {/* Quantity + Add to Cart in one row */}
            <div className="flex items-center gap-6 mt-1">
              {/* Quantity Controls */}
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
      <div className="w-full max-w-full -mt-32">
        {/* TRUST BADGES - Above specifications */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 mb-4 -mt-14 relative z-10 pl-16">
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <div className="bg-white rounded-lg p-3 shadow-md border-2 border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-[#12b190]/10 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-[#12b190]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-black">14 dager</h3>
                <p className="text-xs text-gray-600">Åpent kjøp</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-md border-2 border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-[#12b190]/10 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-[#12b190]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-black">2 års</h3>
                <p className="text-xs text-gray-600">Garanti</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full max-w-full mt-12">
          {/* PACKAGE BUILDER HALF - First on mobile, left on desktop */}
          <div className="px-4 lg:px-8 py-6 lg:pt-2 order-1 lg:order-2 w-full max-w-full">
            <BikePackageBuilder product={product} />
          </div>
          
          {/* SPECIFICATIONS HALF - Second on mobile, right on desktop */}
          <div className="w-full max-w-full order-2 lg:order-1 lg:pt-2 px-4 lg:px-0">
            <TechnicalSpecifications product={product} />
          </div>
        </div>
      </div>

    </div>
  );
}