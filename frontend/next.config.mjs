/** @type {import('next').NextConfig} */
const nextConfig = {
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
                destination: "http://127.0.0.1:5000/api/:path*",
            },
        ];
    },
};

export default nextConfig;
