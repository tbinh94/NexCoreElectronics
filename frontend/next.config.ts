import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "img.vietqr.io",
      },
    ],
  },
  turbopack: {
    root: '../',
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Khi gọi /api/...
        destination: "http://localhost:5000/api/:path*", // Sẽ chuyển sang backend
      },
    ];
  },
};

export default nextConfig;