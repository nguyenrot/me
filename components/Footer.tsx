"use client";

import { memo, useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

const LiveClock = memo(function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span className="font-mono text-xs tabular-nums text-zinc-500">
      {time} <span className="text-zinc-600">GMT+7</span>
    </span>
  );
});

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-zinc-100">Phạm Kỷ Nguyên</p>
          <p className="text-sm text-zinc-500">
            Software Engineer · Đà Nẵng, Việt Nam
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <LiveClock />
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowUp weight="bold" className="size-3.5" />
            Back to top
          </a>
        </div>
      </div>

      <p className="mt-8 font-mono text-[11px] tracking-wide text-zinc-600">
        © 2026 · me.kynguyen.cc
      </p>
    </footer>
  );
}
