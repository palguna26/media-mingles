"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { galleryMedia } from "@/data/projects";

export function MediaWall() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth + window.innerWidth * .06);
        gsap.to(track.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: .7, pin: true, invalidateOnRefresh: true } });
      });
      mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".lookbook-card").forEach(card => gsap.from(card, { y: 32, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 86%" } }));
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return <section ref={root} className="media-wall lookbook">
    <div className="lookbook__head"><span className="kicker">Campaign lookbook / 01—08</span><h2>Created to be<br /><i>seen, shared</i><br />and remembered.</h2><span className="lookbook__hint">Scroll to explore →</span></div>
    <div ref={track} className="lookbook__track">{galleryMedia.slice(0, 8).map(([src, alt], i) => <figure className="lookbook-card" key={`${src}-${i}`}>
      <div className="lookbook-card__media"><Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 54vw" /></div>
      <figcaption><span>0{i + 1}</span><span>{alt}</span><ArrowUpRight size={14} /></figcaption>
    </figure>)}</div>
  </section>;
}
