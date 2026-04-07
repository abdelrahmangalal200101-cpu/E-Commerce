"use client";

import Link from "next/link";
import React from "react";

export default function Homebtn({
  textclr,
  bgclr,
  linkto,
  content
}: {
  textclr: string;
  bgclr: string;
  linkto: string;
  content : string
}) {
  return (
    <Link
      href={linkto}
      className={`bg-${bgclr} text-base font-semibold hover:scale-102 transform transition-all duration-200 text-${textclr} py-2 px-6 rounded-[8px] border-2 border-white`}
    >{content}</Link>
  );
}
