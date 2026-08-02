"use client";

import Link from "next/link";

export function StudioStatement() {
  const moveSpotlight = (event: React.PointerEvent<HTMLParagraphElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--studio-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--studio-y", `${event.clientY - bounds.top}px`);
  };

  const hideSpotlight = (event: React.PointerEvent<HTMLParagraphElement>) => {
    event.currentTarget.style.setProperty("--studio-x", "-200px");
    event.currentTarget.style.setProperty("--studio-y", "-200px");
  };

  return <section className="studio-statement"><p className="studio-statement__spotlight" onPointerMove={moveSpotlight} onPointerLeave={hideSpotlight}>Media Mingles is an independent Bengaluru studio bringing strategy, creators, production and growth into the same room.</p><Link className="text-link" href="/about">Meet the studio ↗</Link></section>;
}
