"use client";

import { usePrefs } from "./Providers";
import { t, UI_STRINGS } from "@/lib/i18n";

export default function Footer() {
  const { lang } = usePrefs();

  const handleAnchor: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <p className="footer__name">Phạm Kỷ Nguyên</p>
          <p className="dim">{t(UI_STRINGS.footer.role, lang)}</p>
          <p className="footer__email">
            <a className="link-inline" href="mailto:nguyen@kynguyen.cc">
              nguyen@kynguyen.cc
            </a>
          </p>
        </div>

        <div className="footer__mid" aria-hidden>
          <span className="signature" role="img" aria-label="KN" />
        </div>

        <div className="footer__right">
          <p className="dim">© 2026 · me.kynguyen.cc</p>
          <a className="link-inline" href="#top" onClick={handleAnchor}>
            {t(UI_STRINGS.footer.backToTop, lang)}
          </a>
        </div>
      </div>
    </footer>
  );
}
