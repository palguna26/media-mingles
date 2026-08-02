import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { MediaWall } from "@/components/sections/MediaWall";
import { Showreel } from "@/components/sections/Showreel";
import { Results } from "@/components/sections/Results";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ClientTicker } from "@/components/ui/ClientTicker";

export default function Home() { return <><Hero /><ClientTicker /><SelectedWork /><Services /><MediaWall /><Showreel /><Results /><About /><Contact /></>; }
