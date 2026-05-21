"use client";

import { useEffect, useState } from "react";

export default function Scrollbar() {
  const [pct, setPct] = useState(0);
  const [thumbH, setThumbH] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      const trackHeight = doc.clientHeight - 192; // matches CSS margin: 96px top + 96px bottom
      setPct(ratio);
      setThumbH(Math.max(2, ratio * trackHeight));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scrollbar" aria-hidden>
      <div className="scrollbar__track" />
      <div className="scrollbar__thumb" style={{ height: thumbH }} />
      <div className="scrollbar__label">{String(Math.round(pct * 100)).padStart(2, "0")}%</div>
    </div>
  );
}
