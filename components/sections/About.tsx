"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export function About() {
  const photos = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => { if (!photos.current || !matchMedia("(pointer:fine)").matches) return; const r = e.currentTarget.getBoundingClientRect(); photos.current.style.transform = `rotateX(${(e.clientY-r.top-r.height/2)/-35}deg) rotateY(${(e.clientX-r.left-r.width/2)/35}deg)`; };
  return <section id="about" className="about" onPointerMove={move} onPointerLeave={() => { if (photos.current) photos.current.style.transform = ""; }}><div className="about__copy"><div className="section-label"><span>04</span><h2>Independent by design</h2></div><h3>SMALL TEAM.<br /><i>LOUD WORK.</i></h3><p>Media Mingles is an independent creative and growth agency for brands competing for attention. We bring strategy, creators, production, distribution and PR together so strong ideas survive from brief to execution.</p><a href="#contact" className="text-link">Learn about the agency <ArrowUpRight size={18} /></a><div className="about__tags">{["Strategy", "Creative", "Production", "Distribution"].map(x => <span key={x}>{x}</span>)}</div></div><div ref={photos} className="about__photos"><div><Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="Creative team collaborating" fill sizes="50vw" /></div><div><Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85" alt="Agency team at work" fill sizes="30vw" /></div></div></section>;
}
