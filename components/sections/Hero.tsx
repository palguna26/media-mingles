"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=190%", pin: true, scrub: .7, anticipatePin: 1 } })
          .to(".hero__line--media", { xPercent: -115, opacity: 0, duration: .24, ease: "none" }, 0)
          .to(".hero__line--mingles", { xPercent: 115, opacity: 0, duration: .24, ease: "none" }, 0)
          .to(".hero__support, .hero__label", { opacity: 0, y: -18, duration: .16, ease: "none" }, .04)
          .to(".hero__scene-label", { opacity: 1, y: 0, duration: .16, ease: "none" }, .3)
          .to(".site-video-background__video", { scale: 1.08, opacity: .38, duration: .35, ease: "none" }, .38)
          .to(".hero__color-wash", { opacity: 1, duration: .22, ease: "none" }, .72)
          .to(".hero__scene-label", { color: "#f5f5f5", duration: .18, ease: "none" }, .74)
          .to(".hero__scene-label a", { borderColor: "#f5f5f5", duration: .18, ease: "none" }, .74);
      });
      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=150%", pin: true, scrub: .65, anticipatePin: 1 } })
          .to(".hero__line--media", { xPercent: -115, opacity: 0, duration: .25, ease: "none" }, 0)
          .to(".hero__line--mingles", { xPercent: 115, opacity: 0, duration: .25, ease: "none" }, 0)
          .to(".hero__support, .hero__label", { opacity: 0, y: -14, duration: .16, ease: "none" }, .04)
          .to(".hero__scene-label", { opacity: 1, y: 0, duration: .18, ease: "none" }, .32)
          .to(".site-video-background__video", { scale: 1.08, opacity: .38, duration: .35, ease: "none" }, .38)
          .to(".hero__color-wash", { opacity: 1, duration: .22, ease: "none" }, .72)
          .to(".hero__scene-label", { color: "#f5f5f5", duration: .18, ease: "none" }, .74)
          .to(".hero__scene-label a", { borderColor: "#f5f5f5", duration: .18, ease: "none" }, .74);
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section ref={root} className="hero hero--video">
      <div className="hero__video-shade" aria-hidden="true" />
      <div className="hero__color-wash" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__label">[ Independent creative agency · Bengaluru ]</p>
        <div className="hero__main">
          <h1><span><b className="hero__line hero__line--media">MEDIA</b></span><span><b className="hero__line hero__line--mingles">MINGLES</b></span></h1>
          <div className="hero__support"><p>Strategy, creators and production working as one team for brands that want to be remembered.</p><div><Link className="button" href="/contact#audit" data-cursor="OPEN">Request free audit</Link><Link className="text-link" href="#work">View our work ↓</Link></div></div>
        </div>
        <div className="hero__baseline" aria-hidden="true" />
      </div>
      <div className="hero__scene-label"><span>YOUR MOVE.</span><Link href="/contact#audit" data-cursor="OPEN">Request free audit ↗</Link></div>
    </section>
  );
}
