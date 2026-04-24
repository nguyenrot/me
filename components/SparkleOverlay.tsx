"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POOL_MAX = 12;
const SPAWN_RATE = 0.35;
const COLORS = ["#ffd700", "#00ccff", "#aa44ff", "#ffffff", "#ffaaee"];

type SparkleDot = {
  id: number;
  x: number;
  y: number;
  color: string;
  driftX: number;
  driftY: number;
  duration: number;
};

export default function SparkleOverlay() {
  const [dots, setDots] = useState<SparkleDot[]>([]);
  const idRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (Math.random() > SPAWN_RATE) return;
    idRef.current++;
    setDots((prev) => [
      ...prev.slice(-(POOL_MAX - 1)),
      {
        id: idRef.current,
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        driftX: (Math.random() - 0.5) * 20,
        driftY: -30 - Math.random() * 30,
        duration: 0.5 + Math.random() * 0.4,
      },
    ]);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {dots.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: 6,
              height: 6,
              backgroundColor: d.color,
              boxShadow: `0 0 10px ${d.color}, 0 0 20px ${d.color}, 0 0 40px ${d.color}44`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
              y: [0, d.driftY],
              x: [0, d.driftX],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: d.duration, ease: "easeOut" }}
            onAnimationComplete={() => {
              setDots((prev) => prev.filter((p) => p.id !== d.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
