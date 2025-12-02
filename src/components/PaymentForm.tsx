'use client';

import { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useCart } from '@/components/CartContext';
import { formatCurrency } from '@/utils/currency';
import { calculateTotal, calculateShippingForWeight } from '@/utils/pricing';
import { getProductWeight } from '@/utils/productWeight';

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
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Calculate shipping per item, then sum
    const totalShipping = cartItems.reduce((sum, item) => {
        const weight = (item as any).weight || getProductWeight(item.id);
        const itemShipping = calculateShippingForWeight(weight);
        return sum + (itemShipping * item.quantity);
    }, 0);

    const originalSubtotal = cartItems.reduce((sum, item) => {
        const origPrice = (item as any).originalPrice || item.price;
        return sum + (origPrice * item.quantity);
    }, 0);
    
    let discount = 0;
    let basePrice = originalSubtotal;
    
    if (appliedCoupon) {
        // Apply coupon to ORIGINAL prices
        if (appliedCoupon.percent_off) {
            discount = (originalSubtotal * appliedCoupon.percent_off) / 100;
        } else if (appliedCoupon.amount_off) {
            discount = appliedCoupon.amount_off / 100;
        }
        basePrice = originalSubtotal - discount;
    } else {
        // No coupon: use current sale prices
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        basePrice = subtotal;
    }
    
    // VAT is included in prices (not added on top)
    const taxableBasis = basePrice + totalShipping;
    // const vat = Math.round(taxableBasis * 0.25); // 25% VAT calculation (commented out)
    const vat = 0; // VAT included in prices, shown as 0
    const total = Math.round(taxableBasis);
    
    const pricingBreakdown = {
        productPrice: basePrice,
        shipping: totalShipping,
        taxableBasis,
        vat,
        total
    };

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

    const validateForm = () => {
        const errors: Record<string, string> = {};

        const namePattern = /^[a-zA-ZæøåÆØÅ\s-]+$/;
        if (!shippingInfo.fullName.trim()) {
            errors.fullName = 'Vennligst skriv inn et gyldig navn';
        } else if (!namePattern.test(shippingInfo.fullName.trim())) {
            errors.fullName = 'Vennligst skriv inn et gyldig navn';
        }

        const phonePattern = /^\+?[0-9\s-]{8,15}$/;
        if (!shippingInfo.phone.trim()) {
            errors.phone = 'Vennligst skriv inn et gyldig telefonnummer';
        } else if (!phonePattern.test(shippingInfo.phone.trim())) {
            errors.phone = 'Vennligst skriv inn et gyldig telefonnummer';
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.trim()) {
            errors.email = 'Vennligst skriv inn en gyldig e-postadresse';
        } else if (!emailPattern.test(email.trim())) {
            errors.email = 'Vennligst skriv inn en gyldig e-postadresse';
        }

        const postalPattern = /^\d{4}$/;
        if (!shippingInfo.postal_code.trim()) {
            errors.postal_code = 'Vennligst skriv inn et gyldig postnummer (4 siffer)';
        } else if (!postalPattern.test(shippingInfo.postal_code.trim())) {
            errors.postal_code = 'Vennligst skriv inn et gyldig postnummer (4 siffer)';
        }

        const addressPattern = /^[a-zA-Z0-9æøåÆØÅ\s.,\-]+$/;
        if (!shippingInfo.addressLine1.trim() || shippingInfo.addressLine1.trim().length < 3) {
            errors.addressLine1 = 'Vennligst skriv inn en gyldig adresse';
        } else if (!addressPattern.test(shippingInfo.addressLine1.trim())) {
            errors.addressLine1 = 'Vennligst skriv inn en gyldig adresse';
        }

        const cityPattern = /^[a-zA-ZæøåÆØÅ\s-]+$/;
        if (!shippingInfo.city.trim()) {
            errors.city = 'Vennligst skriv inn en gyldig by';
        } else if (!cityPattern.test(shippingInfo.city.trim())) {
            errors.city = 'Vennligst skriv inn en gyldig by';
        }

        const statePattern = /^[a-zA-ZæøåÆØÅ\s-]+$/;
        if (!shippingInfo.state.trim()) {
            errors.state = 'Vennligst skriv inn et gyldig fylke';
        } else if (!statePattern.test(shippingInfo.state.trim())) {
            errors.state = 'Vennligst skriv inn et gyldig fylke';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage('Vennligst rett opp feilene i skjemaet');
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/suksess?payment_intent={payment_intent}`,
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
            clearCart();
        }

        setIsLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-0 lg:mt-20">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-medium mb-6 text-black">Bestillingsoversikt</h2>

                <div className="space-y-4 mb-6">
                    {cartItems.map((item) => {
                        const origPrice = (item as any).originalPrice || item.price;
                        const hasDiscount = origPrice > item.price;
                        const itemDiscount = appliedCoupon?.percent_off 
                            ? (origPrice * item.quantity * appliedCoupon.percent_off) / 100
                            : 0;
                        const itemFinal = (origPrice * item.quantity) - itemDiscount;
                        return (
                            <div key={item.id} className="border-b pb-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded" />
                                        ) : (
                                            <span className="text-blue-600 text-sm">📦</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-black">{item.name} (x{item.quantity})</p>
                                        {appliedCoupon ? (
                                            <div className="text-xs space-y-1 mt-1">
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Opprinnelig pris</span>
                                                    <span>{formatCurrency(convertPrice(origPrice * item.quantity))}</span>
                                                </div>
                                                <div className="flex justify-between text-green-600">
                                                    <span>-{appliedCoupon.percent_off}% rabatt</span>
                                                    <span>-{formatCurrency(convertPrice(itemDiscount))}</span>
                                                </div>
                                                <div className="flex justify-between font-medium text-black">
                                                    <span>Pris etter rabatt</span>
                                                    <span>{formatCurrency(convertPrice(itemFinal))}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 mt-1">
                                                {hasDiscount && (
                                                    <p className="text-xs text-red-500 line-through">
                                                        {formatCurrency(convertPrice(origPrice * item.quantity))}
                                                    </p>
                                                )}
                                                <p className="text-sm font-medium text-black">
                                                    {formatCurrency(convertPrice(item.price * item.quantity))}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="space-y-3 border-t pt-4">
                    {appliedCoupon ? (
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-black">Total produktpris</span>
                            <span className="text-black">{formatCurrency(convertPrice(basePrice))}</span>
                        </div>
                    ) : null}
                    <div className="flex justify-between text-sm text-black">
                        <span>Frakt</span>
                        <span className="text-black">{formatCurrency(convertPrice(pricingBreakdown.shipping))}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>MVA (inkludert i prisen)</span>
                        <span>{formatCurrency(convertPrice(pricingBreakdown.vat))}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg border-t pt-3 text-black">
                        <span>Totalt å betale</span>
                        <span>{formatCurrency(convertPrice(total))}</span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3 text-black">Har du en kupongkode?</h3>
                    {!appliedCoupon ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Skriv inn kode"
                                className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
                                disabled={applyingCoupon}
                            />
                            <button
                                type="button"
                                onClick={handleApplyCoupon}
                                disabled={applyingCoupon || !couponCode.trim()}
                                className="w-full sm:w-auto px-6 py-3 bg-[#12b190] text-white rounded hover:bg-[#0f9a7a] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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

            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h3 className="font-medium mb-4 text-black">Leveringsinformasjon</h3>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">E-post</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (validationErrors.email) {
                                        setValidationErrors(prev => ({ ...prev, email: '' }));
                                    }
                                }}
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 text-gray-700 ${
                                    validationErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder="post@eksempel.no"
                                required
                            />
                            {validationErrors.email && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Fullt navn</label>
                            <input
                                type="text"
                                value={shippingInfo.fullName}
                                onChange={(e) => {
                                    setShippingInfo({ ...shippingInfo, fullName: e.target.value });
                                    if (validationErrors.fullName) {
                                        setValidationErrors(prev => ({ ...prev, fullName: '' }));
                                    }
                                }}
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 text-gray-700 ${
                                    validationErrors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder="Ola Nordmann"
                                required
                            />
                            {validationErrors.fullName && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.fullName}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                            <input
                                type="tel"
                                value={shippingInfo.phone || ""}
                                onChange={(e) => {
                                    setShippingInfo({ ...shippingInfo, phone: e.target.value });
                                    if (validationErrors.phone) {
                                        setValidationErrors(prev => ({ ...prev, phone: '' }));
                                    }
                                }}
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 text-gray-700 ${
                                    validationErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder="+47 123 45 678"
                                required
                            />
                            {validationErrors.phone && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                            )}
                        </div>

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
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Adresse</label>
                            <input
                                type="text"
                                value={shippingInfo.addressLine1}
                                onChange={(e) => {
                                    setShippingInfo({ ...shippingInfo, addressLine1: e.target.value });
                                    if (validationErrors.addressLine1) {
                                        setValidationErrors(prev => ({ ...prev, addressLine1: '' }));
                                    }
                                }}
                                className={`w-full p-3 border rounded focus:outline-none focus:ring-2 text-gray-700 ${
                                    validationErrors.addressLine1 ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder="Storgata 1"
                                required
                            />
                            {validationErrors.addressLine1 && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.addressLine1}</p>
                            )}
                        </div>

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

                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <input
                                    type="text"
                                    value={shippingInfo.city}
                                    onChange={(e) => {
                                        setShippingInfo({ ...shippingInfo, city: e.target.value });
                                        if (validationErrors.city) {
                                            setValidationErrors(prev => ({ ...prev, city: '' }));
                                        }
                                    }}
                                    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 text-gray-700 ${
                                        validationErrors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="By"
                                    required
                                />
                                {validationErrors.city && (
                                    <p className="mt-1 text-xs text-red-600">{validationErrors.city}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={shippingInfo.state}
                                    onChange={(e) => {
                                        setShippingInfo({ ...shippingInfo, state: e.target.value });
                                        if (validationErrors.state) {
                                            setValidationErrors(prev => ({ ...prev, state: '' }));
                                        }
                                    }}
                                    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 text-gray-700 ${
                                        validationErrors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="Fylke"
                                    required
                                />
                                {validationErrors.state && (
                                    <p className="mt-1 text-xs text-red-600">{validationErrors.state}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={shippingInfo.postal_code || ""}
                                    onChange={(e) => {
                                        setShippingInfo({ ...shippingInfo, postal_code: e.target.value });
                                        if (validationErrors.postal_code) {
                                            setValidationErrors(prev => ({ ...prev, postal_code: '' }));
                                        }
                                    }}
                                    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 text-gray-700 ${
                                        validationErrors.postal_code ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="Postnummer"
                                    required
                                />
                                {validationErrors.postal_code && (
                                    <p className="mt-1 text-xs text-red-600">{validationErrors.postal_code}</p>
                                )}
                            </div>
                        </div>
                    </div>

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
