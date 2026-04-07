"use server";

import { getMytoken } from "@/utilits";

interface userAdd {
  addname: string;
  addDetail: string;
  addPhone: number;
  addCity: string;
}

export async function AddAddress({
  addname,
  addDetail,
  addPhone,
  addCity,
}: userAdd) {
  const token = await getMytoken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
    method: "POST",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: addname,
      details: addDetail,
      phone: addPhone,
      city: addCity,
    }),
  });

  const data = await res.json();

  return data;
}
export async function getLoggedAdd() {
  const token = await getMytoken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}
export async function delAdd(id: string) {
  const token = await getMytoken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
    },
  );

  const data = await res.json();

  return data;
}
