"use client";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
export function About() {
  const photos = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => { if (!photos.current || !matchMedia("(pointer:fine)").matches) return; const r = e.currentTarget.getBoundingClientRect(); photos.current.style.transform = `rotateX(${(e.clientY-r.top-r.height/2)/-35}deg) rotateY(${(e.clientX-r.left-r.width/2)/35}deg)`; };
  return <section id="about" className="about" onPointerMove={move} onPointerLeave={() => { if (photos.current) photos.current.style.transform = ""; }}><div className="about__copy"><div className="section-label"><span>04</span><h2>Independent by design</h2></div><h3>ONE STUDIO.<br /><i>NO HAND-OFFS.</i></h3><p>Media Mingles brings strategy, creators, production, distribution and search into one accountable room. We measure the work against business outcomes, not vanity metrics.</p><a href="/about" className="text-link">Meet the studio <ArrowUpRight size={18} /></a><div className="about__tags">{["In-house", "Pan-India", "Full-funnel", "Data-led"].map(x => <span key={x}>{x}</span>)}</div></div><div ref={photos} className="about__photos"><div><Image src="https://mediamingles.in/wp-content/themes/media-mingles/assets/proof/cover-digital-marketing.webp" alt="Media Mingles creative work" fill sizes="50vw" /></div><div><Image src="https://mediamingles.in/wp-content/themes/media-mingles/assets/proof/proven-partnerships.webp" alt="Media Mingles campaign work" fill sizes="30vw" /></div></div></section>;
}
