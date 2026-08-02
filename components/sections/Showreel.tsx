"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { showreel } from "@/data/media";

export function Showreel() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=145%", scrub: .7, pin: true, anticipatePin: 1 } }).fromTo(".showreel__poster", { yPercent: 100, clipPath: "inset(9% 16% 9% 16%)" }, { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", ease: "none" }).to(".showreel__statement", { yPercent: -18, opacity: .12, letterSpacing: ".02em", ease: "none" }, 0).from(".showreel__overlay > *", { y: 50, opacity: 0, stagger: .08, ease: "power3.out" }, .55));
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="showreel"><div className="showreel__statement"><span>04 / Showreel</span><h2>STRATEGY IS INVISIBLE.<br />THE RESULT SHOULD <i>NOT BE.</i></h2></div><div className="showreel__poster" data-cursor="VIEW"><Image src={showreel.poster} alt="Media Mingles showreel poster" fill sizes="100vw" /><div className="showreel__overlay"><span className="showreel__timecode">MM / REEL 001</span><h3>MAKE<br />THEM<br /><i>FEEL IT.</i></h3><button type="button" disabled aria-describedby="reel-status"><Play /> Play reel</button><p id="reel-status">Showreel coming soon</p></div></div></section>;
}
