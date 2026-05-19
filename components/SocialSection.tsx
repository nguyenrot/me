"use client";

import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FacebookLogo,
  InstagramLogo,
  GithubLogo,
  TiktokLogo,
  LinkedinLogo,
  ThreadsLogo,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import type { SocialItem } from "@/lib/defaults";

const ICON_MAP: Record<string, typeof Globe> = {
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  github: GithubLogo,
  tiktok: TiktokLogo,
  linkedin: LinkedinLogo,
  threads: ThreadsLogo,
};

const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22 },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const SocialPill = memo(function SocialPill({ item }: { item: SocialItem }) {
  const Icon = ICON_MAP[item.iconType] ?? Globe;
  return (
    <motion.a
      variants={fade}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 transition-colors hover:border-zinc-700"
    >
      <Icon
        weight="regular"
        className="size-5 shrink-0 text-zinc-400 transition-colors group-hover:text-emerald-400"
      />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-zinc-100">
          {item.name}
        </span>
        <span className="truncate font-mono text-[11px] text-zinc-500">
          {item.handle}
        </span>
      </div>
    </motion.a>
  );
});

export default function SocialSection({ socials }: { socials: SocialItem[] }) {
  return (
    <section id="social" className="scroll-mt-20 py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fade} className="flex flex-col gap-3">
          <span className="eyebrow">Elsewhere</span>
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
            Find me online.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
        >
          {socials.map((s) => (
            <SocialPill key={s.name} item={s} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
