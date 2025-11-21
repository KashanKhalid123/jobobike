'use client';

import React, { useState } from 'react';
import { useCart, CartItem } from '@/components/CartContext'; // Adjust path as needed
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: Omit< CartItem, 'quantity'>;
  className?: string;
  children?: React.ReactNode;
  quantity?: number;
  disabled?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = '',
  children,
  quantity = 1,
  disabled = false,
}) => {
  const { addToCart, } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    if (isAdding || disabled) return;

    setIsAdding(true);
    addToCart(product, quantity);
    
    // Show success state
    setJustAdded(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(false);
    }, 2000);
  };

  const defaultClasses = 'bg-black text-black px-6 py-2 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || disabled}
      className={` ${defaultClasses} ${className}`}
    >
      {disabled ? (
        'UTSOLGT'
      ) : justAdded ? (
        <>
          <Check className="h-4 w-4" />
          Lagt til!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          {children || 'Legg til'}
        </>
      )}
    </button>
  );
};
