"use client";

import { useEffect, useRef } from "react";

export function GrainOverlay() {
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      if (!glow.current) return;
      glow.current.style.setProperty("--mx", `${e.clientX}px`);
      glow.current.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return <div ref={glow} className="ambient" aria-hidden="true"><div className="ambient__orb ambient__orb--one" /><div className="ambient__orb ambient__orb--two" /><div className="ambient__cursor" /><div className="vignette" /><svg className="grain"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="4" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noise)" opacity=".28" /></svg></div>;
}
