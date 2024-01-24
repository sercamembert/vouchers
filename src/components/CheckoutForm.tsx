"use client";
import React, { FormEvent } from "react";
import {
  useStripe,
  useElements,
  P24BankElement,
} from "@stripe/react-stripe-js";

import P24BankSection from "./P24BankSection";
import axios from "axios";
interface Props {}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const p24Bank = elements.getElement(P24BankElement);

    // For brevity, this example is using uncontrolled components for
    // the accountholder's name. In a real world app you will
    // probably want to use controlled components.
    // https://reactjs.org/docs/uncontrolled-components.html
    // https://reactjs.org/docs/forms.html#controlled-components
    if (!p24Bank) {
      // Handle the case where P24BankElement is not available.
      return;
    }
    const accountholderName = (event.target as HTMLFormElement)[
      "accountholder-name"
    ];

    const { data } = await axios.post("/api/create-paymnet-intent", {
      data: { amount: 89 },
    });
    const clientSecret = data.clientSecret;
    const voucherCode = data.voucherCode;

    const { error } = await stripe.confirmP24Payment(clientSecret, {
      payment_method: {
        p24: p24Bank,
        billing_details: {
          name: accountholderName.value,
          email: "polidkamil@gmail.com",
        },
      },
      payment_method_options: {
        p24: {
          // In order to be able to pass the `tos_shown_and_accepted` parameter, you must
          // ensure that the P24 regulations and information obligation consent
          // text is clearly in the view of the customer. See
          // stripe.com/docs/payments/p24/accept-a-payment#requirements
          // for directions.
          tos_shown_and_accepted: true,
        },
      },
      return_url: `http://localhost:3000/succes/${voucherCode}`,
    });

    if (error) {
      // Show error to your customer.
      console.log(error.message);
    }

    // Otherwise the customer will be redirected away from your
    // page to complete the payment with their bank.
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Name
          <input name="accountholder-name" placeholder="Jenny Rosen" required />
        </label>
      </div>
      <div className="form-row">
        <P24BankSection />
      </div>
      <button type="submit" disabled={!stripe} className="disabled:opacity-30">
        Submit Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
