"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { contactDetails, navigation, socialLinks } from "@/data/site";

export function Footer() {
  const trail = useRef<HTMLDivElement>(null);
  const lastPoint = useRef({ x: -100, y: -100 });
  const paintTrail = (event: PointerEvent<HTMLElement>) => { if (event.pointerType !== "mouse" || !trail.current) return; const bounds = event.currentTarget.getBoundingClientRect(); const x = event.clientX - bounds.left; const y = event.clientY - bounds.top; if (Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y) < 24) return; lastPoint.current = { x, y }; const mark = document.createElement("i"); mark.className = "footer__trail-dot"; mark.style.left = `${x}px`; mark.style.top = `${y}px`; mark.addEventListener("animationend", () => mark.remove(), { once: true }); trail.current.appendChild(mark); };

  return <footer className="footer" onPointerMove={paintTrail}><FluidParticlesBackground className="footer__particles" particleCount={420} /><div ref={trail} className="footer__trail" aria-hidden="true" /><p className="kicker">Have a brand to move?</p><h2>LET&apos;S TALK<span>.</span></h2><Link className="button footer__cta" href="/contact#audit">Request free audit</Link><div className="footer__grid"><div><span>Studio</span><p>{contactDetails.location}</p><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></div><div><span>Navigate</span>{navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href="/pricing">Pricing</Link><Link href="/insights">Insights</Link></div><div><span>Follow</span><a href={socialLinks.instagram}>Instagram</a><a href={socialLinks.linkedin}>LinkedIn</a><a href={socialLinks.youtube}>YouTube</a></div></div><div className="footer__bottom"><span>© 2026 Media Mingles</span><a href="#main">Back to top ↑</a></div></footer>;
}
