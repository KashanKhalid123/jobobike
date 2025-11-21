'use client';

import React from 'react';
import { useCart } from '@/components/CartContext'; // Adjust path as needed
import { formatCurrency } from '@/utils/currency';

interface CartSummaryProps {
  className?: string;
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ 
  className = '',
  showCheckoutButton = false,
  onCheckout
}) => {
  const { totalItems, totalPrice, clearCart,  } = useCart();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      // Default checkout behavior - clear cart
      clearCart();
      alert('Order placed successfully! Cart has been cleared.');
    }
  };



  return (
    <div className={`p-4 bg-white rounded-lg border ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-black">Cart Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Items ({totalItems})</span>
          <span className="font-medium">{formatCurrency(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Frakt</span>
          <span className="font-medium text-[#12b190]">Gratis</span>
        </div>
        
        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-black">Total</span>
            <span className="text-lg font-bold text-black">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {showCheckoutButton && totalItems > 0 && (
        <div className="space-y-2">
          <button
            onClick={handleCheckout}
            className="w-full bg-[#12b190] text-black py-3 px-6 rounded-lg hover:bg-[#12b190] transition-colors font-semibold"
          >
            Proceed to Checkout
          </button>
          
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
              }
            }}
            className="w-full bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};
