"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("done");
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const leaves = Array.from({ length: 12 });

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0f2918] overflow-hidden"
        >
          {/* Background radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/20 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-green-300/15 blur-[60px]" />
          </motion.div>

          {/* Floating leaf particles */}
          {leaves.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-green-400/50"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${20 + (i * 11) % 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 2.5 + (i % 4) * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-10">
            {/* Animated logo ring */}
            <div className="relative flex items-center justify-center">
              {/* Outer ring */}
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="1"
                  strokeDasharray="8 6"
                  opacity="0.4"
                />
              </motion.svg>

              {/* Inner ring */}
              <motion.svg
                width="90"
                height="90"
                viewBox="0 0 90 90"
                className="absolute"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="1.5"
                  strokeDasharray="4 10"
                  opacity="0.3"
                />
              </motion.svg>

              {/* Progress arc */}
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="absolute -rotate-90"
              >
                <motion.circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    pathLength: progress / 100,
                  }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ ease: "easeOut" }}
                />
              </svg>

              {/* Center icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg shadow-green-900/50"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </motion.svg>
              </motion.div>
            </div>

            {/* Brand name */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-widest text-white uppercase">
                {"STORE".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="text-green-400/60 text-xs tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Loading your store
              </motion.p>
            </motion.div>

            <div className="w-64 flex flex-col gap-2">
              <div className="w-full h-[2px] bg-green-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center">
                <motion.span
                  className="text-green-400/40 text-[10px] tracking-widest uppercase"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Please wait...
                </motion.span>
                <span className="text-green-400 text-xs font-mono tabular-nums">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
            </div>

            <motion.div
              className="flex gap-6 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {["Products", "Offers", "Cart"].map((label, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-500"
                    animate={
                      progress >= (i + 1) * 33
                        ? { scale: [1, 1.5, 1], backgroundColor: "#4ade80" }
                        : { opacity: [0.3, 0.7, 0.3] }
                    }
                    transition={{ duration: 0.8, repeat: progress < (i + 1) * 33 ? Infinity : 0 }}
                  />
                  <span className="text-green-500/40 text-[9px] tracking-widest">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Corner decorations */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 opacity-20`}>
              <div
                className={`absolute w-full h-[1px] bg-green-500 ${i < 2 ? "top-0" : "bottom-0"}`}
              />
              <div
                className={`absolute h-full w-[1px] bg-green-500 ${i % 2 === 0 ? "left-0" : "right-0"}`}
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}