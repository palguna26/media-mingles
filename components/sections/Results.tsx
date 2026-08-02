"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const metrics = [["500+", "Creator Network"], ["30+", "Cities Covered"], ["06", "Connected Services"], ["01", "Accountable Team"]];
export function Results() { const root = useRef<HTMLElement>(null); useLayoutEffect(() => { gsap.registerPlugin(ScrollTrigger); const ctx = gsap.context(() => { if (!matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.from(".metric__value span", { yPercent: 110, rotate: 4, stagger: .1, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 65%" } }); }, root); return () => ctx.revert(); }, []); return <section ref={root} className="results"><div className="section-label"><span>03</span><h2>Built for India</h2><span>Reach without hand-offs</span></div><div className="results__grid">{metrics.map(([value, label]) => <div className="metric" key={label}><div className="metric__value"><span>{value}</span></div><p>{label}</p></div>)}</div></section>; }
