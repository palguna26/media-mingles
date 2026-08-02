"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/data/services";

export function Services() {
  const [active, setActive] = useState(0);
  return <section className="services"><header className="section-head"><span>03 / All capabilities</span><h2>SIX WAYS TO<br /><i>GET NOTICED.</i></h2></header><div className="services__body"><div className="services__list">{services.map((service, i) => <article key={service.slug} className={active === i ? "is-active" : ""} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} tabIndex={0} data-cursor="OPEN"><span>{service.number}</span><h3>{service.name}</h3><p>{service.description}</p></article>)}</div><div className="services__preview" data-cursor="VIEW"><Image key={services[active].image} className="services__preview-image" src={services[active].image} alt={`${services[active].name} proof`} fill sizes="(max-width: 767px) 100vw, 40vw" /></div></div><Link className="text-link" href="/services">Explore all services ↗</Link></section>;
}
