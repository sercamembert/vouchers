"use client";
import React from "react";
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
  return status === "succeeded" ? (
    <div>Succes: {voucherCode}</div>
  ) : (
    <div>Payment failed</div>
  );
};

export default Page;
