"use client";

import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  House,
  Notebook,
  PaintBrush,
  Quotes,
  Target,
  Coffee,
  ArrowUpRight,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import type { LinkItem } from "@/lib/defaults";

const ICON_MAP: Record<string, typeof House> = {
  "Vibe Hub": House,
  "Daily Vibe Journal": Notebook,
  "Generative Art": PaintBrush,
  "Neon Quotes": Quotes,
  "Habit Tracker": Target,
  "Cà Phê Diary": Coffee,
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

const LinkCard = memo(function LinkCard({ item }: { item: LinkItem }) {
  const Icon = ICON_MAP[item.name] ?? Sparkle;
  return (
    <motion.a
      variants={fade}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/60 text-zinc-300 transition-colors group-hover:border-emerald-400/40 group-hover:text-emerald-400">
        <Icon weight="regular" className="size-5" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-medium text-zinc-100">
            {item.name}
          </h3>
          <ArrowUpRight
            weight="bold"
            className="size-4 shrink-0 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400"
          />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {item.subtitle}
        </p>
      </div>
    </motion.a>
  );
});

export default function LinksSection({ links }: { links: LinkItem[] }) {
  return (
    <section id="links" className="scroll-mt-20 py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fade} className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Things I&rsquo;ve built</span>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Side projects.
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500 md:text-sm">
            {links.length.toString().padStart(2, "0")} live
          </span>
        </motion.div>

        <motion.div
          variants={container}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {links.map((item) => (
            <LinkCard key={item.name} item={item} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
