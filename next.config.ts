import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "previews.123rf.com",
      },
    ],
  },
};

export default nextConfig;
