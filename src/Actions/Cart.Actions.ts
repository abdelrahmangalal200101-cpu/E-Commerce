"use server";

import { CartResponse } from "@/types/Products";
import { getMytoken } from "../utilits";

export async function addCartApi(id: string) {
  try {
    const token = await getMytoken();

    if (!token) {
      throw new Error("Please sir Login First");
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "POST",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    return err;
  }
}

export async function getCartItems(): Promise<CartResponse> {
  const token = await getMytoken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}
export async function updateItemProduct(id: string, numItem: number) {
  const token = await getMytoken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "PUT",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    body: JSON.stringify({ count: numItem }),
  });

  const data = await res.json();

  return data;
}
export async function deleteItemProduct(id: string) {
  const token = await getMytoken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}
export async function deleteAllItems() {
  const token = await getMytoken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}
