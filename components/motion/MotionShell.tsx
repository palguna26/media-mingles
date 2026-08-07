"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function VideoIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const finish = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 360);
  }, []);

  useEffect(() => {
    video.current?.play().catch(finish);
  }, [finish]);

  if (!visible) return null;
  return <div className={`video-intro ${leaving ? "video-intro--leaving" : ""}`} aria-hidden="true"><video ref={video} autoPlay muted playsInline preload="auto" onEnded={finish} onError={finish}><source src="/ascii-magic-4.webm" type="video/webm" /><source src="/ascii-magic-4.mp4" type="video/mp4" /></video><button type="button" onClick={finish} tabIndex={-1}>Skip intro</button></div>;
}

function SiteVideoBackground() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = root.current;
    const media = video.current;
    if (!node || !media) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) media.pause();
    else media.play().catch(() => undefined);

    if (pathname !== "/") {
      node.classList.add("is-blurred");
      return;
    }

    const hero = document.querySelector(".hero--video");
    if (!hero) {
      node.classList.add("is-blurred");
      return;
    }

    node.classList.remove("is-blurred");
    const observer = new IntersectionObserver(([entry]) => node.classList.toggle("is-blurred", !entry.isIntersecting), { threshold: .2 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return <div ref={root} className={`site-video-background${pathname === "/" ? "" : " is-blurred"}`} aria-hidden="true"><video ref={video} className="site-video-background__video" autoPlay muted loop playsInline preload="metadata"><source src="/background.webm" type="video/webm" /><source src="/background.mp4" type="video/mp4" /></video><div className="site-video-background__tint" /></div>;
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const media = matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    const node = cursor.current;
    const surface = canvas.current;
    const context = surface?.getContext("2d");
    if (!media.matches || !node || !surface || !context) return;

    const trail: Array<{ x: number; y: number; radius: number; life: number; seed: number }> = [];
    let last = { x: innerWidth / 2, y: innerHeight / 2 };
    let hasMoved = false;
    let seed = 0;
    let maskedBounds: DOMRect[] = [];
    let lastMaskUpdate = 0;

    const refreshMask = () => {
      maskedBounds = Array.from(document.querySelectorAll<HTMLElement>("main :is(h1,h2,h3,h4,p,a,button,li,span,strong,small,blockquote,summary,input,select,textarea,img), .footer :is(h1,h2,h3,h4,p,a,button,li,span,strong,small,blockquote,summary,input,select,textarea,img)"))
        .map((element) => element.getBoundingClientRect())
        .filter((bounds) => bounds.width > 0 && bounds.height > 0);
      lastMaskUpdate = performance.now();
    };

    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 1.75);
      surface.width = Math.round(innerWidth * ratio);
      surface.height = Math.round(innerHeight * ratio);
      surface.style.width = `${innerWidth}px`;
      surface.style.height = `${innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      refreshMask();
    };
    const move = (event: PointerEvent) => {
      if (!hasMoved) {
        last = { x: event.clientX, y: event.clientY };
        hasMoved = true;
        trail.push({ x: event.clientX, y: event.clientY, radius: 17.5, life: 1, seed: seed += 1 });
        node.classList.add("is-visible");
        return;
      }
      const dx = event.clientX - last.x;
      const dy = event.clientY - last.y;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(distance / 8));
      const radius = 17.5;
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        trail.push({ x: last.x + dx * progress, y: last.y + dy * progress, radius, life: 1, seed: seed += 1 });
      }
      if (trail.length > 80) trail.splice(0, trail.length - 80);
      last = { x: event.clientX, y: event.clientY };
      node.classList.add("is-visible");
    };
    const leave = () => {
      hasMoved = false;
      node.classList.remove("is-visible");
    };
    const tick = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      context.fillStyle = "#ffffff";
      trail.forEach((point) => {
        const radius = point.radius * (.76 + point.life * .24);
        const gridStep = 3;
        const gridLimit = Math.ceil(radius / gridStep) * gridStep;
        for (let x = -gridLimit; x <= gridLimit; x += gridStep) {
          for (let y = -gridLimit; y <= gridLimit; y += gridStep) {
            const distance = Math.hypot(x, y) / radius;
            if (distance > 1) continue;
            const density = .03 + (1 - distance) * .28;
            const noise = Math.abs(Math.sin(x * 12.9898 + y * 78.233 + point.seed * 37.719) * 43758.5453) % 1;
            if (noise > density) continue;
            const size = 2;
            context.globalAlpha = point.life * (.25 + density * .2);
            context.fillRect(point.x + x - size / 2, point.y + y - size / 2, size, size);
          }
        }
        point.life -= .028;
      });
      context.globalAlpha = 1;
      if (performance.now() - lastMaskUpdate > 120) refreshMask();
      context.save();
      context.globalCompositeOperation = "destination-out";
      maskedBounds.forEach((bounds) => context.fillRect(bounds.left - 3, bounds.top - 3, bounds.width + 6, bounds.height + 6));
      context.restore();
      for (let index = trail.length - 1; index >= 0; index -= 1) if (trail[index].life <= 0) trail.splice(index, 1);
      if (!hasMoved && trail.length === 0) node.classList.remove("is-visible");
    };

    resize();
    addEventListener("resize", resize, { passive: true });
    addEventListener("scroll", refreshMask, { passive: true, capture: true });
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    gsap.ticker.add(tick);
    return () => {
      removeEventListener("resize", resize);
      removeEventListener("scroll", refreshMask, true);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      gsap.ticker.remove(tick);
    };
  }, []);
  return <div ref={cursor} className="motion-cursor" aria-hidden="true"><canvas ref={canvas} /></div>;
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
  return <><VideoIntro /><SiteVideoBackground /><CustomCursor /><ScrollProgress /></>;
}
