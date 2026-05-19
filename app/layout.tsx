import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "Phạm Kỷ Nguyên — Software Engineer",
  description:
    "Phạm Kỷ Nguyên — Software Development Engineer at Workday, based in Đà Nẵng, Việt Nam. Building reliable web systems with Python, Django, and modern APIs.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geist.variable} ${geistMono.variable}`}
      style={{ backgroundColor: "#09090b", colorScheme: "dark" }}
    >
      <head>
        <style>{`html{background-color:#09090b!important;color-scheme:dark!important}body{background:#09090b!important;color:#f4f4f5!important}`}</style>
      </head>
      <body className="min-h-[100dvh] overflow-x-hidden bg-zinc-950 font-sans text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
