"use server";
import { RegisterSchemaType } from "@/schemas/Schemas";
import { getMytoken } from "@/utilits";

export async function regSignUp(data: RegisterSchemaType) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const result = await res.json();

    return res.ok;
  } catch (err) {
    return null;
  }
}

export async function updateUserInfo({
  curPass,
  pass,
  rePass,
}: {
  curPass: string;
  pass: string;
  rePass: string;
}) {
  const token = await getMytoken();

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: curPass,
        password: pass,
        rePassword: rePass,
      }),
    },
  );

  const data = await res.json();

  return data;
}
export async function updateUserData({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: number;
}) {
  const token = await getMytoken();

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
    {
      method: "PUT",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: name,
        password: email,
        rePassword: phone,
      }),
    },
  );

  const data = await res.json();

  return data;
}

export async function forgetPassword(email: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  const data = await res.json();
  return data;
}

export async function verifyResetPassword(rsCode: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      body: JSON.stringify({ resetCode: rsCode }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  return data;
}

export async function resetPassword({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      body: JSON.stringify({ email: email, newPassword: newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  return data;
}
