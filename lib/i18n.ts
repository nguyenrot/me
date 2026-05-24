import type { Lang } from "./prefs";

export type I18nValue = string | { en: string; vi: string };

export function t(value: I18nValue | undefined | null, lang: Lang, fallback = ""): string {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? fallback;
}

export const UI_STRINGS = {
  nav: {
    about: { en: "About", vi: "Hồ sơ" },
    skills: { en: "Skills", vi: "Kỹ năng" },
    experience: { en: "Experience", vi: "Kinh nghiệm" },
    projects: { en: "Projects", vi: "Dự án" },
    elsewhere: { en: "Elsewhere", vi: "Liên hệ" },
  },
  footer: {
    role: {
      en: "Software Engineer · Đà Nẵng, Việt Nam",
      vi: "Kỹ sư phần mềm · Đà Nẵng, Việt Nam",
    },
    backToTop: { en: "Back to top ↑", vi: "Lên đầu trang ↑" },
  },
  ariaLanguage: {
    en: "Language",
    vi: "Ngôn ngữ",
  },
  ariaToggleTheme: { en: "Theme", vi: "Giao diện" },
  ariaAccent: { en: "Accent color", vi: "Màu nhấn" },
  themeLight: { en: "Light", vi: "Sáng" },
  themeSystem: { en: "System", vi: "Hệ thống" },
  themeDark: { en: "Dark", vi: "Tối" },
} as const;
