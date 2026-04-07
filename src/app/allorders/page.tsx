"use client";

import { myOrders } from "@/Actions/Checkout.Actions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaBox } from "react-icons/fa";
import { IoCalendar, IoStorefront } from "react-icons/io5";
import { MdExpandMore, MdShoppingCart } from "react-icons/md";
import { Order } from "@/types/Products";
import OrdersCards from "../_components/Shared/orders/Orders";




export default function Page() {
  const { data } = useSession();
  const id = data?.id;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    myOrders(id).then((res) => {
      if (res) setOrders(res);
      console.log(res);
      
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="w-full px-6 lg:px-10 py-8">

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-homeGreen transition-colors duration-200">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-semibold">My Orders</span>
      </div>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-homeGreen flex items-center justify-center">
            <FaShoppingBag className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Track and manage your{" "}
              <span className="text-homeGreen font-semibold">{orders.length}</span>{" "}
              orders
            </p>
          </div>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 text-sm font-semibold text-homeGreen border-2 border-homeGreen/30 px-5 py-2.5 rounded-xl hover:bg-homeGreen hover:border-homeGreen hover:text-white transition-all duration-200"
        >
          <MdShoppingCart className="text-lg" />
          Continue Shopping
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <FaShoppingBag className="text-3xl text-gray-300" />
          </div>
          <p className="text-lg font-bold text-gray-600">No orders yet</p>
          <p className="text-sm text-gray-400 mt-1.5">
            Your orders will appear here once you place one.
          </p>
          <Link
            href="/shop"
            className="mt-5 px-6 py-2.5 rounded-xl bg-homeGreen text-white text-sm font-semibold hover:bg-green-700 transition-all duration-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrdersCards key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}