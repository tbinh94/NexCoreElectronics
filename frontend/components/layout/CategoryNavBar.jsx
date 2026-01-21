"use client";

import Link from "next/link";
import { Menu, Package, MessageCircle, ChevronDown, Tag, Laptop, Gamepad2, Briefcase, GraduationCap, Feather, Monitor, Cpu, PenTool, Zap } from "lucide-react";
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

const MEGA_MENU_DATA = {
    brands: [
        { label: "MacBook", value: "Apple" },
        { label: "ASUS", value: "Asus" },
        { label: "Lenovo", value: "Lenovo" },
        { label: "Dell", value: "Dell" },
        { label: "HP", value: "HP" },
        { label: "Acer", value: "Acer" },
        { label: "LG", value: "LG" },
        { label: "MSI", value: "MSI" },
        { label: "Gigabyte", value: "Gigabyte" },
        { label: "Samsung", value: "Samsung" }
    ],
    prices: [
        { label: "Dưới 10 triệu", min: 0, max: 10000000 },
        { label: "Từ 10 - 15 triệu", min: 10000000, max: 15000000 },
        { label: "Từ 15 - 20 triệu", min: 15000000, max: 20000000 },
        { label: "Từ 20 - 25 triệu", min: 20000000, max: 25000000 },
        { label: "Từ 25 - 30 triệu", min: 25000000, max: 30000000 },
        { label: "Trên 30 triệu", min: 30000000, max: null }
    ],
    needs: [
        { name: "Học tập, văn phòng", icon: Briefcase, category: "Học tập – Văn phòng" },
        { name: "Gaming, Đồ họa", icon: Gamepad2, category: "Gaming" },
        { name: "Mỏng nhẹ, Sang trọng", icon: Feather, category: "Mỏng nhẹ – Di động" },
        { name: "Thiết kế, Kỹ thuật", icon: PenTool, category: "Thiết kế – Đồ họa" },
        { name: "Sinh viên, Giá rẻ", icon: GraduationCap, category: "Học tập – Văn phòng" },
        { name: "Cảm ứng, 2 trong 1", icon: Monitor, category: "Ultrabook" },
        { name: "Laptop AI", icon: Zap, category: "Laptop AI", hot: true },
        { name: "Mac CTO", icon: Laptop, category: "Macbook", label: "Nâng cấp cấu hình" }
    ],
    chips: [
        "Core i3", "Core i5", "Core i7", "Core i9",
        "Core Ultra 5", "Core Ultra 7", "Ryzen 5", "Ryzen 7",
        "Apple M2", "Apple M3", "Apple M3 Pro", "Apple M3 Max"
    ],
    screens: [
        "13 inch", "14 inch", "15.6 inch", "16 inch"
    ]
};

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
                            <DropdownMenuContent className="w-[1000px] p-6 shadow-xl border border-gray-200 dark:border-gray-800 rounded-xl mt-2" align="start" sideOffset={8}>
                                <div className="grid grid-cols-12 gap-8">
                                    {/* Column 1: Brands & Prices */}
                                    <div className="col-span-3 flex flex-col gap-6 border-r border-gray-100 dark:border-gray-800 pr-6">
                                        {/* Brands */}
                                        <div className="space-y-3">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base flex items-center gap-2">
                                                Thương hiệu
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {MEGA_MENU_DATA.brands.map((brand) => (
                                                    <Link key={brand.label} href={`/products?brand=${brand.value}`}>
                                                        <div className="px-3 py-2 text-sm font-medium text-center border border-gray-200 dark:border-gray-700 rounded-md hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
                                                            {brand.label}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Prices */}
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
                                    </div>

                                    {/* Column 2: User Needs (Center - Highlighted) */}
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

                                        {/* Promo Banner inside Dropdown */}
                                        <div className="mt-auto p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white relative overflow-hidden group">
                                            <div className="relative z-10">
                                                <p className="font-bold text-lg">Đại tiệc công nghệ</p>
                                                <p className="text-sm text-blue-100 mb-2">Giảm tới 50% cho Laptop Gaming</p>
                                                <Button size="sm" variant="secondary" className="h-8 text-xs bg-white text-blue-700 hover:bg-blue-50 border-none">
                                                    Xem ngay
                                                </Button>
                                            </div>
                                            <div className="absolute right-0 top-0 w-24 h-full bg-white/10 skew-x-12 translate-x-8 group-hover:translate-x-4 transition-transform"></div>
                                        </div>
                                    </div>

                                    {/* Column 3: Chips & Screens */}
                                    <div className="col-span-3 flex flex-col gap-6">
                                        {/* Screens */}
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

                    {/* Middle - Scrollable Navigation Links (Original) */}
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
                                    <Link
                                        href="/products?sort=newest"
                                        className="relative block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all duration-200 whitespace-nowrap"
                                    >
                                        Hàng mới về
                                    </Link>
                                </CarouselItem>

                                <CarouselItem className="pl-1 basis-auto">
                                    <Link
                                        href="/products?promotion=true"
                                        className="relative flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 whitespace-nowrap"
                                    >
                                        <Zap className="w-4 h-4 fill-current" />
                                        Flash Sale
                                    </Link>
                                </CarouselItem>

                                <CarouselItem className="pl-1 basis-auto">
                                    <Link
                                        href="/products?category=Gaming"
                                        className="relative block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all duration-200 whitespace-nowrap"
                                    >
                                        Laptop Gaming
                                    </Link>
                                </CarouselItem>

                                <CarouselItem className="pl-1 basis-auto">
                                    <Link
                                        href="/products?category=Macbook"
                                        className="relative block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all duration-200 whitespace-nowrap"
                                    >
                                        MacBook
                                    </Link>
                                </CarouselItem>


                                {categories.length > 0 && (
                                    <CarouselItem className="pl-1 basis-auto flex items-center">
                                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2" />
                                    </CarouselItem>
                                )}

                                {categories.slice(0, 5).map((category) => (
                                    <CarouselItem key={category} className="pl-1 basis-auto">
                                        <Link
                                            href={`/products?category=${category}`}
                                            className="relative block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all duration-200 whitespace-nowrap"
                                        >
                                            {category}
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-none shadow-sm h-8 w-8 disabled:hidden hidden md:flex" />
                            <CarouselNext className="right-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-none shadow-sm h-8 w-8 disabled:hidden hidden md:flex" />
                        </Carousel>
                    </div>

                    {/* Right Side - Support Links (Fixed - Desktop Only) */}
                    <div className="hidden lg:flex items-center gap-6 shrink-0">
                        <Link
                            href="/trade-in"
                            className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 group"
                        >
                            <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 transition-colors">
                                <Zap className="w-3 h-3 fill-current" />
                            </div>
                            <span>Thu cũ đổi mới</span>
                        </Link>

                        <Link
                            href="/orders"
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
                        >
                            <Package className="h-4 w-4 group-hover:text-blue-600 transition-colors duration-200" />
                            <span>Tra cứu đơn hàng</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}