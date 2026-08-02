import type { Metadata } from "next";
import localFont from "next/font/local";
import { Epilogue, Questrial } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MotionShell } from "@/components/motion/MotionShell";

const oswald = localFont({ src: "./fonts/oswald-latin.woff2", variable: "--font-oswald", display: "swap", weight: "200 700" });
const epilogue = Epilogue({ subsets: ["latin"], variable: "--font-epilogue", display: "swap", weight: "variable", style: ["normal", "italic"] });
const questrial = Questrial({ subsets: ["latin"], variable: "--font-questrial", display: "swap", weight: "400" });

export const metadata: Metadata = { metadataBase: new URL("https://mediamingles.in"), title: { default: "Media Mingles — Creative Agency", template: "%s — Media Mingles" }, description: "One studio that plans, shoots, casts and scales across social, influence, production, search and PR.", openGraph: { title: "Media Mingles", description: "One studio that plans, shoots, casts and scales.", type: "website", locale: "en_IN" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${oswald.variable} ${epilogue.variable} ${questrial.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><MotionShell /><GrainOverlay /><Navbar /><main id="main">{children}</main><Footer /></body></html>; }
