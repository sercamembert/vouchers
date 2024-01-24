"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
interface Props {}

const Providers = ({ children }: { children: React.ReactNode }) => {
  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY as string);

  return (
    <ApolloProvider client={client}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </ApolloProvider>
  );
};

export default Providers;
