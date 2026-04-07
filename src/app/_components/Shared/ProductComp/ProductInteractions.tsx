"use client";

import { useState } from "react";
import ProductCounter from "./ProductCounter";
import ProductBtn from "./ProductBtn";
import { FaShoppingCart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";

interface Props {
  price: number;
  quantity: number;
  id: string;
}

export default function ProductInteractions({ id, price, quantity }: Props) {
  const [count, setCount] = useState(1);
  const total = (price * count).toFixed(2);

  return (
    <>
      <div className="flex items-center gap-4 mt-2">
        <ProductCounter id={id} max={quantity} count={count} onCountChange={setCount} />
        <span className="font-medium text-sm text-secondary">
          {quantity} available
        </span>
      </div>

      <div className="flex justify-between items-center p-4 mt-6 bg-[#F9FAFB] rounded-[8px]">
        <span className="text-[#4A5565] font-medium">Total Price :</span>
        <span className="text-homeGreen text-2xl font-bold">{total} EGP</span>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <ProductBtn
          bgColor="bg-homeGreen"
          borderColor="border-homeGreen"
          textColor="text-white"
          icon={<FaShoppingCart className="text-lg" />}
          hoverClass="hover:bg-green-700"
          size="w-full"
          text="Add To Cart"
          id={id}
          count={count}
        />
        <ProductBtn
          bgColor="bg-black"
          borderColor="border-black"
          textColor="text-white"
          hoverClass="hover:bg-black/90"
          icon={<FaBolt className="text-lg" />}
          size="w-full"
          text="Buy Now"
          id={id}
          count={count}
        />
      </div>

      <div className="mt-6 flex gap-3 items-center">
        <ProductBtn
          bgColor="bg-white"
          borderColor="border-gray-300"
          textColor="text-gray-700"
          hoverClass="hover:border-homeGreen hover:text-homeGreen"
          icon={<FaRegHeart className="text-lg" />}
          size="flex-1"
          text="Add To Wishlist"
          id={id}
        />
        <ProductBtn
          bgColor="bg-white"
          borderColor="border-gray-300"
          textColor="text-gray-700"
          hoverClass="hover:border-homeGreen hover:text-homeGreen"
          icon={<FaShareAlt className="text-lg" />}
          size="w-[48px]"
          isIconOnly
        />
      </div>
    </>
  );
}