"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// PLACEHOLDER METRICS: Replace every value below with verified agency data before launch.
const metrics = [["42M+", "Campaign Impressions"], ["180+", "Creator Collaborations"], ["70+", "Campaigns Shipped"], ["12", "Industries Served"]];

export function Results() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => { if (!matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.from(".metric__value span", { yPercent: 110, rotate: 4, stagger: .1, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 65%" } }); }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} className="results"><div className="section-label"><span>03</span><h2>Placeholder results</h2><span>Proof gets attention</span></div><div className="results__grid">{metrics.map(([value, label]) => <div className="metric" key={label}><div className="metric__value"><span>{value}</span></div><p>{label}</p></div>)}</div></section>;
}
