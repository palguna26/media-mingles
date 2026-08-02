"use client";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { proofAssets } from "@/data/site";

const capabilities = [
  { number: "01", title: "Social and Brand Systems", copy: "Clear strategy and a consistent creative system across every social touchpoint.", image: proofAssets.social },
  { number: "02", title: "Content and Production", copy: "Photography, reels and brand films made to work across campaigns and commerce.", image: proofAssets.products },
  { number: "03", title: "Creator and Growth Campaigns", copy: "Vetted creators, sharp briefs and joined-up distribution from one team.", image: proofAssets.creators },
] as const;

export function WhatWeDo() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".capability-slide");
        gsap.set(cards.slice(1), { xPercent: 105 });
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", pin: true, scrub: .65, anticipatePin: 1 } })
          .to(cards[1], { xPercent: 0, ease: "none" })
          .to(cards[0], { xPercent: -18, opacity: .15, ease: "none" }, "<")
          .to(cards[2], { xPercent: 0, ease: "none" })
          .to(cards[1], { xPercent: -18, opacity: .15, ease: "none" }, "<");
      });
      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".capability-slide").forEach((card) => gsap.from(card, { y: 70, opacity: 0, duration: .7, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } }));
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="what-we-do"><header className="what-we-do__head"><span>01 / What we do</span><h2>ONE IDEA. <i>EVERY CHANNEL.</i></h2></header><div className="what-we-do__stage">{capabilities.map(item => <article className="capability-slide" key={item.number}><div className="capability-slide__media"><Image src={item.image} alt={`${item.title} proof`} fill sizes="(max-width: 767px) 100vw, 58vw" /></div><div className="capability-slide__copy"><span>{item.number} / 03</span><h3>{item.title}</h3><p>{item.copy}</p><Link className="text-link" href="/contact#audit">Request free audit ↗</Link></div></article>)}</div></section>;
}
