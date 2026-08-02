import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { MediaFrenzy } from "@/components/sections/MediaFrenzy";
import { Testimonials } from "@/components/sections/Testimonials";
import { Showreel } from "@/components/sections/Showreel";
import { ClientTicker } from "@/components/ui/ClientTicker";
import { faq } from "@/data/site";

const packs = [{ name: "Starter", copy: "For brands finding their voice." }, { name: "Growth", copy: "For brands ready to scale." }, { name: "Enterprise", copy: "For full-funnel partnerships." }];

export default function Home() {
  return <>
    <Hero /><ClientTicker /><WhatWeDo /><SelectedWork /><Services /><MediaFrenzy />
    <Testimonials />
    <Showreel />
    <section className="studio-statement"><p>Media Mingles is an independent Bengaluru studio bringing strategy, creators, production and growth into the same room.</p><Link className="text-link" href="/about">Meet the studio ↗</Link></section>
    <section className="pricing-preview"><header><span className="kicker">Partnerships</span><h2>BUILT AROUND<br /><i>YOUR GOALS.</i></h2></header><div>{packs.map((pack, i) => <article key={pack.name}><span>0{i + 1}</span><h3>{pack.name}</h3><p>{pack.copy}</p><strong>Custom scope</strong></article>)}</div><Link className="text-link" href="/pricing">See how we work ↗</Link></section>
    <section className="faq"><span className="kicker">Questions, answered</span>{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <section className="insights-preview"><span className="kicker">Insights</span><h2>Publishing soon.</h2><p>Practical notes on social, creators, production and growth are on the way.</p><div><Link className="button" href="/contact#audit">Request free audit</Link><Link className="text-link" href="/insights">Visit insights ↗</Link></div></section>
  </>;
}
