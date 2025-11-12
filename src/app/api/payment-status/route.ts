import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const payment_intent = searchParams.get('payment_intent');

  if (!payment_intent) {
    return NextResponse.json({ error: 'Missing payment_intent param' }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });

  try {
    const intent = await stripe.paymentIntents.retrieve(payment_intent, {
      expand: ['latest_charge'],
    });

    return NextResponse.json(intent);
  } catch (error: any) {
    console.error('Payment status error:', error);
    
    if (error.code === 'resource_missing') {
      return NextResponse.json({ 
        error: 'Payment not found. This usually means you are using test mode keys but the payment was made in live mode (or vice versa). Please check your Stripe dashboard and ensure your keys match the payment mode.' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
