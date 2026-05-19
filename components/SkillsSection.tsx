"use client";

import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Code,
  Browsers,
  PlugsConnected,
  LinkSimple,
  Brain,
  Robot,
  Database,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import type { Skill } from "@/lib/defaults";

const ICON_MAP: Record<string, typeof Code> = {
  Python: Code,
  Django: Browsers,
  "API Development": PlugsConnected,
  Integration: LinkSimple,
  "Algorithmic Thinking": Brain,
  "AI Agents": Robot,
  "Database Software": Database,
};

const fade: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22 },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const spanClass = (index: number, total: number) => {
  if (total < 4) return "lg:col-span-1";
  if (index === 0 || index === total - 1) return "lg:col-span-2";
  return "lg:col-span-1";
};

const SkillTile = memo(function SkillTile({
  skill,
  span,
  featured,
}: {
  skill: Skill;
  span: string;
  featured: boolean;
}) {
  const Icon = ICON_MAP[skill.name] ?? Sparkle;
  return (
    <motion.div
      variants={fade}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700 ${span}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/60 text-zinc-300 transition-colors group-hover:border-emerald-400/40 group-hover:text-emerald-400">
          <Icon weight="regular" className="size-[18px]" />
        </div>
        <span className="font-mono text-xs text-zinc-500">
          {String(skill.level).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium text-zinc-100">{skill.name}</h3>
        <p
          className={`text-sm leading-relaxed text-zinc-400 ${featured ? "max-w-[52ch]" : ""}`}
        >
          {skill.description}
        </p>
      </div>

      <div className="mt-auto pt-4">
        <div className="h-px w-full bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 80, damping: 24, delay: 0.1 }}
            className="h-px bg-emerald-400"
          />
        </div>
      </div>
    </motion.div>
  );
});

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="scroll-mt-20 py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fade} className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Skills</span>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              What I work with daily.
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500 md:text-sm">
            {skills.length.toString().padStart(2, "0")} disciplines
          </span>
        </motion.div>

        <motion.div
          variants={container}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill, i) => (
            <SkillTile
              key={skill.name}
              skill={skill}
              span={spanClass(i, skills.length)}
              featured={i === 0 || i === skills.length - 1}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
