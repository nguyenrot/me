import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const display = Chakra_Petch({
  subsets: ["latin", "vietnamese"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "NGUYÊN • 元 // Digital Immortal Cultivator",
  description:
    "Phạm Kỷ Nguyên — Digital Immortal Cultivator. Foundation Establishment · Code & Qi Dual Cultivator · Đà Nẵng Realm. A modern immortal cultivator forging digital realms with code and spiritual energy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${display.variable} ${spaceMono.variable}`}
      style={{ backgroundColor: "#020208", colorScheme: "dark" }}
    >
      <head>
        <style>{`html{background-color:#020208!important;color-scheme:dark!important}body{background:#020208!important;color:rgba(200,216,255,0.88)!important}`}</style>
      </head>
      <body
        className="min-h-screen overflow-x-hidden antialiased"
        style={{
          background: "#020208",
          color: "rgba(200,216,255,0.88)",
          fontFamily: "var(--font-inter)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
