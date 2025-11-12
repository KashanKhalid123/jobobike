import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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

      let total = items.reduce((sum, item) => {
        const price = item.price ? Math.round(item.price * 100) : 0;
        const quantity = item.quantity || 1;
        return sum + price * quantity;
      }, 0);

      if (couponData) {
        if (couponData.percent_off) {
          const discount = Math.round((total * couponData.percent_off) / 100);
          total = total - discount;
          console.log(`Applied ${couponData.percent_off}% discount: -${discount}`);
        } else if (couponData.amount_off) {
          total = total - couponData.amount_off;
          console.log(`Applied fixed discount: -${couponData.amount_off}`);
        }
      }

      console.log('âœ… Calculated total amount:', total);
      return total;
    };

    const amount = calculateOrderAmount(items, body.couponData);

    if (amount <= 0) {
      throw new Error('Invalid amount calculated');
    }

    console.log('ðŸ’³ Creating Stripe payment intent with amount:', amount);

    // Create detailed metadata for Stripe dashboard
    const metadata: any = {
      order_id: `order_${Date.now()}`,
      total_items: items.length.toString(),
    };

    // Add individual items and package details
    items.forEach((item: any, index: number) => {
      const prefix = `item_${index + 1}`;
      metadata[`${prefix}_name`] = item.name;
      metadata[`${prefix}_price`] = item.price.toString();
      metadata[`${prefix}_quantity`] = (item.quantity || 1).toString();
      
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
      metadata,
    };

    if (couponId) {
      paymentIntentParams.metadata.coupon_code = couponId;
    }

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
