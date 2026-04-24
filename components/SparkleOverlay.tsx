"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#ffd700", "#00ccff", "#aa44ff", "#ffffff", "#ff66cc", "#66ffaa"];
const POOL_MAX = 40;

type Dot = {
  id: number;
  x: number;
  y: number;
  color: string;
  driftX: number;
  driftY: number;
  duration: number;
  size: number;
};

export default function SparkleOverlay() {
  const [dots, setDots] = useState<Dot[]>([]);
  const idRef = useRef(0);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: -300, y: -300 });
  const ringPos = useRef({ x: -300, y: -300 });
  const outerPos = useRef({ x: -300, y: -300 });
  const rafRef = useRef<number>(0);

  /* ─── Smooth ring/outer animation via RAF ─── */
  useEffect(() => {
    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      ringPos.current.x = lerp(ringPos.current.x, cursorPos.current.x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, cursorPos.current.y, 0.14);

      outerPos.current.x = lerp(outerPos.current.x, cursorPos.current.x, 0.06);
      outerPos.current.y = lerp(outerPos.current.y, cursorPos.current.y, 0.06);

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform =
          `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform =
          `translate(${outerPos.current.x - 36}px, ${outerPos.current.y - 36}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    cursorPos.current = { x, y };

    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
    }

    if (Math.random() > 0.4) return;
    idRef.current++;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = 6 + Math.random() * 10;
    setDots(prev => [
      ...prev.slice(-(POOL_MAX - 1)),
      {
        id: idRef.current,
        x: (x / window.innerWidth) * 100,
        y: (y / window.innerHeight) * 100,
        color,
        driftX: (Math.random() - 0.5) * 50,
        driftY: -30 - Math.random() * 40,
        duration: 0.9 + Math.random() * 0.7,
        size,
      },
    ]);
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">

      {/* ── Outer slow-lag ring ── */}
      <div
        ref={cursorOuterRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "1px solid rgba(170,68,255,0.35)",
          boxShadow: "0 0 16px rgba(170,68,255,0.2)",
          willChange: "transform",
          transform: "translate(-300px, -300px)",
        }}
      />

      {/* ── Mid ring — faster lag ── */}
      <div
        ref={cursorRingRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,204,255,0.75)",
          boxShadow:
            "0 0 10px rgba(0,204,255,0.5), inset 0 0 8px rgba(0,204,255,0.15)",
          willChange: "transform",
          transform: "translate(-300px, -300px)",
        }}
      />

      {/* ── Cursor dot — exact position ── */}
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 0 6px #aa44ff, 0 0 16px #aa44ff, 0 0 32px rgba(170,68,255,0.7)",
          willChange: "transform",
          transform: "translate(-300px, -300px)",
          zIndex: 10001,
        }}
      />

      {/* ── Sparkle trail ── */}
      <AnimatePresence>
        {dots.map(d => (
          <motion.div
            key={d.id}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              backgroundColor: d.color,
              boxShadow: `0 0 ${d.size * 2}px ${d.color}, 0 0 ${d.size * 5}px ${d.color}55`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 2, 1.2, 0],
              y: [0, d.driftY],
              x: [0, d.driftX],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: d.duration, ease: "easeOut" }}
            onAnimationComplete={() =>
              setDots(prev => prev.filter(p => p.id !== d.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
