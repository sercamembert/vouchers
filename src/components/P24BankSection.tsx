import React from "react";
import { P24BankElement } from "@stripe/react-stripe-js";

const P24_ELEMENT_OPTIONS = {
  style: {
    base: {
      padding: "10px 12px",
      color: "#32325d",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
  },
};
interface Props {}

const P24BankSection = () => {
  return (
    <label>
      P24 Bank
      <P24BankElement options={P24_ELEMENT_OPTIONS} />
    </label>
  );
};

export default P24BankSection;
