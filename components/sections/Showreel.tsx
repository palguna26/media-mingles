"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Showreel() {
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", end: "center 35%", scrub: .8 } })
          .fromTo(".showreel__window", { scale: .94 }, { scale: 1 })
          .fromTo(".showreel__overlay", { opacity: 0 }, { opacity: .72 }, .25);
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return <section ref={root} className={`showreel ${playing ? "is-playing" : "is-paused"}`}>
    <div className="showreel__heading"><span className="kicker">Showreel / 2026</span><h2>STRATEGY IS INVISIBLE.<br />THE RESULT SHOULD <i>NOT BE.</i></h2><p>Turn the sound on. Trust us.</p></div>
    <div className="showreel__window">
      <div className="showreel__motion" aria-hidden="true" />
      <div className="showreel__stamp">Media Mingles · Placeholder reel</div>
      <div className="showreel__overlay">MAKE<br />THEM<br /><i>FEEL IT.</i></div>
      <div className="showreel__controls">
        <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? "Pause showreel motion" : "Play showreel motion"}>{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? "Pause" : "Play"}</button>
        <button type="button" onClick={() => setMuted(value => !value)} aria-label={muted ? "Unmute showreel" : "Mute showreel"}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}{muted ? "Muted" : "Sound on"}</button>
      </div>
    </div>
  </section>;
}
