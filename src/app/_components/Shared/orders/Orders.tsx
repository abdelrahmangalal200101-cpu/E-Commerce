import React, { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhone, FaBox } from "react-icons/fa";
import { IoCalendar, IoStorefront } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import { Order } from "@/types/Products";

export default function OrdersCards({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const status = order.isDelivered
    ? "Delivered"
    : order.isPaid
      ? "Paid"
      : "Processing";

  const statusStyles: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    Paid:       "bg-blue-100 text-blue-700",
    Processing: "bg-yellow-100 text-yellow-700",
  };

  const visibleImgs = order.cartItems.slice(0, 4);
  const extraCount  = order.cartItems.length - 4;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

      <div className="flex items-center justify-between px-7 py-5 flex-wrap gap-4">

        <div className="flex items-center gap-5 flex-wrap">

          <div className="flex items-center">
            {visibleImgs.map((item, i) => (
              <div
                key={item._id}
                className="w-16 h-16 rounded-2xl border-[3px] border-white overflow-hidden bg-gray-100 shrink-0"
                style={{ marginLeft: i !== 0 ? "-18px" : "0", zIndex: visibleImgs.length - i }}
              >
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
            {extraCount > 0 && (
              <div
                className="w-16 h-16 rounded-2xl border-[3px] border-white bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0"
                style={{ marginLeft: "-18px" }}
              >
                +{extraCount}
              </div>
            )}
          </div>

          {/* Order meta */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-800">
                Order <span className="text-homeGreen">#{order.id}</span>
              </p>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[status]}`}>
                {status}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <IoCalendar className="text-xs" />
                {date}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <FaBox className="text-xs" />
                {order.cartItems.length} item{order.cartItems.length > 1 ? "s" : ""}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <FaMapMarkerAlt className="text-xs" />
                {order.shippingAddress.city}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-sm text-gray-400 capitalize">
                {order.paymentMethodType}
              </span>
            </div>
          </div>
        </div>

        {/* Right: price + toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">
              {order.totalOrderPrice.toLocaleString()}
              <span className="text-sm font-normal text-gray-400 ml-1">EGP</span>
            </p>
          </div>
          <button
            onClick={() => setOpen((p) => !p)}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer
              ${open
                ? "bg-homeGreen text-white border-homeGreen"
                : "border-gray-200 text-gray-600 hover:border-homeGreen hover:text-homeGreen"
              }`}
          >
            {open ? "Hide" : "Details"}
            <MdExpandMore
              className={`text-lg transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Details Section ── */}
      {open && (
        <div className="border-t border-gray-100 px-7 py-6 flex flex-col gap-6">

          {/* Order Items */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FaBox className="text-homeGreen" />
              Order Items
            </p>
            <div className="flex flex-col gap-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-gray-100 shrink-0">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-800 line-clamp-1">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {item.product.brand.name}
                        <span className="mx-1.5">·</span>
                        Qty: {item.count}
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-bold text-gray-800 shrink-0">
                    {item.price.toLocaleString()}
                    <span className="text-xs font-normal text-gray-400 ml-1">EGP</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address + Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Delivery Address */}
            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-homeGreen" />
                Delivery Address
              </p>
              <p className="text-base font-bold text-gray-800">
                {order.shippingAddress.city}
              </p>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                {order.shippingAddress.details}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-7 h-7 rounded-lg bg-homeGreen/10 flex items-center justify-center shrink-0">
                  <FaPhone className="text-homeGreen text-xs" />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
              <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <IoStorefront className="text-base" />
                Order Summary
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {(order.totalOrderPrice - order.shippingPrice - order.taxPrice).toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {order.shippingPrice === 0 ? (
                      <span className="text-homeGreen font-semibold">Free</span>
                    ) : (
                      `${order.shippingPrice} EGP`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">{order.taxPrice} EGP</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-800 border-t-2 border-yellow-200 pt-3 mt-1">
                  <span>Total</span>
                  <span className="text-homeGreen text-lg">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}