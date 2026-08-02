import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { MediaWall } from "@/components/sections/MediaWall";
import { Showreel } from "@/components/sections/Showreel";
import { Results } from "@/components/sections/Results";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function Home() {
  return <SmoothScrollProvider><GrainOverlay /><Navbar /><main><Hero /><SelectedWork /><Services /><MediaWall /><Showreel /><Results /><About /><Contact /></main><Footer /></SmoothScrollProvider>;
}
