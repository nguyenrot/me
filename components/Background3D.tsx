"use client";

import dynamic from "next/dynamic";

const MeThreeScene = dynamic(() => import("./MeThreeScene"), {
  ssr: false,
  loading: () => null,
});

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <MeThreeScene />
    </div>
  );
}
