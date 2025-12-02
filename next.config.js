/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/mobile", destination: "/mobile.html" }
    ];
  }
};

module.exports = nextConfig;
