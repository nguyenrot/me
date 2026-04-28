"use client";

import { motion } from "framer-motion";
import Card3D from "./Card3D";
import type { AboutContent } from "@/lib/defaults";
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

export default function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          {...heroHeaderMotion}
          transition={heroTransition(0.3, 0.8)}
        >
          <p className={heroEyebrowClassName}>
            {">"} cat /origin/about.scroll
          </p>
          <h2
            className="mt-4 font-orbitron text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            style={heroTitleStyle}
          >
            {"// ORIGIN SCROLL"}
          </h2>
          <div className={heroDividerClassName} />
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Origin Story */}
          <motion.div
            {...heroCardMotion}
            transition={heroTransition(0.4, 1.2)}
          >
            <Card3D className="glass-dark group relative overflow-hidden rounded-2xl p-8 sm:p-10" glowColor={heroAccent(0)}>
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0" style={heroScanlineStyle} />
              </div>
              <div className="relative z-10 space-y-6 text-base leading-8 text-[rgba(200,216,255,0.82)] sm:text-lg">
                {content.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Quote */}
              <div className="relative z-10 mt-8 border-l-[3px] border-[rgba(170,68,255,0.45)] pl-6">
                <span className="absolute -left-1 -top-4 font-orbitron text-3xl text-[rgba(170,68,255,0.35)]">
                  &ldquo;
                </span>
                <p className="text-base italic leading-8 text-[rgba(200,216,255,0.7)] sm:text-lg">
                  {content.quote}
                </p>
              </div>
            </Card3D>
          </motion.div>

          {/* Info Cards */}
          <div className="space-y-4">
            {content.infoCards.map((item, i) => (
              <motion.div
                key={item.label}
                {...heroCardMotion}
                transition={heroStagger(i, 0.48, 0.08, 0.85)}
              >
                <Card3D className="glass-dark group relative overflow-hidden rounded-xl p-5" glowColor={heroAccent(i)}>
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute inset-0" style={heroScanlineStyle} />
                  </div>
                  <div className="relative z-10">
                    <p
                      className="font-space text-[9px] uppercase tracking-[0.35em]"
                      style={{ color: `${heroAccent(i)}99` }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-2 text-lg font-bold"
                      style={{
                        color: heroAccent(i),
                        textShadow: `0 0 12px ${heroAccent(i)}40`,
                      }}
                    >
                      {item.value}
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
