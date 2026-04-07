"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { SliderProps } from "@/types/sliderTypes";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

export default function Slider({
  slides,
  height = 400,
  overlay,
  className,
  prevIcon,
  nextIcon,
}: SliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Pagination]}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // ✅ responsive height بدل fixed
        style={{
          height: "clamp(220px, 50vw, 400px)",  // ← هنا التغيير الجوهري
        }}
        className={className}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt || `Slide ${index + 1}`}
                fill
                className="object-cover"
              />
              {overlay && (
                <div
                  className="absolute inset-0 z-10"
                  style={{ background: overlay }}
                />
              )}
              {slide.content && (
                <motion.div
                  className="absolute inset-0 z-20"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {slide.content}
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => {
          if (swiperRef.current) {
            const swiper = swiperRef.current;
            if (swiper.isBeginning) swiper.slideTo(slides.length - 1);
            else swiper.slidePrev();
          }
        }}
        className="absolute cursor-pointer left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 
                   w-8 h-8 sm:w-12 sm:h-12 
                   flex items-center justify-center 
                   bg-white/90 rounded-full hover:bg-white hover:scale-105 transition-all duration-200"
      >
        {prevIcon || <MdArrowBackIos size={14} className="translate-x-0.5!" />}
      </button>

      <button
        onClick={() => {
          if (swiperRef.current) {
            const swiper = swiperRef.current;
            if (swiper.isEnd) swiper.slideTo(0);
            else swiper.slideNext();
          }
        }}
        className="absolute right-2 sm:right-4 top-1/2 cursor-pointer -translate-y-1/2 z-20 
                   w-8 h-8 sm:w-12 sm:h-12 
                   flex items-center justify-center 
                   bg-white/90 rounded-full hover:bg-white hover:scale-105 transition-all duration-200"
      >
        {nextIcon || <MdArrowForwardIos size={14} />}
      </button>
    </div>
  );
}