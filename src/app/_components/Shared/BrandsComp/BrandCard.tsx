import { Brand } from "@/types/Products";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";


export default function BrandCard({ Brands } : { Brands : Brand}) {
  return (
    <Link href={`/subbrand/${Brands._id}`}
      key={Brands._id}
      className="group cursor-pointer p-6.25 rounded-[16px] border border-gray-100 
      flex flex-col items-center gap-4 
      transition-all duration-300 
      hover:-translate-y-2 hover:shadow-xl hover:border-blue-300"
    >
      <div className="rounded-[12px] bg-gray-300 w-full aspect-square overflow-hidden">
        <img
          src={Brands.image}
          alt={Brands.name}
          className="w-full h-full object-contain object-center 
          transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <h4 className="font-bold text-base text-[#101828]">{Brands.name}</h4>

        <div
          className="flex gap-2 items-center justify-center 
        opacity-0 translate-y-2 
        transition-all duration-300 
        group-hover:opacity-100 group-hover:translate-y-0"
        >
          <p className="font-medium text-xs text-center text-blue-600">
            View Subcategory
          </p>
          <FaLongArrowAltRight className="text-blue-600" />
        </div>
      </div>
    </Link>
  );
}
