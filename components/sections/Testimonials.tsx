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
        gsap.set(cards, { yPercent: 135, rotate: index => index % 2 ? 5 : -5 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=145%", pin: true, scrub: .7, anticipatePin: 1 } });
        cards.forEach((card, index) => {
          const direction = index % 2 ? 1 : -1;
          timeline.to(card, { yPercent: 12, xPercent: direction * 8, rotate: direction * 2, duration: .55, ease: "power2.out" }, index * .08)
            .to(card, { yPercent: -155, xPercent: direction * 58, rotate: direction * 16, duration: .75, ease: "power2.in", opacity: .18 }, `>${-.12}`);
        });
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="testimonials testimonials--cards"><header className="section-head"><span>Proof / In their words</span><h2>GOOD WORK<br /><i>GETS REMEMBERED.</i></h2></header><div className="testimonials__card-stage">{testimonials.map((item, index) => <blockquote className={`testimonial-card testimonial-card--${index % 2 ? "right" : "left"}`} key={`${item.name}-${index}`}><span>Sample testimonial</span><p>“{item.quote}”</p><footer>{item.name} · {item.role}<br />{item.company}</footer></blockquote>)}</div></section>;
}
