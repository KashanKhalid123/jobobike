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
  
  const product = combinedProduct 
    ? combinedProduct.variants[selectedVariantIndex].originalProduct 
    : singleProduct!;
  
  const hasVariants = combinedProduct && combinedProduct.variants.length > 1;
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.image || "");
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || "");
  
  useEffect(() => {
    setSelectedImage(product.images?.[0] || product.image || "");
    setSelectedSize(product.availableSizes?.[0] || "");
  }, [selectedVariantIndex, product]);
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

  return (
    <div className="mt-40 md:mt-20 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-0 sm:px-4 py-3 text-sm">
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
        <div className="mt-6">
          <div className="mb-4 relative">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const currentIndex = product.images.indexOf(selectedImage);
                    const prevIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
                    setSelectedImage(product.images[prevIndex]);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    const currentIndex = product.images.indexOf(selectedImage);
                    const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
                    setSelectedImage(product.images[nextIndex]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                >
                  <ChevronRight size={20} className="text-gray-700" />
                </button>
              </>
            )}
          </div>

          <div className="relative">
            <div
              id="thumbnailContainer"
              className="flex gap-3 overflow-x-hidden pb-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {product.images.map((img, i) => (
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

        <div className="mt-6 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-black">{product.name}</h1>
              <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
              
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
              
              {product.availableSizes && product.availableSizes.length > 1 && (
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Størrelse:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
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
            
            <div className="w-32">
              <h3 className="text-xs font-semibold mb-2 text-black">Tilbehør:</h3>
              <div className="grid grid-cols-2 gap-1">
                {(() => {
                  const fullProductName = product.name.split(' - ')[0].trim().toUpperCase();
                  const specificAccessories = accessoriesProducts.filter(acc => 
                    acc.compatibility.some(comp => {
                      const compUpper = comp.toUpperCase();
                      if (compUpper.includes('UNIVERSAL') || compUpper.includes('ALL')) return false;
                      return compUpper === fullProductName || compUpper.includes(fullProductName);
                    })
                  );
                  
                  let displayAccessories = specificAccessories.slice(0, 4);
                  if (displayAccessories.length === 0) {
                    const universalAccessories = accessoriesProducts.filter(acc => 
                      acc.compatibility.some(comp => 
                        comp.includes('Universal') || comp.includes('All')
                      )
                    );
                    displayAccessories = universalAccessories.slice(0, 4);
                  }
                  
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
                        className={`border rounded p-1 transition-colors bg-white ${
                          isSelected ? 'border-[#12b190] ring-1 ring-[#12b190]' : 'border-gray-200 hover:border-[#12b190]'
                        }`}
                      >
                        <div className="aspect-square bg-white rounded overflow-hidden flex items-center justify-center">
                          <Image
                            src={accessory.image}
                            alt={accessory.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </button>
                    );
                  }) : null;
                })()}
              </div>
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
              {product.availableSizes && product.availableSizes.length === 1 && (
                <li>Størrelse: {product.availableSizes[0]}</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden lg:block ">
        <div className=" justify-center grid grid-cols-[3fr_2fr] gap-6 w-full">
          <div className=" w-full max-w-5xl ">
            <div className="relative">
              <Image
                src={selectedImage}
                alt={product.name}
                width={1000}
                height={800}
                className="w-full max-h-[600px] object-contain"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const currentIndex = product.images.indexOf(selectedImage);
                      const prevIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
                      setSelectedImage(product.images[prevIndex]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = product.images.indexOf(selectedImage);
                      const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
                      setSelectedImage(product.images[nextIndex]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-lg z-10"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </>
              )}
            </div>

            <div className="relative">
              <div
                id="thumbnailContainer"
                className="flex gap-3 w-full justify-center "
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {product.images.map((img, i) => (
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

          <div className="mt-10 space-y-6   ">
            <div>
              <h1 className="text-2xl font-bold text-black">{product.name}</h1>
              <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
            </div>

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
            
            {product.availableSizes && product.availableSizes.length > 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Velg størrelse:</label>
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
                  {product.availableSizes && product.availableSizes.length === 1 && (
                    <li>Størrelse: {product.availableSizes[0]}</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-black">Kompatible tilbehør:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(() => {
                    const fullProductName = product.name.split(' - ')[0].trim().toUpperCase();
                    const specificAccessories = accessoriesProducts.filter(acc => 
                      acc.compatibility.some(comp => {
                        const compUpper = comp.toUpperCase();
                        if (compUpper.includes('UNIVERSAL') || compUpper.includes('ALL')) return false;
                        return compUpper === fullProductName || compUpper.includes(fullProductName);
                      })
                    );
                    
                    let displayAccessories = specificAccessories.slice(0, 4);
                    if (displayAccessories.length === 0) {
                      const universalAccessories = accessoriesProducts.filter(acc => 
                        acc.compatibility.some(comp => 
                          comp.includes('Universal') || comp.includes('All')
                        )
                      );
                      displayAccessories = universalAccessories.slice(0, 4);
                    }
                    
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
                          className={`border rounded-md p-2 transition-colors group bg-white text-left ${
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
                          <p className="text-xs text-gray-700 text-center group-hover:text-[#12b190] line-clamp-2">{accessory.name}</p>
                          <p className="text-xs font-semibold text-center text-[#12b190] mt-1">{formatCurrency(accessory.price)}</p>
                        </button>
                      );
                    }) : null;
                  })()}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
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

            <div className="flex items-center gap-6 mt-6">
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

              <button
                onClick={() => {
                  addToCart({ ...product, size: selectedSize }, quantity);
                  selectedAccessories.forEach(acc => {
                    addToCart(acc as any, 1);
                  });
                }}
                className="w-44 bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0e9a7a] whitespace-nowrap"
              >
                Legg til i handlekurv
              </button>
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
      
      <div className="mt-16 -mx-6 lg:-mx-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
          <div className="bg-white px-6 lg:px-8 py-6 order-2 lg:order-2">
            <BikePackageBuilder product={product} />
          </div>
          
          <div className="w-full order-1 lg:order-1">
            <TechnicalSpecifications product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
