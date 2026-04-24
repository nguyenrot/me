"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Card3D from "./Card3D";
import {
  heroAccent,
  heroCardMotion,
  heroDividerClassName,
  heroEyebrowClassName,
  heroHeaderMotion,
  heroScanlineStyle,
  heroStagger,
  heroSubtitleStyle,
  heroTitleStyle,
  heroTransition,
} from "./motion/heroEffects";

const PROJECTS = [
  { icon: "🌐", name: "Vibe Hub", subtitle: "Main portal — personal digital realm hub", link: "https://pkn.io.vn", accent: "#ffd700" },
  { icon: "🌙", name: "Daily Vibe Journal", subtitle: "Neural mood logging system", link: "https://journal.pkn.io.vn", accent: "#00f5ff" },
  { icon: "🎨", name: "Generative Art", subtitle: "Procedural canvas engine", link: "https://art.pkn.io.vn", accent: "#aa00ff" },
  { icon: "💡", name: "Neon Quotes", subtitle: "Holographic quote collector", link: "https://quotes.pkn.io.vn", accent: "#ff00aa" },
  { icon: "🔮", name: "Habit Tracker", subtitle: "Behavioral cultivation matrix", link: "https://habits.pkn.io.vn", accent: "#00ff88" },
  { icon: "☕", name: "Cà Phê Diary", subtitle: "Coffee journey logs — Đà Nẵng", link: "https://cafe.pkn.io.vn", accent: "#ffaa00" },
];

export default function LinksSection() {
  return (
    <section id="treasures" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          {...heroHeaderMotion}
          transition={heroTransition(0.3, 0.8)}
        >
          <p className={heroEyebrowClassName}>
            {">"} ls /vault/spiritual_treasures
          </p>
          <h2
            className="mt-4 font-orbitron text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            style={heroTitleStyle}
          >
            {"// SPIRITUAL TREASURES"}
          </h2>
          <p className="mt-3 font-space text-xs" style={heroSubtitleStyle}>
            {PROJECTS.length} artifacts discovered · all realms accessible
          </p>
          <div className={heroDividerClassName} />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              {...heroCardMotion}
              transition={heroStagger(index, 0.4, 0.08, 0.85)}
            >
              <Card3D
                as="a"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="glass-dark group relative block overflow-hidden rounded-2xl p-6"
                glowColor={heroAccent(index)}
              >
                {/* Hover border glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1px ${heroAccent(index)}40, 0 0 20px ${heroAccent(index)}20` }}
                />

                {/* Scanline */}
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute inset-0" style={heroScanlineStyle} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-3xl">{project.icon}</span>
                      <h3 className="mt-3 font-orbitron text-base font-bold text-white/90">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[rgba(200,216,255,0.55)]">
                        {project.subtitle}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      style={{ color: `${heroAccent(index)}99` }}
                    />
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="mt-5 h-px rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${heroAccent(index)}60, transparent)` }}
                  />
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
