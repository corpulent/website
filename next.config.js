/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/risklens",
        destination: "/risklens/docs",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
