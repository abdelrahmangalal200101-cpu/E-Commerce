import { CartItem } from "@/types/Products";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

export default function CartCard({
  item,
  fn,
  delfn,
}: {
  item: CartItem;
  fn: (id: string, count: number, sign: string) => Promise<void>;
  delfn: (id: string, count: number) => Promise<void>;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleUpdate(count: number, sign: string) {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await fn(item.product._id, count, sign);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDel(count: number) {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await delfn(item.product._id, count);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item, please try again");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div
      className={`rounded-2xl shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] p-4 bg-white border border-[#F3F4F6] flex flex-col sm:flex-row items-center gap-4 transition-opacity duration-200 ${
        isUpdating ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="relative w-full sm:w-32 h-44 sm:h-32 rounded-xl shrink-0 overflow-hidden border border-[#F3F4F6] bg-[linear-gradient(135deg,#F9FAFB_0%,#FFFFFF_50%,#F3F4F6_100%)] flex items-center justify-center">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-full h-full object-contain p-3 drop-shadow-sm"
        />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-homeGreen text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
          ✓ In Stock
        </span>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 min-w-0 w-full">
        <p className="text-base sm:text-[20px] font-bold text-gray-900 line-clamp-2">
          {item.product.title}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-emerald-50 text-homeGreen text-xs font-semibold px-3 py-0.5 rounded-full">
            {item.product.category.name}
          </span>
          <span className="text-gray-400 text-xs">· SKU: 5CA043</span>
        </div>

        <p className="text-[15px] text-homeGreen font-bold">
          {item.price} EGP{" "}
          <span className="text-xs font-normal text-gray-400">per unit</span>
        </p>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 p-1 bg-[#F9FAFB] border border-[#E5E7EB] w-fit rounded-[12px]">
            <button
              onClick={() => handleUpdate(item.count - 1, "dec")}
              disabled={isUpdating}
              className="size-8.5 hover:bg-gray-100 cursor-pointer transition-all duration-200 rounded-lg border-[1.5px] border-gray-200 bg-white flex items-center justify-center text-xl text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              −
            </button>

            <span className="text-base font-bold text-gray-900 w-6 text-center">
              {isUpdating ? (
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin text-homeGreen mx-auto" />
              ) : (
                item.count
              )}
            </span>

            <button
              onClick={() => handleUpdate(item.count + 1, "inc")}
              disabled={isUpdating}
              className="size-8.5 rounded-lg cursor-pointer hover:bg-green-700 transition-all duration-200 bg-homeGreen flex items-center justify-center text-xl text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl px-3 py-2 bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                Total
              </span>
              <span className="text-base font-extrabold text-gray-900 leading-tight">
                {item.price * item.count}
              </span>
              <span className="text-[11px] font-semibold text-gray-400">
                EGP
              </span>
            </div>

            <button
              onClick={() => {
                handleDel(item.count);
              }}
              disabled={isDeleting}
              className="w-9 h-9 group hover:bg-red-600 duration-200 cursor-pointer transition-all rounded-lg border border-red-200 bg-red-50 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin text-red-600" />
              ) : (
                <FaTrash className="w-4 h-4 group-hover:text-white duration-200 transition-all text-red-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:block w-px bg-[#F3F4F6] self-stretch shrink-0" />

      <div className="hidden sm:flex flex-col items-center justify-between self-stretch pl-2 shrink-0 gap-2">
        <div className="flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl px-4 py-3 bg-emerald-50 border border-emerald-100 min-w-22.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
            Total
          </span>
          <span className="text-2xl font-extrabold text-gray-900 leading-tight">
            {item.price * item.count}
          </span>
          <span className="text-[11px] font-semibold text-gray-400 tracking-wide">
            EGP
          </span>
        </div>

        <button
          onClick={() => {
            handleDel(item.count);
          }}
          disabled={isDeleting}
          className="w-9 h-9 group hover:bg-red-600 duration-200 cursor-pointer transition-all rounded-lg border border-red-200 bg-red-50 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin text-red-600" />
          ) : (
            <FaTrash className="w-4 h-4 group-hover:text-white duration-200 transition-all text-red-600" />
          )}
        </button>
      </div>
    </div>
  );
}
