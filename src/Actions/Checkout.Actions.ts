"use server";

import { checkOutSchemaType } from "@/schemas/Schemas";
import { getMytoken } from "@/utilits";

export async function checkoutPay(
  id: string,
  url: string = process.env.NEXTAUTH_URL!,
  shippingAddress: checkOutSchemaType,
) {
  try {
    const token = await getMytoken();

    if (!token) {
      throw new Error("Please مش عارف لإيه بس please ");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "content-type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: shippingAddress }),
      },
    );

    const data = await res.json();

    return data;
  } catch (err) {
    return err;
  }
}
export async function onSitePay(
  id: string,
  shippingAddress: checkOutSchemaType,
) {
  try {
    const token = await getMytoken();

    if (!token) {
      throw new Error("Please مش عارف لإيه بس please ");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/${id}`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "content-type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: shippingAddress }),
      },
    );

    const data = await res.json();

    return data;
  } catch (err) {
    return err;
  }
}

export async function myOrders(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    );

    if (!res.ok) {
      throw new Error("Something happen please check later!");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
