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
      gsap.utils.toArray<HTMLElement>(".media-tile").forEach((tile, i) => gsap.fromTo(tile, { y: i % 2 ? 90 : -60 }, { y: i % 2 ? -90 : 60, ease: "none", scrollTrigger: { trigger: root.current, scrub: 1.2, start: "top bottom", end: "bottom top" } }));
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} className="media-wall"><h2>CREATED TO BE<br /><i>SEEN, SHARED</i><br />AND REMEMBERED.</h2><div className="media-grid">{galleryMedia.map(([src, alt], i) => <div className={`media-tile media-tile--${i % 4}`} key={src}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 25vw" /></div>)}</div></section>;
}
