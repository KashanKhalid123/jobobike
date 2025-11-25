'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from './CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string[];
  description?: string;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isInCart = items.some(item => item.id === product.id);
  const cartQuantity = items.find(item => item.id === product.id)?.quantity || 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        
    });

    // Show success state
    setJustAdded(true);
    
    // Reset states after animation
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(false);
    }, 2000);
  };

  const isOutOfStock = product.inStock === false;

  return (
    <Card className={`group hover:shadow-lg transition-shadow duration-300 border border-gray-200 ${className}`}>
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-white rounded-t-lg">
          <div className="aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${isOutOfStock ? 'opacity-60' : ''}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/400';
              }}
            />
          </div>
          
          {/* Discount Badge */}
          {!isOutOfStock && product.originalPrice && product.originalPrice !== product.price && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          
          {/* BLACK WEEK Badge for 40% discount bikes */}
          {!isOutOfStock && ['henry-001', 'transer-001', 'robin-pro-001', 'dyno-001', 'luxe-snow-001'].includes(product.id) && (
            <div className="absolute top-3 left-3 bg-orange-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              BLACK WEEK
            </div>
          )}
          
          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              UTSOLGT
            </div>
          )}
          
          {/* Quick Add Button Overlay */}
          {!isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-white text-black hover:bg-[#12b190] hover:text-black font-semibold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Quick Add
                  </>
                )}
              </Button>
            </div>
          )}

          {/* In Cart Badge */}
          {isInCart && !isOutOfStock && !(product.originalPrice && product.originalPrice !== product.price) && (
            <div className="absolute top-3 right-3 bg-[#12b190] text-black text-xs font-bold px-2 py-1 rounded-full">
              {cartQuantity} in cart
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          {product.category && (
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
          )}
          
          <h3 className="font-semibold text-lg text-black mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">
                kr {product.price.toLocaleString('nb-NO')}
              </span>
              {product.originalPrice && product.originalPrice !== product.price && (
                <span className="text-sm text-red-500 line-through">
                  kr {product.originalPrice.toLocaleString('nb-NO')}
                </span>
              )}
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || isOutOfStock}
              size="sm"
              className={`
                transition-all duration-300 font-semibold
                ${isOutOfStock
                  ? 'bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400'
                  : justAdded 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-[#12b190] hover:bg-[#12b190] text-black'
                }
              `}
            >
              {isOutOfStock ? (
                'UTSOLGT'
              ) : isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                  Adding...
                </>
              ) : justAdded ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
