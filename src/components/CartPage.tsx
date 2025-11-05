'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/components/CartContext'; // Adjust path as needed
import { CartSummary } from '../components/CartSummary'; // Adjust path as needed
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import BuyNowButton from './BuyNowButton'; // âœ… Import BuyNowButton
import { formatCurrency } from '@/utils/currency';

const CartPage: React.FC = () => {
  const { items, totalItems, clearCart, isLoading, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push('/'); // Adjust route as needed
  };

  const handleStartFresh = () => {
    if (confirm('Dette vil tømme handlekurven din. Er du sikker?')) {
      clearCart();
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };
  const handleCheckout = async () => {
    try {
      if (!items || items.length === 0) {
        alert('Handlekurven din er tom. Legg til varer før du går til kassen.');
        return;
      }
      
      // Validate cart items structure
      const validItems = items.every(item => 
        item && 
        typeof item.id === 'string' && 
        typeof item.name === 'string' && 
        typeof item.price === 'number' && 
        typeof item.quantity === 'number' &&
        item.quantity > 0
      );
      
      if (!validItems) {
        alert('Det ser ut til å være et problem med varene i handlekurven. Oppdater siden og prøv igjen.');
        return;
      }
      
      router.push("/checkout");
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Det oppstod en feil ved å Gå til kassen. prøv igjen.');
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#12b190] border-t-[#12b190]"></div>
            <span className="ml-4 text-gray-700 font-medium">Laster handlekurven...</span>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 lg:px-16 xl:px-24 py-8 mt-52 md:mt-36 max-w-7xl">
          {/* MOBILE EMPTY CART */}
          <div className="lg:hidden">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 text-center backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-[#12b190] to-[#12b190] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-[#12b190]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Handlekurven din er tom</h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                Oppdag fantastiske produkter og legg dem til i handlekurven for å komme i gang.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-gradient-to-r from-[#12b190] to-[#12b190] text-white px-6 py-4 rounded-xl font-semibold hover:from-[#12b190] hover:to-[#12b190] transition-all duration-300 flex items-center gap-2 justify-center text-sm shadow-lg transform hover:scale-105"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Start å handle
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP EMPTY CART */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-16 text-center max-w-2xl mx-auto backdrop-blur-sm">
              <div className="w-28 h-28 bg-gradient-to-br from-[#12b190] to-[#12b190] rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="h-14 w-14 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Handlekurven din er tom</h2>
              <p className="text-gray-600 mb-10 text-lg">Det ser ut som du ikke har lagt til noe i handlekurven ennå.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleContinueShopping}
                  className="bg-gradient-to-r from-[#12b190] to-[#12b190] text-white px-10 py-4 rounded-xl font-semibold hover:from-[#12b190] hover:to-[#12b190] transition-all duration-300 flex items-center gap-3 justify-center shadow-lg transform hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Fortsett å handle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // âœ… Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 lg:px-16 xl:px-24 py-6 sm:py-8 mt-48 max-w-7xl">
        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Handlekurv</h1>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  {totalItems} {totalItems === 1 ? 'vare' : 'varer'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#12b190] to-[#12b190] rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300">
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-inner">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-xs font-medium">Ingen bilde</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{item.category || 'Generell'}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Antall:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-8 text-center text-sm font-bold text-black border-2 border-gray-200 rounded-lg focus:border-[#12b190] focus:outline-none"
                        />
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-[#12b190]">{formatCurrency(item.price * item.quantity)}</p>
                        <p className="text-xs text-gray-500">{formatCurrency(item.price)} per stk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cart Summary */}
          <div className="bg-white rounded-t-3xl border border-gray-200 p-6 shadow-2xl">
            <CartSummary className="mb-4" />
            
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#12b190] to-[#12b190] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#12b190] hover:to-[#12b190] transition-all duration-300 shadow-lg transform hover:scale-105 mb-3"
            >
              Gå til kassen
            </button>
            
            <button
              onClick={handleContinueShopping}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Fortsett å handle
            </button>
          </div>
          <div className="h-32"></div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Handlekurv</h1>
                <p className="text-gray-600 mt-2 font-medium text-lg">
                  {totalItems} {totalItems === 1 ? 'vare' : 'varer'} i handlekurven
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#12b190] to-[#12b190] rounded-full flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="p-8">
                  <div className="space-y-8">
                    {items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-center gap-8 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
                          {/* Product Image */}
                          <div className=" ">
                            <div className="w-28 h-28 bg-white rounded-lg shadow-lg">
                              {item.image ? (
                                <Image 
                                  src={item.image} 
                                  alt={item.name}
                                  width={112}
                                  height={112}
                                  className="w-full h-full object-contain rounded-lg"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                  <span className="text-gray-500 text-sm font-medium">Ingen bilde</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-xl mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-600 font-medium mb-4">Kategori: {item.category || 'Generell'}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <span className="text-sm text-gray-700 font-medium">Antall:</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                  className="w-20 h-12 text-center text-lg font-bold text-black border-2 border-gray-200 rounded-lg focus:border-[#12b190] focus:outline-none"
                                />
                              </div>
                              
                              <div className="text-right">
                                <p className="text-3xl font-bold text-[#12b190]">{formatCurrency(item.price * item.quantity)}</p>
                                <p className="text-sm text-gray-600 font-medium">{formatCurrency(item.price)} per stk</p>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200"
                          >
                            <Trash2 className="h-6 w-6" />
                          </button>
                        </div>
                        {index < items.length - 1 && <hr className="border-gray-200 mt-6" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <CartSummary />

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#12b190] to-[#12b190] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#12b190] hover:to-[#12b190] transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  Gå til kassen
                </button>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-3 border border-gray-200"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Fortsett å handle
                  </button>
                  
                  <div className="text-center mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mb-3">
                     
                      <span className="font-medium">Kopi av E-sykkel manualen vil bli sendt på e-post med sporingsnummer</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                     
                      <span className="font-medium">Handlekurven din lagres automatisk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
