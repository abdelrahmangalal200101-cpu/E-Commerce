"use client";
import React from "react";
import { motion, Transition } from "framer-motion";

const basePulse: Transition = {
  duration: 1.4,
  repeat: Infinity,
  ease: "easeInOut",
};

type SkeletonLine = {
  width: string;
  height?: string;
  delay?: number;
};

type LazyCompProps = {
  showImage?: boolean;
  imageAspect?: string;
  lines?: SkeletonLine[];
  className?: string;
};

export default function LazyComp({
  showImage = true,
  imageAspect = "aspect-square",
  lines = [
    { width: "w-4/5", delay: 0.1 },
    { width: "w-1/2", height: "h-2.5", delay: 0.2 },
  ],
  className = "",
}: LazyCompProps) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-3 rounded-2xl border border-gray-300 p-5 bg-gray-200 ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showImage && (
        <motion.div
          className={`w-full ${imageAspect} rounded-[12px] bg-gray-400`}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ ...basePulse, delay: 0 }}
        />
      )}

      {lines.map((line, i) => (
        <motion.div
          key={i}
          className={`${line.width} ${line.height ?? "h-3.5"} rounded-full bg-gray-400`}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ ...basePulse, delay: line.delay ?? i * 0.1 }}
        />
      ))}
    </motion.div>
  );
}
