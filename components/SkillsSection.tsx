"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Card3D from "./Card3D";

const SkillsScene = dynamic(() => import("./3d/SkillsScene"), { ssr: false });

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
      <SkillsScene />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-space text-[11px] uppercase tracking-[0.4em] text-[rgba(0,245,255,0.5)]">
            {">"} ls -la /cultivation/divine_arts
          </p>
          <h2
            className="mt-4 font-orbitron text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            style={{ color: "#ffd700", textShadow: "0 0 20px rgba(255,215,0,0.3)" }}
          >
            // CULTIVATION REALM
          </h2>
          <p className="mt-3 font-space text-xs text-[rgba(200,216,255,0.45)]">
            {SKILLS.length} divine arts mastered · cultivation in progress · seeking dao
          </p>
          <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#ffd700] via-[#00f5ff] to-transparent" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
            >
              <Card3D className="glass-dark group relative overflow-hidden rounded-2xl p-6" glowColor={skill.color}>
                {/* Hover scanline */}
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255,215,0,0.02), transparent)",
                      animation: "scanline-sweep 3s linear infinite",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-orbitron text-sm font-bold text-white/90 sm:text-base">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="font-space text-xs font-bold" style={{ color: skill.color }}>
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
                      transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: "easeOut" }}
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                        boxShadow: `0 0 12px ${skill.color}60, 0 0 24px ${skill.color}20`,
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
