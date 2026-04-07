import React from "react";
import {
  FaRegEye,
  FaRegHeart,
  FaStar,
  FaSyncAlt,
  FaStarHalf,
} from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import BtnCard from "./BtnCard";
import { Products } from "../../../types/Products";
import Image from "next/image";
import Link from "next/link";
import { addCartApi } from "@/Actions/Cart.Actions";
import WishBtn from "./HomeComp/WishBtn";

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex gap-0.5 items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={`full-${i}`} className="text-[#FCC800]" />
        ))}
      {hasHalf && <FaStarHalf key="half" className="text-[#FCC800]" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <CiStar key={`empty-${i}`} className="text-[#FCC800]" />
        ))}
    </div>
  );
}

function CalcDiscount({
  discount,
  price,
}: {
  discount: number;
  price: number;
}) {
  const percentage = ((price - discount) / price) * 100;
  const roundedpercentage = Math.round(percentage);
  return (
    <span className="bg-[#FB2C36] text-white absolute top-3.25 left-3 px-2 py-1 rounded-[4px] text-xs">
      {roundedpercentage}%
    </span>
  );
}

export default function Cards({ products }: { products: Products[] }) {
  return (
    <>
      {products.map((product) => (
        <div
          key={product._id}
          className="card relative rounded-[8px] overflow-hidden border border-[#E5E7EB] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
        >
          {" "}
          <div className="flex absolute inset-e-3 top-3 flex-col gap-2 items-center">
            <WishBtn id={product._id} />
            <div className="w-8 h-8 cursor-pointer hover:bg-gray-200 transition-all duration-200  rounded-full flex justify-center items-center shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
              {" "}
              <FaSyncAlt className="text-secondary" />
            </div>
            <Link
              href={`/productdetails/${product._id}`}
              className="w-8 h-8 rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-200 flex justify-center items-center shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              {" "}
              <FaRegEye className="text-secondary" />
            </Link>
          </div>
          {product.priceAfterDiscount && (
            <CalcDiscount
              discount={product.priceAfterDiscount}
              price={product.price}
            />
          )}
          <div className="w-full h-60 overflow-hidden">
            <Image
              height={300}
              width={300}
              src={product.imageCover}
              className="w-full h-full object-contain"
              alt={product.title}
            />
          </div>
          <div className="p-4 flex flex-col gap-1">
            <span className="text-xs font-medium text-secondary">
              {product.category.name}
            </span>
            <h4 className="text-base font-medium text-Links line-clamp-1">
              {product.title}
            </h4>
            <div className="flex items-center gap-2">
              <div className="pr-2 pt-0.75 pb-1.25">
                <StarRating rating={product.ratingsAverage} />
              </div>
              <span className="font-medium text-secondary text-xs">
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>
            <div className="flex items-center justify-between p-1">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-[18px] text-homeGreen">
                  {product.priceAfterDiscount ?? product.price} EGP
                </p>

                {product.priceAfterDiscount && (
                  <span className="font-medium text-sm text-secondary line-through">
                    {product.price} EGP
                  </span>
                )}
              </div>
              <BtnCard id={product._id} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
