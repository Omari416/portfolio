import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets you open the dev server from the "Network" address (other device, link-local IP).
  allowedDevOrigins: ["169.254.239.116", "192.168.*.*", "10.*.*.*"],
  experimental: {
    // Only nudge about Next.js security upgrades.
    agentUpgrade: "security",
  },
};

export default nextConfig;
