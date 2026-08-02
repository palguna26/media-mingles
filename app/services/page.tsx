import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { InnerPageHero } from "@/components/ui/InnerPageHero";
import { PageCTA } from "@/components/ui/PageCTA";
export const metadata: Metadata = { title: "Services", description: "Six connected services covering social, influence, production, SEO and PR.", alternates: { canonical: "/services" } };
export default function ServicesPage() { return <><InnerPageHero eyebrow="Services" title={<>SIX SERVICES.<br /><i>ONE ENGINE.</i></>} description="From the first frame to the final funnel, nothing falls through the cracks between agencies." /><section className="service-details">{services.map((service, i) => <article id={service.slug} key={service.slug} className={i % 2 ? "reverse" : ""}><div className="service-details__media"><Image src={service.image} alt={`${service.name} by Media Mingles`} fill sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="service-details__copy"><span>{service.number} · {service.name}</span><h2>{service.tagline}</h2><p>{service.description}</p><ul>{service.deliverables.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><a href="/contact#audit" className="text-link">Start with a free audit ↗</a></div></article>)}</section><PageCTA title="Not sure which service you need?" /></>; }
