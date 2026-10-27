import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ai-sme",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
