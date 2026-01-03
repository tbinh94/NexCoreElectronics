'use client';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import SearchForm from "@/components/search/SearchForm";
import { useState } from "react";

export default function Header() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950 dark:border-gray-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    NextGenShop
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
                    <Link href="/products" className="hover:text-blue-600 transition-colors">
                        Sản phẩm
                    </Link>
                    <Link href="/about" className="hover:text-blue-600 transition-colors">
                        Giới thiệu
                    </Link>
                    <Link href="/contact" className="hover:text-blue-600 transition-colors">
                        Liên hệ
                    </Link>
                </nav>

                {/* Actions (Cart, Login) */}
                <div className="flex items-center gap-4">
                    {/* Mobile Search - Slide from Right */}
                    <div className="md:hidden">
                        <Sheet open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Search className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle>Tìm kiếm</SheetTitle>
                                </SheetHeader>
                                <SearchForm onSearchSubmit={() => setMobileSearchOpen(false)} />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Search - Slide from Top */}
                    <div className="hidden md:block">
                        <Sheet open={desktopSearchOpen} onOpenChange={setDesktopSearchOpen}>
                            <SheetTrigger asChild>
                                <Button className="cursor-pointer" variant="ghost" size="icon">
                                    <Search className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="h-[300px]"> {/* Chiều cao tùy chỉnh */}
                                <div className="container mx-auto">
                                    <SheetHeader>
                                        <SheetTitle className="text-center text-2xl">Tìm kiếm sản phẩm</SheetTitle>
                                    </SheetHeader>
                                    <SearchForm onSearchSubmit={() => setDesktopSearchOpen(false)} />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                        🛒 <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                            {cartCount}
                        </span>
                    </Link>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="cursor-pointer" variant="outline">Xin chào, {user.name}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href="/profile" className="w-full">Trang cá nhân</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/orders" className="w-full">Đơn hàng</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">Đăng nhập</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
