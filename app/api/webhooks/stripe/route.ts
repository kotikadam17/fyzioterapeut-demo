import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};

    const clerkUserId = metadata.clerk_user_id;
    const productName = metadata.product_name ?? session.metadata?.product_name ?? "Nezadáno";
    const productType = (metadata.product_type ?? "fyzioterapie") as "fyzioterapie" | "rehab" | "program";
    const amountTotal = (session.amount_total ?? 0) / 100;

    if (clerkUserId) {
      const sb = getSupabaseAdmin();
      const { data: client } = await sb
        .from("clients")
        .select("id")
        .eq("user_id", clerkUserId)
        .single();

      if (client) {
        await sb.from("purchases").insert({
          client_id: client.id,
          product_name: productName,
          type: productType,
          price: amountTotal,
          date: new Date().toISOString().split("T")[0],
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
