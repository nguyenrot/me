"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Card3D from "./Card3D";
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

const HeroSectionScene = dynamic(() => import("./3d/HeroSectionScene"), { ssr: false });

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <HeroSectionScene />

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
                <p>
                  Born and raised in <span className="text-[#cc88ff]">Đà Nẵng, Việt Nam</span> — a
                  coastal city where sky meets ocean, generating abundant spiritual
                  energy. Started the cultivation path as an Engineer Intern at{" "}
                  <span className="text-[#00ccff]">Paradox</span> in late 2021, awakening the code
                  spirit within and beginning the journey of Dual Cultivation:
                  mastering both technology and craftsmanship.
                </p>
                <p>
                  After nearly 4 years cultivating at Paradox — including an
                  overseas expedition to <span className="text-[#cc66ff]">Scottsdale, Arizona</span> — the
                  foundation was established. Now advancing to a new realm as a
                  Software Development Engineer at{" "}
                  <span className="text-[#00ccff]">Workday</span>, pushing boundaries and forging
                  a core of pure code energy.
                </p>
              </div>

              {/* Quote */}
              <div className="relative z-10 mt-8 border-l-[3px] border-[rgba(170,68,255,0.45)] pl-6">
                <span className="absolute -left-1 -top-4 font-orbitron text-3xl text-[rgba(170,68,255,0.35)]">
                  &ldquo;
                </span>
                <p className="text-base italic leading-8 text-[rgba(200,216,255,0.7)] sm:text-lg">
                  The Dao gives birth to One, One gives birth to Two, Two gives
                  birth to Three, Three gives birth to all things. — From an idea,
                  code is born. From code, products emerge. From products, entire
                  digital worlds arise.
                </p>
              </div>
            </Card3D>
          </motion.div>

          {/* Info Cards */}
          <div className="space-y-4">
            {[
              { label: "◈ NAME", value: "Phạm Kỷ Nguyên" },
              { label: "⌖ LOCATION", value: "Đà Nẵng, Việt Nam" },
              { label: "⚙ ROLE", value: "Software Development Engineer" },
              { label: "⟐ SECT", value: "Workday" },
            ].map((item, i) => (
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
