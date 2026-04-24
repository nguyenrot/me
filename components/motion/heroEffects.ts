import type { CSSProperties } from "react";

export const heroColors = {
  violet: "#aa44ff",
  violetSoft: "#cc66ff",
  cyan: "#00ccff",
  text: "rgba(200,216,255,0.65)",
  textDim: "rgba(200,216,255,0.45)",
} as const;

export const heroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const heroViewport = {
  once: true,
  margin: "-80px",
} as const;

export const heroHeaderMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: heroViewport,
} as const;

export const heroCardMotion = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: heroViewport,
} as const;

export function heroTransition(delay = 0.3, duration = 0.85) {
  return {
    duration,
    delay,
    ease: heroEase,
  };
}

export function heroStagger(index: number, baseDelay = 0.4, step = 0.08, duration = 0.85) {
  return heroTransition(baseDelay + index * step, duration);
}

export function heroAccent(index: number) {
  return index % 2 === 0 ? heroColors.violet : heroColors.cyan;
}

export const heroTitleStyle: CSSProperties = {
  background:
    "linear-gradient(135deg, #aa44ff 0%, #cc66ff 30%, #ffffff 50%, #00ccff 70%, #aa44ff 100%)",
  backgroundSize: "200% 200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "holo-shift 4s ease-in-out infinite",
  filter: "drop-shadow(0 0 20px rgba(170,68,255,0.4))",
};

export const heroSubtitleStyle: CSSProperties = {
  background: "linear-gradient(90deg, #aa44ff, #00ccff, #aa44ff)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "holo-shift 3s ease-in-out infinite",
};

export const heroScanlineStyle: CSSProperties = {
  background: "linear-gradient(180deg, transparent 0%, rgba(170,68,255,0.06) 50%, transparent 100%)",
  animation: "scanline-sweep 2s linear infinite",
};

export const heroEyebrowClassName =
  "font-space text-[11px] uppercase tracking-[0.4em] text-[rgba(0,204,255,0.65)]";

export const heroDividerClassName =
  "mt-3 h-px w-32 bg-gradient-to-r from-[#aa44ff] via-[#00ccff] to-transparent";
