"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { projects } from "@/data/projects";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=120%", scrub: 1, pin: true } })
          .to(".hero__line--one", { xPercent: -15, scale: 1.25 }, 0)
          .to(".hero__line--two", { xPercent: 12, scale: 1.5 }, 0)
          .to(".hero__media--one", { xPercent: -120, yPercent: -40, rotate: -14 }, 0)
          .to(".hero__media--two", { xPercent: 120, yPercent: 30, rotate: 12 }, 0)
          .to(".hero__mask", { clipPath: "inset(0% 0% 0% 0%)" }, .35);
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} id="top" className="hero">
    <div className="hero__eyebrow"><span>Creative Agency</span><span>Bengaluru · India</span></div>
    <div className="hero__media hero__media--one"><Image src={projects[0].image} alt="Food campaign" fill priority sizes="(max-width: 768px) 35vw, 18vw" /></div>
    <div className="hero__media hero__media--two"><Image src={projects[1].image} alt="Beauty campaign" fill priority sizes="(max-width: 768px) 30vw, 14vw" /></div>
    <h1><span className="hero__line hero__line--one">WE MAKE BRANDS</span><span className="hero__line hero__line--two">IMPOSSIBLE TO <i>IGNORE.</i></span></h1>
    <div className="hero__bottom"><p>Social, influence, production, search and PR for brands competing for attention.</p><div className="hero__actions"><MagneticButton href="#work">View our work</MagneticButton><a href="#contact" className="text-link">Start a project ↗</a></div></div>
    <div className="hero__scroll"><span>Scroll to explore</span><ArrowDown size={16} /></div>
    <div className="hero__mask" aria-hidden="true" />
  </section>;
}
