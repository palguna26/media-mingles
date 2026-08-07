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
        const leftCards = cards.filter((card) => card.classList.contains("testimonial-card--left"));
        const rightCards = cards.filter((card) => card.classList.contains("testimonial-card--right"));
        gsap.set(leftCards, { yPercent: -155, xPercent: 0, rotate: 0, opacity: 0 });
        gsap.set(rightCards, { yPercent: 155, xPercent: 0, rotate: 0, opacity: 0 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=145%", pin: true, scrub: .7, anticipatePin: 1 } });
        timeline.to(leftCards, { yPercent: 155, duration: 1, ease: "none" }, 0)
          .to(rightCards, { yPercent: -155, duration: 1, ease: "none" }, 0)
          .to(cards, { opacity: 1, duration: .12, ease: "none" }, .04)
          .to(cards, { opacity: 0, duration: .12, ease: "none" }, .88);
      });
      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card) => gsap.from(card, { y: 55, opacity: 0, duration: .7, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } }));
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="testimonials testimonials--cards"><header className="section-head"><span>Proof / In their words</span><h2>GOOD WORK<br /><i>GETS REMEMBERED.</i></h2></header><div className="testimonials__card-stage">{testimonials.map((item, index) => <blockquote className={`testimonial-card testimonial-card--${index % 2 ? "right" : "left"}`} key={`${item.name}-${index}`}><span>Sample testimonial</span><p>“{item.quote}”</p><footer>{item.name} · {item.role}<br />{item.company}</footer></blockquote>)}</div></section>;
}
