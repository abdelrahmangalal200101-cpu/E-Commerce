import Link from "next/link";
import React, { ReactNode } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const textColors: Record<string, string> = {
  homeGreen2: "text-homeGreen2",
  homeOrange2: "text-homeOrange2",
  "blue-500": "text-blue-500",
};

type HomeMarketingProps = {
  background: string;
  icon: ReactNode;
  badgeContent: string;
  h3Card: string;
  P: string;
  h4Card: string;
  code: string;
  textbtn: string;
  btnContent: string;
};

export default function HomeMarketing({
  background,
  icon,
  badgeContent,
  h3Card,
  P,
  h4Card,
  code,
  textbtn,
  btnContent,
}: HomeMarketingProps) {
  return (
    <div
      className={`p-5 md:p-8 relative rounded-[16px] overflow-hidden w-full md:w-1/2`}
      style={{ background }}
    >
      <div className="w-40 h-40 absolute bg-white/10 rounded-full -top-20 -right-20"></div>
      <div className="w-32 h-32 absolute bg-white/10 rounded-full -bottom-16 -left-16"></div>

      <div className="flex flex-col gap-4">
        <div className="py-1 px-3 text-white rounded-full w-fit bg-white/20 flex items-center gap-2 font-medium text-xs md:text-sm">
          <span>{icon}</span>
          <span>{badgeContent}</span>
        </div>

        <div className="flex gap-2 flex-col">
          <h3 className="font-bold text-xl md:text-3xl text-white">{h3Card}</h3>
          <p className="font-medium text-white text-sm md:text-base">{P}</p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h4 className="text-xl md:text-3xl text-white font-bold">
              {h4Card}
            </h4>
            <p className="text-white font-medium text-xs md:text-sm">
              Use code: <span className="font-bold">{code}</span>
            </p>
          </div>

          <Link href={"/products"} className="py-2 md:py-3 px-4 md:px-6 flex gap-2 items-center cursor-pointer hover:bg-gray-200 transition-all duration-200 bg-white rounded-full w-fit">
            <p className={`text-sm md:text-base font-semibold ${textColors[textbtn]}`}>
              {btnContent}
            </p>
            <FaLongArrowAltRight
              className={`text-sm md:text-base font-semibold ${textColors[textbtn]}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
