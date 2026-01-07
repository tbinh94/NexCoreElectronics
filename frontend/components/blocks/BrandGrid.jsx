"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const brandDomains = {
    "Apple": "apple.com",
    "Samsung": "samsung.com",
    "Sony": "sony.com",
    "Dell": "dell.com",
    "HP": "hp.com",
    "Asus": "asus.com",
    "Xiaomi": "mi.com",
    "Lenovo": "lenovo.com",
    "LG": "lg.com",
    "Acer": "acer.com",
    "MSI": "msi.com",
    "Google": "google.com",
    "Microsoft": "microsoft.com",
    "Intel": "intel.com",
    "AMD": "amd.com",
    "Nvidia": "nvidia.com",
    "Logitech": "logitech.com",
    "Razer": "razer.com",
    "Corsair": "corsair.com",
    "Kingston": "kingston.com",
    "SanDisk": "sandisk.com",
    "Seagate": "seagate.com",
    "WD": "westerndigital.com",
    "Gigabyte": "gigabyte.com",
    "Huawei": "huawei.com",
    "Valve": "steampowered.com",
    "Framework": "frame.work",
    "GPD": "gpd.hk",
    "Chuwi": "chuwi.com",
    "Masstel": "masstel.vn"
};

// Filter to show only top laptop brands
const TOP_LAPTOP_BRANDS = [
    "Apple", "Dell", "HP", "Asus", "Lenovo",
    "MSI", "Acer", "Microsoft", "LG", "Razer",
    "Samsung", "Gigabyte", "Huawei", "Framework"
];

const BrandLogo = ({ brand }) => {
    const [error, setError] = useState(false);

    // Normalize brand name for matching
    const brandKey = Object.keys(brandDomains).find(key => key.toLowerCase() === brand.toLowerCase());
    const domain = brandKey ? brandDomains[brandKey] : null;

    // Use Brandfetch for better logo coverage
    const logoUrl = domain && !error
        ? `https://cdn.brandfetch.io/${domain}`
        : `https://placehold.co/200x100/ffffff/333333?text=${encodeURIComponent(brand)}`;

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
                src={logoUrl}
                alt={brand}
                className="max-h-12 max-w-full object-contain transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                onError={() => setError(true)}
            />
        </div>
    );
};

export default function BrandGrid({ brands }) {
    if (!brands?.length) return null;

    // Filter brands to only include top laptop brands that exist in the input list
    const displayBrands = TOP_LAPTOP_BRANDS.filter(brand =>
        brands.some(b => b.toLowerCase() === brand.toLowerCase())
    );

    if (displayBrands.length === 0) return null;

    return (
        <section className="space-y-6 py-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Thương hiệu Laptop hàng đầu</h2>
                <Link href="/products" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Xem tất cả &rarr;
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {displayBrands.map((brand) => (
                    <Link key={brand} href={`/products?brand=${brand}`}>
                        <Card className="hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all cursor-pointer group bg-white dark:bg-gray-900 h-24 border-gray-100 dark:border-gray-800">
                            <CardContent className="flex items-center justify-center p-0 h-full">
                                <BrandLogo brand={brand} />
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}
