import React from "react";
import ProductSlider from "../Shared/ProductComp/ProductSlider";
import {
  FaStar,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { FaArrowRotateLeft, FaBolt } from "react-icons/fa6";
import HomeAddresses from "../Shared/HomeComp/HomeAddresses";
import { Products } from "@/types/Products";
import ProductInteractions from "../Shared/ProductComp/ProductInteractions";

export default async function ProductHeader({
  product,
}: {
  product: Products;
}) {
  const discountPercentage =
    product.priceAfterDiscount && product.price
      ? Math.round(
          ((product.price - product.priceAfterDiscount) / product.price) * 100,
        )
      : null;

  return (
    <>
      <div className="pt-19 px-4 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:sticky md:top-25 md:w-95 shrink-0">
          <ProductSlider cover={product.imageCover} images={product.images} />
        </div>

        <div className="flex-1 min-w-0 rounded-[12px] p-4 md:p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="py-1.5 px-3 rounded-full bg-[#F0FDF4] font-medium text-xs text-[#15803D]">
              {product.category.name}
            </span>
            <span className="py-1.5 px-3 rounded-full bg-[#F3F4F6] font-medium text-xs text-gray-600">
              {product.brand.name}
            </span>
          </div>

          <h3 className="font-bold text-2xl md:text-3xl text-[#101828] mt-4">
            {product.title}
          </h3>

          <div className="pt-3 pb-5 flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-base md:text-[18px] ${
                  i < Math.round(product.ratingsAverage)
                    ? "text-[#FCC800]"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-500">
              ({product.ratingsQuantity})
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-bold text-2xl md:text-3xl text-[#101828]">
              {product.priceAfterDiscount ?? product.price} EGP
            </h3>
            {product.priceAfterDiscount && (
              <>
                <span className="text-base md:text-lg text-secondary font-medium line-through">
                  {product.price} EGP
                </span>
                {discountPercentage && (
                  <span className="py-0.5 px-3 rounded-full bg-labels text-white font-semibold text-sm">
                    Save {discountPercentage}%
                  </span>
                )}
              </>
            )}
          </div>

          <span className="mt-6 py-1.5 px-3 w-fit rounded-full bg-[#F0FDF4] flex items-center gap-1.5">
            <div
              className={`size-2 rounded-full ${
                product.quantity > 0 ? "bg-[#00C950]" : "bg-red-500"
              }`}
            />
            <span
              className={`font-medium text-sm ${
                product.quantity > 0 ? "text-[#008236]" : "text-red-600"
              }`}
            >
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </span>

          <span className="font-medium text-sm md:text-base text-[#4A5565] mt-6">
            {product.description}
          </span>

          <div className="flex flex-col gap-2 mt-6">
            <span className="font-medium text-sm text-Links">Quantity</span>
            <ProductInteractions
              price={product.priceAfterDiscount ?? product.price}
              quantity={product.quantity}
              id = {product._id}
            />

            <div className="mt-12 border-t flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pt-4">
              <HomeAddresses
                icon={FaTruck}
                textclr="homeGreen2"
                hcontent="Free Shipping"
                pcontent="On orders over 500 EGP"
                size="w-full"
              />
              <HomeAddresses
                icon={FaShieldAlt}
                textclr="homeGreen2"
                hcontent="Secure Payment"
                pcontent="100% secure transactions"
                size="w-full"
              />
              <HomeAddresses
                icon={FaArrowRotateLeft}
                textclr="homeGreen2"
                hcontent="Easy Returns"
                pcontent="14-day return policy"
                size="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
