"use client";

import Link from "next/link";
import { ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromotionBanner() {
    return (
        <div className="relative w-full overflow-hidden rounded-3xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-12 shadow-2xl sm:px-12 sm:py-16 lg:px-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="relative flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm mb-6">
                        <Timer className="mr-2 h-4 w-4" />
                        Kết thúc trong 24h
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Siêu Sale Giữa Tháng
                        <br />
                        <span className="text-yellow-300">Giảm tới 50%</span>
                    </h2>
                    <p className="mt-4 max-w-xl text-lg text-indigo-100">
                        Săn ngay các sản phẩm công nghệ hot nhất với giá cực hời.
                        Số lượng có hạn, đừng bỏ lỡ cơ hội nâng cấp thiết bị của bạn!
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                        <Button
                            size="lg"
                            className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold text-base h-12 px-8"
                            asChild
                        >
                            <Link href="/products?promotion=true">
                                Mua Ngay
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white/10 hover:text-white font-medium text-base h-12 px-8 bg-transparent"
                            asChild
                        >
                            <Link href="/products">
                                Xem Tất Cả <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Decorative Image/Element */}
                <div className="mt-10 lg:mt-0 lg:ml-10 relative hidden lg:block">
                    <div className="relative h-64 w-64 animate-float">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 blur-3xl opacity-20 animate-pulse"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-4 rotate-12">
                            <div className="h-32 w-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-4 flex items-center justify-center">
                                <span className="text-4xl">🎧</span>
                            </div>
                            <div className="h-32 w-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-4 flex items-center justify-center mt-8">
                                <span className="text-4xl">⌚</span>
                            </div>
                            <div className="h-32 w-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-4 flex items-center justify-center -mt-8">
                                <span className="text-4xl">📱</span>
                            </div>
                            <div className="h-32 w-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-4 flex items-center justify-center">
                                <span className="text-4xl">💻</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
