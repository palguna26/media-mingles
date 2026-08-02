"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryMedia } from "@/data/projects";

export function MediaWall() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)").matches) return;
      gsap.from(".media-wall__intro > *", { yPercent: 45, opacity: 0, stagger: .12, duration: .9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 72%" } });
      gsap.utils.toArray<HTMLElement>(".media-tile").forEach((tile, i) => gsap.from(tile, { y: 42, opacity: 0, duration: .9, delay: (i % 2) * .08, ease: "power3.out", scrollTrigger: { trigger: tile, start: "top 84%" } }));
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} className="media-wall"><div className="media-wall__intro"><span className="kicker">Campaign lookbook / 01—08</span><h2>CREATED TO BE<br /><i>SEEN, SHARED</i><br />AND REMEMBERED.</h2></div><div className="media-grid">{galleryMedia.slice(0, 8).map(([src, alt], i) => <figure className={`media-tile media-tile--${i % 4}`} key={`${src}-${i}`}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" /><figcaption>0{i + 1} / {alt}</figcaption></figure>)}</div></section>;
}
