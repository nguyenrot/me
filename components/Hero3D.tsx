"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { HeroContent } from "@/lib/defaults";

/* ─── Per-letter colors ─── */
const LETTER_GRADIENTS = [
  "linear-gradient(160deg, #cc55ff 0%, #ffffff 60%, #aa44ff 100%)",
  "linear-gradient(160deg, #aa44ff 0%, #dd88ff 50%, #00ccff 100%)",
  "linear-gradient(160deg, #9933ff 0%, #ffffff 55%, #66ddff 100%)",
  "linear-gradient(160deg, #00ccff 0%, #ffffff 50%, #aa44ff 100%)",
  "linear-gradient(160deg, #00aaff 0%, #ccffff 50%, #cc55ff 100%)",
  "linear-gradient(160deg, #cc55ff 0%, #ffffff 60%, #00ccff 100%)",
];

function HeroTitle() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [glitching, setGlitching] = useState(false);

  /* Mouse 3D tilt */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const dx = (e.clientX / window.innerWidth - 0.5) * 2;
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `perspective(700px) rotateY(${dx * 10}deg) rotateX(${-dy * 6}deg)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Periodic glitch */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => { setGlitching(false); schedule(); }, 130);
      }, 2600 + Math.random() * 2800);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);

  const letters = ["N", "G", "U", "Y", "Ê", "N"];

  return (
    <div
      ref={wrapRef}
      className="relative mt-4 select-none"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.12s ease-out" }}
    >
      {/* Drop shadow layer */}
      <h1
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 font-orbitron font-black leading-none"
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "1px rgba(170,68,255,0.25)",
          filter: "blur(18px)",
          transform: "translate(0, 6px)",
          opacity: 0.7,
        }}
      >
        NGUYÊN
      </h1>

      {/* Main letters */}
      <h1
        className="relative font-orbitron font-black leading-none"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 70, scale: 0.4 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.35 + i * 0.09,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.18, y: -6, transition: { duration: 0.2 } }}
            style={{
              background: LETTER_GRADIENTS[i],
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: `holo-shift ${3.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.18}s`,
              cursor: "default",
              filter: `drop-shadow(0 0 ${14 + i * 2}px rgba(${i % 2 === 0 ? "170,68,255" : "0,204,255"},0.55))`,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      {/* Glitch chromatic aberration */}
      {glitching && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <h1
            className="absolute inset-0 font-orbitron font-black leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#ff0055",
              WebkitTextFillColor: "#ff0055",
              transform: "translate(-5px, 0)",
              clipPath: "polygon(0 15%, 100% 15%, 100% 40%, 0 40%)",
              opacity: 0.9,
              mixBlendMode: "screen",
            }}
          >NGUYÊN</h1>
          <h1
            className="absolute inset-0 font-orbitron font-black leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#00ffff",
              WebkitTextFillColor: "#00ffff",
              transform: "translate(5px, 0)",
              clipPath: "polygon(0 60%, 100% 60%, 100% 85%, 0 85%)",
              opacity: 0.9,
              mixBlendMode: "screen",
            }}
          >NGUYÊN</h1>
          <h1
            className="absolute inset-0 font-orbitron font-black leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
              transform: "translate(2px, -2px)",
              clipPath: "polygon(0 42%, 100% 42%, 100% 58%, 0 58%)",
              opacity: 0.4,
              mixBlendMode: "screen",
            }}
          >NGUYÊN</h1>
        </div>
      )}
    </div>
  );
}

export default function Hero3D({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* HTML Overlay — two-column on md+ */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:items-center md:justify-center md:gap-16 lg:gap-20">

        {/* ─── LEFT: Avatar ─── */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative" style={{ width: 266, height: 266 }}>

            {/* ── Pulse ripple rings ── */}
            {[0, 1.0, 2.0].map((delay, i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute rounded-full"
                style={{ inset: -6, border: "1px solid rgba(170,68,255,0.55)", borderRadius: "50%" }}
                initial={{ scale: 1, opacity: 0.55 }}
                animate={{ scale: 1.75, opacity: 0 }}
                transition={{ duration: 2.6, delay, repeat: Infinity, ease: "easeOut" }}
              />
            ))}

            {/* ── Radar sweep ── */}
            <motion.div
              className="pointer-events-none absolute overflow-hidden rounded-full"
              style={{
                inset: 3,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, transparent 0deg, rgba(0,204,255,0.14) 28deg, rgba(170,68,255,0.1) 55deg, transparent 85deg)",
                zIndex: 2,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />

            {/* ── Outer rotating ring (conic) ── */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "conic-gradient(from 0deg, #aa44ff, #00ccff, #ff66cc, #aa44ff)", padding: "2px", borderRadius: "50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />

            {/* ── Second ring counter-rotating ── */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: "-16px", border: "1px solid rgba(0,204,255,0.3)", borderRadius: "50%" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#00ccff]"
                style={{ boxShadow: "0 0 10px #00ccff, 0 0 24px rgba(0,204,255,0.6)" }} />
              <div className="absolute bottom-1/4 right-0 translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[#00ccff]"
                style={{ boxShadow: "0 0 5px #00ccff" }} />
            </motion.div>

            {/* ── Third ring dashed ── */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: "-30px", border: "1px dashed rgba(170,68,255,0.25)", borderRadius: "50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/4 left-0 -translate-x-1/2 h-2 w-2 rounded-full bg-[#aa44ff]"
                style={{ boxShadow: "0 0 8px #aa44ff, 0 0 18px rgba(170,68,255,0.5)" }} />
              <div className="absolute bottom-0 right-1/3 translate-y-1/2 h-1 w-1 rounded-full bg-[#ff66cc]"
                style={{ boxShadow: "0 0 5px #ff66cc" }} />
            </motion.div>

            {/* ── HUD corner brackets ── */}
            {[
              { style: { top: -38, left: -38 }, borders: "border-t-2 border-l-2" },
              { style: { top: -38, right: -38 }, borders: "border-t-2 border-r-2" },
              { style: { bottom: -38, left: -38 }, borders: "border-b-2 border-l-2" },
              { style: { bottom: -38, right: -38 }, borders: "border-b-2 border-r-2" },
            ].map((b, i) => (
              <motion.div
                key={i}
                className={`absolute h-5 w-5 ${b.borders} border-[rgba(0,204,255,0.75)]`}
                style={b.style}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.4, ease: "easeOut" }}
              />
            ))}

            {/* ── Gradient border wrapper ── */}
            <div
              className="relative rounded-full"
              style={{
                padding: "3px",
                background: "linear-gradient(135deg, #aa44ff 0%, #00ccff 40%, #ff66cc 70%, #aa44ff 100%)",
                borderRadius: "50%",
                boxShadow: "0 0 40px rgba(170,68,255,0.55), 0 0 80px rgba(170,68,255,0.25), 0 0 130px rgba(0,204,255,0.15)",
              }}
            >
              {/* Avatar image */}
              <div className="relative overflow-hidden rounded-full" style={{ width: 260, height: 260 }}>
                <Image src="/images/avatar.png" alt="Nguyên" fill className="object-cover object-center" priority />

                {/* Holographic sheen */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(170,68,255,0.14) 0%, transparent 45%, rgba(0,204,255,0.12) 100%)",
                    animation: "holo-shift 7s ease-in-out infinite",
                    mixBlendMode: "screen",
                  }}
                />

                {/* Scanline sweep */}
                <motion.div
                  className="pointer-events-none absolute left-0 right-0"
                  style={{
                    height: 3,
                    background: "linear-gradient(90deg, transparent 0%, rgba(0,204,255,0.55) 35%, rgba(170,68,255,0.45) 65%, transparent 100%)",
                    filter: "blur(1px)",
                  }}
                  initial={{ top: "-5%" }}
                  animate={{ top: "108%" }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
                />

                {/* Vignette */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle at 50% 50%, transparent 52%, rgba(4,1,13,0.55) 100%)" }}
                />
              </div>
            </div>

          </div>

          {/* Status badge */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(170,68,255,0.25)] bg-[rgba(4,1,13,0.6)] px-3 py-1.5 backdrop-blur-sm">
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
              {content.badge}
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
          <HeroTitle />

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
            {content.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-4 max-w-md font-space text-xs tracking-[0.15em] text-[rgba(200,216,255,0.5)] sm:text-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {content.description}
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
              <span className="relative z-10">{content.ctaText}</span>
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

    </section>
  );
}
