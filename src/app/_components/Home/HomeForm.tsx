import React from "react";
import {
  FaEnvelope,
  FaLeaf,
  FaTruck,
  FaApple,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import {
  FaTag,
  FaLongArrowAltRight,
  FaGooglePlay,
  FaShieldAlt,
} from "react-icons/fa";
import HomeAddresses from "../Shared/HomeComp/HomeAddresses";
import { ImHeadphones } from "react-icons/im";

export default function HomeForm() {
  return (
    <div className="py-16 px-10 bg-linear-to-b  from-[#FFFFFF] to-[#F9FAFB]">
      <div className="p-6 sm:p-10 lg:p-14 flex mt-19 flex-col lg:flex-row gap-8 items-center rounded-[40px] bg-linear-to-br from-[#F3F4F6] via-[#FFFFFF] to-[#FEF2F2] border border-[#D0FAE580] shadow-[0px_25px_50px_-12px_#00BC7D1A]">
        <div className="flex flex-col gap-5 w-full lg:w-3/5">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-[16px] shadow-[0px_4px_6px_-4px_#00BC7D4D,0px_10px_15px_-3px_#00BC7D4D] flex justify-center items-center bg-linear-to-br from-[#00BC7D] to-[#00BBA7]">
              <FaEnvelope className="text-white text-[20px]" />
            </div>
            <div className="flex flex-col">
              <h5 className="font-semibold text-sm text-homeGreen2">
                Newsletter
              </h5>
              <p className="font-medium text-xs text-secondary">
                50,000+ subscribers
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              Get the Freshest Updates{" "}
              <span className="text-homeGreen2">Delivered Free</span>
            </h3>
            <p className="font-medium text-base lg:text-lg text-secondary">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>
          </div>

          <div className="flex gap-3 items-center overflow-x-auto pb-1 scrollbar-hide">
            <div className="rounded-full flex items-center gap-2.5 py-2.5 px-4 bg-white border border-[#D0FAE5] shadow-[0px_1px_3px_0px_#0000001A] backdrop-blur-[8px] shrink-0">
              <div className="size-7 rounded-full flex items-center justify-center bg-[#D0FAE5]">
                <FaLeaf className="text-xs text-homeGreen2" />
              </div>
              <p className="text-links font-medium text-sm whitespace-nowrap">
                Fresh Picks Weekly
              </p>
            </div>
            <div className="rounded-full flex items-center gap-2.5 py-2.5 px-4 bg-white border border-[#D0FAE5] shadow-[0px_1px_3px_0px_#0000001A] backdrop-blur-[8px] shrink-0">
              <div className="size-7 rounded-full flex items-center justify-center bg-[#D0FAE5]">
                <FaTruck className="text-xs text-homeGreen2" />
              </div>
              <p className="text-links font-medium text-sm whitespace-nowrap">
                Free Delivery Codes
              </p>
            </div>
            <div className="rounded-full flex items-center gap-2.5 py-2.5 px-4 bg-white border border-[#D0FAE5] shadow-[0px_1px_3px_0px_#0000001A] backdrop-blur-[8px] shrink-0">
              <div className="size-7 rounded-full flex items-center justify-center bg-[#D0FAE5]">
                <FaTag className="text-xs text-homeGreen2" />
              </div>
              <p className="text-links font-medium text-sm whitespace-nowrap">
                Members-Only Deals
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              <input
                type="email"
                placeholder="you@gmail.com"
                className="px-5 w-full py-4 rounded-[16px] 
            bg-white border-2 border-[#E5E7EB]
            placeholder:text-[#99A1AF] placeholder:font-medium
            shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]
            focus:outline-none focus:ring-2 focus:ring-[#00BC7D]/30 
            focus:border-[#00BC7D] transition-all duration-200"
              />
              <button
                className="group rounded-[16px] cursor-pointer flex items-center justify-center gap-3 font-semibold px-8 py-4 text-white 
          bg-linear-to-r from-homeGreen2 to-[#00BC7D]
          shadow-[0px_4px_6px_-4px_rgba(0,188,125,0.3),0px_10px_15px_-3px_rgba(0,188,125,0.3)]
          transition-all duration-300 ease-out
          hover:scale-105 hover:from-[#00BC7D] hover:to-homeGreen2
          sm:whitespace-nowrap"
              >
                <span>Subscribe</span>
                <FaLongArrowAltRight className="transition-all duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <span className="pl-1 font-medium text-[#99A1AF] text-xs">
              ✨ Unsubscribe anytime. No spam, ever.
            </span>
          </div>
        </div>

        <div className="w-full lg:w-2/5 lg:pl-8">
          <div className="bg-linear-to-br relative overflow-hidden from-[#101828] to-[#1E2939] rounded-[24px] p-8">
            <div className="size-48 rounded-full absolute -top-8 -right-8 bg-[#00BC7D]/20 blur-2xl"></div>
            <div className="size-40 rounded-full absolute -bottom-8 -left-8 bg-[#00BBA7]/20 blur-2xl"></div>
            <div className="flex flex-col gap-5">
              <div className="px-3 py-1.5 rounded-full w-fit bg-[#00BC7D]/20 border border-[#00BC7D]/30">
                <span className="font-semibold text-[#00D492] text-xs">
                  <span className="pr-0.5">📱</span> MOBILE APP
                </span>
              </div>
              <h3 className="font-bold text-2xl sm:text-3xl text-white">
                Shop Faster on Our App
              </h3>
              <p className="text-secondary font-medium text-sm">
                Get app-exclusive deals & 15% off your first order.
              </p>
              <div className="pt-2 flex flex-col gap-3">
                <div className="py-3 backdrop-blur-[8px] px-4 rounded-[12px] flex items-center gap-3 bg-white/10 border border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-lg hover:shadow-black/20 active:scale-95">
                  <FaApple className="text-white text-[20px]" />
                  <div>
                    <p className="text-[10px] font-medium text-secondary">
                      DOWNLOAD ON
                    </p>
                    <p className="text-sm font-semibold text-white">
                      App Store
                    </p>
                  </div>
                </div>
                <div className="py-3 backdrop-blur-[8px] px-4 rounded-[12px] flex items-center gap-3 bg-white/10 border border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-lg hover:shadow-black/20 active:scale-95">
                  <FaGooglePlay className="text-white text-[20px]" />
                  <div>
                    <p className="text-[10px] font-medium text-secondary">
                      Get it on
                    </p>
                    <p className="text-sm font-semibold text-white">
                      Google Play
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2 flex gap-2 items-center">
                <span className="font-medium text-sm text-[#FDC700]">
                  ★★★★★
                </span>
                <span className="font-medium text-sm text-secondary">
                  4.9 • 100K+ downloads
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
