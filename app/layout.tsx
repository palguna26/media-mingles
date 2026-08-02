import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./premium.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageIntro } from "@/components/ui/PageIntro";

const geistSans = localFont({ src: "./fonts/geist-latin.woff2", variable: "--font-geist-sans", display: "swap", weight: "100 900" });
const oswald = localFont({ src: "./fonts/oswald-latin.woff2", variable: "--font-condensed", display: "swap", weight: "200 700" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mediamingles.in"),
  title: { default: "Media Mingles — Creative Agency", template: "%s — Media Mingles" },
  description: "One studio that plans, shoots, casts and scales across social, influence, production, search and PR.",
  openGraph: { title: "Media Mingles", description: "One studio that plans, shoots, casts and scales.", type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${oswald.variable} h-full antialiased`}><body><SmoothScrollProvider><PageIntro /><GrainOverlay /><Navbar /><main>{children}</main><Footer /></SmoothScrollProvider></body></html>;
}
