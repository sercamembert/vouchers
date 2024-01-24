"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { gql, useLazyQuery } from "@apollo/client";
interface Props {}

interface Product {
  id: string;
  name: string;
  type: string;
  params: {
    widthMax: number;
    lengthMax: number;
    heightMax: number;
    weightSales: number;
  };
}

interface ProductData {
  products: Product[];
}

const GET_PRODUCTS = gql`
  query {
    products(packageType: TYPE_LETTER) {
      id
      name
      type
      params {
        widthMax
        lengthMax
        heightMax
        weightSales
      }
    }
  }
`;

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

  const [getPackageDetail, { loading, error, data }] =
    useLazyQuery<ProductData>(GET_PRODUCTS);

  useEffect(() => {
    getPackageDetail();
  }, [getPackageDetail]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return status === "succeeded" ? (
    <div>
      Succes: {voucherCode}
      {formData && (
        <div>
          Form Data:
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
      {data && data.products && (
        <ul>
          {data.products.map((product: Product) => (
            <li key={product.id}>
              <p>Name: {product.name}</p>
              <p>Type: {product.type}</p>
              {/* Display other product details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div>Payment failed</div>
  );
};

export default Page;
