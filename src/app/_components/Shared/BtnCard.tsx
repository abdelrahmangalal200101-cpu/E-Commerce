"use client";
import { addCartApi } from "@/Actions/Cart.Actions";
import { NumOfItems } from "@/Context/NumCartItemProvider";
import React, { useContext, useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";
import { toast } from "sonner";

type ButtonState = "idle" | "loading" | "success";

export default function BtnCard({ id }: { id: string }) {
  const [btnState, setBtnState] = useState<ButtonState>("idle");
  const {itemsOfCart , setItemOfCart} = useContext(NumOfItems);


  async function addToCart() {
    if (btnState !== "idle") return;
    setBtnState("loading");

    const res = await addCartApi(id);

    if (res.status === "success") {
      toast.success(res.message, { duration: 3000, position: "top-center" });
      setBtnState("success");
      setTimeout(() => setBtnState("idle"), 2000);
      setItemOfCart(itemsOfCart + 1);
    } else {
      toast.error(res.message, { duration: 3000, position: "top-center" });
      setBtnState("idle");
    }
  }

  return (
    <button
      onClick={addToCart}
      disabled={btnState !== "idle"}
      className="w-10 h-10 rounded-full flex bg-homeGreen hover:bg-[#15803D] transition-all duration-200 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-75"
    >
      {btnState === "loading" && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {btnState === "success" && (
        <FaCheck className="text-white" />
      )}
      {btnState === "idle" && (
        <FaPlus className="text-white" />
      )}
    </button>
  );
}