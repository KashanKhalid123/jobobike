'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  category?: string[];
  size?: string;
  variant?: string;
  color?: string;
  weight?: number; // weight in kg
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  isLoading: boolean;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

interface CartContextType extends CartState {
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  grandTotal: number;
}

// Cookie configuration
const CART_COOKIE_KEY = 'shopping_cart';
const CART_COOKIE_OPTIONS = {
  expires: 30, // 30 days
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

// Cookie utility functions
const saveCartToCookies = (items: CartItem[]): void => {
  try {
    const cartData = JSON.stringify(items);
    Cookies.set(CART_COOKIE_KEY, cartData, CART_COOKIE_OPTIONS);
  } catch (error) {
    console.error('Failed to save cart to cookies:', error);
  }
};

const getCartFromCookies = (): CartItem[] => {
  try {
    const cartData = Cookies.get(CART_COOKIE_KEY);
    if (!cartData) return [];
    
    const parsedData = JSON.parse(cartData);
    
    // Validate the data structure
    if (Array.isArray(parsedData)) {
      return parsedData.filter(item => 
        item && 
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
      );
    }
    
    return [];
  } catch (error) {
    console.error('Failed to retrieve cart from cookies:', error);
    // Clear corrupted cookie data
    clearCartCookies();
    return [];
  }
};

const clearCartCookies = (): void => {
  try {
    Cookies.remove(CART_COOKIE_KEY);
  } catch (error) {
    console.error('Failed to clear cart cookies:', error);
  }
};

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  shippingCost: 0,
  isLoading: true,
};

// Helper function to calculate shipping for a single item
const calculateItemShipping = (weight: number): number => {
  if (weight <= 0 || weight > 50) return 0;
  return 440 + 28 * (weight - 1);
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = items.reduce((sum, item) => {
    const itemWeight = item.weight || 0;
    return sum + (calculateItemShipping(itemWeight) * item.quantity);
  }, 0);
  return { 
    totalItems, 
    totalPrice: Math.round(totalPrice * 100) / 100,
    shippingCost: Math.round(shippingCost)
  };
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const quantityToAdd = action.payload.quantity || 1;
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        const { quantity, ...itemWithoutQuantity } = action.payload;
        newItems = [...state.items, { ...itemWithoutQuantity, quantity: quantityToAdd }];
      }
      
      const { totalItems, totalPrice, shippingCost } = calculateTotals(newItems);
      return { ...state, items: newItems, totalItems, totalPrice, shippingCost };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { totalItems, totalPrice, shippingCost } = calculateTotals(newItems);
      return { ...state, items: newItems, totalItems, totalPrice, shippingCost };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== action.payload.id);
        const { totalItems, totalPrice, shippingCost } = calculateTotals(newItems);
        return { ...state, items: newItems, totalItems, totalPrice, shippingCost };
      }

      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const { totalItems, totalPrice, shippingCost } = calculateTotals(newItems);
      return { ...state, items: newItems, totalItems, totalPrice, shippingCost };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], totalItems: 0, totalPrice: 0, shippingCost: 0 };

    case 'LOAD_CART': {
      const { totalItems, totalPrice, shippingCost } = calculateTotals(action.payload);
      return { ...state, items: action.payload, totalItems, totalPrice, shippingCost };
    }

    default:
      return state;
  }
};

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from cookies on mount
  useEffect(() => {
    try {
      const savedCart = getCartFromCookies();
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    } catch (error) {
      console.error('Failed to load cart from cookies:', error);
    } finally {
      // Set loading to false after attempting to load
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Save cart to cookies whenever items change (except during initial load)
  useEffect(() => {
    if (!state.isLoading) {
      saveCartToCookies(state.items);
    }
  }, [state.items, state.isLoading]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    clearCartCookies();
  };

  const grandTotal = state.totalPrice + state.shippingCost;

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
