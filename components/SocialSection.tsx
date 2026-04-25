"use client";

import { motion } from "framer-motion";
import {
  heroCardMotion,
  heroDividerClassName,
  heroEyebrowClassName,
  heroHeaderMotion,
  heroStagger,
  heroTitleStyle,
  heroTransition,
} from "./motion/heroEffects";

const SOCIALS = [
  {
    name: "Facebook",
    handle: "@phkynguyen",
    link: "https://www.facebook.com/phkynguyen",
    accent: "#1877f2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@phkynguyen",
    link: "https://www.instagram.com/phkynguyen",
    accent: "#e1306c",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "@nguyenrot",
    link: "https://github.com/nguyenrot",
    accent: "#c8d8ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@phamkynguyen",
    link: "https://www.tiktok.com/@phamkynguyen",
    accent: "#ff0050",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Nguyen Pham Ky",
    link: "https://www.linkedin.com/in/nguyen-pham-ky",
    accent: "#0a66c2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Threads",
    handle: "@phkynguyen",
    link: "https://www.threads.com/@phkynguyen",
    accent: "#f0f0f0",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
      </svg>
    ),
  },
];

export default function SocialSection() {
  return (
    <section id="social" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div className="mb-16 text-center" {...heroHeaderMotion} transition={heroTransition(0.1)}>
          <p className={heroEyebrowClassName}>// ETHEREAL CONNECTIONS</p>
          <h2 className="mt-3 font-orbitron text-4xl font-black sm:text-5xl" style={heroTitleStyle}>
            FIND ME
          </h2>
          <div className={`${heroDividerClassName} mx-auto`} />
          <p className="mt-4 font-space text-sm tracking-widest text-[rgba(200,216,255,0.45)]">
            Cross-realm communication channels · Sync your qi
          </p>
        </motion.div>

        {/* Social cards */}
        <div className="flex flex-nowrap justify-center gap-3">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              {...heroCardMotion}
              transition={heroStagger(i, 0.2, 0.1)}
              className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border px-5 py-6 backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor: `${s.accent}22`,
                background: `radial-gradient(ellipse at top, ${s.accent}0a 0%, rgba(2,2,8,0.7) 70%)`,
                minWidth: 110,
              }}
              whileHover={{
                scale: 1.06,
                borderColor: `${s.accent}66`,
                boxShadow: `0 0 28px ${s.accent}33, 0 0 60px ${s.accent}14`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Icon glow bg */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 50% 30%, ${s.accent}18 0%, transparent 65%)`,
                }}
              />

              {/* Scanline sweep on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                  animation: "scanline-sweep 2s linear infinite",
                }}
              />

              {/* Icon */}
              <div
                className="relative transition-all duration-300"
                style={{
                  color: `${s.accent}99`,
                  filter: `drop-shadow(0 0 0px ${s.accent})`,
                }}
              >
                <div className="transition-all duration-300 group-hover:scale-110"
                  style={{ color: s.accent, filter: `drop-shadow(0 0 8px ${s.accent})` }}>
                  {s.icon}
                </div>
              </div>

              {/* Name */}
              <span
                className="relative font-orbitron text-sm font-bold tracking-wider"
                style={{ color: s.accent }}
              >
                {s.name}
              </span>

              {/* Handle */}
              <span className="relative font-space text-[11px] tracking-widest text-[rgba(200,216,255,0.45)]">
                {s.handle}
              </span>

              {/* Corner accent */}
              <div
                className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundColor: s.accent,
                  boxShadow: `0 0 6px ${s.accent}`,
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
