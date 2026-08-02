"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

export function Services() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service").forEach((row, index) => ScrollTrigger.create({ trigger: row, start: "top 58%", end: "bottom 42%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) }));
    }, root);
    return () => ctx.revert();
  }, []);
  const move = (e: React.PointerEvent) => { if (preview.current && matchMedia("(pointer:fine)").matches) preview.current.style.transform = `translate3d(${e.clientX - 170}px, ${e.clientY - 210}px, 0) rotate(-3deg)`; };
  return <section ref={root} id="services" className="services" onPointerMove={move}><div className="section-label"><span>02</span><h2>What we do</h2><span>Six ways to get noticed</span></div><div className="services__backdrop"><Image key={services[active].image} src={services[active].image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" /></div><div className="services__list">{services.map((service, i) => <article key={service.number} className={`service ${active === i ? "is-active" : ""}`} onPointerEnter={() => setActive(i)}><span>{service.number}</span><h3>{service.name}</h3><p>{service.description}</p><ArrowUpRight /></article>)}</div><div ref={preview} className="service-preview"><Image key={services[active].image} src={services[active].image} alt="" fill sizes="320px" /></div></section>;
}
