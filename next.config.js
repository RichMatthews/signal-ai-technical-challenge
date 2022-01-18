/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "static.tvmaze.com"],
  },
};

module.exports = nextConfig;
