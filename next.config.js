/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  output: "export",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
    unoptimized: true,
  },
};

module.exports = nextConfig;
