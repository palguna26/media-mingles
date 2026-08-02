export const navigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Reach", href: "/reach" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
] as const;

export const socialLinks = {
  instagram: "https://instagram.com/mediamingles",
  youtube: "https://youtube.com/@mediamingles",
  linkedin: "https://linkedin.com/company/mediamingles",
} as const;

export const clients = [
  "ALMA", "Novel", "Babio", "Lakmé", "Sanfe", "Maddur Tiffanys",
  "Sharada", "Novel Tissues", "Grand Serene", "Regent Ceramics",
] as const;

export const cities = ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Kochi", "Chandigarh", "Indore", "Lucknow", "+18 more"] as const;
export const niches = ["Fashion & Beauty", "Food & Lifestyle", "Tech & Gaming", "Fitness & Wellness", "Travel", "Finance", "Parenting", "Comedy & Entertainment", "Home & Decor", "Education"] as const;
export const creatorTiers = ["Nano · 1K–10K", "Micro · 10K–100K", "Mid-Tier · 100K–500K", "Macro · 500K+"] as const;

export const serviceOptions = ["Social Media Management", "Influencer Marketing", "Product Photoshoot", "Videography", "SEO", "Media & PR", "Not sure yet"] as const;

export const proofAssets = {
  logos: "/media/proof/brand-logos.webp",
  creators: "/media/proof/influencer-reach.webp",
  social: "/media/proof/instagram-results.webp",
  products: "/media/proof/proven-partnerships.webp",
  web: "/media/proof/web-development.webp",
  render: "/media/proof/3d-before-after.webp",
  seo: "/media/proof/seo-meta.webp",
} as const;
