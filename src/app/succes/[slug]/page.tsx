"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
interface Props {}

const Page = ({
  params,
}: {
  params: { slug: string; redirect_status: string };
}) => {
  const searchParams = useSearchParams();
  const voucherCode = params.slug;
  const status = searchParams.get("redirect_status");

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const savedFormData = localStorage.getItem("checkoutFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
      localStorage.removeItem("checkoutFormData");
    }
  }, []);

  return status === "succeeded" ? (
    <div>
      Succes: {voucherCode}
      {formData && (
        <div>
          Form Data:
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  ) : (
    <div>Payment failed</div>
  );
};

export default Page;
