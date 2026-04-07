"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import cover from "../../../assets/LoginPic.png";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  FaShieldAlt,
  FaClock,
  FaTruck,
  FaGoogle,
  FaStar,
  FaUsers,
  FaLock,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { LoginSchema, LoginSchemaType } from "@/schemas/Schemas";
import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MdEmail, MdLock } from "react-icons/md";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function page() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { handleSubmit, control } = form;

  async function FormLoginSubmit(values: LoginSchemaType) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Succesfully Logged", {
        duration: 3000,
        position: "top-center",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast.error(response?.error, {
        duration: 3000,
        position: "top-center",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-32 py-8 lg:py-16 flex items-start justify-center">
      <div className="flex w-full flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="hidden lg:flex flex-1 flex-col gap-6">
          <div className="rounded-[16px] overflow-hidden w-full max-w-154 h-96 shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]">
            <img
              src={cover.src}
              alt="Register Cover"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-4">
            <h2 className="text-2xl xl:text-3xl font-bold text-[#1E2939]">
              FreshCart - Your One-Stop Shop for Fresh <br /> Products
            </h2>
            <p className="text-base xl:text-lg text-[#4A5565] font-medium">
              Join thousands of happy customers who trust FreshCart for their
              daily <br className="hidden xl:block" /> grocery needs
            </p>
            <div className="flex items-center gap-6 xl:gap-8">
              <div className="flex gap-2 items-center text-sm font-medium">
                <FaTruck className="text-homeGreen" />
                <span className="text-secondary">Free Delivery</span>
              </div>
              <div className="flex gap-2 items-center text-sm font-medium">
                <FaShieldAlt className="text-homeGreen" />
                <span className="text-secondary">Secure Payment</span>
              </div>
              <div className="flex gap-2 items-center text-sm font-medium">
                <FaClock className="text-homeGreen" />
                <span className="text-secondary">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right side (form) ── */}
        <form
          onSubmit={handleSubmit(FormLoginSubmit)}
          className="w-full lg:flex-1 max-w-md mx-auto lg:max-w-none px-5 sm:px-6 py-8 sm:py-10 flex flex-col gap-2 rounded-[16px] text-center shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]"
        >
          <h3 className="font-bold text-3xl">
            <span className="text-homeGreen">Fresh</span>
            <span className="text-Links">Cart</span>
          </h3>
          <h4 className="font-semibold text-2xl text-Links mt-1">
            Welcome Back!
          </h4>
          <p className="font-medium text-sm text-gray-500">
            Sign in to continue your fresh shopping experience
          </p>

          <div className="w-full py-6 sm:py-8 flex flex-col sm:flex-row gap-3 items-center">
            <button className="py-3 w-full cursor-pointer hover:bg-gray-100 transition-all duration-200 px-4 rounded-[12px] border border-[#D1D5DC] justify-center flex items-center gap-2">
              <FaGoogle className="text-[#E7000B] text-lg" />
              <span className="font-semibold text-base text-[#101828]">
                Google
              </span>
            </button>
            <button className="py-3 w-full cursor-pointer hover:bg-gray-100 transition-all duration-200 px-4 rounded-[12px] border border-[#D1D5DC] flex justify-center items-center gap-2">
              <FaFacebook className="text-[#155DFC] text-lg" />
              <span className="font-semibold text-base text-[#101828]">
                Facebook
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-0.5 rounded-full bg-[#D1D5DC4D]" />
            <p className="font-medium text-xs sm:text-sm text-Links whitespace-nowrap">
              OR CONTINUE WITH EMAIL
            </p>
            <div className="flex-1 h-0.5 rounded-full bg-[#D1D5DC4D]" />
          </div>

          <div className="flex flex-col gap-5 sm:gap-7 mt-2">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="email"
                    className="text-base font-medium text-Links"
                  >
                    Email Address*
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      className="py-6! px-3! pl-9! font-medium! text-base! placeholder:text-gray-400 rounded-[12px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                      placeholder="Enter your email"
                      autoComplete="off"
                    />
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-center">
                    <FieldLabel
                      htmlFor="pass"
                      className="text-base font-medium text-Links"
                    >
                      Password*
                    </FieldLabel>
                    <Link
                      href="/forgetpassword"
                      className="text-sm text-homeGreen hover:text-green-700 transition-all duration-200"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPass ? "text" : "password"}
                      id="pass"
                      aria-invalid={fieldState.invalid}
                      className="py-6! pl-9! pr-10! font-medium! text-base! placeholder:text-gray-400 rounded-[12px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200"
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="keep"
                className="w-4 h-4 rounded-[6px] accent-homeGreen"
              />
              <label
                htmlFor="keep"
                className="font-medium text-base text-Links"
              >
                Keep me signed in
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
                <p>Sign In</p>
              )}
            </button>

            <p className="text-base font-medium pt-6 sm:pt-10 border-t border-[#D1D5DC4D] text-Links">
              New to FreshCart?{" "}
              <Link
                className="text-homeGreen hover:text-green-700 cursor-pointer transition-all duration-200"
                href="/register"
              >
                Create an account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1">
                <FaLock className="text-sm text-secondary" />
                <p className="text-xs text-secondary">SSL Secured</p>
              </div>
              <div className="flex items-center gap-1">
                <FaUsers className="text-sm text-secondary" />
                <p className="text-xs text-secondary">50K+ Users</p>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-sm text-secondary" />
                <p className="text-xs text-secondary">4.9 Rating</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
