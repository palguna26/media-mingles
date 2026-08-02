"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function PageIntro() {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("mm-intro-seen")) return;
    sessionStorage.setItem("mm-intro-seen", "true");
    const reveal = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(reveal);
  }, []);
  useEffect(() => {
    if (!visible || !root.current) return;
    const context = gsap.context(() => { gsap.timeline({ onComplete: () => setVisible(false) }).from(".page-intro__mark", { yPercent: 120, duration: .45, ease: "power4.out" }).to(".page-intro__frame span", { yPercent: -100, duration: .35, stagger: .06, ease: "power3.in" }, .72).to(root.current, { clipPath: "inset(0 0 100% 0)", duration: .72, ease: "power4.inOut" }, .88); }, root);
    return () => context.revert();
  }, [visible]);
  if (!visible) return null;
  return <div ref={root} className="page-intro" aria-hidden="true"><div className="page-intro__mark">MEDIA MINGLES<span>.</span></div><div className="page-intro__frame"><span>FRAME 001</span><span>BENGALURU / INDIA</span></div></div>;
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches || !cursor.current) return;
    const node = cursor.current; const target = { x: innerWidth / 2, y: innerHeight / 2 }; const current = { ...target };
    const move = (event: PointerEvent) => { target.x = event.clientX; target.y = event.clientY; node.classList.add("is-visible"); };
    const over = (event: PointerEvent) => { const hit = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]"); node.dataset.label = hit?.dataset.cursor ?? ""; node.classList.toggle("is-active", Boolean(hit)); };
    const leave = () => node.classList.remove("is-visible");
    const tick = () => { current.x += (target.x - current.x) * .2; current.y += (target.y - current.y) * .2; node.style.transform = `translate3d(${current.x}px,${current.y}px,0)`; };
    addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerover", over, { passive: true }); document.documentElement.addEventListener("mouseleave", leave); gsap.ticker.add(tick);
    return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); document.documentElement.removeEventListener("mouseleave", leave); gsap.ticker.remove(tick); };
  }, []);
  return <div ref={cursor} className="motion-cursor" aria-hidden="true"><span /></div>;
}

function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null); const [section, setSection] = useState("01");
  useEffect(() => {
    const update = () => { const max = document.documentElement.scrollHeight - innerHeight; if (bar.current) bar.current.style.transform = `scaleY(${max > 0 ? scrollY / max : 0})`; };
    const sections = [...document.querySelectorAll<HTMLElement>("main > section")];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setSection(String(sections.indexOf(entry.target as HTMLElement) + 1).padStart(2, "0")); }), { rootMargin: "-42% 0px -42%" });
    sections.forEach(item => observer.observe(item)); addEventListener("scroll", update, { passive: true }); update();
    return () => { removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span>{section}</span><i><span ref={bar} /></i></div>;
}

export function MotionShell() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: .9, lerp: .12, smoothWheel: true, syncTouch: false, anchors: true });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(update); gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh(); document.fonts.ready.then(refresh); addEventListener("load", refresh, { once: true });
    return () => { removeEventListener("load", refresh); gsap.ticker.remove(update); lenis.destroy(); };
  }, []);
  return <><PageIntro /><CustomCursor /><ScrollProgress /></>;
}
