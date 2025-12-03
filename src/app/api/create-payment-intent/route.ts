import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductWeight } from '@/utils/productWeight';

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('âŒ STRIPE_SECRET_KEY is not configured in environment variables');
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        {
          error: 'Payment system not configured. Please contact support.',
          code: 'STRIPE_NOT_CONFIGURED',
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('ðŸ“© Payment intent API received:', body);

    const { items = [], couponId = null, couponData = null } = body;

    // âœ… Calculate amount from cart items (real-time data)
    const calculateOrderAmount = (items: any[], couponData?: any) => {
      if (!items || items.length === 0) {
        throw new Error('No items in cart');
      }

      let productTotal = 0;
      
      if (couponData) {
        // When coupon is applied, ALWAYS use originalPrice
        productTotal = items.reduce((sum, item) => {
          const originalPrice = item.originalPrice || item.price;
          const price = Math.round(originalPrice * 100);
          const quantity = item.quantity || 1;
          return sum + price * quantity;
        }, 0);
        
        // Apply discount to original prices
        if (couponData.percent_off) {
          const discount = Math.round((productTotal * couponData.percent_off) / 100);
          productTotal = productTotal - discount;
          console.log(`Applied ${couponData.percent_off}% discount on original prices: -${discount}`);
        } else if (couponData.amount_off) {
          productTotal = productTotal - couponData.amount_off;
          console.log(`Applied fixed discount: -${couponData.amount_off}`);
        }
      } else {
        // No coupon: use current price
        productTotal = items.reduce((sum, item) => {
          const price = Math.round(item.price * 100);
          const quantity = item.quantity || 1;
          return sum + price * quantity;
        }, 0);
      }

      // Calculate shipping per item
      let shippingTotal = items.reduce((sum, item) => {
        const weight = item.weight || getProductWeight(item.id);
        const quantity = item.quantity || 1;
        const itemShipping = weight > 0 && weight <= 50 ? (440 + 28 * (weight - 1)) : 0;
        return sum + (itemShipping * quantity);
      }, 0);

      // Free shipping for orders over 3000 kr
      if (productTotal >= 300000) { // 3000 kr in øre
        shippingTotal = 0;
        console.log('🎉 Free shipping applied (order over 3000 kr)');
      }

      const total = productTotal + Math.round(shippingTotal * 100);
      console.log('âœ… Product total:', productTotal, 'Shipping:', Math.round(shippingTotal * 100), 'Total:', total);
      return total;
    };

    const amount = calculateOrderAmount(items, body.couponData);

    if (amount <= 0) {
      throw new Error('Invalid amount calculated');
    }

    console.log('ðŸ’³ Creating Stripe payment intent with amount:', amount);

    // Calculate total weight for shipping
    const totalWeight = items.reduce((sum: number, item: any) => {
      const weight = item.weight || getProductWeight(item.id);
      return sum + (weight * (item.quantity || 1));
    }, 0);

    // Create detailed metadata for Stripe dashboard
    const metadata: any = {
      order_id: `order_${Date.now()}`,
      total_items: items.length.toString(),
      total_weight_kg: totalWeight.toFixed(2),
    };

    // Add individual items and package details
    items.forEach((item: any, index: number) => {
      const prefix = `item_${index + 1}`;
      metadata[`${prefix}_name`] = item.name;
      metadata[`${prefix}_price`] = item.price.toString();
      metadata[`${prefix}_quantity`] = (item.quantity || 1).toString();
      metadata[`${prefix}_weight`] = (item.weight || getProductWeight(item.id)).toString();
      
      // Add variant and color if available
      if (item.variant) {
        metadata[`${prefix}_variant`] = item.variant;
      }
      if (item.color) {
        metadata[`${prefix}_color`] = item.color;
      }
      
      if (item.isPackage && item.packageItems) {
        metadata[`${prefix}_is_package`] = 'true';
        metadata[`${prefix}_package_count`] = item.packageItems.length.toString();
        
        item.packageItems.forEach((pkg: any, pkgIndex: number) => {
          metadata[`${prefix}_pkg_${pkgIndex + 1}_name`] = pkg.name;
          metadata[`${prefix}_pkg_${pkgIndex + 1}_price`] = pkg.price.toString();
        });
      }
    });

    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount: amount,
      currency: 'nok',
      automatic_payment_methods: { enabled: true },
      metadata: couponId ? { ...metadata, coupon_code: couponId } : metadata,
    };

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    console.log('âœ… Payment intent created:', paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: amount,
    });
  } catch (error: any) {
    console.error('âŒ Error creating payment intent:', error);
    return NextResponse.json(
      {
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Payment Intent API is working',
    timestamp: new Date().toISOString(),
  });
}
