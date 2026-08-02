"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=85%", pin: true, scrub: .65, anticipatePin: 1 } })
          .to(root.current, { backgroundColor: "#ff5a45", color: "#080808", ease: "none" }, 0)
          .to(".hero__line--media", { xPercent: -115, opacity: 0, ease: "none" }, 0)
          .to(".hero__line--mingles", { xPercent: 115, opacity: 0, ease: "none" }, 0)
          .to(".hero__image, .hero__shade", { opacity: 0, ease: "none" }, 0)
          .to(".hero__support, .hero__label", { opacity: 0, y: -18, ease: "none" }, 0)
          .to(".hero__scene-label", { opacity: 1, y: 0, ease: "none" }, .72);
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="hero"><div className="hero__image" data-cursor="VIEW"><Image src="/media/generated/hero-blindfold.png" alt="Editorial portrait with a coral blindfold" fill priority sizes="100vw" /></div><div className="hero__shade" /><p className="hero__label">Independent creative agency · Bengaluru</p><h1><span><b className="hero__line hero__line--media">MEDIA</b></span><span><b className="hero__line hero__line--mingles">MINGLES</b></span></h1><div className="hero__support"><p>Strategy, creators and production working as one team for brands that want to be remembered.</p><div><Link className="button" href="/contact#audit" data-cursor="OPEN">Request free audit</Link><Link className="text-link" href="#work">View our work ↓</Link></div></div><div className="hero__scene-label"><span>YOUR MOVE.</span><Link href="/contact#audit" data-cursor="OPEN">Request free audit ↗</Link></div></section>;
}
