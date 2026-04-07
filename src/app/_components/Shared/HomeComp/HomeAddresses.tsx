import React from "react";
import { IconType } from "react-icons";

const colorClasses: Record<string, string> = {
  "blue-500": "bg-blue-500/10 text-blue-500",
  "violet-600": "bg-violet-600/10 text-violet-600",
  homeGreen2: "bg-homeGreen2/10 text-homeGreen2",
  homeOrange2: "bg-homeOrange2/10 text-homeOrange2",
};

export default function HomeAddresses({
  icon: Icon,
  textclr,
  hcontent,
  pcontent,
  shadow,
  size,
  bg
}: {
  icon: IconType;
  textclr: string;
  hcontent: string;
  pcontent: string;
  shadow?: string;
  size? : string;
  bg? : string ;
}) {
  return (
    <div className={`p-4 ${size} rounded-[12px] ${bg ? bg : "bg-white"} ${shadow} `}>
      <div className="flex gap-4 items-center">
        <div
          className={`size-12 flex justify-center items-center rounded-full ${
            colorClasses[textclr]
          }`}
        >
          <Icon className="text-[22px]" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-[#1E2939]">{hcontent}</h3>
          <p className="font-medium text-[#6A7282] text-xs">{pcontent}</p>
        </div>
      </div>
    </div>
  );
}
