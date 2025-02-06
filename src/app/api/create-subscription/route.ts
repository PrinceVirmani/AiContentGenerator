// app/api/create-subscription/route.ts
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Ensure environment variables exist
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET_KEY || !process.env.SUBSCRIPTION_PLAN_ID) {
      return NextResponse.json({ error: "Missing Razorpay environment variables" }, { status: 500 });
    }

    // Initialize Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET_KEY!,
    });

    // Create subscription
    const result = await instance.subscriptions.create({
      plan_id: process.env.SUBSCRIPTION_PLAN_ID!,
      customer_notify: 1,
      quantity: 1,
      total_count: 1,
      addons: [],
      notes: { key1: "Note" },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
