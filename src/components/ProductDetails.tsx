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
  const [carouselPage, setCarouselPage] = useState(0);
  
  const product = combinedProduct 
    ? combinedProduct.variants[selectedVariantIndex].originalProduct 
    : singleProduct!;
  
  const hasVariants = combinedProduct && combinedProduct.variants.length > 1;
  const getInitialImage = () => {
    if (product.colors && product.colorImages && product.colors[0]) {
      return product.colorImages[product.colors[0]];
    }
    return product.images?.[0] || product.image || "";
  };
  const [selectedImage, setSelectedImage] = useState(getInitialImage());
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || "");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const defaultImage = product.colors && product.colorImages 
      ? product.colorImages[product.colors[0]] 
      : product.images?.[0] || product.image || "";
    setSelectedImage(defaultImage);
    setSelectedColor(product.colors?.[0] || "");
    setSelectedSize(product.availableSizes?.[0] || "");
    setCarouselPage(0);
    setIsZoomed(false);
  }, [selectedVariantIndex, product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { updateQuantity, addToCart } = useCart();
  
  const totalPrice = product.originalPrice + selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);

  const [quantity, setQuantity] = useState<number>(1);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  const getCompatibleAccessories = () => {
    const fullProductName = product.name.split(' - ')[0].trim().toUpperCase();
    const baseName = fullProductName.split(' ')[0];
    const specificAccessories = accessoriesProducts.filter(acc => 
      acc.compatibility.some(comp => {
        const compUpper = comp.toUpperCase();
        if (compUpper.includes('UNIVERSAL') || compUpper.includes('ALL')) return false;
        return compUpper === baseName || compUpper.includes(baseName);
      })
    );
    
    const universalAccessories = accessoriesProducts.filter(acc => 
      acc.compatibility.some(comp => 
        comp.toUpperCase().includes('UNIVERSAL') || comp.toUpperCase().includes('ALL')
      )
    );
    
    if (specificAccessories.length < 5) {
      return [...specificAccessories, ...universalAccessories];
    }
    return specificAccessories;
  };

  return (
    <div className="pt-0 lg:pt-20 px-0 sm:px-6 lg:px-8 overflow-x-hidden">
      <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-4 py-3 text-sm">
          <li>
            <Link href="/cycle" className="text-gray-600 hover:text-black transition">
              Sykkel
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-black font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="lg:hidden">
        <div className="mt-3 px-4">
          <div className="mb-4 relative">
            <div
              className="relative w-full h-auto overflow-hidden rounded-lg cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg transition-transform duration-200 p-4"
                style={isZoomed ? {
                  transform: 'scale(2)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                } : {}}
              />
            </div>
            {(() => {
              const imageArray = selectedColor && product.colorImageArrays?.[selectedColor] 
                ? product.colorImageArrays[selectedColor] 
                : product.images;
              return imageArray.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const currentIndex = imageArray.indexOf(selectedImage);
                      const prevIndex = currentIndex === 0 ? imageArray.length - 1 : currentIndex - 1;
                      setSelectedImage(imageArray[prevIndex]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = imageArray.indexOf(selectedImage);
                      const nextIndex = currentIndex === imageArray.length - 1 ? 0 : currentIndex + 1;
                      setSelectedImage(imageArray[nextIndex]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </>
              );
            })()}
          </div>

          <div className="relative">
            <div
              id="thumbnailContainer"
              className="flex gap-3 overflow-x-hidden pb-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(selectedColor && product.colorImageArrays?.[selectedColor] 
                ? product.colorImageArrays[selectedColor] 
                : product.images
              ).map((img, i) => (
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

            <button
              onClick={() => {
                const container = document.getElementById('thumbnailContainer');
                if (container) container.scrollBy({ left: -150, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md z-10"
            >
              <ChevronLeft size={16} className="text-gray-700" />
            </button>

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

        <div className="mt-6 space-y-4 px-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-black">{product.name}</h1>
              <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
              
              {product.modelVariants && product.modelVariants.length > 1 && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Modell:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.modelVariants.map((variant) => {
                      const isSelected = product.slug === variant.slug;
                      return (
                        <button
                          key={variant.slug}
                          onClick={() => router.push(`/products/${variant.slug}`)}
                          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                            isSelected
                              ? 'bg-[#12b190] text-white border-[#12b190]'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-[#12b190]'
                          }`}
                        >
                          {variant.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 1 && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farge:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, idx) => {
                      const colorMap: { [key: string]: string } = {
                        "Svart": "#000000",
                        "Hvit": "#FFFFFF",
                        "Grå": "#808080",
                        "Grønn": "#22c55e",
                        "Blå": "#3b82f6",
                        "Rød": "#ef4444",
                      };
                      const isSelected = selectedImage === (product.colorImages?.[color] || product.image);
                      return (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            if (product.colorImages && product.colorImages[color]) {
                              setSelectedImage(product.colorImages[color]);
                            }
                          }}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            isSelected ? 'border-black scale-110' : 'border-gray-300 hover:border-black'
                          }`}
                          style={{ backgroundColor: colorMap[color] || color }}
                          title={color}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              
              {product.availableSizes && product.availableSizes.length > 1 && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Størrelse:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'bg-[#12b190] text-white border-[#12b190]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#12b190]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              

            </div>
            
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3 text-black">Om produktet</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-black">Hovedfunksjoner:</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm">
              {product.keyFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 px-4">
            <h3 className="font-semibold mb-3 text-black">Kompatibelt tilbehør:</h3>
            <div className="relative overflow-hidden">
              {(() => {
                const allAccessories = getCompatibleAccessories();
                const totalPages = Math.ceil(allAccessories.length / 4);
                const currentPageAccessories = allAccessories.slice(carouselPage * 4, carouselPage * 4 + 4);
                
                return (
                  <>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
                      {currentPageAccessories.map((acc) => {
                        const isSelected = selectedAccessories.some(a => a.id === acc.id);
                        return (
                          <button
                            key={acc.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedAccessories(prev => prev.filter(a => a.id !== acc.id));
                              } else {
                                setSelectedAccessories(prev => [...prev, {
                                  id: acc.id,
                                  name: acc.name,
                                  price: acc.price,
                                  image: acc.image
                                }]);
                              }
                            }}
                            className={`border-2 rounded-lg p-2 transition-all flex flex-col text-left ${isSelected ? 'border-[#12b190] bg-[#12b190]/5' : 'border-gray-200 hover:border-[#12b190]'}`}
                          >
                            <div className="w-full aspect-square bg-white rounded mb-1 overflow-hidden flex items-center justify-center flex-shrink-0">
                              <Image
                                src={acc.image}
                                alt={acc.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <h3 className="text-xs font-medium text-gray-900 line-clamp-1 mb-0.5">
                              {acc.name}
                            </h3>
                            <p className="text-sm font-bold text-[#12b190]">{formatCurrency(acc.price)}</p>
                          </button>
                        );
                      })}
                    </div>
                    {totalPages > 1 && (
                      <>
                        <button
                          onClick={() => setCarouselPage(prev => Math.max(0, prev - 1))}
                          disabled={carouselPage === 0}
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft size={16} className="text-gray-700" />
                        </button>
                        <button
                          onClick={() => setCarouselPage(prev => Math.min(totalPages - 1, prev + 1))}
                          disabled={carouselPage === totalPages - 1}
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight size={16} className="text-gray-700" />
                        </button>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block ">
        <div className="justify-center grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 w-full">
          <div className="w-full max-w-full lg:max-w-5xl px-4 lg:px-0">
            <div className="relative">
              <div
                className={`relative w-full max-h-[600px] overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={1000}
                  height={800}
                  className="w-full max-h-[600px] object-contain transition-transform duration-200 p-8"
                  style={isZoomed ? {
                    transform: 'scale(2)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : {}}
                />
              </div>
              {(() => {
                const imageArray = selectedColor && product.colorImageArrays?.[selectedColor] 
                  ? product.colorImageArrays[selectedColor] 
                  : product.images;
                return imageArray.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        const currentIndex = imageArray.indexOf(selectedImage);
                        const prevIndex = currentIndex === 0 ? imageArray.length - 1 : currentIndex - 1;
                        setSelectedImage(imageArray[prevIndex]);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                    >
                      <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = imageArray.indexOf(selectedImage);
                        const nextIndex = currentIndex === imageArray.length - 1 ? 0 : currentIndex + 1;
                        setSelectedImage(imageArray[nextIndex]);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                    >
                      <ChevronRight size={20} className="text-gray-700" />
                    </button>
                  </>
                );
              })()}
            </div>

            <div className="relative">
              <div
                id="thumbnailContainer"
                className="flex gap-3 w-full justify-center "
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {(selectedColor && product.colorImageArrays?.[selectedColor] 
                  ? product.colorImageArrays[selectedColor] 
                  : product.images
                ).map((img, i) => (
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
            </div>
          </div>

          <div className="mt-10 space-y-6 pr-8">
            <div>
              <h1 className="text-2xl font-bold text-black">{product.name}</h1>
              <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
            </div>

            {product.modelVariants && product.modelVariants.length > 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Modell:</label>
                <div className="flex flex-wrap gap-2">
                  {product.modelVariants.map((variant) => {
                    const isSelected = product.slug === variant.slug;
                    return (
                      <button
                        key={variant.slug}
                        onClick={() => router.push(`/products/${variant.slug}`)}
                        className={`px-4 py-2 rounded-md border text-base font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#12b190] text-white border-[#12b190]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#12b190]'
                        }`}
                      >
                        {variant.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Farge:</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, idx) => {
                    const colorMap: { [key: string]: string } = {
                      "Svart": "#000000",
                      "Hvit": "#FFFFFF",
                      "Grå": "#808080",
                      "Grønn": "#22c55e",
                      "Blå": "#3b82f6",
                      "Rød": "#ef4444",
                    };
                    const isSelected = selectedImage === (product.colorImages?.[color] || product.image);
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          if (product.colorImages && product.colorImages[color]) {
                            setSelectedImage(product.colorImages[color]);
                          }
                        }}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          isSelected ? 'border-black scale-110' : 'border-gray-300 hover:border-black'
                        }`}
                        style={{ backgroundColor: colorMap[color] || color }}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            
            {product.availableSizes && product.availableSizes.length > 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Størrelse:</label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border text-base font-medium transition-colors ${
                        selectedSize === size
                          ? 'bg-[#12b190] text-white border-[#12b190]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#12b190]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            


            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2 text-black">Om produktet</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-black">Hovedfunksjoner:</h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  {product.keyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                
                <div className="mt-16">
                  {selectedAccessories.length > 0 && (
                    <div className="text-sm text-gray-600 mb-4">
                      Sykkel: {formatCurrency(product.originalPrice)} + Tilbehør: {formatCurrency(selectedAccessories.reduce((sum, acc) => sum + acc.price, 0))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-black">{formatCurrency(totalPrice)}</span>
                    
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

                    <button
                      onClick={() => {
                        addToCart({ ...product, size: selectedSize }, quantity);
                        selectedAccessories.forEach(acc => {
                          addToCart(acc as any, 1);
                        });
                      }}
                      className="bg-[#12b190] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#0e9a7a] min-w-[200px]"
                    >
                      Legg til i handlekurv
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-black">Kompatibelt tilbehør:</h3>
                <div className="relative overflow-hidden">
                  {(() => {
                    const displayAccessories = getCompatibleAccessories();
                    
                    const totalPages = Math.ceil(displayAccessories.length / 4);
                    const currentPageAccessories = displayAccessories.slice(carouselPage * 4, carouselPage * 4 + 4);
                    
                    return (
                      <>
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
                          {currentPageAccessories.map((acc) => {
                            const isSelected = selectedAccessories.some(a => a.id === acc.id);
                            return (
                              <button
                                key={acc.id}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedAccessories(prev => prev.filter(a => a.id !== acc.id));
                                  } else {
                                    setSelectedAccessories(prev => [...prev, {
                                      id: acc.id,
                                      name: acc.name,
                                      price: acc.price,
                                      image: acc.image
                                    }]);
                                  }
                                }}
                                className={`border-2 rounded-lg p-2 transition-all flex flex-col text-left ${isSelected ? 'border-[#12b190] bg-[#12b190]/5' : 'border-gray-200 hover:border-[#12b190]'}`}
                              >
                                <div className="w-full aspect-square bg-white rounded mb-1 overflow-hidden flex items-center justify-center flex-shrink-0">
                                  <Image
                                    src={acc.image}
                                    alt={acc.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <h3 className="text-xs font-medium text-gray-900 line-clamp-1 mb-0.5">
                                  {acc.name}
                                </h3>
                                <p className="text-sm font-bold text-[#12b190]">{formatCurrency(acc.price)}</p>
                              </button>
                            );
                          })}
                        </div>
                        {totalPages > 1 && (
                          <>
                            <button
                              onClick={() => setCarouselPage(prev => Math.max(0, prev - 1))}
                              disabled={carouselPage === 0}
                              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronLeft size={16} className="text-gray-700" />
                            </button>
                            <button
                              onClick={() => setCarouselPage(prev => Math.min(totalPages - 1, prev + 1))}
                              disabled={carouselPage === totalPages - 1}
                              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronRight size={16} className="text-gray-700" />
                            </button>
                          </>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Add to Cart */}
      <div className="lg:hidden mt-8 px-4">
        <div className="flex flex-col gap-4">
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
          
          <div className="flex items-center gap-4">
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

            <button
              onClick={() => {
                addToCart({ ...product, size: selectedSize }, quantity);
                selectedAccessories.forEach(acc => {
                  addToCart(acc as any, 1);
                });
              }}
              className="flex-1 bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0e9a7a]"
            >
              Legg til i handlekurv
            </button>
          </div>
        </div>
      </div>
      
      <div className="-mx-6 lg:-mx-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
          <div className="bg-white px-6 lg:px-8 py-6 order-1 lg:order-1">
            <TechnicalSpecifications product={product} />
          </div>
          
          <div className="bg-white px-6 lg:px-8 py-6 order-2 lg:order-2">
            <BikePackageBuilder product={product} />
          </div>
        </div>
      </div>


    </div>
  );
}
