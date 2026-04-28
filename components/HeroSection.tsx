"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HeroAvatar from "@/components/HeroAvatar";
import { seededRandom } from "@/lib/seededRandom";

function ParticleBurst({
  x,
  y,
  onComplete,
}: {
  x: number;
  y: number;
  onComplete: () => void;
}) {
  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const distance = 40 + seededRandom(i * 43 + 1) * 60;
    return {
      id: i,
      endX: Math.cos(angle) * distance,
      endY: Math.sin(angle) * distance,
      size: 2 + seededRandom(i * 43 + 2) * 4,
      color: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#aa00ff" : "#ffd700",
    };
  });

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{ left: x, top: y }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: p.endX, y: p.endY, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={p.id === 0 ? onComplete : undefined}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);

  const handleCTAHover = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setBurst({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    },
    []
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-4 py-20 sm:px-8"
    >
      {/* Subtle radial glow behind hero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, rgba(0,245,255,0.03) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* ─── AVATAR ─── */}
        <HeroAvatar src="/images/avatar.png" />

        {/* ─── TEXT CONTENT ─── */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,215,0,0.15)] bg-[rgba(2,2,8,0.6)] px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#ffd700] shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
            <span className="font-space text-[10px] uppercase tracking-[0.3em] text-[rgba(200,216,255,0.65)]">
              Cultivator Profile · Realm: Đà Nẵng-001
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="mt-6 font-orbitron font-black leading-none"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              color: "#ffd700",
              textShadow:
                "0 0 10px rgba(255,215,0,0.5), 0 0 30px rgba(255,215,0,0.25), 0 0 60px rgba(255,215,0,0.12)",
              animation: "neon-pulse-gold 3s ease-in-out infinite",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            NGUYÊN
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="holo-text mt-4 font-space text-base uppercase tracking-[0.35em] sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            Digital Immortal Cultivator
          </motion.p>

          {/* Tags */}
          <motion.div
            className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65 }}
          >
            {[
              "Foundation Establishment",
              "Code & Qi Dual Cultivator",
              "Đà Nẵng Realm",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[rgba(255,215,0,0.12)] bg-[rgba(255,215,0,0.04)] px-4 py-2 font-space text-[10px] uppercase tracking-[0.25em] text-[rgba(255,215,0,0.65)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.8 }}
          >
            <a
              href="#about"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.06)] px-8 py-3.5 font-orbitron text-sm tracking-[0.2em] text-[#ffd700] transition-all duration-300 hover:border-[rgba(255,215,0,0.6)] hover:bg-[rgba(255,215,0,0.12)] hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]"
              onMouseEnter={handleCTAHover}
            >
              <span className="relative z-10">Enter My Realm</span>
              <span className="relative z-10 text-lg">⚡</span>
              {/* Hover scanline */}
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(255,215,0,0.04) 50%, transparent 100%)",
                    animation: "scanline-sweep 2s linear infinite",
                  }}
                />
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Particle Burst */}
      {burst && (
        <ParticleBurst
          x={burst.x}
          y={burst.y}
          onComplete={() => setBurst(null)}
        />
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-space text-[9px] uppercase tracking-[0.3em] text-[rgba(200,216,255,0.3)]">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-[rgba(255,215,0,0.3)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
