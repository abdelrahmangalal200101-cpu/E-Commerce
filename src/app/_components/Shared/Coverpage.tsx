import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";

interface Category {
  name: string;
  image: string;
}

interface coverHeader {
  bgcolor: string;
  href?: string;
  h3Content: string;
  pContent: string;
  Icon?: IconType;
  sContent: string;
  isSub?: boolean;
  categoryOrBrand?: Category;
  isbrand?: boolean;
}

export default function Coverpage({
  bgcolor,
  href,
  h3Content,
  pContent,
  Icon,
  sContent,
  isSub,
  isbrand,
  categoryOrBrand,
}: coverHeader) {
  return (
    <div className={`px-7 py-15 ${bgcolor} flex flex-col gap-4`}>
      <div className="flex items-center gap-2">
        <Link
          className="font-medium text-sm text-gray-200 hover:text-white transition-all duration-200"
          href="/"
        >
          Home
        </Link>
        <span className="text-gray-200">/</span>

        {isSub ? (
          <>
            {href ? (
              <Link
                className="font-medium text-sm text-gray-200 hover:text-white transition-all duration-200"
                href={href}
              >
                {sContent}
              </Link>
            ) : (
              <span className="font-medium text-sm text-white">{sContent}</span>
            )}

            <span className="text-gray-200">/</span>

            <span className="text-white font-medium text-sm">
              {categoryOrBrand?.name}
            </span>
          </>
        ) : (
          <span className="text-white font-medium text-sm">{sContent}</span>
        )}
      </div>

      <div className="flex items-center gap-5">
        {isSub && categoryOrBrand ? (
          <div className="size-16 flex items-center justify-center rounded-2xl bg-white/20 border border-white/25 shadow-[0_8px_20px_rgba(255,255,255,0.15)] p-2">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={categoryOrBrand.image}
                alt={categoryOrBrand.name}
                fill
                className={`${isbrand ? "object-contain" : "object-cover"}`}
              />
            </div>
          </div>
        ) : (
          Icon && (
            <div
              className="size-16 flex items-center justify-center
              rounded-2xl
              bg-white/20
              border border-white/25
              shadow-[0_8px_20px_rgba(255,255,255,0.15)]
              hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)]
              hover:bg-white/30 hover:scale-105
              transition-all duration-200"
            >
              <Icon className="text-white text-[26px]" />
            </div>
          )
        )}

        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-4xl text-white">
            {isSub ? categoryOrBrand?.name : h3Content}
          </h3>
          <p className="text-base font-medium text-white">{pContent}</p>
        </div>
      </div>
    </div>
  );
}
