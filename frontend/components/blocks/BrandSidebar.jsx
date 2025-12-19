'use client';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BrandSidebar({ brand }) {
    const router = useRouter();
    const handleBrandClick = (brand) => {
        router.push(`?brand=${brand}`);
    };
    const searchParams = useSearchParams();
    const active = searchParams.get('brand') || "";

    return (
        <div className="flex flex-col items-end gap-y-4 bg-white rounded-lg w-full h-full">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Thương hiệu</p>
                </div>
                <div className="flex flex-col gap-y-2">
                    {brand?.map((brands) => (
                        <Link
                            key={brands}
                            href={`/products?brand=${brands}`}
                            className={`text-sm text-gray-600 hover:text-blue-700 hover:font-semibold transition-colors ${active === brands ? "font-bold text-black" : ""}`}
                        >
                            {brands}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
