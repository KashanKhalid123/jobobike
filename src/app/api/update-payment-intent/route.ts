import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    });

    const body = await request.json();
    const { paymentIntentId, items = [], couponData = null } = body;

    const subtotal = items.reduce((sum: number, item: any) => {
      const price = item.price ? Math.round(item.price * 100) : 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);

    let amount = subtotal;

    if (couponData) {
      if (couponData.percent_off) {
        const discount = Math.round((subtotal * couponData.percent_off) / 100);
        amount = subtotal - discount;
      } else if (couponData.amount_off) {
        amount = subtotal - couponData.amount_off;
      }
    }

    if (paymentIntentId) {
      const updatedIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: amount,
        metadata: {
          coupon_applied: couponData ? 'true' : 'false',
          coupon_id: couponData?.id || '',
          original_amount: subtotal.toString(),
          discount_amount: (subtotal - amount).toString(),
        },
      });
      return NextResponse.json({ success: true, amount });
    }

    return NextResponse.json({ error: 'No payment intent ID provided' }, { status: 400 });
  } catch (error: any) {
    console.error('Update payment intent error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
