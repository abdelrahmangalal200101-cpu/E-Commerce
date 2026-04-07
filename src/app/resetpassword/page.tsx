"use client";
import cover from "../../assets/otherPics.svg";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FaShieldAlt,
  FaLock,
  FaStar,
  FaUsers,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/Actions/Auth.actions";

const ResetSchema = z.object({
  email: z.string().email("Enter a valid email"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});
type ResetSchemaType = z.infer<typeof ResetSchema>;

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { icon: <MdEmail className="text-base" />, label: "Email" },
    { icon: <FaLock className="text-sm" />, label: "Verify" },
    { icon: <FaShieldAlt className="text-sm" />, label: "Reset" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 w-full mb-6">
      {steps.map((s, i) => {
        const idx = i + 1;
        const done = idx < step;
        const active = idx === step;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${done || active ? "bg-homeGreen text-white shadow-md" : "bg-[#F3F4F6] text-[#9CA3AF]"}`}
              >
                {s.icon}
              </div>
              <span
                className={`text-[10px] font-medium ${done || active ? "text-homeGreen" : "text-[#9CA3AF]"}`}
              >
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`h-0.5 w-12 sm:w-16 mb-4 transition-all duration-300 ${done ? "bg-homeGreen" : "bg-[#E5E7EB]"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function ResetPasswordPage() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
  });

  async function onSubmit(values: ResetSchemaType) {
    setIsLoading(true);
    const data = await resetPassword({
      email: values.email,
      newPassword: values.newPassword,
    });

    if (data.token) {
      toast.success("Password reset successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setTimeout(() => router.push("/login"), 1500);
    } else {
      toast.error(data.message || "Something went wrong", {
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
          <div className="rounded-[16px] overflow-hidden w-full max-w-154 h-96">
            <img
              src={cover.src}
              alt="Reset Password"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-4">
            <h2 className="text-2xl xl:text-3xl font-bold text-[#1E2939]">
              Create a New Password
            </h2>
            <p className="text-base xl:text-lg text-[#4A5565] font-medium">
              Choose a strong password to keep your account safe{" "}
              <br className="hidden xl:block" /> and secure.
            </p>
            <div className="flex items-center gap-6 xl:gap-8">
              <div className="flex gap-2 items-center text-sm font-medium">
                <FaLock className="text-homeGreen" />
                <span className="text-secondary">Strong Password</span>
              </div>
              <div className="flex gap-2 items-center text-sm font-medium">
                <FaShieldAlt className="text-homeGreen" />
                <span className="text-secondary">Secure Reset</span>
              </div>
              <div className="flex gap-2 items-center text-sm font-medium">
                <MdEmail className="text-homeGreen" />
                <span className="text-secondary">Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:flex-1 max-w-md mx-auto lg:max-w-none px-5 sm:px-6 py-8 sm:py-10 flex flex-col gap-2 rounded-[16px] text-center shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]"
        >
          <h3 className="font-bold text-3xl">
            <span className="text-homeGreen">Fresh</span>
            <span className="text-Links">Cart</span>
          </h3>
          <h4 className="font-semibold text-2xl text-Links mt-1">
            Reset Password
          </h4>
          <p className="font-medium text-sm text-gray-500 mb-4">
            Enter your email and new password below
          </p>

          <ProgressBar step={3} />

          <div className="flex flex-col gap-5 sm:gap-7 mt-2">
            {/* Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel
                htmlFor="email"
                className="text-base font-medium text-Links text-left"
              >
                Email
              </FieldLabel>
              <div className="relative">
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  aria-invalid={!!errors.email}
                  className="py-6! px-3! pl-9! font-medium! text-base! placeholder:text-gray-400 rounded-[12px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {errors.email && <FieldError errors={[errors.email]} />}
            </Field>

            {/* New Password */}
            <Field data-invalid={!!errors.newPassword}>
              <FieldLabel
                htmlFor="newPassword"
                className="text-base font-medium text-Links text-left"
              >
                New Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...register("newPassword")}
                  id="newPassword"
                  type={showPass ? "text" : "password"}
                  aria-invalid={!!errors.newPassword}
                  className="py-6! px-3! pl-9! pr-10! font-medium! text-base! placeholder:text-gray-400 rounded-[12px]! border! border-[#99A1AF]/40! focus-visible:ring-0 focus:border-homeGreen!"
                  placeholder="Enter new password"
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
              {errors.newPassword && (
                <FieldError errors={[errors.newPassword]} />
              )}
            </Field>

            <button
              type="submit"
              disabled={isLoading}
              className="py-2.5 bg-homeGreen w-full cursor-pointer flex items-center justify-center gap-2.5 rounded-[8px] text-base font-semibold text-white transition-all duration-200 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Resetting...</span>
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </button>

            <p className="text-base font-medium pt-6 sm:pt-10 border-t border-[#D1D5DC4D] text-Links">
              Remember your password?{" "}
              <Link
                className="text-homeGreen hover:text-green-700 cursor-pointer transition-all duration-200"
                href="/login"
              >
                Sign In
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
