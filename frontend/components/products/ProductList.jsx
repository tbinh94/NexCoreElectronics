"use client";
import Link from "next/link";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Zap, ShieldCheck } from 'lucide-react';
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { MEGA_MENU_DATA } from "@/data/menuData";

export default function ProductList({ products }) {
    // Brand of the Week Logic
    const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const brandIndex = currentWeek % MEGA_MENU_DATA.brands.length;
    const brandOfTheWeek = MEGA_MENU_DATA.brands[brandIndex];

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800">
                <div className="bg-gray-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-gray-400 w-8 h-8" />
                </div>
                <p className="text-gray-600 dark:text-slate-300 text-xl font-bold">Không tìm thấy sản phẩm nào</p>
                <p className="text-gray-400 dark:text-slate-500 text-sm mt-2 max-w-xs mx-auto">Vui lòng thử lại với các tiêu chí lọc khác hoặc liên hệ bộ phận CSKH để được hỗ trợ.</p>
            </div>
        )
    }

    return (
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
                const isBrandOfTheWeek = product.brand === brandOfTheWeek.value;
                const discountPercent = isBrandOfTheWeek ? 30 : (product.originalPrice && product.originalPrice > product.price)
                    ? Math.round((1 - product.price / product.originalPrice) * 100)
                    : 0;

                const finalPrice = isBrandOfTheWeek ? Math.round(product.price * 0.7) : product.price;
                const oldPrice = isBrandOfTheWeek ? product.price : (product.originalPrice || null);

                return (
                    <div
                        className='group relative bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl flex flex-col h-full overflow-hidden border border-gray-100 dark:border-slate-800 hover:-translate-y-1'
                        key={product._id}
                    >
                        {/* Badges Layout */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                            {isBrandOfTheWeek && (
                                <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg flex items-center gap-1 uppercase tracking-tight">
                                    <Zap size={10} className="fill-white" /> Tuần lễ {brandOfTheWeek.label}
                                </span>
                            )}
                            {product.is_new_product && (
                                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md uppercase tracking-tight">
                                    Mới về
                                </span>
                            )}
                            {product.isUsed && (
                                <span className="bg-gray-800 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md uppercase tracking-tight border border-white/20">
                                    Cũ 99%
                                </span>
                            )}
                        </div>

                        {/* Image Section */}
                        <div className='p-2 pb-0'>
                            <Link href={`/products/${product.slug || product._id}`} className="aspect-[4/3] w-full relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800 block">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {/* Quick View/Cart Overlay (Hidden until hover) */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <AddToCartButton
                                        productId={product._id}
                                        className="rounded-full w-10 h-10 p-0 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                        showIcon
                                    >

                                        <ShoppingCart size={18} />
                                    </AddToCartButton>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.location.href = `/products/${product.slug || product._id}`;
                                        }}
                                        className="bg-white text-slate-900 p-2.5 rounded-full shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-gray-100"
                                    >
                                        <ShieldCheck size={18} />
                                    </button>

                                </div>
                            </Link>
                        </div>

                        {/* Content Section */}
                        <div className='p-4 pt-3 flex-1 flex flex-col'>
                            {/* Brand & Stars */}
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">{product.brand}</span>
                                <div className="flex items-center gap-0.5">
                                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400">{product.rating || (4.5 + (product._id.length % 5) / 10)}</span>
                                </div>
                            </div>

                            <Link href={`/products/${product.slug || product._id}`}>
                                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 h-10 md:h-12 leading-snug mb-2">
                                    {product.name}
                                </h3>
                            </Link>

                            {/* Spec Badges */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {product.cpu_type && (
                                    <span className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">{product.cpu_type}</span>
                                )}
                                {product.specs?.ram && (
                                    <span className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">{product.specs.ram}</span>
                                )}
                            </div>

                            {/* Price Section */}
                            <div className='mt-auto pt-3 border-t border-slate-50 dark:border-slate-800/50'>
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <p className="text-base md:text-xl font-black text-red-600 dark:text-red-500">
                                            {formatPrice(finalPrice)}
                                        </p>
                                        {discountPercent > 0 && (
                                            <span className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-red-100 dark:border-red-900/50">
                                                -{discountPercent}%
                                            </span>
                                        )}
                                    </div>
                                    {oldPrice && oldPrice > finalPrice && (
                                        <p className="text-xs text-slate-400 dark:text-slate-500 line-through font-medium">
                                            {formatPrice(oldPrice)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

