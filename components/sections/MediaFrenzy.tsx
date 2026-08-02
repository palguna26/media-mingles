"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const campaigns = [
  { image: "/extra-images/content creators page.png", service: "Influencer Marketing", title: "Content Creators", description: "Creator campaigns cast from our 500+ network, matched to the audience you actually want and run end-to-end." },
  { image: "/extra-images/Digital Marketing ™️ @mediamingles.png", service: "Brand Strategy", title: "Digital Marketing", description: "Positioning, messaging and creative direction — the system every campaign is built on before a frame is shot." },
  { image: "/extra-images/unfold your brand.png", service: "Production", title: "Unfold Your Brand", description: "Product photoshoots, brand films and reels produced in-house, built to stop the scroll and hold attention." },
  { image: "/extra-images/website.png", service: "Web & SEO", title: "Sites That Build Brands", description: "Storefronts and brand sites designed to convert, then tuned with technical SEO and analytics that compound." },
] as const;

export function MediaFrenzy() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".campaign-card-shell");
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 82%", end: "top 22%", scrub: .65 } })
          .fromTo(".campaigns__head>*", { y: 45, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .38, ease: "power3.out" })
          .fromTo(cards, { y: 150, opacity: 0, rotate: (index) => index % 2 ? 4 : -4, scale: .9 }, { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: .09, duration: .58, ease: "power3.out" }, .15);
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section ref={root} className="campaigns" aria-labelledby="campaigns-title">
      <header className="campaigns__head"><span>Creative output</span><h2 id="campaigns-title">Every service, shot as a story.</h2><p>Each campaign below is one of our services in practice — strategy, production and distribution handled by the same room.</p></header>
      <div className="campaigns__grid">
        {campaigns.map((campaign) => <div className="campaign-card-shell" key={campaign.image}><article className="campaign-card" data-cursor="VIEW"><Image src={campaign.image} alt={`${campaign.title} campaign poster`} fill sizes="(max-width: 767px) 78vw, (max-width: 1100px) 44vw, 24vw" /><div className="campaign-card__shade" /><div className="campaign-card__copy"><span>{campaign.service}</span><h3>{campaign.title}</h3><p>{campaign.description}</p></div></article></div>)}
      </div>
    </section>
  );
}
