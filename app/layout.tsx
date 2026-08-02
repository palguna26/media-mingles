import type { Metadata } from "next";
import { Geist, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mediamingles.in"),
  title: { default: "Media Mingles — Pan-India Content Studio", template: "%s — Media Mingles" },
  description: "One studio that plans, shoots, casts and scales across social, influence, production, search and PR.",
  openGraph: { title: "Media Mingles", description: "One studio that plans, shoots, casts and scales.", type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${oswald.variable} h-full antialiased`}><body><SmoothScrollProvider><GrainOverlay /><Navbar /><main>{children}</main><Footer /></SmoothScrollProvider></body></html>;
}
