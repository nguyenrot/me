"use client";

import { motion, type Variants } from "framer-motion";
import type { JourneyItem } from "@/lib/defaults";

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
  show: { transition: { staggerChildren: 0.06 } },
};

export default function ExperienceSection({ journey }: { journey: JourneyItem[] }) {
  return (
    <section id="journey" className="scroll-mt-20 py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="flex flex-col gap-12"
      >
        <motion.div variants={fade} className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Experience</span>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Where I&rsquo;ve been.
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500 md:text-sm">
            {journey.length.toString().padStart(2, "0")} chapters
          </span>
        </motion.div>

        <motion.ol variants={container} className="flex flex-col">
          {journey.map((item, i) => (
            <motion.li
              key={`${item.period}-${item.org}`}
              variants={fade}
              className={`grid grid-cols-1 gap-3 py-8 md:grid-cols-[160px_1fr] md:gap-10 ${
                i === 0 ? "" : "border-t border-zinc-800"
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-zinc-500">
                  {item.period}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-medium text-zinc-100 md:text-xl">
                    {item.title}
                  </h3>
                  <span className="text-sm text-emerald-400">{item.org}</span>
                </div>
                <p className="max-w-[64ch] text-sm leading-relaxed text-zinc-400 md:text-base">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}
