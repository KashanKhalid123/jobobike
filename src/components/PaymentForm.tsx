'use client';

import { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useCart } from '@/components/CartContext';
import { formatCurrency } from '@/utils/currency';

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState('NOK');
    const { items: cartItems, clearCart } = useCart();
    const [email, setEmail] = useState('');
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: 'United States',
        postal_code: '',
        phone: ''
    });
    const [saveInfo, setSaveInfo] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState('');
    const [applyingCoupon, setApplyingCoupon] = useState(false);

    // ðŸ§® Calculate totals from cart
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const saved = 0;
    const taxId = 0;
    
    let discount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.percent_off) {
            discount = (subtotal * appliedCoupon.percent_off) / 100;
        } else if (appliedCoupon.amount_off) {
            discount = appliedCoupon.amount_off / 100;
        }
    }
    
    const total = subtotal - saved - discount + taxId;

    // ðŸ’± Currency options - Only NOK
    const currencies = [
        { code: 'NOK', rate: 1, symbol: 'kr' }
    ];

    const currentCurrency = currencies[0];
    const convertPrice = (price: number) => price * currentCurrency.rate;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError('Vennligst skriv inn en kupongkode');
            return;
        }
        setApplyingCoupon(true);
        setCouponError('');
        try {
            const response = await fetch('/api/validate-coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ couponCode: couponCode.trim() })
            });
            const data = await response.json();
            if (response.ok && data.valid) {
                setAppliedCoupon(data.coupon);
                setCouponError('');
            } else {
                setCouponError(data.error || 'Ugyldig kupongkode');
                setAppliedCoupon(null);
            }
        } catch (error) {
            setCouponError('Kunne ikke validere kupongkode');
            setAppliedCoupon(null);
        } finally {
            setApplyingCoupon(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        setCouponError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?payment_intent={payment_intent}`,
                receipt_email: email,
                shipping: {
                    name: shippingInfo.fullName,
                    address: {
                        line1: shippingInfo.addressLine1,
                        line2: shippingInfo.addressLine2,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        country:
                            shippingInfo.country === "United States"
                                ? "US"
                                : shippingInfo.country,
                        postal_code: shippingInfo.postal_code,

                    },
                },
            },
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message || "An error occurred");
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else {
            // âœ… Clear the cart after successful payment
            clearCart();
        }

        setIsLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
            {/* Left Column - Order Summary */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-medium mb-6 text-black">Bestillingsoversikt</h2>

                {/* ðŸ›’ Dynamic Cart Items */}
                <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                                ) : (
                                    <span className="text-blue-600 text-sm">ðŸ“¦</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-black">{item.name}</p>
                                <p className="text-sm font-medium text-black">
                                    {formatCurrency(convertPrice(item.price * item.quantity))}
                                </p>
                            </div>
                            <p className="text-sm text-black">x{item.quantity}</p>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-sm text-black">
                        <span>Delsum</span>
                        <span>{formatCurrency(convertPrice(subtotal))}</span>
                    </div>
                    {saved > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>SPART</span>
                            <span>{formatCurrency(convertPrice(saved))}</span>
                        </div>
                    )}
                    {appliedCoupon && discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Rabatt ({appliedCoupon.name || couponCode})</span>
                            <span>-{formatCurrency(convertPrice(discount))}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm text-black">
                        <span>MVA</span>
                        <span className="text-black">Inkludert i prisen</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg border-t pt-3 text-black">
                        <span>Totalt å betale</span>
                        <span>{formatCurrency(convertPrice(total))}</span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3 text-black">Har du en kupongkode?</h3>
                    {!appliedCoupon ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Skriv inn kode"
                                className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                disabled={applyingCoupon}
                            />
                            <button
                                type="button"
                                onClick={handleApplyCoupon}
                                disabled={applyingCoupon || !couponCode.trim()}
                                className="px-6 py-3 bg-[#12b190] text-white rounded hover:bg-[#0f9a7a] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {applyingCoupon ? 'Sjekker...' : 'Bruk'}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span className="text-sm text-green-700">
                                    Kupong brukt: {appliedCoupon.name || couponCode}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemoveCoupon}
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Fjern
                            </button>
                        </div>
                    )}
                    {couponError && (
                        <p className="mt-2 text-sm text-red-600">{couponError}</p>
                    )}
                </div>
            </div>

            {/* Right Column - Payment Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <form onSubmit={handleSubmit}>



                    {/* Shipping Information */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-4 text-black">Leveringsinformasjon</h3>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">E-post</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="post@eksempel.no"
                                required
                            />
                        </div>



                        {/* Full Name */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Fullt navn</label>
                            <input
                                type="text"
                                value={shippingInfo.fullName}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="Ola Nordmann"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                            <input
                                type="tel"
                                value={shippingInfo.phone || ""}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, phone: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="+47 123 45 678"
                                required
                            />
                        </div>

                        {/* Country */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Land</label>
                            <select
                                value={shippingInfo.country}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, country: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            >
                                <option>Norge</option>
                                <option>Sverige</option>
                                <option>Danmark</option>
                                <option>Finland</option>
                                <option>Tyskland</option>
                                <option>Nederland</option>
                            </select>
                        </div>

                        {/* Address Line 1 */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Adresse</label>
                            <input
                                type="text"
                                value={shippingInfo.addressLine1}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="Storgata 1"
                                required
                            />
                        </div>

                        {/* Address Line 2 */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Adresse linje 2</label>
                            <input
                                type="text"
                                value={shippingInfo.addressLine2}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, addressLine2: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="Leilighet, etasje, etc. (valgfritt)"
                            />
                        </div>

                        {/* City, State, ZIP */}
                        <div className="grid grid-cols-3 gap-3">
                            <input
                                type="text"
                                value={shippingInfo.city}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                                }
                                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="By"
                                required
                            />
                            <input
                                type="text"
                                value={shippingInfo.state}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, state: e.target.value })
                                }
                                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="Fylke"
                                required
                            />
                            <input
                                type="text"
                                value={shippingInfo.postal_code || ""}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, postal_code: e.target.value })
                                }
                                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="Postnummer"
                                required
                            />
                        </div>
                    </div>








                    {/* Payment Method */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-4 text-black">Betalingsmetode</h3>
                        <p className="text-sm text-gray-600 mb-4">Kortinformasjon</p>

                        <div className="border border-gray-300 rounded p-4 mb-4">
                            <PaymentElement
                                options={{
                                    layout: {
                                        type: 'tabs',
                                        defaultCollapsed: false,
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {message && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                            {message}
                        </div>
                    )}

                    {/* Pay Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !stripe || !elements}
                        className="w-full bg-[#12b190] hover:bg-[#12b190] text-white py-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Behandler...' : 'Betal'}
                    </button>
                </form>
            </div>
        </div>
    );
}
