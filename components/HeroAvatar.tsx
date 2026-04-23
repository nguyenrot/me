"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Precomputed rune positions to avoid Math.cos/Math.sin hydration mismatch
// (Node.js and browser V8 can produce slightly different floating-point results)
const RUNE_DATA = [
  { rune: "道", left: "95%", top: "50%", color: "#ffd700", shadow: "0 0 8px rgba(255,215,0,0.6)", delay: "0s", duration: "3s" },
  { rune: "氣", left: "74%", top: "91.57%", color: "#00f5ff", shadow: "0 0 8px rgba(0,245,255,0.6)", delay: "0.4s", duration: "3.5s" },
  { rune: "元", left: "24.5%", top: "94.17%", color: "#ffd700", shadow: "0 0 8px rgba(255,215,0,0.6)", delay: "0.8s", duration: "4s" },
  { rune: "仙", left: "-4%", top: "50%", color: "#00f5ff", shadow: "0 0 8px rgba(0,245,255,0.6)", delay: "1.2s", duration: "4.5s" },
  { rune: "∞", left: "21.5%", top: "0.64%", color: "#ffd700", shadow: "0 0 8px rgba(255,215,0,0.6)", delay: "1.6s", duration: "5s" },
  { rune: "◈", left: "80%", top: "-1.96%", color: "#00f5ff", shadow: "0 0 8px rgba(0,245,255,0.6)", delay: "2s", duration: "5.5s" },
];

// Seeded PRNG (mulberry32) — deterministic on server & client to prevent hydration mismatch
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const _rand = mulberry32(42);
const QI_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  orbitRadius: 100 + _rand() * 60,
  duration: 6 + _rand() * 8,
  delay: _rand() * -14,
  size: 3 + _rand() * 4,
  opacity: 0.4 + _rand() * 0.5,
  reverse: i % 3 === 0,
}));

export default function HeroAvatar({ src }: { src: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[22rem] select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ─── OUTER AURA LAYERS ─── */}
      <div
        className="pointer-events-none absolute inset-[-30%] rounded-full transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,0,0.12) 0%, rgba(255,215,0,0.04) 40%, transparent 70%)",
          animation: "aura-pulse 4s ease-in-out infinite",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          opacity: hovered ? 1 : 0.6,
        }}
      />
      <div
        className="pointer-events-none absolute inset-[-20%] rounded-full transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,0,0.18) 0%, rgba(240,180,41,0.06) 45%, transparent 65%)",
          animation: "aura-pulse 3s ease-in-out infinite 0.5s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          opacity: hovered ? 1 : 0.7,
        }}
      />

      {/* ─── QI ORBIT PARTICLES ─── */}
      <div className="pointer-events-none absolute inset-[-15%]">
        {QI_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute left-1/2 top-1/2"
            style={{
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              borderRadius: "50%",
              background:
                p.id % 4 === 0
                  ? "#00f5ff"
                  : `rgba(255, 215, 0, ${p.opacity})`,
              boxShadow:
                p.id % 4 === 0
                  ? "0 0 6px #00f5ff, 0 0 12px rgba(0,245,255,0.4)"
                  : `0 0 8px rgba(255,215,0,${p.opacity}), 0 0 16px rgba(255,215,0,${p.opacity * 0.5})`,
              animation: `${p.reverse ? "qi-orbit-reverse" : "qi-orbit"} ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              ["--orbit-radius" as string]: `${p.orbitRadius}px`,
              animationDuration: hovered
                ? `${p.duration * 0.5}s`
                : `${p.duration}s`,
              transition: "animation-duration 0.5s",
            }}
          />
        ))}
      </div>

      {/* ─── FLOATING RUNES ─── */}
      <div className="pointer-events-none absolute inset-[-25%]">
        {RUNE_DATA.map((r) => (
          <div
            key={r.rune}
            className="absolute font-space text-xs transition-all duration-500"
            style={{
              left: r.left,
              top: r.top,
              transform: "translate(-50%, -50%)",
              color: r.color,
              textShadow: r.shadow,
              opacity: hovered ? 1 : 0.4,
              animation: `rune-float ${r.duration} ease-in-out infinite`,
              animationDelay: r.delay,
              fontSize: hovered ? "16px" : "12px",
            }}
          >
            {r.rune}
          </div>
        ))}
      </div>

      {/* ─── HOLOGRAPHIC FRAME (outer ring) ─── */}
      <div
        className="absolute inset-[-4px] rounded-full transition-all duration-500"
        style={{
          background: hovered
            ? "conic-gradient(from 0deg, #ffd700, #00f5ff, #aa00ff, #ff00aa, #ffd700)"
            : "conic-gradient(from 0deg, rgba(255,215,0,0.5), rgba(0,245,255,0.3), rgba(170,0,255,0.3), rgba(255,215,0,0.5))",
          animation: "spin-slow 8s linear infinite",
          padding: "2px",
        }}
      >
        <div className="h-full w-full rounded-full bg-[#020208]" />
      </div>

      {/* ─── INNER NEON RING ─── */}
      <div
        className="absolute inset-[6px] rounded-full transition-all duration-500"
        style={{
          border: hovered
            ? "1px solid rgba(255,215,0,0.6)"
            : "1px solid rgba(255,215,0,0.2)",
          boxShadow: hovered
            ? "0 0 15px rgba(255,215,0,0.3), inset 0 0 15px rgba(255,215,0,0.1)"
            : "0 0 8px rgba(255,215,0,0.1), inset 0 0 5px rgba(255,215,0,0.05)",
        }}
      />

      {/* ─── AVATAR IMAGE ─── */}
      <div className="relative aspect-square overflow-hidden rounded-full border-2 border-[rgba(255,215,0,0.15)] bg-[#020208]">
        <Image
          src={src}
          alt="Nguyên — Digital Immortal Cultivator"
          fill
          priority
          sizes="(max-width: 640px) 80vw, 352px"
          className="object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_40%,rgba(2,2,8,0.5)_100%)]" />
        {/* Golden light from top */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,215,0,0.08) 0%, transparent 40%, rgba(2,2,8,0.3) 100%)",
            opacity: hovered ? 1 : 0.6,
          }}
        />
      </div>

      {/* ─── ENERGY WAVE ON HOVER ─── */}
      {hovered && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-[-10%] rounded-full border-2 border-[rgba(255,215,0,0.4)]"
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="pointer-events-none absolute inset-[-10%] rounded-full border border-[rgba(0,245,255,0.3)]"
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.3,
            }}
          />
        </>
      )}

      {/* ─── BADGE ─── */}
      <div
        className="absolute -right-2 top-4 rounded-full border px-3 py-1 font-space text-[9px] uppercase tracking-[0.3em] transition-all duration-500"
        style={{
          borderColor: hovered
            ? "rgba(255,215,0,0.5)"
            : "rgba(255,215,0,0.2)",
          background: "rgba(2,2,8,0.8)",
          color: "#ffd700",
          textShadow: "0 0 8px rgba(255,215,0,0.4)",
          backdropFilter: "blur(10px)",
        }}
      >
        ◈ Qi Active
      </div>
    </motion.div>
  );
}
