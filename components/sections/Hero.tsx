"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero__line", { yPercent: 105, duration: 1.1, stagger: .12, ease: "power4.out" });
      gsap.from(".hero__intro, .hero__actions", { y: 18, opacity: 0, duration: .8, stagger: .1, delay: .45, ease: "power3.out" });
      gsap.from(".hero__frame img", { scale: 1.06, opacity: 0, duration: 1.8, delay: .15, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section ref={root} id="top" className="hero">
    <div className="hero__topline"><span>Independent creative agency</span><span>Bengaluru / India</span></div>
    <div className="hero__headline">
      <h1><span className="text-mask"><span className="hero__line">WE MAKE BRANDS</span></span><span className="text-mask"><span className="hero__line"><i>HARD</i> TO IGNORE.</span></span></h1>
      <div className="hero__intro"><span className="record-dot" /> Strategy · Creative · Production · Media</div>
    </div>
    <div className="hero__frame"><Image src="/media/unfold-brand.jpeg" alt="Media Mingles creative campaign portrait" fill priority quality={75} sizes="100vw" /></div>
    <div className="hero__footer"><p>We bring strategy, creators, production and media together for brands that want to be remembered.</p><div className="hero__actions"><MagneticButton href="#work">View our work</MagneticButton><a href="/contact#audit" className="text-link">Start a project <ArrowUpRight size={15} /></a></div><span className="hero__scroll">Scroll <ArrowDown size={14} /></span></div>
  </section>;
}
