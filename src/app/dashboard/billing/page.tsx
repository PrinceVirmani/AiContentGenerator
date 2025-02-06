"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

function Billing() {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  useEffect(() => {
    // Dynamically load Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const CreateSubscription = async () => {
    try {
      setLoading(true);
      const resp = await axios.post("/api/create-subscription");
      console.log("Subscription Created:", resp.data);
      OnPayment(resp.data.id);
    } catch (error) {
      console.error("Error creating subscription:", error);
      setLoading(false);
    }
  };

  const OnPayment = (subId: string) => {
    if (!razorpayLoaded) {
      console.error("Razorpay not loaded yet.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public key
      subscription_id: subId,
      name: "Prince Project",
      description: "Monthly subscription",
      handler: async (resp: any) => {
        console.log("Payment Successful:", resp);
        if (resp?.razorpay_payment_id) {
          await saveSubscription(resp.razorpay_payment_id);
        }
        setLoading(false);
      },
      theme: { color: "#3399cc" },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const saveSubscription = async (paymentId: string) => {
    try {
      const result = await db
        .insert(UserSubscription)
        .values([
          {
            email: user?.primaryEmailAddress?.emailAddress || "",
            username: user?.fullName || "Anonymous", // Fixed field
            active: true,
            paymentId: paymentId,
            joinDate: moment().format("YYYY-MM-DD"), // ISO format
          },
        ])
        .returning(); // Returning inserted data for debugging

      console.log("Inserted Subscription:", result);
      if (result.length > 0) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 mt-52">
      <div className="w-60 h-60 bg-gray-500 flex justify-center items-center border rounded-lg">
        Current Plan - Free
      </div>
      <div className="w-60 h-60 bg-gray-500 flex justify-center items-center border rounded-lg">
        <Button
          className=" text-center"
          onClick={CreateSubscription}
          disabled={loading}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          {userSubscription ? "Current Plan" : "Subscribe"}
        </Button>
      </div>
    </div>
  );
}

export default Billing;
