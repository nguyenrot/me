"use client";

import { motion, type Variants } from "framer-motion";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import type { AboutContent } from "@/lib/defaults";

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
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

const stripLabelGlyph = (label: string) =>
  label.replace(/^[^\p{L}\p{N}]+/u, "").trim();

export default function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20"
      >
        <div className="flex flex-col gap-6">
          <motion.span variants={fade} className="eyebrow">
            About
          </motion.span>
          <motion.h2
            variants={fade}
            className="max-w-[18ch] text-3xl font-medium leading-tight tracking-tight md:text-5xl"
          >
            Building reliable systems, one merge at a time.
          </motion.h2>

          <div className="mt-2 flex max-w-[62ch] flex-col gap-5 text-base leading-relaxed text-zinc-400">
            {content.paragraphs.map((p, i) => (
              <motion.p key={i} variants={fade}>
                {p}
              </motion.p>
            ))}
          </div>

          {content.quote ? (
            <motion.figure
              variants={fade}
              className="mt-6 max-w-[60ch] border-l-2 border-emerald-400/70 pl-5"
            >
              <Quotes
                weight="fill"
                className="size-5 text-emerald-400/80"
                aria-hidden
              />
              <blockquote className="mt-2 text-base italic leading-relaxed text-zinc-300 md:text-lg">
                {content.quote}
              </blockquote>
            </motion.figure>
          ) : null}
        </div>

        <motion.dl
          variants={fade}
          className="self-start border-t border-zinc-800"
        >
          {content.infoCards.map((item) => {
            const label = stripLabelGlyph(item.label);
            return (
              <div
                key={item.label}
                className="grid grid-cols-[112px_1fr] items-baseline gap-6 border-b border-zinc-800 py-4"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {label}
                </dt>
                <dd className="text-sm text-zinc-200 md:text-base">{item.value}</dd>
              </div>
            );
          })}
        </motion.dl>
      </motion.div>
    </section>
  );
}
