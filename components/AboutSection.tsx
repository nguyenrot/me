"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Card3D from "./Card3D";

const AboutScene = dynamic(() => import("./3d/AboutScene"), { ssr: false });

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-8 sm:py-32">
      {/* 3D Background */}
      <AboutScene />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-space text-[11px] uppercase tracking-[0.4em] text-[rgba(0,245,255,0.5)]">
            {">"} cat /origin/about.scroll
          </p>
          <h2
            className="mt-4 font-orbitron text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            style={{
              color: "#ffd700",
              textShadow: "0 0 20px rgba(255,215,0,0.3)",
            }}
          >
            // ORIGIN SCROLL
          </h2>
          <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#ffd700] via-[#00f5ff] to-transparent" />
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Origin Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card3D className="glass-dark relative overflow-hidden rounded-2xl p-8 sm:p-10" glowColor="#ffd700">
              <div className="relative z-10 space-y-6 text-base leading-8 text-[rgba(200,216,255,0.82)] sm:text-lg">
                <p>
                  Born and raised in <span className="text-[#ffd700]">Đà Nẵng, Việt Nam</span> — a
                  coastal city where sky meets ocean, generating abundant spiritual
                  energy. Started the cultivation path as an Engineer Intern at{" "}
                  <span className="text-[#00f5ff]">Paradox</span> in late 2021, awakening the code
                  spirit within and beginning the journey of Dual Cultivation:
                  mastering both technology and craftsmanship.
                </p>
                <p>
                  After nearly 4 years cultivating at Paradox — including an
                  overseas expedition to <span className="text-[#aa00ff]">Scottsdale, Arizona</span> — the
                  foundation was established. Now advancing to a new realm as a
                  Software Development Engineer at{" "}
                  <span className="text-[#00f5ff]">Workday</span>, pushing boundaries and forging
                  a core of pure code energy.
                </p>
              </div>

              {/* Quote */}
              <div className="relative z-10 mt-8 border-l-[3px] border-[rgba(255,215,0,0.4)] pl-6">
                <span className="absolute -left-1 -top-4 font-orbitron text-3xl text-[rgba(255,215,0,0.3)]">
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
              { label: "◈ NAME", value: "Phạm Kỷ Nguyên", color: "#ffd700" },
              { label: "⌖ LOCATION", value: "Đà Nẵng, Việt Nam", color: "#00f5ff" },
              { label: "⚙ ROLE", value: "Software Development Engineer", color: "#aa00ff" },
              { label: "⟐ SECT", value: "Workday", color: "#ffd700" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card3D className="glass-dark relative overflow-hidden rounded-xl p-5" glowColor={item.color}>
                  <div className="relative z-10">
                    <p
                      className="font-space text-[9px] uppercase tracking-[0.35em]"
                      style={{ color: `${item.color}80` }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-2 text-lg font-bold"
                      style={{
                        color: item.color,
                        textShadow: `0 0 12px ${item.color}40`,
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
