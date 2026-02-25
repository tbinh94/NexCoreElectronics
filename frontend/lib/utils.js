import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price) {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(numericPrice);
}

export function getImageUrl(imagePath) {
    if (!imagePath) return "";
    if (imagePath.startsWith('http')) return imagePath;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    // Ensure no double slash if imagePath starts with /
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${apiUrl}${cleanPath}`;
}
