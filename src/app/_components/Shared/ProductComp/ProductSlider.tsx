"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductSliderProps {
  cover: string;
  images: string[];
}

const VISIBLE = 3;
const THUMB_GAP = 8;

export default function ProductSlider({ cover, images }: ProductSliderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [windowStart, setWindowStart] = useState(0);

  const mainSrc = activeIndex === null ? cover : images[activeIndex];

  const handleSelect = (index: number) => {
    const prev = activeIndex ?? -1;
    setDirection(index > prev ? 1 : -1);
    setActiveIndex(index);

    if (index === windowStart + VISIBLE - 1 && windowStart + VISIBLE < images.length) {
      setWindowStart((p) => p + 1);
    } else if (index === windowStart && windowStart > 0) {
      setWindowStart((p) => p - 1);
    }
  };

  const mainVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const visibleImages = images.slice(windowStart, windowStart + VISIBLE);

  return (
    <div
      className="rounded-xl bg-white w-full"
      style={{
        padding: 16,
        boxShadow:
          "0px 1px 2px -1px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.1)",
      }}
    >
      {/* Main Image */}
      <div
        className="relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center w-full"
        style={{ aspectRatio: "344/469" }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={mainSrc}
            src={mainSrc}
            alt="product"
            custom={direction}
            variants={mainVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="object-contain w-full h-full"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="mt-3 overflow-hidden w-full">
          <div className="flex" style={{ gap: THUMB_GAP }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleImages.map((src, i) => {
                const globalIndex = windowStart + i;
                const isActive = globalIndex === activeIndex;

                return (
                  <motion.button
                    key={globalIndex}
                    layout
                    initial={{ opacity: 0, scale: 0.88, x: direction > 0 ? 40 : -40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.88, x: direction > 0 ? -40 : 40 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onClick={() => handleSelect(globalIndex)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden rounded-xl bg-gray-50 border-2 transition-colors duration-200 shrink-0 p-0 flex-1"
                    style={{
                      height: 80,
                      borderColor: isActive ? "#3b82f6" : "#e5e7eb",
                      boxShadow: isActive
                        ? "0 0 0 3px rgba(59,130,246,0.12)"
                        : "none",
                    }}
                  >
                    <img
                      src={src}
                      alt={`product-${globalIndex}`}
                      className="w-full h-full object-contain p-1.5"
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeThumb"
                        className="absolute inset-0 rounded-[10px]"
                        style={{ background: "rgba(59,130,246,0.06)" }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}