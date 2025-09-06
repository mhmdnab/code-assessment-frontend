import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pinimg.com"], // ← add the external host here
  },
};

export default nextConfig;
