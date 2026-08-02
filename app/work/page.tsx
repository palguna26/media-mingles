import type { Metadata } from "next";
import Image from "next/image";
import { InnerPageHero } from "@/components/ui/InnerPageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { workItems } from "@/data/projects";
export const metadata: Metadata = { title: "Work", description: "Selected Media Mingles work across social, influencer marketing, photography and web design.", alternates: { canonical: "/work" } };
export default function WorkPage() { return <><InnerPageHero eyebrow="Work" title={<>WORK THAT<br /><i>MOVED.</i></>} description="Campaigns across social, influencer, photography and web design for brands across India." /><section className="work-grid">{workItems.map(item => <article key={item.number}><div className="work-grid__media"><Image src={item.image} alt={`${item.brand} — ${item.title}`} fill sizes="(max-width: 768px) 100vw, 50vw" /></div><span>{item.number} · {item.category}</span><h2>{item.title}</h2><h3>{item.brand}</h3><p>{item.description}</p><strong>{item.result}</strong></article>)}</section><PageCTA label="Like what you see?" title="Let’s build your next case study." /></>; }
