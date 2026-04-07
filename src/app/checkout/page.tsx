"use client";

type Address = {
  city: string;
  name: string;
  phone: number;
  _id: string;
};

export type CartItem = {
  _id: string;
  count: number;
  price: number;
  product: {
    title: string;
    imageCover: string;
  };
};

export type Cart = {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

import { getLoggedAdd } from "@/Actions/Address.Actions";
import { useContext, useEffect, useState } from "react";
import { FiPhone, FiShoppingBag } from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { BsBookmarkFill, BsBuilding, BsShieldLockFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { MdLocationOn, MdLocalShipping } from "react-icons/md";
import { RiCheckLine, RiRefundLine } from "react-icons/ri";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkOutSchema, checkOutSchemaType } from "@/schemas/Schemas";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getCartItems } from "@/Actions/Cart.Actions";
import Image from "next/image";
import { checkoutPay, onSitePay } from "@/Actions/Checkout.Actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NumOfItems } from "@/Context/NumCartItemProvider";

export default function Page() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">(
    "online",
  );
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { itemsOfCart, setItemOfCart } = useContext(NumOfItems);

  const form = useForm({
    defaultValues: { details: "", phone: "", city: "", postalCode: "" },
    resolver: zodResolver(checkOutSchema),
  });

  async function onSubmit(values: checkOutSchemaType) {
    setSubmitting(true);
    try {
      if (paymentMethod === "online") {
        const res = await checkoutPay(cart?._id!, "", values);
        if (res?.session?.url) window.location.href = res.session.url;
      } else {
        const res = await onSitePay(cart?._id!, values);
        if (res.status === "success") {
          toast.success("Order placed successfully 🎉", {
            position: "top-center",
          });
          setTimeout(() => router.push(`/allorders`), 1500);
          setItemOfCart(0);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function getUserAddresses() {
    const res = await getLoggedAdd();
    setAddresses(res.data);
    if (res.data?.length > 0) setSelected(res.data[0]._id);
    setLoading(false);
  }

  async function getUserCart() {
    const res = await getCartItems();
    setCart(res.data);
  }

  useEffect(() => {
    getUserAddresses();
    getUserCart();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-[#F9FAFB] min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 sm:mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-gray-600 transition-colors">
          Cart
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Checkout</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-green-600 rounded-lg p-2.5 sm:p-3 shrink-0">
          <FiShoppingBag className="text-white text-xl sm:text-2xl" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Complete Your Order
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Review your items and complete your purchase
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-5 items-start">
        {/* ── Left Column ── */}
        <div className="flex flex-col gap-5">
          {/* Shipping Address Card */}
          <div
            className="bg-white rounded-xl overflow-hidden"
            style={{
              borderTop: "1px solid #F3F4F6",
              boxShadow:
                "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
            }}
          >
            <div
              className="px-5 sm:px-6 py-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(90deg, #16A34A 0%, #15803D 100%)",
              }}
            >
              <HiHome className="text-white text-xl shrink-0" />
              <div>
                <h2 className="text-white font-semibold text-sm sm:text-base">
                  Shipping Address
                </h2>
                <p className="text-green-100 text-xs sm:text-sm">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-5">
              <div className="flex items-center gap-2 mb-1">
                <BsBookmarkFill className="text-green-600" size={13} />
                <h3 className="font-semibold text-gray-800 text-sm">
                  Saved Addresses
                </h3>
              </div>
              <p className="text-gray-400 text-xs mb-5">
                Select a saved address or enter a new one below
              </p>

              {loading ? (
                <div className="space-y-3 mb-5">
                  <div className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                  <div className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm mb-5">
                  No saved addresses found.
                </div>
              ) : (
                <div className="mb-5 space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      onClick={() => setSelected(address._id)}
                      className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                        selected === address._id
                          ? "border-green-500 bg-green-50 ring-1 ring-green-400"
                          : "border-gray-200 bg-white hover:border-green-300"
                      }`}
                      style={{
                        boxShadow:
                          "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
                      }}
                    >
                      <MdLocationOn
                        className={`mt-0.5 shrink-0 ${selected === address._id ? "text-green-600" : "text-gray-400"}`}
                        size={18}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {address.name}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {address.city}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiPhone size={11} />
                            {address.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <BsBuilding size={11} />
                            {address.city}
                          </span>
                        </div>
                      </div>
                      {selected === address._id && (
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0 self-start mt-0.5">
                          Active
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Info Banner */}
              <div className="flex items-start gap-2 bg-[#EFF6FF] rounded-xl px-4 py-3 mb-6">
                <div className="mt-0.5 text-blue-500 shrink-0">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-700 font-semibold text-sm">
                    Delivery Information
                  </p>
                  <p className="text-blue-500 text-xs">
                    Please ensure your address is accurate for smooth delivery
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                id="checkout-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-5"
              >
                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        City <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <BsBuilding
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={14}
                        />
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          autoComplete="off"
                          className="pl-9 pr-4 py-5 rounded-md border border-gray-200 focus:border-green-400! focus:outline-none! focus:ring-0! shadow-none! w-full text-sm"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="details"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Street Address <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <MdLocationOn
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={15}
                        />
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Street name, building number, floor, apartment..."
                          autoComplete="off"
                          className="pl-9 pr-4 py-5 rounded-md border border-gray-200 focus:border-green-400! focus:outline-none! focus:ring-0! shadow-none! w-full text-sm"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Phone Number <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <FiPhone
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={14}
                        />
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="01xxxxxxxxx"
                          autoComplete="off"
                          className="pl-9 pr-4 py-5 rounded-md border border-gray-200 focus:border-green-400! focus:outline-none! focus:ring-0! shadow-none! w-full text-sm"
                        />
                      </div>
                      <FieldDescription>Egyptian numbers only</FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="postalCode"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                      <div className="relative">
                        <BsBookmarkFill
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={12}
                        />
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 11511"
                          autoComplete="off"
                          className="pl-9 pr-4 py-5 rounded-md border border-gray-200 focus:border-green-400! focus:outline-none! focus:ring-0! shadow-none! w-full text-sm"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </form>
            </div>
          </div>

          {/* Payment Method Card */}
          <div
            className="bg-white rounded-xl overflow-hidden"
            style={{
              borderTop: "1px solid #F3F4F6",
              boxShadow:
                "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
            }}
          >
            <div
              className="px-5 sm:px-6 py-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(90deg, #16A34A 0%, #15803D 100%)",
              }}
            >
              <FaCreditCard className="text-white shrink-0" size={18} />
              <div>
                <h2 className="text-white font-semibold text-sm sm:text-base">
                  Payment Method
                </h2>
                <p className="text-green-100 text-xs sm:text-sm">
                  Choose how you'd like to pay
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-5 space-y-3">
              {/* Cash */}
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "cash"
                    ? "border-green-500 bg-green-50 ring-1 ring-green-400"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                <div
                  className={`${paymentMethod === "cash" ? "bg-green-600" : "bg-gray-100"} rounded-lg p-2 sm:p-2.5 shrink-0`}
                >
                  <FaMoneyBill
                    className={`${paymentMethod === "cash" ? "text-white" : "text-gray-400"}`}
                    size={18}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">
                    Cash on Delivery
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
                {paymentMethod === "cash" ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                    <RiCheckLine className="text-white" size={13} />
                  </div>
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shrink-0" />
                )}
              </div>

              {/* Online */}
              <div
                onClick={() => setPaymentMethod("online")}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "online"
                    ? "border-green-500 bg-green-50 ring-1 ring-green-400"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                <div
                  className={`${paymentMethod === "online" ? "bg-green-600" : "bg-gray-100"} rounded-lg p-2 sm:p-2.5 shrink-0`}
                >
                  <FaCreditCard
                    className={`${paymentMethod === "online" ? "text-white" : "text-gray-400"}`}
                    size={18}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">
                    Pay Online
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Secure payment with Credit/Debit Card via Stripe
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      VISA
                    </span>
                    <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      MC
                    </span>
                    <span className="bg-blue-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      AMEX
                    </span>
                  </div>
                </div>
                {paymentMethod === "online" ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                    <RiCheckLine className="text-white" size={13} />
                  </div>
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shrink-0" />
                )}
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <BsShieldLockFill
                  className="text-green-600 shrink-0"
                  size={16}
                />
                <div>
                  <p className="text-gray-700 font-semibold text-sm">
                    Secure & Encrypted
                  </p>
                  <p className="text-green-600 text-xs">
                    Your payment info is protected with 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Order Summary ── */}
        {cart && (
          <div
            className="bg-white rounded-xl overflow-hidden lg:sticky lg:top-5"
            style={{
              borderTop: "1px solid #F3F4F6",
              boxShadow:
                "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
            }}
          >
            <div
              className="px-5 sm:px-6 py-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(90deg, #16A34A 0%, #15803D 100%)",
              }}
            >
              <FiShoppingBag className="text-white text-xl shrink-0" />
              <div>
                <h2 className="text-white font-semibold text-sm sm:text-base">
                  Order Summary
                </h2>
                <p className="text-green-100 text-xs sm:text-sm">
                  {cart.products.length} items
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-5">
              {/* Products */}
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                {cart.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {item.product.imageCover ? (
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-xs truncate">
                        {item.product.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {item.count} × {item.price} EGP
                      </p>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm shrink-0">
                      {item.count * item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-2 py-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-700 font-medium">
                    {cart.totalCartPrice} EGP
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    <MdLocalShipping size={14} /> Shipping
                  </span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-t border-gray-200">
                <span className="font-bold text-gray-900 text-base">Total</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-green-600 font-bold text-xl">
                    {cart.totalCartPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-xs">EGP</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-white font-semibold py-3 sm:py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiShoppingBag size={16} />
                    Place Order
                  </>
                )}
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 text-xs text-gray-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <BsShieldLockFill className="text-green-500" size={11} />{" "}
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <MdLocalShipping className="text-blue-500" size={12} /> Fast
                  Delivery
                </span>
                <span className="flex items-center gap-1">
                  <RiRefundLine className="text-orange-500" size={12} /> Easy
                  Returns
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
