"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const h = sectionRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / h));
      scrollProgressRef.current = progress;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Hero3DScene scrollProgress={scrollProgressRef} />
      </div>

      {/* HTML Overlay — two-column on md+ */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:items-center md:gap-16 lg:gap-24">

        {/* ─── LEFT: Avatar ─── */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #aa44ff, #00ccff, #aa44ff)",
                padding: "2px",
                borderRadius: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Second ring, counter-rotating */}
            <motion.div
              className="absolute rounded-full border border-[rgba(0,204,255,0.25)]"
              style={{
                inset: "-12px",
                borderRadius: "50%",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              {/* Dot on the ring */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#00ccff]"
                style={{ boxShadow: "0 0 8px #00ccff, 0 0 20px rgba(0,204,255,0.5)" }}
              />
            </motion.div>

            {/* Third ring */}
            <motion.div
              className="absolute rounded-full border border-[rgba(170,68,255,0.18)]"
              style={{
                inset: "-24px",
                borderRadius: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#aa44ff]"
                style={{ boxShadow: "0 0 6px #aa44ff, 0 0 16px rgba(170,68,255,0.5)" }}
              />
            </motion.div>

            {/* Gradient border wrapper */}
            <div
              className="relative rounded-full"
              style={{
                padding: "3px",
                background: "linear-gradient(135deg, #aa44ff 0%, #00ccff 50%, #aa44ff 100%)",
                borderRadius: "50%",
                boxShadow:
                  "0 0 30px rgba(170,68,255,0.4), 0 0 60px rgba(170,68,255,0.2), 0 0 100px rgba(0,204,255,0.15)",
              }}
            >
              {/* Glow pulse behind avatar */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(170,68,255,0.3) 0%, rgba(0,204,255,0.15) 50%, transparent 70%)",
                  borderRadius: "50%",
                }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Avatar image */}
              <div
                className="relative overflow-hidden rounded-full"
                style={{ width: 260, height: 260 }}
              >
                <Image
                  src="/images/avatar.png"
                  alt="Nguyên"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Inner vignette overlay */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, transparent 55%, rgba(2,2,8,0.4) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Status badge below avatar */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(170,68,255,0.25)] bg-[rgba(2,2,8,0.6)] px-3 py-1.5 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ccff] shadow-[0_0_6px_rgba(0,204,255,0.7)]" />
              <span className="font-space text-[9px] uppercase tracking-[0.25em] text-[rgba(0,204,255,0.8)]">
                Qi Active · Đà Nẵng-001
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Text content ─── */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(170,68,255,0.2)] bg-[rgba(2,2,8,0.5)] px-4 py-2 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#aa44ff] shadow-[0_0_8px_rgba(170,68,255,0.7)]" />
            <span className="font-space text-[10px] uppercase tracking-[0.3em] text-[rgba(200,216,255,0.65)]">
              Cultivator Profile · Foundation Establishment
            </span>
          </motion.div>

          {/* Floating Runes */}
          <motion.div
            className="pointer-events-none mt-4 flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {["道", "氣", "元", "仙", "∞"].map((rune, i) => (
              <span
                key={rune}
                className="font-orbitron text-xl sm:text-2xl md:text-3xl"
                style={{
                  color: i % 2 === 0 ? "#aa44ff" : "#00ccff",
                  textShadow:
                    i % 2 === 0
                      ? "0 0 12px rgba(170,68,255,0.7), 0 0 30px rgba(170,68,255,0.3)"
                      : "0 0 12px rgba(0,204,255,0.7), 0 0 30px rgba(0,204,255,0.3)",
                  animation: `rune-float ${3 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {rune}
              </span>
            ))}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="mt-4 font-orbitron font-black leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              background:
                "linear-gradient(135deg, #aa44ff 0%, #cc66ff 30%, #ffffff 50%, #00ccff 70%, #aa44ff 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "holo-shift 4s ease-in-out infinite",
              filter: "drop-shadow(0 0 20px rgba(170,68,255,0.4))",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            NGUYÊN
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-2 font-space text-sm uppercase tracking-[0.4em] sm:text-base"
            style={{
              background: "linear-gradient(90deg, #aa44ff, #00ccff, #aa44ff)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "holo-shift 3s ease-in-out infinite",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          >
            元 // Digital Immortal Cultivator
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-4 max-w-md font-space text-xs tracking-[0.15em] text-[rgba(200,216,255,0.5)] sm:text-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Code & Qi Dual Cultivator | Đà Nẵng Realm
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.95 }}
          >
            <a
              href="#about"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(170,68,255,0.35)] bg-[rgba(170,68,255,0.08)] px-8 py-3.5 font-orbitron text-sm tracking-[0.2em] text-[#cc88ff] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(170,68,255,0.7)] hover:bg-[rgba(170,68,255,0.15)] hover:text-white hover:shadow-[0_0_40px_rgba(170,68,255,0.25)]"
            >
              <span className="relative z-10">Enter My Realm</span>
              <span className="relative z-10 text-lg">⚡</span>
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(170,68,255,0.06) 50%, transparent 100%)",
                    animation: "scanline-sweep 2s linear infinite",
                  }}
                />
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
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
          <div className="h-8 w-[1px] bg-gradient-to-b from-[rgba(170,68,255,0.4)] to-transparent" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#020208] to-transparent" />
    </section>
  );
}
