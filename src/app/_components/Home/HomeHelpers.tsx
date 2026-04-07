import React from "react";
import { FaTruck , FaArrowRotateLeft } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { ImHeadphones } from "react-icons/im";


import HomeAddresses from "../Shared/HomeComp/HomeAddresses";

export default function HomeHelpers() {
  return (
    <div className="py-8 px-8 bg-[#F9FAFB] max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <HomeAddresses
          icon={FaTruck}
          textclr="blue-500"
          hcontent="Free Shipping"
          pcontent="On orders over 500 EGP"
          shadow="shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
        ></HomeAddresses>
        <HomeAddresses
          icon={FaShieldAlt}
          textclr="homeGreen2"
          hcontent="Secure Payment"
          pcontent="100% secure transactions"
          shadow="shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
        ></HomeAddresses>
        <HomeAddresses
          icon={FaArrowRotateLeft}
          textclr="homeOrange2"
          hcontent="Easy Returns"
          pcontent="14-day return policy"
          shadow="shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
        ></HomeAddresses>
        <HomeAddresses
          icon={ImHeadphones}
          textclr="violet-600"
          hcontent="24/7 Support"
          pcontent="Dedicated support team"
          shadow="shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
        ></HomeAddresses>
      </div>
    </div>
  );
}
