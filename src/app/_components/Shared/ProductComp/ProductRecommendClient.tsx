"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Cards from "../Cards";
import { Products } from "../../../../types/Products"; 

import "swiper/css";

export default function ProductRecommendClient({ products }: { products: Products[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="px-4 mt-18 flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 sm:h-8 rounded-full bg-[linear-gradient(180deg,#00BC7D_0%,#007A55_100%)]"></div>
          <h2 className="text-[#1E2939] font-bold text-xl sm:text-2xl md:text-3xl">
            You May Also <span className="text-homeGreen2">Like</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div
            onClick={() => swiperRef.current?.slidePrev()}
            className="size-10 hover:bg-homeGreen/10 hover:text-homeGreen duration-200 transition-all rounded-full cursor-pointer text-secondary bg-[#F3F4F6] flex items-center justify-center"
          >
            <FaChevronLeft />
          </div>
          <div
            onClick={() => swiperRef.current?.slideNext()}
            className="size-10 hover:bg-homeGreen/10 hover:text-homeGreen duration-200 transition-all rounded-full cursor-pointer text-secondary bg-[#F3F4F6] flex items-center justify-center"
          >
            <FaChevronRight />
          </div>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={16}
        slidesPerGroup={1}
        breakpoints={{
          0:    { slidesPerView: 1 },
          640:  { slidesPerView: 2 },
          768:  { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full overflow-hidden"
      >
        {products.map((product) => (
          <SwiperSlide className="mt-2" key={product._id}>
            <Cards products={[product]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}