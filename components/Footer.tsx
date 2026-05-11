"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  heroDividerClassName,
  heroHeaderMotion,
  heroSubtitleStyle,
  heroTitleStyle,
  heroTransition,
} from "./motion/heroEffects";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative px-4 pb-10 pt-6 sm:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Gradient divider */}
        <div className={`${heroDividerClassName} mx-auto mb-8 w-full max-w-3xl`} />

        <motion.div className="text-center" {...heroHeaderMotion} transition={heroTransition(0.3, 0.8)}>
          {/* Status */}
          <p className="font-space text-[10px] uppercase tracking-[0.4em] text-[rgba(0,204,255,0.5)]">
            ◈ Cultivation Stable • Qi Flow Optimal • Realm: Active ◈
          </p>

          {/* Name */}
          <p
            className="mt-4 font-orbitron text-lg font-bold tracking-[0.15em]"
            style={heroTitleStyle}
          >
            Phạm Kỷ Nguyên
          </p>

          {/* Copyright */}
          <p className="mt-3 font-space text-[10px] tracking-[0.25em]" style={heroSubtitleStyle}>
            © 2026 // Đà Nẵng, Việt Nam // me.kynguyen.cc
          </p>

          {/* Live clock */}
          {time && (
            <div className="mt-3 inline-flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#aa44ff] shadow-[0_0_6px_rgba(170,68,255,0.7)]" />
              <span className="font-space text-[10px] tracking-[0.2em] text-[rgba(200,216,255,0.3)]">
                {time} GMT+7
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
