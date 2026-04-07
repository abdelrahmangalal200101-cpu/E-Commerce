"use client";

import {
  deleteAllItems,
  deleteItemProduct,
  getCartItems,
  updateItemProduct,
} from "@/Actions/Cart.Actions";
import { CartResponse } from "@/types/Products";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaTag,
  FaTrash,
} from "react-icons/fa";
import CartCard from "../_components/Shared/CartItems/CartCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NumOfItems } from "@/Context/NumCartItemProvider";

function CartCardSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl p-4 flex gap-4 animate-pulse"
      style={{
        boxShadow: "0px 1px 3px 0px #0000001A, 0px 1px 2px -1px #0000001A",
      }}
    >
      <div className="w-24 h-24 bg-gray-100 rounded-xl shrink-0" />
      <div className="flex flex-col gap-2 flex-1 justify-center">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-4 bg-gray-100 rounded-full w-1/4 mt-2" />
      </div>
    </div>
  );
}

function OrderSummarySkeleton() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden animate-pulse"
      style={{
        boxShadow: "0px 1px 3px 0px #0000001A, 0px 1px 2px -1px #0000001A",
      }}
    >
      <div className="h-16 bg-gray-200" />
      <div className="p-5 flex flex-col gap-4">
        <div className="h-14 bg-gray-100 rounded-xl" />
        <div className="h-4 bg-gray-100 rounded-full w-full" />
        <div className="h-4 bg-gray-100 rounded-full w-2/3" />
        <div className="h-px bg-gray-100 w-full" />
        <div className="h-6 bg-gray-100 rounded-full w-1/2 self-end" />
        <div className="h-11 bg-gray-100 rounded-xl" />
        <div className="h-11 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
      <div
        className="w-24 h-24 rounded-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
        }}
      >
        <FaShoppingCart className="w-10 h-10 text-homeGreen opacity-60" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-sm text-gray-400 max-w-xs">
          Looks like you haven't added anything yet. Start shopping and find
          something you love!
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        style={{
          background: "linear-gradient(90deg, #16A34A 0%, #15803D 100%)",
        }}
      >
        <FaShoppingCart className="w-3.5 h-3.5" />
        Start Shopping
      </Link>
    </div>
  );
}

export default function page() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const { itemsOfCart, setItemOfCart } = useContext(NumOfItems);

  async function getItems() {
    try {
      const data = await getCartItems();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function delProdcut(id: string, count: number) {
    const data = await deleteItemProduct(id);
    setCart(data);
    setItemOfCart(itemsOfCart - count);
  }

  async function updateCount(id: string, count: number, sign: string) {
    const data = await updateItemProduct(id, count);
    setCart(data);
    if (sign === "inc") {
      setItemOfCart(itemsOfCart + 1);
    } else {
      setItemOfCart(itemsOfCart - 1);
    }
  }

  async function delAllProducts() {
    setIsClearing(true);
    try {
      const data = await deleteAllItems();
      setCart(data);
      setItemOfCart(0)
    } finally {
      setIsClearing(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  const isEmpty =
    !loading && (!cart?.data.products || cart.data.products.length === 0);

  return (
    <div className="px-10 py-8 flex flex-col gap-8 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-muted-foreground">
          <Link
            className="hover:text-gray-900 duration-300 transition-all"
            href={"/"}
          >
            Home
          </Link>{" "}
          / <span className="font-medium text-foreground">Shopping Cart</span>
        </p>
        <div className="p-4 mb-2 flex gap-4 items-center justify-between">
          <div className="w-12 h-12 bg-homeGreen rounded-lg flex items-center justify-center">
            <FaShoppingCart className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <p className="text-sm text-muted-foreground">
              {loading ? (
                <span className="inline-block w-32 h-3 bg-gray-200 rounded-full animate-pulse" />
              ) : (
                <>
                  You have{" "}
                  <span className="text-homeGreen font-semibold">
                    {cart?.numOfCartItems ?? 0} items
                  </span>{" "}
                  in your cart
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {isEmpty && <EmptyCart />}

      {!isEmpty && (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-3/5">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CartCardSkeleton key={i} />
                ))
              : cart?.data.products.map((item) => (
                  <CartCard
                    delfn={delProdcut}
                    fn={updateCount}
                    key={item._id}
                    item={item}
                  />
                ))}
            {!loading && !isEmpty && (
              <button
                onClick={delAllProducts}
                disabled={isClearing}
                className="flex w-fit ml-auto items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-500 border border-red-100 bg-red-50 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isClearing ? (
                  <AiOutlineLoading3Quarters className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FaTrash className="w-3.5 h-3.5" />
                )}
                {isClearing ? "Clearing..." : "Clear Cart"}
              </button>
            )}
          </div>

          <div className="w-full lg:w-2/5 lg:sticky lg:top-6">
            {loading ? (
              <OrderSummarySkeleton />
            ) : (
              <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0px 1px 3px 0px #0000001A, 0px 1px 2px -1px #0000001A",
                }}
              >
                <div
                  className="px-5 py-4 flex items-center gap-3"
                  style={{
                    background:
                      "linear-gradient(90deg, #16A34A 0%, #15803D 100%)",
                  }}
                >
                  <FaLock className="text-white w-4 h-4" />
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">
                      Order Summary
                    </h2>
                    <p className="text-green-100 text-sm">
                      {cart?.numOfCartItems} items in your cart
                    </p>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-[#F0FDF4] rounded-xl px-4 py-3">
                    <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <FaTruck className="text-homeGreen w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-homeGreen font-semibold text-sm">
                        Free Shipping!
                      </p>
                      <p className="text-green-600 text-xs">
                        You qualify for free delivery
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-3 pt-2"
                    style={{ borderTop: "1px solid #F3F4F6" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Subtotal</span>
                      <span className="text-gray-800 text-sm font-medium">
                        {cart?.data.totalCartPrice} EGP
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Shipping</span>
                      <span className="text-homeGreen text-sm font-semibold">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: "1px solid #F3F4F6" }}
                  >
                    <span className="text-gray-900 font-bold text-base">
                      Total
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-gray-900 font-bold text-2xl">
                        {cart?.data.totalCartPrice}
                      </span>
                      <span className="text-gray-500 text-xs font-medium">
                        EGP
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm text-gray-500 font-medium transition-all duration-200 hover:border-homeGreen hover:text-homeGreen"
                    style={{ borderColor: "#F3F4F6" }}
                  >
                    <FaTag className="w-3.5 h-3.5" />
                    Apply Promo Code
                  </button>

                  {/* Checkout */}
                  <Link href={"/checkout"}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(90deg, #16A34A 0%, #15803D 100%)",
                    }}
                  >
                    <FaLock className="w-3.5 h-3.5" />
                    Secure Checkout
                  </Link>

                  <div
                    className="flex items-center justify-center gap-4 pt-1"
                    style={{ borderTop: "1px solid #F3F4F6" }}
                  >
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FaShieldAlt className="w-3 h-3 text-homeGreen" />
                      Secure Payment
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FaTruck className="w-3 h-3 text-blue-400" />
                      Fast Delivery
                    </div>
                  </div>

                  <Link
                    href="/"
                    className="text-center text-homeGreen text-sm font-medium hover:underline transition-all duration-200"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
