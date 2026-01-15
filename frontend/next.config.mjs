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
            {
                protocol: "https",
                hostname: "img.hungmobile.vn",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "logo.clearbit.com",
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
            {
                source: "/uploads/:path*",
                destination: "http://127.0.0.1:5000/uploads/:path*",
            },
        ];
    },
};

export default nextConfig;
