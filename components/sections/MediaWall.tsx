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
      gsap.utils.toArray<HTMLElement>(".media-tile").forEach((tile, i) => gsap.fromTo(tile, { y: i % 2 ? 45 : -30 }, { y: i % 2 ? -45 : 30, ease: "none", scrollTrigger: { trigger: root.current, scrub: 1.2, start: "top bottom", end: "bottom top" } }));
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} className="media-wall"><div className="media-wall__intro"><span className="kicker">Campaign lookbook / 01—08</span><h2>CREATED TO BE<br /><i>SEEN, SHARED</i><br />AND REMEMBERED.</h2></div><div className="media-grid">{galleryMedia.slice(0, 8).map(([src, alt], i) => <figure className={`media-tile media-tile--${i % 4}`} key={`${src}-${i}`}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" /><figcaption>0{i + 1} / {alt}</figcaption></figure>)}</div></section>;
}
