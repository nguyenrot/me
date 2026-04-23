"use client";

import { useRef, useCallback, useState, ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  maxRotation?: number;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

/**
 * 3D tilt card wrapper — mouse-tracking perspective tilt + dynamic light +
 * rotating border beam on hover.
 */
export default function Card3D({
  children,
  className = "",
  glowColor = "#ffd700",
  maxRotation = 8,
  as: Tag = "div",
  href,
  target,
  rel,
  style,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      const light = lightRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * maxRotation * 2;
      const rotateX = (0.5 - y) * maxRotation * 2;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (light) {
        light.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glowColor}18 0%, transparent 60%)`;
        light.style.opacity = "1";
      }
    },
    [maxRotation, glowColor]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    const light = lightRef.current;
    if (el) el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    if (light) light.style.opacity = "0";
    setHovered(false);
  }, []);

  const handleEnter = useCallback(() => setHovered(true), []);

  /* shared overlays */
  const overlays = (
    <>
      {/* Rotating border beam */}
      <div
        className="border-beam-wrapper pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          "--beam-color": glowColor,
        } as React.CSSProperties}
      />
      {/* Light follow overlay */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
    </>
  );

  if (Tag === "a") {
    return (
      <div
        ref={ref}
        className={`card-3d ${className}`}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={style}
      >
        <a href={href} target={target} rel={rel} className="absolute inset-0 z-30" />
        {overlays}
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`card-3d ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={style}
    >
      {overlays}
      {children}
    </div>
  );
}
