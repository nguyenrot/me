"use client";

import { motion } from "framer-motion";
import Card3D from "./Card3D";
import type { Skill } from "@/lib/defaults";
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

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          {...heroHeaderMotion}
          transition={heroTransition(0.3, 0.8)}
        >
          <p className={heroEyebrowClassName}>
            {">"} ls -la /cultivation/divine_arts
          </p>
          <h2
            className="mt-4 font-orbitron text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            style={heroTitleStyle}
          >
            {"// CULTIVATION REALM"}
          </h2>
          <p className="mt-3 font-space text-xs" style={heroSubtitleStyle}>
            {skills.length} divine arts mastered · cultivation in progress · seeking dao
          </p>
          <div className={heroDividerClassName} />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              {...heroCardMotion}
              transition={heroStagger(index, 0.4, 0.08, 0.85)}
            >
              <Card3D className="glass-dark group relative overflow-hidden rounded-2xl p-6" glowColor={heroAccent(index)}>
                {/* Hover scanline */}
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute inset-0" style={heroScanlineStyle} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-orbitron text-sm font-bold text-white/90 sm:text-base">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="font-space text-xs font-bold" style={{ color: heroAccent(index) }}>
                      {skill.level}%
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[rgba(200,216,255,0.6)]">
                    {skill.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={heroStagger(index, 0.55, 0.08, 1.2)}
                      style={{
                        background: `linear-gradient(90deg, ${heroAccent(index)}, ${heroAccent(index)}80)`,
                        boxShadow: `0 0 12px ${heroAccent(index)}60, 0 0 24px ${heroAccent(index)}20`,
                      }}
                    />
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
