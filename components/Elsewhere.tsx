"use client";

import type { ReactNode } from "react";
import { usePrefs } from "./Providers";
import { t } from "@/lib/i18n";
import type { ElsewhereContent, ElsewhereItem } from "@/lib/defaults";

// NOTE: These icons are the ORIGINAL marks drawn in the design prototype —
// not the official platform brand logos. For production, swap each
// platform's official SVG (downloaded from its brand-asset page) for
// legal and recognition reasons. See README.md §Elsewhere.
const ICON_MAP: Record<ElsewhereItem["icon"], ReactNode> = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 5.2c-.3 0-.4.3-.3.6l.9 2.2c-.7.9-1.1 2-1.1 3.2 0 3.6 2.7 5 5 5.3-.3.2-.5.6-.6 1-.7.3-1.7.3-2.4-.7-.3-.5-.8-.9-1.4-.9-.4 0-.5.3-.2.5.5.3.9.7 1.2 1.3.3.7 1 1.5 2.7 1.2v1.7c0 .3.2.5.4.5h3.5c.2 0 .4-.2.4-.5v-2.6c0-.5-.2-1-.5-1.4 2.3-.3 5-1.7 5-5.3 0-1.2-.4-2.3-1.1-3.2l.9-2.2c.1-.3 0-.6-.3-.6-.4 0-1.4.2-2.5.9-.8-.2-1.7-.4-2.6-.4s-1.8.1-2.6.4c-1.1-.7-2.1-.9-2.5-.9z" />
    </svg>
  ),
  linkedin: <span className="links__glyph links__glyph--in">in</span>,
  facebook: <span className="links__glyph links__glyph--f">f</span>,
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r=".9" fill="currentColor" stroke="none" />
    </svg>
  ),
  threads: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.8 11.2c-.4-2-1.8-3.2-3.8-3.2-1.7 0-3 .7-3.6 2" />
      <path d="M12.5 19.5c-3.8 0-6.5-2.8-6.5-7s2.7-8 7-8c3.5 0 5.8 2 6.4 4.5" />
      <path d="M19.4 9c.3.9.4 1.8.4 2.7 0 2.4-.9 4.2-2.5 5.3-1.4 1-3.4 1.2-4.7.4-1.2-.7-1.7-1.8-1.4-3 .5-1.8 2.3-2.4 4-2.3 2 .1 3.5 1 4.2 2.4" />
    </svg>
  ),
  tiktok: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 4v11.5" />
      <path d="M10 4c.5 2.8 2.5 4.7 5.5 5" />
      <circle cx="7.5" cy="15.5" r="3" />
    </svg>
  ),
};

export default function Elsewhere({ content }: { content: ElsewhereContent }) {
  const { lang } = usePrefs();
  return (
    <section className="section" id="elsewhere">
      <div className="container">
        <header className="section__head">
          <span className="section__num">{t(content.section_num, lang)}</span>
          <h2 className="section__title">{t(content.title, lang)}</h2>
        </header>

        <ul className="links">
          {content.items.map((item) => (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noopener">
                <span className="links__idx" aria-hidden>
                  {ICON_MAP[item.icon]}
                </span>
                <span className="links__name">{item.name}</span>
                <span className="links__handle">{item.handle}</span>
                <span className="links__arrow" aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
