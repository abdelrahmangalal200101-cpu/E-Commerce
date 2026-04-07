"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  const [escaped, setEscaped] = useState(false);
  const [caught, setCaught] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const runAway = () => {
    if (caught) return;
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    const maxX = box.width - 160;
    const maxY = box.height - 60;
    setPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
    setAttempts((a) => a + 1);
    setEscaped(true);
    setTimeout(() => setEscaped(false), 300);
  };

  const handleCatch = () => {
    setCaught(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* 404 big number */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative select-none"
      >
        <span className="text-[160px] sm:text-[220px] font-black text-gray-100 leading-none">
          404
        </span>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-7xl">🛒</span>
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2"
      >
        Oops! Page not found.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 mt-3 mb-2 max-w-md"
      >
        This page ran away from us. Try catching the button below to go home...
        if you can. 😏
      </motion.p>

      {attempts > 0 && !caught && (
        <motion.p
          key={attempts}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm text-green-600 font-medium mb-2"
        >
          {attempts === 1 && "Nice try! 😂"}
          {attempts === 2 && "Getting closer... not really 🏃"}
          {attempts === 3 && "You're persistent, I'll give you that 😅"}
          {attempts >= 4 && `${attempts} attempts 💀 Keep going!`}
        </motion.p>
      )}

      {/* Game area */}
      <div
        ref={containerRef}
        className="relative w-full max-w-lg h-40 flex items-center justify-center mt-4"
      >
        <AnimatePresence>
          {!caught ? (
            <motion.button
              key="runaway"
              animate={{ x: pos.x, y: pos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={runAway}
              onTouchStart={runAway}
              onClick={handleCatch}
              className="absolute px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 active:scale-95 transition select-none cursor-pointer"
            >
              🏠 Go Home
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-4xl">🎉</span>
              <p className="text-green-600 font-bold text-lg">You caught it!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition"
              >
                🏠 Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!caught && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => router.push("/")}
          className="mt-8 text-sm text-gray-400 underline hover:text-gray-600 transition"
        >
          I give up, just take me home
        </motion.button>
      )}
    </div>
  );
}
