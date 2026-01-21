"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Loader2, Tag } from "lucide-react";

export default function UsedLaptopsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsedProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api/products/daily-used`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch used products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsedProducts();
    }, []);

    if (loading) {
        return (
            <Container className="py-10 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center justify-center gap-2">
                    <Tag className="w-8 h-8 text-red-500" />
                    Máy Cũ Giá Rẻ - Deal Ngon Mỗi Ngày
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Danh sách 15 mẫu máy cũ được cập nhật ngẫu nhiên mỗi ngày với giá cực tốt (Tiết kiệm tới 40%).
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500">Hôm nay chưa có deal nào. Quay lại sau nhé!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <div
                            className='group flex bg-white dark:bg-card shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl flex-col gap-y-4 h-full overflow-hidden border border-gray-100 dark:border-border relative'
                            key={product._id}
                        >
                            {/* Badge */}
                            <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                -40%
                            </div>

                            <div className='p-3 flex-1 flex flex-col'>
                                {/* Image */}
                                <Link href={`/products/${product._id}?type=used`} className="aspect-4/3 w-full relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 block">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </Link>

                                {/* Info */}
                                <div className="flex-1">
                                    <Link href={`/products/${product._id}?type=used`}>
                                        <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                                            {product.name}
                                        </h2>
                                    </Link>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] rounded">
                                            Cũ 99%
                                        </span>
                                        <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] rounded">
                                            Bảo hành 6T
                                        </span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className='pt-2 border-t border-gray-100 dark:border-gray-800 mt-auto'>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 line-through">
                                            {formatPrice(product.originalNewPrice)}
                                        </span>
                                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}
