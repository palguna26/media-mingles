import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "mediamingles.in", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "i0.wp.com", pathname: "/mediamingles.in/wp-content/**" },
    ],
  },
};

export default nextConfig;
