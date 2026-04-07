"use client";

import { addCartApi } from "@/Actions/Cart.Actions";
import { addWishItem } from "@/Actions/Wish.Action";
import { NumOfItems } from "@/Context/NumCartItemProvider";
import { NumOfWish } from "@/Context/NumWishItemProvider";
import { FaHeart } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

type ProductBtnProps = {
  text?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverClass?: string;
  size?: string;
  isIconOnly?: boolean;
  id?: string;
  count?: number;
};

export default function ProductBtn({
  text,
  icon,
  bgColor = "bg-white",
  borderColor = "border-transparent",
  textColor = "text-black",
  hoverClass = "",
  size = "",
  isIconOnly = false,
  id,
}: ProductBtnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { itemsOfCart, setItemOfCart } = useContext(NumOfItems);
  const { itemsOfWish, setItemOfWish, wishList, setWishList } =
    useContext(NumOfWish);
  const isWished = wishList.includes(id);

  async function addToCart() {
    const res = await addCartApi(id!);
    if (res.status === "success") {
      toast.success(res.message, { duration: 3000, position: "top-center" });
      setItemOfCart(itemsOfCart + 1);
      if (!isWished) {
        setWishList([...wishList, id]);
      }
    } else {
      toast.error(res.message, { duration: 3000, position: "top-center" });
    }
  }

  async function wishaddbtn() {
    const res = await addWishItem(id!);
    if (res.status === "success") {
      toast.success(res.message, { duration: 3000, position: "top-center" });
      setItemOfWish(itemsOfWish + 1);
      if (!isWished) {
        setWishList([...wishList, id]);
      }
    } else {
      toast.error(res.message, { duration: 3000, position: "top-center" });
    }
  }

  async function buyNow() {
    toast.info("Buy Now clicked", { duration: 3000, position: "top-center" });
  }

  async function handleClick() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (text === "Add To Cart") {
        await addToCart();
      } else if (text === "Buy Now") {
        await buyNow();
      } else {
        await wishaddbtn();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`rounded-[12px] flex cursor-pointer items-center justify-center gap-2 border transition-all duration-200
    ${
      text === "Add To Wishlist" && isWished
        ? "border-red-500 text-red-500 bg-white"
        : `${bgColor} ${borderColor} ${textColor}`
    }
    ${size}
    ${isLoading ? "opacity-70 cursor-not-allowed" : hoverClass}
    ${isIconOnly ? "aspect-square p-3" : "py-[14px] px-[24px]"}
  `}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="text-lg animate-spin" />
      ) : (
        <>
          {text !== "Add To Wishlist" ? (
            <>
              {icon}
              {!isIconOnly && (
                <span className="font-medium text-base">{text}</span>
              )}
            </>
          ) : isWished ? (
            <>
              <FaHeart className="text-red-500" />
              {!isIconOnly && (
                <span className="font-medium text-base">Wishlisted</span>
              )}
            </>
          ) : (
            <>
              {icon}
              {!isIconOnly && (
                <span className="font-medium text-base">{text}</span>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
