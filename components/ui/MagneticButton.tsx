"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export function MagneticButton({ href, children, className = "", circle = false }: { href: string; children: React.ReactNode; className?: string; circle?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.18}px, ${(event.clientY - rect.top - rect.height / 2) * 0.18}px)`;
  };
  return <a ref={ref} href={href} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }} className={`magnetic ${circle ? "magnetic--circle" : ""} ${className}`}><span>{children}</span><ArrowUpRight size={18} /></a>;
}
