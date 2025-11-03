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
      // ✅ Build the email content
      const emailBody = `
        ✅ New Stripe Payment Successful!

        Customer: ${session.customer_details?.name}
        Email: ${session.customer_details?.email}
        Amount: ${(session.amount_total ?? 0) / 100} NOK
        Session ID: ${session.id}
        Payment Mode: ${session.mode || 'payment'}
      `;

      // ✅ Send simple test email
      const { data, error } = await resend.emails.send({
        from: "Jobobike <onboarding@resend.dev>", // works without any domain setup
        to: ["kashankhalid429@gmail.com"], // ✅ your email for testing
        subject: `✅ New Stripe Payment (${session.id})`,
        text: emailBody,
      });

      if (error) {
        console.error("❌ Resend returned error:", error);
        return new Response("Resend error", { status: 500 });
      }

      console.log("📨 Resend email sent successfully:", data);
    } catch (err) {
      console.error("❌ Error sending Resend email:", err);
      return new Response("Webhook email error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
