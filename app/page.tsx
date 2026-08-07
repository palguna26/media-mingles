import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { Showreel } from "@/components/sections/Showreel";
import { StudioStatement } from "@/components/sections/StudioStatement";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ClientTicker } from "@/components/ui/ClientTicker";

export default function Home() {
  return <>
    <Hero />
    <StudioStatement />
    <WhatWeDo />
    <SelectedWork />
    <Showreel />
    <Testimonials />
    <ClientTicker />
    <HowWeWork />
  </>;
}
