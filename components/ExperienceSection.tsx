"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Card3D from "./Card3D";

const ExperienceScene = dynamic(() => import("./3d/ExperienceScene"), { ssr: false });

const JOURNEY = [
  { period: "2026 — Present", title: "Software Development Engineer", org: "Workday", description: "Breakthrough to a new realm — joined one of the world's leading sects. Full-time cultivation, on-site. Elevating code mastery to an entirely new level of power.", accent: "#ffd700", badge: "CORE FORMATION" },
  { period: "2022 — 2026", title: "Software Engineer", org: "Paradox", description: "3 years 10 months of secluded cultivation in the Đà Nẵng Realm. Built a rock-solid foundation, mastering Django, SQL, and many other arts. Rose from disciple to pillar of the sect.", accent: "#00f5ff", badge: "FOUNDATION BUILDING" },
  { period: "2022", title: "Software Engineer", org: "Paradox — Scottsdale, AZ", description: "Dispatched to Scottsdale, Arizona, USA — 2 months on-site. Experienced international cultivation, broadened cross-realm perspectives, and refined Django & Python skills in a global environment.", accent: "#aa00ff", badge: "OVERSEAS EXPEDITION" },
  { period: "2021 — 2022", title: "Engineer Intern", org: "Paradox", description: "The spirit root awakened — first steps into the Paradox sect in Đà Nẵng. 5 months of on-site apprenticeship, comprehending the fundamentals of Vue.js and JavaScript. The cultivation path begins.", accent: "#ff00aa", badge: "QI CONDENSATION" },
  { period: "2018 — 2022", title: "Bachelor's Degree", org: "Duy Tan University", description: "4 years of foundational cultivation at Duy Tan University, Đà Nẵng. Studied Computer Software Engineering, graduated with 'Good' classification. The sacred scriptures of code were first revealed here.", accent: "#ffd700", badge: "MORTAL REALM" },
];

export default function ExperienceSection() {
  return (
    <section id="journey" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <ExperienceScene />

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
            {">"} cat /cultivation/journey.log
          </p>
          <h2
            className="mt-4 font-orbitron text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            style={{ color: "#ffd700", textShadow: "0 0 20px rgba(255,215,0,0.3)" }}
          >
            // CULTIVATION JOURNEY
          </h2>
          <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#ffd700] via-[#00f5ff] to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-[rgba(255,215,0,0.6)] via-[rgba(0,245,255,0.3)] to-[rgba(170,0,255,0.15)] sm:left-7" />

          <div className="space-y-6">
            {JOURNEY.map((item, index) => (
              <motion.div
                key={item.period + item.org}
                className="relative pl-12 sm:pl-16"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[6px] top-6 h-4 w-4 rounded-full sm:left-[18px]"
                  style={{
                    background: `radial-gradient(circle, ${item.accent}, ${item.accent}40)`,
                    boxShadow: `0 0 12px ${item.accent}60, 0 0 24px ${item.accent}20`,
                  }}
                />

                {/* Card */}
                <Card3D className="glass-dark relative overflow-hidden rounded-2xl p-6 sm:p-8" glowColor={item.accent}>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full border px-3 py-1 font-space text-[8px] uppercase tracking-[0.3em]"
                        style={{
                          borderColor: `${item.accent}30`,
                          color: item.accent,
                          background: `${item.accent}08`,
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
                    <p className="mt-1 font-space text-xs" style={{ color: `${item.accent}90` }}>
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
