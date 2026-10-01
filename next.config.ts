import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Content is structured for a future CMS. No remote data sources are
  // configured yet, so the default image optimizer settings apply.
};

export default nextConfig;