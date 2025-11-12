import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    });

    const { couponCode } = await req.json();
    console.log('Validating coupon code:', couponCode);

    if (!couponCode) {
      return NextResponse.json({ error: 'Kupongkode er påkrevd', valid: false }, { status: 400 });
    }

    try {
      const promoCodes = await stripe.promotionCodes.list({ code: couponCode, limit: 1 });
      
      if (promoCodes.data.length > 0) {
        const promoCode = promoCodes.data[0];
        
        if (!promoCode.active) {
          return NextResponse.json({ error: 'Kupongkoden er utløpt', valid: false }, { status: 400 });
        }

        const coupon = promoCode.coupon;

        return NextResponse.json({
          valid: true,
          coupon: {
            id: promoCode.id,
            name: coupon.name || promoCode.code,
            percent_off: coupon.percent_off,
            amount_off: coupon.amount_off,
            currency: coupon.currency,
          },
        });
      }
    } catch (promoError: any) {
      console.error('Promo code lookup error:', promoError);
    }

    try {
      const promoCode = await stripe.promotionCodes.retrieve(couponCode);
      
      if (!promoCode || !promoCode.active) {
        return NextResponse.json({ error: 'Ugyldig eller utløpt kupongkode', valid: false }, { status: 400 });
      }

      const coupon = promoCode.coupon;

      return NextResponse.json({
        valid: true,
        coupon: {
          id: promoCode.id,
          name: coupon.name || promoCode.code,
          percent_off: coupon.percent_off,
          amount_off: coupon.amount_off,
          currency: coupon.currency,
        },
      });
    } catch (promoError: any) {
      console.error('Promo code retrieve error:', promoError);
    }

    try {
      const coupon = await stripe.coupons.retrieve(couponCode);
      
      if (!coupon || !coupon.valid) {
        return NextResponse.json({ error: 'Ugyldig eller utløpt kupongkode', valid: false }, { status: 400 });
      }

      return NextResponse.json({
        valid: true,
        coupon: {
          id: coupon.id,
          name: coupon.name,
          percent_off: coupon.percent_off,
          amount_off: coupon.amount_off,
          currency: coupon.currency,
        },
      });
    } catch (couponError: any) {
      console.error('Coupon retrieve error:', couponError);
      const errorMessage = process.env.NODE_ENV === 'production' 
        ? 'Kupongkoden finnes ikke. Vennligst kontakt support hvis du mener dette er en feil.'
        : 'Ugyldig kupongkode';
      return NextResponse.json({ error: errorMessage, valid: false }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Coupon validation error:', error);
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Kunne ikke validere kupongkode. Vennligst prøv igjen senere.'
      : 'Ugyldig kupongkode';
    return NextResponse.json({ error: errorMessage, valid: false }, { status: 400 });
  }
}
