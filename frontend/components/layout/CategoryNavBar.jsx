"use client";

import Link from "next/link";
import { Menu, Package, ChevronDown, Zap, RotateCcw } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "@/components/ui/container";
import { MEGA_MENU_DATA } from "@/data/menuData";

export default function CategoryNavBar({ categories = [] }) {
    return (
        <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 block sticky top-0 z-40 shadow-sm">
            <Container>
                <div className="flex items-center h-16 gap-4">
                    {/* Left Side - Mega Menu Dropdown */}
                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="h-10 px-4 font-bold bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 rounded-lg transition-all duration-200 gap-2"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="text-sm">Danh mục sản phẩm</span>
                                    <ChevronDown className="h-4 w-4 opacity-60" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[95vw] md:w-[1000px] max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 rounded-xl mt-2 p-0 scrollbar-thin"
                                align="start"
                                sideOffset={8}
                            >
                                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">

                                    {/* Column 1: Brands & Mini Promo */}
                                    <div className="col-span-3 flex flex-col gap-6 border-r border-gray-100 dark:border-gray-800 pr-6">
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                                Thương hiệu
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {MEGA_MENU_DATA.brands.map((brand) => (
                                                    <Link key={brand.label} href={`/products?brand=${brand.value}`}>
                                                        <div className="px-3 py-2 text-xs font-medium text-center border border-gray-200 dark:border-gray-700 rounded-md hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
                                                            {brand.label}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Compact Mini Promo Banner - Relocated & Smallized */}
                                        <div className="p-3 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-lg text-white relative overflow-hidden group shadow-md border border-indigo-400/20">
                                            {(() => {
                                                const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
                                                const brandIndex = currentWeek % MEGA_MENU_DATA.brands.length;
                                                const brandOfTheWeek = MEGA_MENU_DATA.brands[brandIndex];

                                                return (
                                                    <>
                                                        <div className="relative z-10 flex flex-col items-center text-center">
                                                            <p className="font-bold text-[12px] leading-tight mb-1">Tuần lễ {brandOfTheWeek.label}</p>
                                                            <p className="text-[10px] text-blue-100 mb-2 font-medium">Giảm tới 30%</p>
                                                            <Link href={`/products?brand=${brandOfTheWeek.value}`} className="w-full">
                                                                <Button size="sm" variant="secondary" className="w-full h-6 px-2 text-[10px] font-bold bg-white text-blue-700 hover:bg-blue-50 border-none rounded">
                                                                    Săn ngay
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                        <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    {/* Column 2: User Needs (Center) */}
                                    <div className="col-span-6 flex flex-col gap-4 border-r border-gray-100 dark:border-gray-800 pr-6">
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                            Nhu cầu sử dụng
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {MEGA_MENU_DATA.needs.map((item) => (
                                                <Link key={item.name} href={`/products?category=${encodeURIComponent(item.category)}`}>
                                                    <div className="group flex items-start p-3 gap-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-blue-400 transition-all bg-white dark:bg-gray-900 h-full">
                                                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                            <item.icon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                                    {item.name}
                                                                </span>
                                                                {item.hot && (
                                                                    <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse">
                                                                        HOT
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {item.label && (
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                                                                    {item.label}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                            <Link href="/products" className="col-span-2">
                                                <div className="group flex items-center justify-center p-3 gap-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                                    <span>Xem tất cả sản phẩm</span>
                                                    <ChevronDown className="-rotate-90 w-4 h-4" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Column 3: Prices & Screens */}
                                    <div className="col-span-3 flex flex-col gap-6">
                                        <div className="space-y-3">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                                Mức giá
                                            </h3>
                                            <div className="grid grid-cols-1 gap-2">
                                                {MEGA_MENU_DATA.prices.map((price) => (
                                                    <Link
                                                        key={price.label}
                                                        href={`/products?minPrice=${price.min}${price.max ? `&maxPrice=${price.max}` : ''}`}
                                                    >
                                                        <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-gray-950">
                                                            {price.label}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-px bg-gray-100 dark:bg-gray-800" />

                                        <div className="space-y-3">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                                Màn hình
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {MEGA_MENU_DATA.screens.map((screen) => (
                                                    <Link key={screen} href={`/products?screen_size_label=${encodeURIComponent(screen)}`}>
                                                        <div className="px-3 py-2 text-sm text-center border border-gray-200 dark:border-gray-700 rounded-md hover:border-gray-400 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400 transition-colors">
                                                            {screen}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
                    </div>

                    {/* Middle - Navigation Links */}
                    <div className="relative flex-1 min-w-0 px-0 md:px-4">
                        <Carousel
                            opts={{
                                align: "start",
                                dragFree: true,
                                containScroll: "trimSnaps",
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-1">
                                <CarouselItem className="pl-1 basis-auto">
                                    <Link href="/trade-in" className="relative flex items-center gap-2 px-4 py-2 text-sm font-bold text-green-600 bg-green-50 hover:bg-green-100 rounded-lg whitespace-nowrap border border-green-200">
                                        <RotateCcw className="w-4 h-4 fill-current" />
                                        Thu cũ đổi mới
                                    </Link>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-auto">
                                    <Link href="/products?promotion=true" className="relative flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg whitespace-nowrap">
                                        <Zap className="w-4 h-4 fill-current" />
                                        Flash Sale
                                    </Link>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-auto">
                                    <Link href="/products?sort=newest" className="relative block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg whitespace-nowrap">
                                        Hàng mới về
                                    </Link>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-auto">
                                    <Link href="/products?category=Gaming" className="relative block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg whitespace-nowrap">
                                        Laptop Gaming
                                    </Link>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-auto">
                                    <Link href="/products?category=Macbook" className="relative block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg whitespace-nowrap">
                                        MacBook
                                    </Link>
                                </CarouselItem>
                                {categories.length > 0 && (
                                    <CarouselItem className="pl-1 basis-auto flex items-center">
                                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2" />
                                    </CarouselItem>
                                )}
                                {categories.slice(0, 7).map((category) => (
                                    <CarouselItem key={category} className="pl-1 basis-auto">
                                        <Link href={`/products?category=${category}`} className="relative block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all duration-200 whitespace-nowrap">
                                            {category}
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-none shadow-sm h-8 w-8 disabled:hidden hidden md:flex" />
                            <CarouselNext className="right-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-none shadow-sm h-8 w-8 disabled:hidden hidden md:flex" />
                        </Carousel>
                    </div>

                    {/* Right Side - Support Links */}
                    <div className="hidden lg:flex items-center gap-6 shrink-0">

                        <Link href="/orders" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group">
                            <Package className="h-4 w-4 group-hover:text-blue-600 transition-colors duration-200" />
                            <span>Tra cứu đơn hàng</span>
                        </Link>
                    </div>
                </div>
            </Container >
        </div >
    );
}