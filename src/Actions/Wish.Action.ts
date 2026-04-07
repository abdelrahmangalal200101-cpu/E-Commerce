"use server";

import { getMytoken } from "@/utilits";

export async function addWishItem(id: string) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("Login First Please");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const data = await res.json();
  return data;
}

export async function delWishItem(id: string) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("Login First Please");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}


export async function getLoggedWish() {
  const token = await getMytoken();

  if (!token) {
    throw new Error("Login First Please");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
