"use client";

import { memo, useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, MapPin, Briefcase } from "@phosphor-icons/react/dist/ssr";
import type { HeroContent } from "@/lib/defaults";

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22 },
  },
};

const MagneticCTA = memo(function MagneticCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
        my.set((e.clientY - (r.top + r.height / 2)) * 0.22);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      style={{ x, y }}
      className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-300"
    >
      {children}
      <ArrowUpRight
        weight="bold"
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </motion.a>
  );
});

const BreathingDot = memo(function BreathingDot() {
  return (
    <span className="relative flex size-1.5">
      <span className="breathe absolute inline-flex size-full rounded-full bg-emerald-400 opacity-80" />
      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
    </span>
  );
});

const PortraitFrame = memo(function PortraitFrame() {
  return (
    <motion.div
      variants={rise}
      className="relative mx-auto w-full max-w-[360px] lg:mx-0"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900">
        <Image
          src="/images/avatar.png"
          alt="Phạm Kỷ Nguyên"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 80vw, 360px"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/70 to-transparent"
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-950/70 px-3 py-1.5 backdrop-blur-md">
          <BreathingDot />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
            Available · Đà Nẵng
          </span>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[28px] bg-emerald-400/[0.04] blur-2xl"
      />
    </motion.div>
  );
});

export default function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section
      id="hero"
      className="grid min-h-[100dvh] items-center py-20 lg:py-0"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
      >
        <div className="flex flex-col gap-7">
          <motion.div
            variants={rise}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5"
          >
            <BreathingDot />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
              {content.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="text-5xl font-medium leading-[0.95] tracking-tighter md:text-7xl"
          >
            Phạm Kỷ Nguyên
            <span className="block text-zinc-500">
              {content.subtitle}
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="max-w-[58ch] text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div variants={rise} className="flex flex-wrap items-center gap-4">
            <MagneticCTA href="#links">{content.ctaText}</MagneticCTA>
            <a
              href="#about"
              className="group inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              About me
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin weight="regular" className="size-3.5" />
              <span className="font-mono">Đà Nẵng, VN</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase weight="regular" className="size-3.5" />
              <span className="font-mono">Workday</span>
            </span>
          </motion.div>
        </div>

        <PortraitFrame />
      </motion.div>
    </section>
  );
}
