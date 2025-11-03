import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("❌ Missing stripe-signature header");
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const buf = await req.arrayBuffer();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("✅ Stripe webhook received:", event.type);

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // 1️⃣ Log for visibility
      console.log("💰 Checkout completed:", session.id);

      // 2️⃣ Send yourself a simple test email via Resend
      const result = await resend.emails.send({
        from: "onboarding@resend.dev",          // works even without verified domain
        to: "kashankhalid429@gmail.com",        // 👈 your email
        subject: `New Stripe order received (${session.id})`,
        text: `✅ A new Stripe checkout session was completed.\n\nSession ID: ${session.id}\nCustomer email: ${session.customer_details?.email}\nAmount total: ${(session.amount_total ?? 0) / 100} NOK`,
      });

      console.log("📨 Resend result:", result);
    } catch (err) {
      console.error("❌ Failed to send email via Resend:", err);
      return new Response("Email send failed", { status: 500 });
    }
  }

  // Always acknowledge receipt
  return new Response("OK", { status: 200 });
}
