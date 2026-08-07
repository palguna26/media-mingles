"use client";

import { useLayoutEffect, useRef } from "react";
import { testimonials } from "@/data/testimonials";
import { gsap } from "@/lib/gsap";

export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
        gsap.set(cards, { yPercent: 135, xPercent: 0, rotate: 0, opacity: 1 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=145%", pin: true, scrub: .7, anticipatePin: 1 } });
        cards.forEach((card, index) => {
          timeline.to(card, { yPercent: 12, duration: .55, ease: "power2.out" }, index * .08)
            .to(card, { yPercent: -155, duration: .75, ease: "power2.in", opacity: 0 }, `>${-.12}`);
        });
      });
      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, index) => gsap.from(card, { x: index % 2 ? 45 : -45, y: 55, rotate: index % 2 ? 3 : -3, opacity: 0, duration: .7, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } }));
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="testimonials testimonials--cards"><header className="section-head"><span>Proof / In their words</span><h2>GOOD WORK<br /><i>GETS REMEMBERED.</i></h2></header><div className="testimonials__card-stage">{testimonials.map((item, index) => <blockquote className={`testimonial-card testimonial-card--${index % 2 ? "right" : "left"}`} key={`${item.name}-${index}`}><span>Sample testimonial</span><p>“{item.quote}”</p><footer>{item.name} · {item.role}<br />{item.company}</footer></blockquote>)}</div></section>;
}
