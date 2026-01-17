"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const slides = [
    {
        id: 1,
        image: "/bannerPC.png", // Fallback or actual image
        title: "Siêu Sale Mùa Hè",
        subtitle: "Giảm giá lên đến 50% cho các sản phẩm công nghệ hot nhất năm nay.",
        cta: "Săn Deal Ngay",
        link: "/products?promotion=true",
        bgClass: "bg-gradient-to-r from-blue-900 to-blue-600"
    },
    {
        id: 2,
        image: "/banner_green.png",
        title: "Công Nghệ Xanh",
        subtitle: "Các dòng Laptop tiết kiệm điện, thân thiện môi trường.",
        cta: "Khám phá",
        link: "/products?category=Ultrabook",
        bgClass: "bg-gradient-to-r from-emerald-800 to-emerald-500"
    },
    {
        id: 3,
        image: "/banner_purple.png",
        title: "Gaming Gear Đỉnh Cao",
        subtitle: "Nâng tầm trải nghiệm chơi game với bộ sưu tập mới nhất.",
        cta: "Mua ngay",
        link: "/products?category=Gaming%20Laptop",
        bgClass: "bg-gradient-to-r from-violet-900 to-violet-600"
    }
];

export default function HeroBanner() {
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, loop: true })
    );

    return (
<<<<<<< HEAD
        <section className="py-4">
=======
        <section className="w-full py-4">
>>>>>>> 716989d380ce87292e9f473f050d9ef05d49e9b1
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-125">
                {/* Main Slider (Left - 2/3 width) */}
                <div className="lg:col-span-2 h-75 lg:h-full rounded-2xl overflow-hidden shadow-lg relative group">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full h-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="h-full">
                            {slides.map((slide) => (
                                <CarouselItem key={slide.id} className="relative w-full h-full">
                                    <div className={`relative w-full h-full ${slide.bgClass}`}>
                                        {/* Background Image */}
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover opacity-60 mix-blend-overlay"
                                            priority={slide.id === 1}
                                        />

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 text-white z-10 bg-linear-to-r from-black/60 to-transparent">
                                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight animate-in slide-in-from-left duration-500">
                                                {slide.title}
                                            </h2>
                                            <p className="text-lg md:text-xl mb-8 max-w-lg text-gray-100 animate-in slide-in-from-left duration-700 delay-100">
                                                {slide.subtitle}
                                            </p>
                                            <Button
                                                asChild
                                                size="lg"
                                                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all animate-in zoom-in duration-500 delay-200"
                                            >
                                                <Link href={slide.link}>
                                                    {slide.cta}
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/30 border-none text-white hidden group-hover:flex" />
                        <CarouselNext className="right-4 bg-white/10 hover:bg-white/30 border-none text-white hidden group-hover:flex" />
                    </Carousel>
                </div>

                {/* Side Banners (Right - 1/3 width) */}
                <div className="hidden lg:flex flex-col gap-4 h-full">
                    {/* Top Side Banner */}
                    <div className="flex-1 rounded-2xl overflow-hidden relative shadow-md group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-red-500"></div>
                        <Image
                            src="/banner_flash_sale.png"
                            alt="Flash Sale"
                            fill
                            className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-500 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                            <span className="text-sm font-bold uppercase tracking-wider mb-1 bg-white/20 w-fit px-2 py-1 rounded">Hot Deal</span>
                            <h3 className="text-2xl font-bold mb-2">Flash Sale 24h</h3>
                            <p className="text-sm text-white/90 mb-4">Săn deal giá sốc mỗi ngày</p>
                            <Link href="/products?promotion=true" className="text-sm font-bold underline decoration-2 underline-offset-4 hover:text-white/80">
                                Xem ngay &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Side Banner */}
                    <div className="flex-1 rounded-2xl overflow-hidden relative shadow-md group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-black"></div>
                        <Image
                            src="/banner_vip.png"
                            alt="Premium Service"
                            fill
                            className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-500 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                            <span className="text-sm font-bold uppercase tracking-wider mb-1 bg-yellow-500/20 text-yellow-300 w-fit px-2 py-1 rounded">Premium</span>
                            <h3 className="text-2xl font-bold mb-2">Đặc quyền VIP</h3>
                            <p className="text-sm text-white/90 mb-4">Miễn phí vận chuyển & Bảo hành tận nơi</p>
                            <Link href="/services" className="text-sm font-bold underline decoration-2 underline-offset-4 hover:text-white/80">
                                Tìm hiểu thêm &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
