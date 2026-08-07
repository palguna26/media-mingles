"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, socialLinks, contactDetails } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false); const toggle = useRef<HTMLButtonElement>(null); const close = useRef<HTMLButtonElement>(null);
  useEffect(() => { const onScroll = () => { const hero = document.querySelector<HTMLElement>(".hero"); setScrolled(hero ? hero.getBoundingClientRect().bottom <= 72 : scrollY > 32); }; onScroll(); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { if (!open) return; const previous = document.body.style.overflow; const toggleButton = toggle.current; document.body.style.overflow = "hidden"; close.current?.focus(); const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; addEventListener("keydown", onKey); return () => { document.body.style.overflow = previous; removeEventListener("keydown", onKey); toggleButton?.focus(); }; }, [open]);
  return <><header className={`nav ${scrolled ? "nav--scrolled" : ""}`}><Link href="/" className="wordmark" aria-label="Media Mingles home">MEDIA MINGLES<span>.</span></Link><nav className="nav__links" aria-label="Primary">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><Link href="/contact#audit" className="nav__cta button button--small">Request free audit</Link><button ref={toggle} className="nav__toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu"><Menu /></button></header><aside className="utility-rail" aria-label="Social links"><a href={socialLinks.instagram}>IG</a><a href={socialLinks.linkedin}>IN</a><a href={`mailto:${contactDetails.email}`}>@</a></aside><div id="mobile-menu" className={`menu ${open ? "menu--open" : ""}`} aria-hidden={!open}><button ref={close} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>{navigation.map((item, i) => <Link tabIndex={open ? 0 : -1} key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{item.label}</Link>)}<Link tabIndex={open ? 0 : -1} href="/contact#audit" onClick={() => setOpen(false)}>Request free audit</Link></div></>;
}
