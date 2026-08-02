import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/about", "/services", "/work", "/reach", "/pricing", "/insights", "/contact"].map(path => ({ url: `https://mediamingles.in${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : .8 })); }
