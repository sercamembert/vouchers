"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useStripe,
  useElements,
  P24BankElement,
} from "@stripe/react-stripe-js";
import P24BankSection from "./P24BankSection";
import axios from "axios";
import schema, { CheckoutType } from "@/lib/resolvers/Checkout";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CheckoutType> = async (formData) => {
    if (!stripe || !elements) {
      return;
    }

    const p24Bank = elements.getElement(P24BankElement);

    if (!p24Bank) {
      return;
    }

    localStorage.setItem("checkoutFormData", JSON.stringify(formData));

    const { data } = await axios.post("/api/create-paymnet-intent", {
      data: { amount: formData.price },
    });
    const clientSecret = data.clientSecret;
    const voucherCode = data.voucherCode;

    const { error } = await stripe.confirmP24Payment(clientSecret, {
      payment_method: {
        p24: p24Bank,
        billing_details: {
          name: formData.buyerFullName,
          email: formData.email,
        },
      },
      payment_method_options: {
        p24: {
          tos_shown_and_accepted: true,
        },
      },
      return_url: `http://localhost:3000/succes/${voucherCode}`,
    });

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <label>
          Cena vouchera
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            required
          />
          {errors.price && <span>{errors.price.message}</span>}
        </label>
      </div>
      <div className="form-row">
        <label>
          Imię i Nazwisko Kupującego
          <input type="text" {...register("buyerFullName")} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Imię i Nazwisko Odbiorcy
          <input type="text" {...register("receiverFullName")} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Adres email
          <input type="email" {...register("email")} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Numer telefonu
          <input type="tel" {...register("phone")} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Ulica
          <input type="text" {...register("street")} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Numer ulicy
          <input type="text" {...register("streetNumber")} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Kod pocztowy
          <input type="text" {...register("zipCode")} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Miasto
          <input type="text" {...register("city")} required />
        </label>
      </div>

      <P24BankSection />
      <button type="submit" disabled={!stripe} className="disabled:opacity-30">
        Zatwierdź płatność
      </button>
    </form>
  );
};

export default CheckoutForm;
