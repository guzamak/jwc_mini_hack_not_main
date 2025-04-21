import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  ignoreBuildErrors: true,
  eslint:{
    ignoreDuringBuilds: true, 
  }

};

export default nextConfig;
