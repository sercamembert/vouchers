import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "PLN",
      payment_method_types: ["p24"],
    });

    const voucherCode = uuidv4();

    return new NextResponse(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        voucherCode,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
