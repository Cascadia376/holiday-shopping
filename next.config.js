/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/mobile", destination: "/mobile.html" },
      { source: "/non-alcoholic", destination: "/non-alcoholic.html" }
    ];
  }
};

module.exports = nextConfig;
