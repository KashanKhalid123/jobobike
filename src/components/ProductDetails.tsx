"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductCard } from "@/lib/productData";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Minus, Plus , Star} from "lucide-react";

import { useCart } from "./CartContext";
import TechnicalSpecifications from "./TechnicalSpecs";
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
      <span className="text-sm text-gray-600">{reviewCount} Anmeldelser</span>
    </div>
  );
}

export default function ProductDetails({ product }: { product: ProductCard }) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || "");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { updateQuantity } = useCart();

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
    <div className="mt-40 md:mt-20 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
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

      {/* MOBILE LAYOUT (sm and below) */}
      <div className="lg:hidden">
        {/* MOBILE IMAGE SECTION */}
        <div className="mt-6">
          {/* Main Image */}
          <div className="mb-4 relative">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
            />
            {/* Navigation Arrows */}
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

          {/* Mobile Thumbnails - Arrow Navigation */}
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
        <div className="mt-6 space-y-4">
          <div>
  <h1 className="text-xl font-bold text-black">{product.name}</h1>
  <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
</div>

          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-black">{formatCurrency(product.originalPrice)}</span>
          </div>

          {/* Mobile Add to Cart Button */}
          <div className="mt-4">
            <AddToCartButton
              product={product}
              className="w-full bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0f9a7a]"
            />
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



          {/* Mobile Accordion */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg text-black">
            {/* Specs */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("specs")}
                className="w-full px-4 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium">Spesifikasjoner</span>
                {openAccordion === "specs" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openAccordion === "specs" && (
                <div className="px-4 pb-4 text-sm text-gray-700">
                  <ul className="space-y-2">
                    <li><strong>Motor:</strong> {product.specifications.motor}</li>
                    <li><strong>Battery:</strong> {product.specifications.battery}</li>
                    <li><strong>Range:</strong> {product.specifications.range}</li>
                    <li><strong>Top speed:</strong> {product.specifications.speed}</li>
                    <li><strong>Weight:</strong> {product.specifications.weight}</li>
                    <li><strong>Wheel size:</strong> {product.specifications.wheelSize}</li>
                    {product.specifications.brakes && <li><strong>Brakes:</strong> {product.specifications.brakes}</li>}
                    {product.specifications.frame && <li><strong>Frame:</strong> {product.specifications.frame}</li>}
                  </ul>
                </div>
              )}
            </div>

            {/* Size */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("size")}
                className="w-full px-4 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium">Størrelse</span>
                {openAccordion === "size" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openAccordion === "size" && (
                <div className="px-4 pb-4 text-sm text-gray-700">
                  {product.availableSizes.length === 0 ? (
                    <p>En størrelse / sammenleggbar modell</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {product.availableSizes.map((s) => (
                        <div key={s} className="p-2 border rounded text-sm">{s}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* What's in the Box */}
            <div>
              <button
                onClick={() => toggleAccordion("box")}
                className="w-full px-4 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium">Hva er i esken</span>
                {openAccordion === "box" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openAccordion === "box" && (
                <div className="px-4 pb-4 text-sm text-gray-700">
                  <ul className="list-disc ml-5 space-y-1">
                    {product.whatsInTheBox.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT (lg and above) - UNCHANGED */}
      <div className="hidden lg:block ">
        {/* IMAGE + THUMBNAILS */}
        <div className=" justify-center grid grid-cols-[3fr_2fr] gap-6 w-full">
          <div className=" w-full max-w-5xl ">
            {/* MAIN IMAGE */}
            <div className="relative">
              <Image
                src={selectedImage}
                alt={product.name}
                width={1000}
                height={800}
                className="w-full max-h-[600px] object-contain"
              />
              {/* Navigation Arrows */}
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

          <div className="mt-10 space-y-6   ">
          <div>
  <h1 className="text-2xl font-bold text-black">{product.name}</h1>
  <ReviewStars rating={product.rating || 5} reviewCount={product.reviewCount || 14} />
</div>


            {/* DESCRIPTION */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2 text-black">Om produktet</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* KEY FEATURES */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-black">Hovedfunksjoner:</h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                {product.keyFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-black">{formatCurrency(product.originalPrice)}</span>
            </div>



            {/* Quantity + Add to Cart in one row */}
            <div className="flex items-center gap-6 mt-6">
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
              <AddToCartButton
                product={product}
                className="w-44 bg-[#12b190] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0f9a7a]"
              />
            </div>




            {/* SPECIFICATIONS */}
            <div className="bg-white border border-gray-200 rounded-lg text-black">
              {/* Specs */}
              <div className="border-b border-gray-100">
                <button onClick={() => toggleAccordion("specs")} className="w-full px-6 py-4 flex items-center justify-between text-left">
                  <span className="font-medium">Spesifikasjoner</span>
                  {openAccordion === "specs" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openAccordion === "specs" && (
                  <div className="px-6 pb-4 text-sm text-gray-700">
                    <ul className="space-y-2">
                      <li><strong>Motor:</strong> {product.specifications.motor}</li>
                      <li><strong>Battery:</strong> {product.specifications.battery}</li>
                      <li><strong>Range:</strong> {product.specifications.range}</li>
                      <li><strong>Top speed:</strong> {product.specifications.speed}</li>
                      <li><strong>Weight:</strong> {product.specifications.weight}</li>
                      <li><strong>Wheel size:</strong> {product.specifications.wheelSize}</li>
                      {product.specifications.brakes && <li><strong>Brakes:</strong> {product.specifications.brakes}</li>}
                      {product.specifications.frame && <li><strong>Frame:</strong> {product.specifications.frame}</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Size */}
              <div className="border-b border-gray-100">
                <button onClick={() => toggleAccordion("size")} className="w-full px-6 py-4 flex items-center justify-between text-left">
                  <span className="font-medium">Størrelse</span>
                  {openAccordion === "size" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openAccordion === "size" && (
                  <div className="px-6 pb-4 text-sm text-gray-700">
                    {product.availableSizes.length === 0 ? (
                      <p>En størrelse / sammenleggbar modell</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {product.availableSizes.map((s) => (
                          <div key={s} className="p-2 border rounded text-sm">{s}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* What's in the Box */}
              <div>
                <button onClick={() => toggleAccordion("box")} className="w-full px-6 py-4 flex items-center justify-between text-left">
                  <span className="font-medium">Hva er i esken</span>
                  {openAccordion === "box" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openAccordion === "box" && (
                  <div className="px-6 pb-6 text-sm text-gray-700">
                    <ul className="list-disc ml-5 space-y-1">
                      {product.whatsInTheBox.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      

      {/* TECHNICAL SPECIFICATIONS SECTION - Add this after the desktop layout closing div */}
     <TechnicalSpecifications product={product}/>

    </div>
  );
}