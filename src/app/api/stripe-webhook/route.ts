import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

// ✅ Initialize Stripe & Resend with environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

// ✅ Main webhook endpoint
export async function POST(req: NextRequest) {
  console.log("🔥 WEBHOOK CALLED - Starting processing...");
  
  const sig = req.headers.get("stripe-signature");
  console.log("🔍 Signature present:", !!sig);

  if (!sig) {
    console.error("❌ Missing stripe-signature header");
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const buf = await req.arrayBuffer();
  let event: Stripe.Event;

  // ✅ Verify Stripe webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("✅ Signature verified successfully");
  } catch (err: any) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("✅ Stripe webhook received:", event.type);
  console.log("📋 Event object type:", event.data.object);
  
  // 🔍 Log ALL events to see what we're getting
  console.log("🎯 Processing event type:", event.type);
  
  // ✅ Handle payment success
  if (event.type === "payment_intent.succeeded") {
    console.log("💫 Payment succeeded, processing...");
    
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    console.log("📊 Payment data:", {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status
    });

    try {
      const total = (paymentIntent.amount ?? 0) / 100;
      const email = paymentIntent.receipt_email;
      const name = paymentIntent.shipping?.name ?? "Customer";
      const orderId = paymentIntent.id;

      console.log("📧 Email details:", { email, name, orderId, total });

      if (!email) {
        console.warn("⚠️ No customer email found, skipping email send");
        return new Response("OK", { status: 200 });
      }

      console.log("🚀 Sending confirmation email...");
      
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Payment Confirmation`,
        text: `Thank you ${name}! Your payment of ${total.toFixed(2)} NOK has been confirmed.`,
      });

      if (error) {
        console.error("❌ Resend returned error:", error);
        return new Response("Resend error", { status: 500 });
      }

      console.log("📨 Email sent successfully:", data);
    } catch (err) {
      console.error("❌ Error processing payment:", err);
      return new Response("Webhook processing error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
