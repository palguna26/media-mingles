"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export function Services() {
  const [active, setActive] = useState(0);
  const preview = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => { if (preview.current && matchMedia("(pointer:fine)").matches) preview.current.style.transform = `translate3d(${e.clientX - 170}px, ${e.clientY - 210}px, 0) rotate(-3deg)`; };
  return <section id="services" className="services" onPointerMove={move}><div className="section-label"><span>02</span><h2>What we do</h2><span>Six ways to get noticed</span></div><div className="services__backdrop"><Image src={services[active].image} alt="" fill sizes="100vw" /></div><div className="services__list">{services.map((service, i) => <article key={service.number} className="service" onPointerEnter={() => setActive(i)}><span>{service.number}</span><h3>{service.name}</h3><p>{service.description}</p><ArrowUpRight /></article>)}</div><div ref={preview} className="service-preview"><Image key={services[active].image} src={services[active].image} alt="" fill sizes="320px" /></div></section>;
}
