"use client";

import { motion } from "framer-motion";
import Card3D from "./Card3D";
import type { JourneyItem } from "@/lib/defaults";
import {
  heroAccent,
  heroCardMotion,
  heroDividerClassName,
  heroEyebrowClassName,
  heroHeaderMotion,
  heroScanlineStyle,
  heroStagger,
  heroTitleStyle,
  heroTransition,
} from "./motion/heroEffects";

export default function ExperienceSection({ journey }: { journey: JourneyItem[] }) {
  return (
    <section id="journey" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          {...heroHeaderMotion}
          transition={heroTransition(0.3, 0.8)}
        >
          <p className={heroEyebrowClassName}>
            {">"} cat /cultivation/journey.log
          </p>
          <h2
            className="mt-4 font-orbitron text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            style={heroTitleStyle}
          >
            {"// CULTIVATION JOURNEY"}
          </h2>
          <div className={heroDividerClassName} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-[rgba(170,68,255,0.7)] via-[rgba(0,204,255,0.35)] to-[rgba(170,68,255,0.12)] sm:left-7" />

          <div className="space-y-6">
            {journey.map((item, index) => (
              <motion.div
                key={item.period + item.org}
                className="relative pl-12 sm:pl-16"
                {...heroCardMotion}
                transition={heroStagger(index, 0.4, 0.08, 0.9)}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[6px] top-6 h-4 w-4 rounded-full sm:left-[18px]"
                  style={{
                    background: `radial-gradient(circle, ${heroAccent(index)}, ${heroAccent(index)}40)`,
                    boxShadow: `0 0 12px ${heroAccent(index)}60, 0 0 24px ${heroAccent(index)}20`,
                  }}
                />

                {/* Card */}
                <Card3D className="glass-dark group relative overflow-hidden rounded-2xl p-6 sm:p-8" glowColor={heroAccent(index)}>
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute inset-0" style={heroScanlineStyle} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full border px-3 py-1 font-space text-[8px] uppercase tracking-[0.3em]"
                        style={{
                          borderColor: `${heroAccent(index)}40`,
                          color: heroAccent(index),
                          background: `${heroAccent(index)}10`,
                        }}
                      >
                        {item.badge}
                      </span>
                      <span className="font-space text-[10px] uppercase tracking-[0.25em] text-[rgba(200,216,255,0.4)]">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="mt-4 font-orbitron text-lg font-bold text-white/90 sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-space text-xs" style={{ color: `${heroAccent(index)}99` }}>
                      {item.org}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-[rgba(200,216,255,0.65)] sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
