"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { navigation } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(scrollY > 40); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", key); return () => { document.body.style.overflow = ""; removeEventListener("keydown", key); }; }, [open]);
  return <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}><Link href="/" className="wordmark" aria-label="Media Mingles home">MEDIA<br />MINGLES<span>.</span></Link><nav className="nav__links" aria-label="Primary">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<MagneticButton href="/contact#audit" className="nav__cta">Make something ↗</MagneticButton></nav><button className="nav__toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button><div id="mobile-menu" className={`menu ${open ? "menu--open" : ""}`} aria-hidden={!open}>{navigation.map((item, i) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{item.label}</Link>)}<Link href="/contact#audit" onClick={() => setOpen(false)}>Make something ↗</Link><small>No beige campaigns.</small></div></header>;
}
