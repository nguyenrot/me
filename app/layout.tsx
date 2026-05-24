import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { PrefsProvider } from "@/components/Providers";
import { parsePrefs } from "@/lib/prefs";
import { preboot } from "@/lib/preboot";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
  ],
};

export const metadata: Metadata = {
  title: "Phạm Kỷ Nguyên — Software Engineer",
  description:
    "Phạm Kỷ Nguyên — Software Development Engineer at Workday, based in Đà Nẵng, Việt Nam.",
  icons: {
    icon: [{ url: "/kn-mark.svg", type: "image/svg+xml" }],
    shortcut: ["/kn-mark.svg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieJar = await cookies();
  const prefs = parsePrefs(cookieJar);

  // SSR can't know the client OS preference. If pref is "system" we fall back
  // to "dark" and let the inline preboot script flip to "light" before React
  // hydrates. The pref itself is preserved on data-theme-pref for the client
  // Provider to read back.
  const resolvedForSSR = prefs.theme === "system" ? "dark" : prefs.theme;

  return (
    <html
      lang={prefs.lang}
      data-theme={resolvedForSSR}
      data-theme-pref={prefs.theme}
      data-accent={prefs.accent}
      data-density={prefs.density}
      className={jetbrainsMono.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preboot }} />
      </head>
      <body>
        <PrefsProvider initial={prefs}>{children}</PrefsProvider>
      </body>
    </html>
  );
}
