"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const frames = [["/media/generated/creator-studio.png", "Creator campaign production"], ["/media/generated/product-still-life.png", "Product campaign still life"], ["/media/generated/social-systems.png", "Social campaign system"], ["/media/generated/studio-shoot.png", "Studio production"], ["/media/generated/hero-blindfold.png", "Editorial portrait"]] as const;

export function MediaFrenzy() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".frenzy__frame"); gsap.set(cards.slice(1), { autoAlpha: 0, scale: .72 });
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: .5, anticipatePin: 1 } }).to(cards.slice(1), { autoAlpha: 1, scale: 1, stagger: .1, duration: .5, ease: "power3.out" }).fromTo(".frenzy__stamp", { xPercent: -80 }, { xPercent: 65, duration: .55, ease: "none" }, "<").to(cards.slice(0, -1), { autoAlpha: 0, scale: .8, stagger: .05, duration: .35, ease: "power3.in" }).to(cards.at(-1)!, { inset: "4%", rotate: 0, duration: .55, ease: "power3.inOut" }, "<.1");
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="frenzy" aria-label="Inside the Media Mingles studio"><div className="frenzy__head"><span>LIVE FROM THE STUDIO</span><strong>05 FRAMES / ONE IDEA</strong></div><div className="frenzy__stage" data-cursor="VIEW">{frames.map(([src, alt], index) => <figure className={`frenzy__frame frenzy__frame--${index + 1}`} key={src}><Image src={src} alt={alt} fill sizes="(max-width: 899px) 76vw, 45vw" /><figcaption>0{index + 1} / MM — 2026</figcaption></figure>)}</div><div className="frenzy__stamp">PLAN / SHOOT / CAST / SCALE / REPEAT</div></section>;
}
