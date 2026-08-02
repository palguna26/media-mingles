"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Volume2, VolumeX } from "lucide-react";

export function Showreel() {
  const root = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (matchMedia("(min-width: 769px) and (prefers-reduced-motion: no-preference)").matches) gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", scrub: 1, pin: true } }).to(".showreel__window", { width: "100vw", height: "100vh", borderRadius: 0, rotate: 0 }).to(".showreel__overlay", { opacity: 1 }, .35);
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} className="showreel"><h2><span>STRATEGY IS INVISIBLE.</span><span>THE RESULT SHOULD <i>NOT BE.</i></span></h2><div className="showreel__window"><div className="showreel__motion" /><button aria-label="Play showreel" className="play"><Play fill="currentColor" /></button><div className="showreel__overlay">MAKE<br />THEM<br /><i>FEEL IT.</i></div><button className="mute" onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX /> : <Volume2 />} {muted ? "Muted" : "Sound on"}</button></div></section>;
}
