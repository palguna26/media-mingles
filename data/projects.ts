import { proofAssets } from "./site";

export const projects = [
  { number: "01", brand: "ALMA · Novel · Lakmé · Sanfe · Babio", title: "Product Stories", description: "Studio and lifestyle photography shaped for catalogues, campaigns and paid creative.", services: ["Photography", "Production"], result: "5 brand deliveries", accent: "#ff4d00", image: proofAssets.products, category: "Photography" },
  { number: "02", brand: "Maddur Tiffanys · Sharada · Novel Tissues", title: "Always On", description: "Strategy, branded content and community management built for consistent social presence.", services: ["Social", "Creative"], result: "Ongoing delivery", accent: "#eaa9b2", image: proofAssets.social, category: "Social" },
  { number: "03", brand: "Novel Rose Water · Babio", title: "Creator Reach", description: "Vetted creator partnerships managed from casting and briefing through reporting.", services: ["Influencer", "Distribution"], result: "Pan-India network", accent: "#d8ff36", image: proofAssets.creators, category: "Influencer" },
] as const;

export const workItems = [
  ...projects,
  { number: "04", brand: "Grand Serene · Regenta · Mothi Ceramics", title: "Branded Content Systems", description: "Monthly poster and content delivery designed to keep each brand coherent and active.", services: ["Social", "Design"], result: "Monthly delivery", accent: "#66d6ff", image: "/media/proof/poster-delivery.webp", category: "Social" },
  { number: "05", brand: "Novel Tissues · ALMA · Chennamma Ajji", title: "Storefronts That Sell", description: "E-commerce experiences joining brand expression, usability and search foundations.", services: ["Web Design", "SEO"], result: "3 storefronts", accent: "#d6b5ff", image: proofAssets.web, category: "Web Design" },
  { number: "06", brand: "Chennamma Ajji", title: "Concept to Reality", description: "Three-dimensional product visuals developed for launch-ready campaign use.", services: ["3D", "Production"], result: "Product renders", accent: "#ffc24d", image: proofAssets.render, category: "Photography" },
] as const;

export const galleryMedia: ReadonlyArray<readonly [string, string]> = [
  ["/media/content-creators.png", "Content Creators campaign"],
  ["/media/digital-marketing.png", "Digital Marketing campaign"],
  ["/media/unfold-brand.jpeg", "Unfold Your Brand campaign"],
  ["/media/sites-build-brands.png", "Sites That Build Brands campaign"],
  ...workItems.map((item) => [item.image, `${item.brand} — ${item.title}`] as const),
];
