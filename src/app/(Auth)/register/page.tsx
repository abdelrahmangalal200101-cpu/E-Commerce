"use client";
import React, { useState } from "react";
import {
  FaTruck,
  FaStar,
  FaShieldAlt,
  FaGoogle,
  FaUserPlus,
} from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import pic from "../../../assets/Registerpic.png";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/Schemas";
import { regSignUp } from "@/Actions/Auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function page() {
  const [isLoading, setLoading] = useState(false);

  const getStrength = (password: string) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;
    return score;
  };

  const strengthConfig = {
    0: { label: "", color: "#E5E7EB" },
    1: { label: "Weak", color: "#EF4444" },
    2: { label: "Fair", color: "#F97316" },
    3: { label: "Good", color: "#EAB308" },
    4: { label: "Strong", color: "#22C55E" },
  };

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const { handleSubmit, control } = form;

  async function FormSubmit(values: RegisterSchemaType) {
    setLoading(true);
    const isRegistered = await regSignUp(values);
    if (isRegistered) {
      toast.success("Succesfully Registered", {
        duration: 3000,
        position: "top-center",
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error("Something Wrong", {
        duration: 3000,
        position: "top-center",
      });
    }
    setLoading(false);
  }

  return (
    <div className="px-4 md:px-30 w-full py-10 flex justify-center items-center">
      <div className="p-4 w-full mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="font-bold text-4xl text-Links">
            Welcome to <span className="text-homeGreen">FreshCart</span>
          </h1>
          <p className="font-medium text-xl text-Links">
            Join thousands of happy customers who enjoy fresh groceries <br />
            delivered right to their doorstep.
          </p>
          <div className="flex flex-col pt-4 pb-6 gap-6">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full flex justify-center items-center bg-[#BBF7D0] shrink-0">
                <FaStar className="text-homeGreen text-xl" />
              </div>
              <div>
                <h5 className="text-lg font-semibold text-Links">
                  Premium Quality
                </h5>
                <p className="text-[#4A5565] text-base font-medium">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full flex justify-center items-center bg-[#BBF7D0] shrink-0">
                <FaTruck className="text-homeGreen text-xl" />
              </div>
              <div>
                <h5 className="text-lg font-semibold text-Links">
                  Fast Delivery
                </h5>
                <p className="text-[#4A5565] text-base font-medium">
                  Same-day delivery available in most areas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full flex justify-center items-center bg-[#BBF7D0] shrink-0">
                <FaShieldAlt className="text-homeGreen text-xl" />
              </div>
              <div>
                <h5 className="text-lg font-semibold text-Links">
                  Secure Shopping
                </h5>
                <p className="text-[#4A5565] text-base font-medium">
                  Your data and payments are completely secure
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col rounded-[6px] gap-4 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full">
                <img src={pic.src} alt="user pic" />
              </div>
              <div className="flex flex-col text-center">
                <h5 className="text-base font-medium text-Links">
                  Sarah Johnson
                </h5>
                <div className="flex items-center gap-1">
                  <FaStar className="text-[#FFDF20]" />
                  <FaStar className="text-[#FFDF20]" />
                  <FaStar className="text-[#FFDF20]" />
                  <FaStar className="text-[#FFDF20]" />
                  <FaStar className="text-[#FFDF20]" />
                </div>
              </div>
            </div>
            <p className="text-base text-[#4A5565] font-medium italic">
              "FreshCart has transformed my shopping experience. The quality of
              the <br /> products is outstanding, and the delivery is always on
              time. Highly <br /> recommend!"
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(FormSubmit)}
          className="flex-1 px-6 py-10 flex flex-col gap-2 rounded-[16px] text-center shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]"
        >
          <h3 className="font-semibold text-3xl text-Links">
            Create Your Account
          </h3>
          <p className="font-medium text-base text-Links">
            Start your fresh journey with us today
          </p>
          <div className="w-full py-8 flex gap-2 items-center">
            <button className="py-2 flex-1 cursor-pointer hover:bg-gray-100 transition-all duration-200 px-4 rounded-[8px] border border-[#D1D5DC] justify-center flex items-center gap-2">
              <FaGoogle className="text-[#E7000B] text-lg" />
              <span className="font-semibold text-base text-[#101828]">
                Google
              </span>
            </button>
            <button className="py-2 px-4 flex-1 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-[8px] border border-[#D1D5DC] flex justify-center items-center gap-2">
              <FaFacebook className="text-[#155DFC] text-lg" />
              <span className="font-semibold text-base text-[#101828]">
                Facebook
              </span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-0.5 rounded-full bg-[#D1D5DC4D]" />
            <p className="font-medium text-base text-Links">or</p>
            <div className="flex-1 h-0.5 rounded-full bg-[#D1D5DC4D]" />
          </div>
          <div className="flex flex-col gap-7">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="name"
                    className="text-base font-medium text-Links"
                  >
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    className="py-5! px-3! font-medium! text-base! placeholder:text-gray-400 rounded-[6px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                    placeholder="Ali"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="email"
                    className="text-base font-medium text-Links"
                  >
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    className="py-5! px-3! font-medium! text-base! placeholder:text-gray-400 rounded-[6px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                    placeholder="Ali@gmail.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex flex-col gap-8">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="pass"
                      className="text-base font-medium text-Links"
                    >
                      Password*
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="pass"
                      aria-invalid={fieldState.invalid}
                      className="py-5! px-3! font-medium! text-base! placeholder:text-gray-400 rounded-[6px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                      placeholder="Create Strong Password"
                      autoComplete="off"
                    />

                    {(() => {
                      const score = getStrength(field.value ?? "");
                      const { label, color } =
                        strengthConfig[score as keyof typeof strengthConfig];
                      return field.value ? (
                        <div className="flex flex-col gap-1.5 mt-2">
                          <div className="w-full h-1 rounded-[6px] bg-[#E5E7EB]">
                            <div
                              className="h-full rounded-[6px] transition-all duration-300"
                              style={{
                                width: `${(score / 4) * 100}%`,
                                background: color,
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-[12px] font-medium text-[#6A7282]">
                              Must be at least 8 characters with numbers and
                              symbols
                            </p>
                            <span
                              className="text-[14px] font-medium whitespace-nowrap ml-2"
                              style={{ color }}
                            >
                              {label}
                            </span>
                          </div>
                        </div>
                      ) : null;
                    })()}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="rePass"
                    className="text-base font-medium text-Links"
                  >
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="rePass"
                    aria-invalid={fieldState.invalid}
                    className="py-5! px-3! font-medium! text-base! placeholder:text-gray-400 rounded-[6px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                    placeholder="Confirm Your Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="phone"
                    className="text-base font-medium text-Links"
                  >
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    type="phone"
                    aria-invalid={fieldState.invalid}
                    className="py-5! px-3! font-medium! text-base! placeholder:text-gray-400 rounded-[6px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                    placeholder="+20 011 189 1293"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="check"
                className="w-4 h-4 rounded-[6px] accent-homeGreen"
              />
              <label
                htmlFor="check"
                className="font-medium text-base text-Links"
              >
                I agree to the
                <span className="text-homeGreen cursor-pointer hover:text-green-700 transition-all duration-200">
                  {" "}
                  Terms Of Service{" "}
                </span>
                and
                <span className="text-homeGreen cursor-pointer hover:text-green-700 transition-all duration-200">
                  {" "}
                  Privacy Policy*
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2.5 bg-homeGreen w-full cursor-pointer flex items-center justify-center gap-2.5 rounded-[8px] text-base font-semibold text-white transition-all duration-200 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading</span>
                </>
              ) : (
                <>
                  <FaUserPlus />
                  <p>Create My Account</p>
                </>
              )}
            </button>

            <p className="text-base font-medium pt-10 border-t border-[#D1D5DC4D] text-Links">
              Already have an account?{" "}
              <Link
                className="text-homeGreen hover:text-green-700 cursor-pointer transition-all duration-200"
                href={"/login"}
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
