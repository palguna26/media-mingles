"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { services } from "@/data/services";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=190%", pin: true, scrub: .7, anticipatePin: 1 } })
          .to(".hero__line--media", { xPercent: -115, opacity: 0, duration: .24, ease: "none" }, 0)
          .to(".hero__line--mingles", { xPercent: 115, opacity: 0, duration: .24, ease: "none" }, 0)
          .to(".hero__support, .hero__label, .hero__services, .hero__contact-card, .hero__scroll", { opacity: 0, y: -18, duration: .16, ease: "none" }, .04)
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
          .to(".hero__support, .hero__label, .hero__services, .hero__contact-card, .hero__scroll", { opacity: 0, y: -14, duration: .16, ease: "none" }, .04)
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
        <p className="hero__label">© Since — 2018</p>
        <div className="hero__main">
          <h1><span><b className="hero__line hero__line--media">MEDIA</b></span><span><b className="hero__line hero__line--mingles">MINGLES</b></span></h1>
          <ol className="hero__services" aria-label="Our services">{services.slice(0, 5).map(service => <li key={service.slug}><span>({service.number})</span><Link href={`/services#${service.slug}`}>{service.name}</Link></li>)}</ol>
        </div>
        <div className="hero__footer-row"><Link className="hero__scroll" href="#work">Scroll to explore ↓</Link><Link className="hero__contact-card" href="/contact#audit" data-cursor="OPEN"><span>Let&apos;s talk</span><strong>Request a free audit</strong><i aria-hidden="true">↗</i></Link></div>
        <div className="hero__baseline" aria-hidden="true" />
      </div>
      <div className="hero__scene-label"><span>YOU OWN THE BRAND, WE CRAFT THE STORY.</span></div>
    </section>
  );
}
