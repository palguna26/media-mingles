"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const links = [["Work", "#work"], ["Services", "#services"], ["About", "#about"], ["Contact", "#contact"]];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
    <a href="#top" className="wordmark" aria-label="Media Mingles home">MEDIA<br />MINGLES<span>.</span></a>
    <nav className="nav__links" aria-label="Primary">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<MagneticButton href="#contact" className="nav__cta">Start a project</MagneticButton></nav>
    <button className="nav__toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
    <div className={`menu ${open ? "menu--open" : ""}`} aria-hidden={!open}>{links.map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}</a>)}<a href="#contact" onClick={() => setOpen(false)}>Start a project ↗</a></div>
  </header>;
}
