import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { PrefsProvider } from "@/components/Providers";
import { parsePrefs } from "@/lib/prefs";

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

  return (
    <html
      lang={prefs.lang}
      data-theme={prefs.theme}
      data-accent={prefs.accent}
      data-density={prefs.density}
      className={jetbrainsMono.variable}
    >
      <body>
        <PrefsProvider initial={prefs}>{children}</PrefsProvider>
      </body>
    </html>
  );
}
