"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
interface Props {}

const Providers = ({ children }: { children: React.ReactNode }) => {
  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY as string);
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default Providers;
