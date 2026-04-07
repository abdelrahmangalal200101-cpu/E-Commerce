"use client";
import Link from "next/link";
import React from "react";

export default function HomeCategoriesCards({
  title,
  img,
  id,
}: {
  title: string;
  img: string;
  id : string;
}) {
  return (
    <Link href={`/subcategory/${id}`} className="p-0.5">
      <div
        className="flex p-4 items-center cursor-pointer rounded-[10px] flex-col gap-3 
      border border-gray-100 
      hover:border-gray-100 
      hover:shadow-md 
      hover:-translate-y-1
      transition-all duration-300 ease-out bg-white"
      >
        <img
          src={img}
          className="size-20 rounded-full object-cover"
          alt={title}
        />
        <p>{title}</p>
      </div>
    </Link>
  );
}
