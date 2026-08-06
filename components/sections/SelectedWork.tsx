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
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project");
        gsap.set(cards, { yPercent: 105 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=185%", pin: true, scrub: .65, anticipatePin: 1 } })
          .to(".work-sequence__head", { yPercent: -24, opacity: 0, ease: "none" })
          .to(cards[0], { yPercent: 0, ease: "none" }, "<")
          .to(cards[1], { yPercent: 0, ease: "none" })
          .to(cards[0], { yPercent: -14, opacity: .12, ease: "none" }, "<")
          .to(cards[2], { yPercent: 0, ease: "none" })
          .to(cards[1], { yPercent: -14, opacity: .12, ease: "none" }, "<");
      });
      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".project").forEach((card) => gsap.from(card, { y: 80, opacity: 0, duration: .75, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } }));
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);

  return <section ref={root} id="work" className="work work-sequence"><header className="work-sequence__head"><span>02 / Featured work</span><h2>WORK MADE<br /><i>TO MOVE.</i></h2><p>Selected campaigns, production and digital work.</p></header><div className="work-sequence__stage">{projects.map(project => <article className="project" key={project.number}><div className="project__media"><Image src={project.image} alt={`${project.brand} — ${project.title}`} fill sizes="(max-width: 767px) 100vw, 62vw" style={{ objectFit: project.mediaFit, objectPosition: project.focalPosition }} /></div><div className="project__copy"><span>{project.number} · {project.category}</span><h3>{project.title}</h3><p>{project.brand}</p><p>{project.description}</p><strong>{project.result}</strong><small>{project.services.join(" · ")}</small></div></article>)}</div></section>;
}
