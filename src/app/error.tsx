"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const particles = Array.from({ length: 16 });

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f2918] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-green-500/10 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-red-500/10 blur-[80px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            left: `${5 + ((i * 6) % 90)}%`,
            top: `${10 + ((i * 9) % 80)}%`,
            backgroundColor: i % 4 === 0 ? "#f87171" : "#4ade80",
            opacity: 0.3,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, i % 2 === 0 ? 12 : -12, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + (i % 5) * 0.6,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Corner decorations */}
      {[
        "top-4 left-4",
        "top-4 right-4",
        "bottom-4 left-4",
        "bottom-4 right-4",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8 opacity-25`}>
          <div
            className={`absolute w-full h-[1px] bg-green-400 ${i < 2 ? "top-0" : "bottom-0"}`}
          />
          <div
            className={`absolute h-full w-[1px] bg-green-400 ${i % 2 === 0 ? "left-0" : "right-0"}`}
          />
        </div>
      ))}

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8 px-6 text-center max-w-lg">
        {/* Animated broken icon */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 14,
            delay: 0.2,
          }}
        >
          {/* Outer pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-red-500/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ margin: "-16px" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-red-500/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
            style={{ margin: "-16px" }}
          />

          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-700/80 to-green-900/80 border border-green-600/30 flex items-center justify-center shadow-2xl shadow-green-900/50 backdrop-blur-sm">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 text-red-400"
              animate={
                glitch ? { x: [-2, 2, -1, 0], opacity: [1, 0.7, 1] } : {}
              }
              transition={{ duration: 0.15 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </motion.svg>
          </div>
        </motion.div>

        {/* 500 glitch text */}
        <div className="relative">
          <motion.h1
            className="text-8xl font-black tracking-tighter text-white select-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              animate={
                glitch
                  ? { x: [-3, 3, 0], color: ["#fff", "#f87171", "#fff"] }
                  : {}
              }
              transition={{ duration: 0.12 }}
              className="inline-block"
            >
              5
            </motion.span>
            <motion.span
              animate={
                glitch
                  ? { x: [2, -2, 0], color: ["#fff", "#4ade80", "#fff"] }
                  : {}
              }
              transition={{ duration: 0.12, delay: 0.03 }}
              className="inline-block text-green-400"
            >
              0
            </motion.span>
            <motion.span
              animate={
                glitch
                  ? { x: [-3, 3, 0], color: ["#fff", "#f87171", "#fff"] }
                  : {}
              }
              transition={{ duration: 0.12, delay: 0.06 }}
              className="inline-block"
            >
              0
            </motion.span>
          </motion.h1>

          {/* Glitch shadow layers */}
          {glitch && (
            <>
              <h1 className="absolute inset-0 text-8xl font-black tracking-tighter text-red-500/40 select-none translate-x-[3px] translate-y-[1px]">
                500
              </h1>
              <h1 className="absolute inset-0 text-8xl font-black tracking-tighter text-green-400/30 select-none -translate-x-[3px] -translate-y-[1px]">
                500
              </h1>
            </>
          )}
        </div>

        {/* Title & description */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Something went wrong
          </h2>
          <p className="text-green-400/50 text-sm leading-relaxed tracking-wide">
            {error?.message
              ? error.message
              : "An unexpected error occurred. Our team has been notified."}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8 }}
        />

        {/* Buttons */}
        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold tracking-wider uppercase transition-colors duration-200 shadow-lg shadow-green-900/40"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Try Again
          </motion.button>

          <motion.a
            href="/"
            className="px-6 py-2.5 rounded-xl border border-green-600/40 hover:border-green-500/70 text-green-400 hover:text-green-300 text-sm font-semibold tracking-wider uppercase transition-colors duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Go Home
          </motion.a>
        </motion.div>

        {/* Digest code */}
        {error?.digest && (
          <motion.p
            className="text-green-500/25 text-[10px] font-mono tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            ERROR ID: {error.digest}
          </motion.p>
        )}
      </div>
    </div>
  );
}
