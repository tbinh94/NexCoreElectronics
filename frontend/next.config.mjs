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
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
        return [
            {
                source: "/api/:path*", // Khi gọi /api/...
                destination: `${apiUrl}/api/:path*`,
            },
            {
                source: "/uploads/:path*",
                destination: `${apiUrl}/uploads/:path*`,
            },
        ];
    },
};

export default nextConfig;
