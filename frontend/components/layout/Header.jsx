import CategoryNavBar from "@/components/layout/CategoryNavBar";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import SearchForm from "@/components/search/SearchForm";
import SearchWithSuggestions from "@/components/search/SearchWithSuggestions";
import { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/layout/ModeToggle";
import MobileMenu from "@/components/layout/MobileMenu";

import Container from "@/components/ui/container";

export default function Header({ categories }) {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full shadow-md">
            {/* Top Main Header - Primary Color Background */}
            <div className="bg-primary text-primary-foreground w-full py-3">
                <Container className="flex h-16 items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity">
                        <Image
                            src="/logo_v2.png"
                            alt="NextGenShop Logo"
                            width={220}
                            height={80}
                            priority
                            className="h-16 md:h-24 w-auto object-contain"
                        />
                    </Link>

                    {/* Search Bar - Center & Prominent */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <SearchWithSuggestions />
                    </div>

                    {/* Actions (Cart, Login) */}
                    <div className="flex items-center gap-2 md:gap-6 shrink-0">
                        {/* Mobile Search Trigger */}
                        <div className="md:hidden">
                            <Sheet open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                        <Search className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="top" className="w-full">
                                    <SheetHeader>
                                        <SheetTitle>Tìm kiếm</SheetTitle>
                                    </SheetHeader>
                                    <SearchForm onSearchSubmit={() => setMobileSearchOpen(false)} />
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Theme Toggle - Desktop Only */}
                        <div className="hidden md:flex">
                            <ModeToggle />
                        </div>

                        {/* Cart */}
                        <Link href="/cart" className="relative group flex flex-col items-center justify-center text-white hover:text-white/90">
                            <div className="relative p-1">
                                <span className="text-2xl">🛒</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-2 h-5 w-5 rounded-full bg-red-500 text-[11px] font-bold text-white flex items-center justify-center border-2 border-primary">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs font-medium mt-1 hidden sm:block">Giỏ hàng</span>
                        </Link>

                        {/* User Account - Desktop Only */}
                        <div className="hidden md:flex items-center">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 text-white">
                                            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white/30 bg-white/10">
                                                <Image
                                                    src={user.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                    alt={user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col text-left hidden sm:block">
                                                <span className="text-xs opacity-80">Xin chào,</span>
                                                <span className="text-sm font-semibold truncate max-w-[100px]">{user.name}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="w-full cursor-pointer">Trang cá nhân</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/orders" className="w-full cursor-pointer">Đơn hàng của tôi</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
                                            Đăng xuất
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center gap-3 text-sm font-medium text-white">
                                    <Link href="/login" className="hover:opacity-80">Đăng nhập</Link>
                                    <span className="h-4 w-px bg-white/30"></span>
                                    <Link href="/register" className="hover:opacity-80">Đăng ký</Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Trigger */}
                        <MobileMenu categories={categories} user={user} logout={logout} />
                    </div>
                </Container>
            </div>

            {/* Secondary Navigation Bar - White Background */}
            <CategoryNavBar categories={categories} />

            {/* Desktop Search Modal (Hidden by default) */}
            <Sheet open={desktopSearchOpen} onOpenChange={setDesktopSearchOpen}>
                <SheetContent side="top" className="h-[300px]">
                    <Container>
                        <SheetHeader>
                            <SheetTitle className="text-center text-2xl">Tìm kiếm sản phẩm</SheetTitle>
                        </SheetHeader>
                        <SearchForm onSearchSubmit={() => setDesktopSearchOpen(false)} />
                    </Container>
                </SheetContent>
            </Sheet>
        </header >
    );
}
