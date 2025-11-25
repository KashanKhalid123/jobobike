"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AccessoryProduct, accessoriesProducts } from "@/lib/accessoriesProducts";
import { PRODUCTS_DATA } from "@/lib/productData";
import { AddToCartButton } from "./AddToCartButton";
import { ChevronLeft, ChevronRight, Minus, Plus, Star } from "lucide-react";
import { useCart } from "./CartContext";
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

interface AccessoryDetailsProps {
  product: AccessoryProduct;
}

export default function AccessoryDetails({ product }: AccessoryDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedSuggestedProducts, setSelectedSuggestedProducts] = useState<Set<string>>(new Set());
  const [selectedSuggestedBikes, setSelectedSuggestedBikes] = useState<Set<string>>(new Set());
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();

  const isColorOutOfStock = product.colorStock && selectedColor ? product.colorStock[selectedColor] === false : false;
  const isProductOutOfStock = !product.inStock || isColorOutOfStock;

  const suggestedProducts = accessoriesProducts
    .filter(acc => acc.id !== product.id && acc.category.some(cat => product.category.includes(cat)));
  
  let allSuggestedProducts = suggestedProducts.length >= 6 
    ? suggestedProducts 
    : [...suggestedProducts, ...accessoriesProducts.filter(acc => acc.id !== product.id && !suggestedProducts.includes(acc))].slice(0, 8);

  const compatibleBikes = PRODUCTS_DATA.filter(bike => 
    bike.inStock !== false &&
    product.compatibility.some(compat => 
      bike.name.toLowerCase().includes(compat.toLowerCase().replace('jobobike ', ''))
    )
  );
  
  const displayBikes = compatibleBikes.length >= 6 
    ? compatibleBikes.slice(0, 6) 
    : [...compatibleBikes, ...PRODUCTS_DATA.filter(bike => bike.inStock !== false && !compatibleBikes.includes(bike))].slice(0, 6);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const toggleSuggestedProduct = (productId: string) => {
    setSelectedSuggestedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const toggleSuggestedBike = (bikeId: string) => {
    setSelectedSuggestedBikes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bikeId)) {
        newSet.delete(bikeId);
      } else {
        newSet.add(bikeId);
      }
      return newSet;
    });
  };

  const calculateTotalPrice = () => {
    const mainProductTotal = product.price * quantity;
    const suggestedProductsTotal = Array.from(selectedSuggestedProducts).reduce((sum, id) => {
      const suggestedProduct = allSuggestedProducts.find(p => p.id === id);
      return sum + (suggestedProduct?.price || 0);
    }, 0);
    const suggestedBikesTotal = Array.from(selectedSuggestedBikes).reduce((sum, id) => {
      const suggestedBike = displayBikes.find(b => b.id === id);
      return sum + (suggestedBike?.price || 0);
    }, 0);
    return mainProductTotal + suggestedProductsTotal + suggestedBikesTotal;
  };

  const calculateSuggestedProductsTotal = () => {
    const suggestedBikesTotal = Array.from(selectedSuggestedBikes).reduce((sum, id) => {
      const suggestedBike = displayBikes.find(b => b.id === id);
      return sum + (suggestedBike?.price || 0);
    }, 0);
    return suggestedBikesTotal;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const getUniqueSpecifications = () => {
    const featureTexts = product.features.map(f => f.toLowerCase());
    return product.specifications.filter(spec => {
      const specText = `${spec.label} ${spec.value}`.toLowerCase();
      return !featureTexts.some(feature => 
        feature.includes(spec.value.toLowerCase()) || 
        specText.includes(feature)
      );
    });
  };

  const colorMap: { [key: string]: string } = {
    'Svart': '#000000',
    'Blå': '#0066CC',
    'Rød': '#CC0000',
    'Grå': '#808080',
    'Hvit': '#FFFFFF'
  };

  return (
    <div className="pt-0 lg:pt-12 px-0 sm:px-6 lg:px-8 overflow-x-hidden">
      <nav aria-label="Breadcrumb" className="border-b border-gray-200">
        <ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-4 py-3 text-sm">
          <li>
            <Link href="/accessorie" className="text-gray-600 hover:text-black transition">
              Tilbehør
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-black font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="mt-6 px-4">
          <div className="mb-4 relative">
            <div
              className="relative w-full h-[350px] overflow-hidden rounded-lg cursor-zoom-in flex items-center justify-center"
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                width={350}
                height={350}
                className={`max-w-[80%] max-h-[80%] object-contain rounded-lg transition-transform duration-200 ${isProductOutOfStock ? 'opacity-60' : ''}`}
                style={isZoomed ? {
                  transform: 'scale(2)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                } : {}}
              />
              {product.inStock && product.originalPrice && product.originalPrice !== product.price && (
                <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold z-20">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
              {isProductOutOfStock && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                  UTSOLGT
                </div>
              )}
            </div>
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

          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 border rounded-md ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                }`}
              >
                <div className="w-[60px] h-[60px] flex items-center justify-center p-1">
                  <Image
                    src={img}
                    alt={product.name}
                    width={50}
                    height={50}
                    style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4 px-4">
          <div className="mt-4">
            <h1 className="text-xl font-bold text-black">{product.name}</h1>
            <ReviewStars rating={5} reviewCount={14} />
          </div>

          {product.colors && product.colors.length > 1 && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Farge:</label>
              <div className="flex gap-2">
                {product.colors.map((color) => {
                  const colorOutOfStock = product.colorStock ? product.colorStock[color] === false : false;
                  return (
                    <button
                      key={color}
                      onClick={() => {
                        if (!colorOutOfStock) {
                          setSelectedColor(color);
                          if (product.colorImages && product.colorImages[color]) {
                            setSelectedImage(product.colorImages[color]);
                          }
                        }
                      }}
                      disabled={colorOutOfStock}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                        colorOutOfStock
                          ? 'opacity-40 cursor-not-allowed border-gray-300'
                          : selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: colorMap[color] || color }}
                      title={colorOutOfStock ? `${color} (Utsolgt)` : color}
                    >
                      {colorOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 1 && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Størrelse:</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
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

          <div>
            <h2 className="text-lg font-bold mb-3 text-black">Om produktet</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{product.fullDescription}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-black">Funksjoner:</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          
          {allSuggestedProducts.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-black">Foreslåtte tilbehør:</h3>
              <div className="relative overflow-hidden">
                <div id="suggestedCarouselMobile" className="overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="inline-flex gap-2">
                    {Array.from({ length: Math.ceil(allSuggestedProducts.length / 4) }).map((_, pageIndex) => (
                      <div key={pageIndex} className="grid grid-cols-2 grid-rows-2 gap-2 w-[calc(100vw-2rem)] flex-shrink-0">
                        {allSuggestedProducts.slice(pageIndex * 4, pageIndex * 4 + 4).map((acc) => (
                          <button
                            key={acc.id}
                            onClick={() => toggleSuggestedProduct(acc.id)}
                            className={`border-2 rounded-lg p-2 transition-all flex flex-col ${
                              selectedSuggestedProducts.has(acc.id)
                                ? 'border-[#12b190] bg-[#12b190]/5'
                                : 'border-gray-200 hover:border-[#12b190]'
                            }`}
                          >
                            <div className="w-full aspect-square bg-white rounded mb-1 overflow-hidden flex items-center justify-center flex-shrink-0">
                              <Image
                                src={acc.image}
                                alt={acc.name}
                                width={100}
                                height={100}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <h3 className="text-[10px] font-medium text-gray-900 line-clamp-2 mb-1 flex-1">
                              {acc.name}
                            </h3>
                            <p className="text-[10px] font-bold text-[#12b190]">{formatCurrency(acc.price)}</p>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const container = document.getElementById('suggestedCarouselMobile');
                    const scrollAmount = container?.offsetWidth || 0;
                    if (container) container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
                >
                  <ChevronLeft size={14} className="text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    const container = document.getElementById('suggestedCarouselMobile');
                    const scrollAmount = container?.offsetWidth || 0;
                    if (container) container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
                >
                  <ChevronRight size={14} className="text-gray-700" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-[3fr_2fr] gap-6 w-full">
          <div className="w-full max-w-5xl">
            <div className="relative">
              <div
                className="relative w-full h-[500px] overflow-hidden cursor-zoom-in flex items-center justify-center"
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={500}
                  height={500}
                  className={`max-w-[75%] max-h-[75%] object-contain transition-transform duration-200 ${isProductOutOfStock ? 'opacity-60' : ''}`}
                  style={isZoomed ? {
                    transform: 'scale(2)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : {}}
                />
                {product.inStock && product.originalPrice && product.originalPrice !== product.price && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold z-20">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
                {isProductOutOfStock && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                    UTSOLGT
                  </div>
                )}
              </div>
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

            <div className="flex gap-3 w-full justify-center mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 border rounded-md ${
                    selectedImage === img ? "border-black" : "border-gray-300"
                  }`}
                >
                  <div className="w-[60px] h-[60px] flex items-center justify-center p-1">
                    <Image
                      src={img}
                      alt={product.name}
                      width={50}
                      height={50}
                      style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-black">{product.name}</h1>
              <ReviewStars rating={5} reviewCount={14} />
            </div>

            {product.colors && product.colors.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Velg farge:</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => {
                    const colorOutOfStock = product.colorStock ? product.colorStock[color] === false : false;
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          if (!colorOutOfStock) {
                            setSelectedColor(color);
                            if (product.colorImages && product.colorImages[color]) {
                              setSelectedImage(product.colorImages[color]);
                            }
                          }
                        }}
                        disabled={colorOutOfStock}
                        className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                          colorOutOfStock
                            ? 'opacity-40 cursor-not-allowed border-gray-300'
                            : selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: colorMap[color] || color }}
                        title={colorOutOfStock ? `${color} (Utsolgt)` : color}
                      >
                        {colorOutOfStock && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Velg størrelse:</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
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

            <div>
              <h2 className="text-xl font-bold mb-2 text-black">Om produktet</h2>
              <p className="text-gray-700">{product.fullDescription}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div>
                  <h3 className="font-semibold mb-2 text-black">Funksjoner:</h3>
                  <ul className="list-disc ml-6 space-y-1 text-gray-700">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-4">
                  <div className="flex items-baseline gap-2">
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <span className="text-base text-red-500 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className={`text-2xl font-bold ${product.originalPrice && product.originalPrice !== product.price ? 'text-[#12b190]' : 'text-black'}`}>{formatCurrency(calculateTotalPrice())}</span>
                    {selectedSuggestedProducts.size > 0 && (
                      <span className="text-sm text-gray-500">({selectedSuggestedProducts.size} tillegg)</span>
                    )}
                  </div>
                  
                  <div className="mt-2 flex items-center gap-4">
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
                      if (!isProductOutOfStock) {
                        addToCart({ ...product, size: selectedSize, color: selectedColor } as any, quantity);
                        selectedSuggestedProducts.forEach(id => {
                          const suggestedProduct = allSuggestedProducts.find(p => p.id === id);
                          if (suggestedProduct) {
                            addToCart(suggestedProduct as any, 1);
                          }
                        });
                      }
                    }}
                    disabled={isProductOutOfStock}
                    className={`w-full px-6 py-3 rounded-md font-semibold mt-6 transition-all ${
                      isProductOutOfStock
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#12b190] text-white hover:bg-[#0e9a7a]'
                    }`}
                  >
                    {isProductOutOfStock ? 'IKKE PÅ LAGER' : 'Legg til i handlekurv'}
                  </button>
                </div>
              </div>
              
              {allSuggestedProducts.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-black">Foreslåtte tilbehør:</h3>
                  <div className="relative overflow-hidden">
                    <div id="suggestedCarousel" className="overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      <div className="inline-flex gap-2">
                        {Array.from({ length: Math.ceil(allSuggestedProducts.length / 4) }).map((_, pageIndex) => (
                          <div key={pageIndex} className="grid grid-cols-2 grid-rows-2 gap-2 w-full flex-shrink-0">
                            {allSuggestedProducts.slice(pageIndex * 4, pageIndex * 4 + 4).map((acc) => (
                              <button
                                key={acc.id}
                                onClick={() => toggleSuggestedProduct(acc.id)}
                                className={`border-2 rounded-lg p-2 transition-all flex flex-col ${
                                  selectedSuggestedProducts.has(acc.id)
                                    ? 'border-[#12b190] bg-[#12b190]/5'
                                    : 'border-gray-200 hover:border-[#12b190]'
                                }`}
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
                                <h3 className="text-[9px] font-medium text-gray-900 line-clamp-2 mb-1 flex-1">
                                  {acc.name}
                                </h3>
                                <p className="text-[9px] font-bold text-[#12b190]">{formatCurrency(acc.price)}</p>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const container = document.getElementById('suggestedCarousel');
                        const scrollAmount = container?.offsetWidth || 0;
                        if (container) container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
                    >
                      <ChevronLeft size={16} className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => {
                        const container = document.getElementById('suggestedCarousel');
                        const scrollAmount = container?.offsetWidth || 0;
                        if (container) container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
                    >
                      <ChevronRight size={16} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Add to Cart */}
      <div className="lg:hidden mt-6 px-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-sm text-red-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className={`text-xl font-bold ${product.originalPrice && product.originalPrice !== product.price ? 'text-[#12b190]' : 'text-black'}`}>{formatCurrency(calculateTotalPrice())}</span>
            {selectedSuggestedProducts.size > 0 && (
              <span className="text-xs text-gray-500">({selectedSuggestedProducts.size} tillegg)</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-3.5 w-3.5 text-gray-600" />
              </button>
              <span className="text-sm font-semibold min-w-[24px] text-center text-black">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>

            <button
              onClick={() => {
                if (!isProductOutOfStock) {
                  addToCart({ ...product, size: selectedSize, color: selectedColor } as any, quantity);
                }
              }}
              disabled={isProductOutOfStock}
              className={`flex-1 px-4 py-2.5 rounded-md font-semibold text-sm transition-all ${
                isProductOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#12b190] text-white hover:bg-[#0e9a7a]'
              }`}
            >
              {isProductOutOfStock ? 'IKKE PÅ LAGER' : 'Legg til i handlekurv'}
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12 mb-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-black">Spesifikasjoner</h2>
            <div className="space-y-3 lg:space-y-4">
              {getUniqueSpecifications().map((spec, i) => (
                <div key={i} className="flex justify-between py-3 lg:py-4 border-b border-gray-200">
                  <span className="font-semibold text-gray-900 text-sm lg:text-lg">{spec.label}</span>
                  <span className="text-gray-700 text-sm lg:text-base text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-black">Foreslåtte produkter</h2>
            <div className="grid grid-cols-3 grid-rows-2 gap-1 lg:gap-2 max-w-2xl">
              {displayBikes.map((bike) => (
                <button
                  key={bike.id}
                  onClick={() => toggleSuggestedBike(bike.id)}
                  className={`border-2 rounded-lg p-2 transition-all flex flex-col ${
                    selectedSuggestedBikes.has(bike.id)
                      ? 'border-[#12b190] bg-[#12b190]/5'
                      : 'border-gray-200 hover:border-[#12b190]'
                  }`}
                >
                  <div className="w-full aspect-[4/3] bg-white rounded mb-1 overflow-hidden flex items-center justify-center flex-shrink-0">
                    <Image
                      src={bike.image}
                      alt={bike.name}
                      width={150}
                      height={112}
                      className="w-full h-full object-contain"
                      quality={100}
                    />
                  </div>
                  <h3 className="text-xs font-medium text-gray-900 line-clamp-1 mb-0.5">
                    {bike.name}
                  </h3>
                  <p className="text-sm font-bold text-[#12b190]">{formatCurrency(bike.price)}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-black">{formatCurrency(calculateSuggestedProductsTotal())}</span>
                {selectedSuggestedBikes.size > 0 && (
                  <span className="text-sm text-gray-500">({selectedSuggestedBikes.size} tillegg)</span>
                )}
              </div>
              <button
                onClick={() => {
                  selectedSuggestedBikes.forEach(id => {
                    const suggestedBike = displayBikes.find(b => b.id === id);
                    if (suggestedBike) {
                      addToCart(suggestedBike as any, 1);
                    }
                  });
                }}
                className="w-full bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0e9a7a] mt-6"
              >
                Legg til i handlekurv
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
