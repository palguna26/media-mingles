"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/data/site";
export function Results() { const root = useRef<HTMLElement>(null); useLayoutEffect(() => { gsap.registerPlugin(ScrollTrigger); const ctx = gsap.context(() => { if (!matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.from(".metric__value span", { yPercent: 110, stagger: .1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 65%" } }); }, root); return () => ctx.revert(); }, []); return <section ref={root} className="results"><div className="section-label"><span>04</span><h2>Results</h2><span>Placeholder figures</span></div><p className="results__lead">Attention earned, not politely requested.</p><div className="results__grid">{metrics.map(({value, label}) => <div className="metric" key={label}><div className="metric__value"><span>{value}</span></div><p>{label}</p></div>)}</div></section>; }
