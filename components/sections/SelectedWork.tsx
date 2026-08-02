"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".project");
        gsap.to(track.current, { xPercent: -66.666, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "+=300%", scrub: 1, pin: true, onUpdate: s => panels.forEach((p, i) => p.classList.toggle("is-active", Math.round(s.progress * 2) === i)) } });
        panels.forEach(panel => gsap.to(panel.querySelector("img"), { xPercent: 10, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: gsap.getTweensOf(track.current)[0], scrub: true } }));
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} id="work" className="work"><div className="section-label"><span>01</span><h2>Selected Work</h2><span>Swipe the culture →</span></div><div ref={track} className="work__track">{projects.map((project, index) => <article className={`project ${index === 0 ? "is-active" : ""}`} key={project.brand} style={{ "--accent": project.accent } as React.CSSProperties}>
    <div className="project__number">{project.number}</div><div className="project__media"><Image src={project.image} alt={`${project.brand} campaign`} fill sizes="(max-width: 768px) 100vw, 65vw" /></div>
    <div className="project__copy"><div><span className="project__brand">{project.brand}</span><h3>{project.title}</h3></div><p>{project.description}</p><div className="project__meta"><span>{project.services.join(" · ")}</span><strong>{project.result}</strong></div></div>
  </article>)}</div></section>;
}
