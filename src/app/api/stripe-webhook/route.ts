// app/api/stripe-webhook/route.ts

import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/app/email/OrderConfirmationEmail"; 
// ⬆️ adjust this import if your file is in another folder

// Make sure this runs on Node, not edge (Stripe needs Node APIs)
export const runtime = "nodejs";

// ----- Stripe & Resend setup -----

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment");
}
if (!stripeWebhookSecret) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET in environment");
}
if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY in environment");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-08-27.basil",
});

const resend = new Resend(resendApiKey);

// ----- Webhook handler -----

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("❌ Missing stripe-signature header");
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const rawBody = await req.arrayBuffer();
  let event: Stripe.Event;

  // 1) Verify signature
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      stripeWebhookSecret!
    );
  } catch (err: any) {
    console.error("❌ Error verifying Stripe webhook signature", err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("✅ Stripe webhook received:", event.type);

  // 2) Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Fetch full session with line items
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });

      const lineItems = fullSession.line_items?.data ?? [];

      const items = lineItems.map((item) => ({
        name: item.description ?? "Unknown Item",
        quantity: item.quantity ?? 1,
        // amount_total is the total for that line (unit * qty)
        price:
          (item.amount_total ??
            item.price?.unit_amount ??
            0) / 100, // convert from øre/cent to NOK
      }));

      const total = (fullSession.amount_total ?? 0) / 100;
      const email = fullSession.customer_details?.email || "";
      const name = fullSession.customer_details?.name || "Customer";
      const orderId =
        fullSession.metadata?.orderId || fullSession.id || "Unknown";

      console.log("📦 Order data:", {
        orderId,
        email,
        name,
        total,
        itemsCount: items.length,
      });

      if (!email) {
        console.warn("⚠️ No customer email on session, skipping email send.");
      } else {
        // 3) Send email via Resend
        const result = await resend.emails.send({
          // For testing: use Resend's default sender
          from: "onboarding@resend.dev",
          to: email,
          subject: `Order Confirmation #${orderId}`,
          react: OrderConfirmationEmail({
            orderId,
            customerName: name,
            items,
            total,
          }),
        });

        console.log("📨 Resend response:", result);
      }
    } catch (err) {
      console.error("❌ Error handling checkout.session.completed", err);
      // 500 so you see the error clearly in Stripe webhook logs while testing
      return new Response("Webhook handler failed", { status: 500 });
    }
  }

  // 3) Always respond 200 if no error
  return new Response("OK", { status: 200 });
}
