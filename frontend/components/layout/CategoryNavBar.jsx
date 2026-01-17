"use client";

import Link from "next/link";
import { Menu, Package, MessageCircle, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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

export default function CategoryNavBar({ categories = [] }) {
    return (
        <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 hidden md:block">
            <Container>
                <div className="flex items-center h-14 gap-4">
                    {/* Left Side - Categories Dropdown (Fixed) */}
                    <div className="flex items-center gap-4 shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-10 px-4 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                                >
                                    <Menu className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Danh mục</span>
                                    <ChevronDown className="h-4 w-4 ml-2 opacity-60" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 p-2 shadow-lg border border-gray-200 dark:border-gray-800" align="start">
                                {categories.map((category) => (
                                    <DropdownMenuItem
                                        key={category}
                                        asChild
                                        className="cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-150"
                                    >
                                        <Link
                                            href={`/products?category=${category}`}
                                            className="w-full py-2.5 px-3 font-medium text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            {category}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
                    </div>

                    {/* Middle - Scrollable Navigation Links */}
                    <div className="relative flex-1 min-w-0 px-8">
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
                                        href="/products?sort=price_asc"
                                        className="relative block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all duration-200 whitespace-nowrap"
                                    >
                                        Bán chạy nhất
                                    </Link>
                                </CarouselItem>

                                <CarouselItem className="pl-1 basis-auto">
                                    <Link
                                        href="/products?promotion=true"
                                        className="relative flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                        </span>
                                        Flash Sale
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
                            <CarouselPrevious className="left-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-none shadow-sm h-8 w-8 disabled:hidden" />
                            <CarouselNext className="right-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-none shadow-sm h-8 w-8 disabled:hidden" />
                        </Carousel>
                    </div>

                    {/* Right Side - Support Links (Fixed) */}
                    <div className="flex items-center gap-6 shrink-0">
                        <Link
                            href="/orders"
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
                        >
                            <Package className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>Tra cứu đơn hàng</span>
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
                        >
                            <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>Hỗ trợ</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}