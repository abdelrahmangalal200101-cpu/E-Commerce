"use client";

import { addWishItem } from "@/Actions/Wish.Action";
import { NumOfWish } from "@/Context/NumWishItemProvider";
import React, { useContext } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function WishBtn({ id }: { id: string }) {
  const { itemsOfWish, setItemOfWish, wishList, setWishList } = useContext(NumOfWish);
  const isWished = wishList.includes(id);

  async function wishaddbtn(id: string) {
    try {
      const res = await addWishItem(id);
      setItemOfWish(itemsOfWish + 1);
      if (!isWished) {
        setWishList([...wishList, id]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      onClick={() => {
        wishaddbtn(id);
      }}
      className="w-8 h-8 cursor-pointer rounded-full hover:bg-gray-200 transition-all duration-200 flex justify-center items-center shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
    >
      {isWished ? (
        <FaHeart className="text-red-500" /> // هنا لو موجود في wishlist، قلب أحمر
      ) : (
        <FaRegHeart className="text-gray-400" /> // لو مش موجود، قلب فاضي أو رمادي
      )}
    </button>
  );
}
