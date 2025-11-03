import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/app/email/OrderConfirmationEmail";

export const runtime = "nodejs";

// ✅ Initialize Stripe & Resend with environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

// ✅ Main webhook endpoint
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

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
  } catch (err: any) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("✅ Stripe webhook received:", event.type);

  // ✅ When payment succeeds
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("💰 Checkout completed:", session.id);

    try {
      // Get full session with line items
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });

      const lineItems = fullSession.line_items?.data ?? [];
      const items = lineItems.map((item) => ({
        name: item.description ?? "Unknown Item",
        quantity: item.quantity ?? 1,
        price: (item.amount_total ?? 0) / 100,
      }));

      const total = (fullSession.amount_total ?? 0) / 100;
      const email = fullSession.customer_details?.email;
      const name = fullSession.customer_details?.name ?? "Customer";
      const orderId = fullSession.id;

      if (!email) {
        console.warn("⚠️ No customer email found, skipping email send");
        return new Response("OK", { status: 200 });
      }

      // ✅ Send order confirmation email
      const { data, error } = await resend.emails.send({
        from: "JOBOBIKE <onboarding@resend.dev>",
        to: [email],
        subject: `Order Confirmation #${orderId}`,
        react: OrderConfirmationEmail({
          orderId,
          customerName: name,
          items,
          total,
        }),
      });

      if (error) {
        console.error("❌ Resend returned error:", error);
        return new Response("Resend error", { status: 500 });
      }

      console.log("📨 Order confirmation email sent successfully:", data);
    } catch (err) {
      console.error("❌ Error processing order:", err);
      return new Response("Webhook processing error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
