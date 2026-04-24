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
  heroSubtitleStyle,
  heroTitleStyle,
  heroTransition,
} from "./motion/heroEffects";

const HeroSectionScene = dynamic(() => import("./3d/HeroSectionScene"), { ssr: false });

const SKILLS = [
  { name: "Python", description: "The universal elixir — a versatile spirit language, the foundation for all arts from backend sorcery to AI cultivation.", level: 92, color: "#ffd700", icon: "🐍" },
  { name: "Django", description: "An impenetrable heavenly fortress — a battle-tested framework for building web realms at divine speed.", level: 88, color: "#00f5ff", icon: "🏯" },
  { name: "API Development", description: "The art of divine bridges — designing REST & GraphQL APIs, connecting all things across the Digital Realm.", level: 90, color: "#aa00ff", icon: "🌉" },
  { name: "Integration", description: "The fusion formation — connecting systems, third-party services, and orchestrating data flow between realms.", level: 85, color: "#ff00aa", icon: "🔗" },
  { name: "Algorithmic Thinking", description: "The art of the heavenly mind — algorithmic reasoning, optimization, and problem-solving at the spiritual intellect level.", level: 83, color: "#ffd700", icon: "🧠" },
  { name: "AI Agents", description: "The spirit puppet technique — building autonomous AI agents, LLM orchestration, and prompt cultivation.", level: 78, color: "#00f5ff", icon: "🤖" },
  { name: "Database Software", description: "The ancient archive hall — PostgreSQL, MongoDB, Redis — storing and querying knowledge across ten thousand ages.", level: 87, color: "#aa00ff", icon: "📚" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <HeroSectionScene />

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
            {SKILLS.length} divine arts mastered · cultivation in progress · seeking dao
          </p>
          <div className={heroDividerClassName} />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {SKILLS.map((skill, index) => (
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
