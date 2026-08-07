"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

export function WhatWeDo() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".what-we-do__service");
        const orbit = ".what-we-do__orbit-ring";
        const orbitLabels = gsap.utils.toArray<HTMLElement>(".what-we-do__orbit-ring > span");
        const orbitText = gsap.utils.toArray<HTMLElement>(".what-we-do__orbit-label");
        gsap.set(cards.slice(1), { yPercent: 112, opacity: 0 });
        gsap.set(orbitLabels.slice(1), { color: "rgba(245,245,245,.34)", fontSize: 15 });
        gsap.set(orbitLabels[0], { color: "#f5f5f5", fontSize: 18 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: `+=${services.length * 95}%`, pin: true, scrub: .65, anticipatePin: 1 } });
        cards.slice(1).forEach((card, index) => {
          timeline
            .to(cards[index], { yPercent: -112, opacity: 0, ease: "none" })
            .to(card, { yPercent: 0, opacity: 1, ease: "none" }, "<")
            .to(orbit, { rotation: -60 * (index + 1), ease: "none" }, "<")
            .to(orbitText, { rotation: 60 * (index + 1), ease: "none" }, "<")
            .to(orbitLabels[index], { color: "rgba(245,245,245,.34)", fontSize: 15, ease: "none" }, "<")
            .to(orbitLabels[index + 1], { color: "#f5f5f5", fontSize: 18, ease: "none" }, "<");
        });
      });
      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".what-we-do__service").forEach((card) => gsap.from(card, { y: 56, opacity: 0, duration: .65, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } }));
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);

  return <section ref={root} className="what-we-do"><header className="what-we-do__head"><span>01 / What we do</span><h2>ONE IDEA. <i>EVERY CHANNEL.</i></h2></header><div className="what-we-do__stage"><aside className="what-we-do__orbit" aria-hidden="true"><div className="what-we-do__orbit-ring">{services.map((service, index) => <span key={service.slug} style={{ "--orbit-angle": `${index * 60}deg` } as React.CSSProperties}><span className="what-we-do__orbit-label">{service.number}</span></span>)}</div></aside>{services.map(service => <article className="what-we-do__service" key={service.slug}><div className="what-we-do__service-copy"><span>{service.number} / 06</span><h3>{service.name}</h3><p>{service.description}</p><Link className="text-link" href={`/services#${service.slug}`}>Explore service</Link></div></article>)}</div></section>;
}
