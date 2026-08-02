"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".project").forEach(project => {
        gsap.from(project, { y: 55, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: project, start: "top 78%" } });
        gsap.fromTo(project.querySelector("img"), { scale: 1.035 }, { scale: 1, ease: "none", scrollTrigger: { trigger: project, start: "top bottom", end: "bottom top", scrub: .8 } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section ref={root} id="work" className="work"><div className="section-label"><span>01</span><h2>Selected work</h2><span>Campaigns / production / digital</span></div><div className="work__track">{projects.map(project => <article className="project" key={project.number} style={{ "--accent": project.accent } as React.CSSProperties}>
    <div className="project__media"><Image src={project.image} alt={`${project.brand} campaign`} fill sizes="(max-width: 900px) 100vw, 62vw" /></div>
    <div className="project__copy"><span className="project__brand">{project.number} / {project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project__meta"><span>{project.services.join(" · ")}</span><strong>{project.result}</strong></div></div>
  </article>)}</div></section>;
}
