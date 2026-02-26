"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Package, ShoppingBag, User, LogOut, LogIn, UserPlus, ChevronRight, Sun, Moon, Laptop, Smartphone, Watch, Headphones, Zap, Search, Briefcase, Monitor, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { MEGA_MENU_DATA } from "@/data/menuData";
import { RotateCcw } from "lucide-react";
export default function MobileMenu({ categories = [], user, logout }) {
    const [open, setOpen] = useState(false);
    const { setTheme, theme } = useTheme();

    const handleLinkClick = () => {
        setOpen(false);
    };

    // Brand of the week logic
    const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const brandIndex = currentWeek % MEGA_MENU_DATA.brands.length;
    const brandOfTheWeek = MEGA_MENU_DATA.brands[brandIndex];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 flex flex-col z-[60] overflow-y-auto">
                <SheetHeader className="h-[88px] px-4 bg-primary text-primary-foreground text-left shadow-md flex flex-col justify-center shrink-0">
                    <div className="flex items-center justify-between w-full">
                        <SheetTitle className="text-white text-lg font-bold flex items-center gap-2">
                            <User className="h-5 w-5" />
                            {user ? "Tài khoản" : "Menu"}
                        </SheetTitle>
                    </div>
                    {user ? (
                        <Link href="/profile" onClick={handleLinkClick} className="mt-1">
                            <div className="flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer rounded-md p-1 -ml-1">
                                <Avatar className="h-8 w-8 border border-white/20">
                                    <AvatarImage src={user.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt={user.name} className="object-cover" />
                                    <AvatarFallback className="bg-white/20 text-white font-bold text-xs">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="font-bold text-sm truncate">{user.name}</span>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex gap-2 mt-1">
                            <Button variant="secondary" size="sm" className="h-8 px-3 text-xs font-semibold shadow-sm" asChild onClick={handleLinkClick}>
                                <Link href="/login">
                                    <LogIn className="mr-1.5 h-3.5 w-3.5" /> Đăng nhập
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-transparent text-white border-white/40 hover:bg-white/20 hover:text-white" asChild onClick={handleLinkClick}>
                                <Link href="/register">
                                    <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Đăng ký
                                </Link>
                            </Button>
                        </div>
                    )}
                </SheetHeader>

                <ScrollArea className="flex-1 px-0">
                    <div className="flex flex-col py-4">
                        {/* Main Navigation */}
                        <div className="px-4 space-y-1 mb-2">
                            <Button variant="ghost" className="w-full justify-start font-medium text-base h-11" asChild onClick={handleLinkClick}>
                                <Link href="/">
                                    <Home className="mr-3 h-5 w-5 text-muted-foreground/80" />
                                    Trang chủ
                                </Link>
                            </Button>

                            {/* New Links Request */}
                            <Button variant="ghost" className="w-full justify-start font-medium text-base h-11 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/20" asChild onClick={handleLinkClick}>
                                <Link href="/trade-in">
                                    <RotateCcw className="mr-3 h-5 w-5" />
                                    Thu cũ đổi mới
                                </Link>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium text-base h-11" asChild onClick={handleLinkClick}>
                                <Link href="/orders">
                                    <Package className="mr-3 h-5 w-5 text-muted-foreground/80" />
                                    Tra cứu đơn hàng
                                </Link>
                            </Button>

                            <Button variant="ghost" className="w-full justify-start font-medium text-base h-11" asChild onClick={handleLinkClick}>
                                <Link href="/products">
                                    <ShoppingBag className="mr-3 h-5 w-5 text-muted-foreground/80" />
                                    Tất cả sản phẩm
                                </Link>
                            </Button>
                        </div>

                        <Separator className="my-2" />

                        {/* Promo Banner - Brand of the Week */}
                        <div className="px-4 mb-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white relative overflow-hidden group shadow-md">
                                <div className="relative z-10">
                                    <p className="font-bold text-base">Tuần lễ {brandOfTheWeek.label}</p>
                                    <p className="text-xs text-blue-100 mb-2">Giảm ngay 30% toàn bộ sản phẩm</p>
                                    <Link href={`/products?brand=${brandOfTheWeek.value}`} onClick={handleLinkClick}>
                                        <Button size="sm" variant="secondary" className="h-7 px-3 text-[10px] bg-white text-blue-700 hover:bg-blue-50 border-none font-bold">
                                            Xem ngay
                                        </Button>
                                    </Link>
                                </div>
                                <div className="absolute right-0 top-0 w-16 h-full bg-white/10 skew-x-12 translate-x-4 group-hover:translate-x-2 transition-transform"></div>
                                <Tag className="absolute -right-2 -bottom-2 h-12 w-12 text-white/10 -rotate-12" />
                            </div>
                        </div>

                        {/* Rich Categories Accordion */}
                        <div className="px-4">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 mt-2">Danh mục & Lọc</h4>
                            <Accordion type="single" collapsible className="w-full space-y-1">

                                {/* Brands */}
                                <AccordionItem value="brands" className="border rounded-lg px-3 data-[state=open]:bg-accent/50">
                                    <AccordionTrigger className="py-3 hover:no-underline">
                                        <span className="flex items-center font-medium">
                                            <Laptop className="mr-3 h-4 w-4 text-blue-500" />
                                            Thương hiệu
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            {MEGA_MENU_DATA.brands.map((brand) => (
                                                <Link
                                                    key={brand.label}
                                                    href={`/products?brand=${brand.value}`}
                                                    className="flex items-center justify-center p-2 text-sm border rounded-md hover:border-primary hover:text-primary bg-background transition-colors"
                                                    onClick={handleLinkClick}
                                                >
                                                    {brand.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Needs */}
                                <AccordionItem value="needs" className="border rounded-lg px-3 data-[state=open]:bg-accent/50">
                                    <AccordionTrigger className="py-3 hover:no-underline">
                                        <span className="flex items-center font-medium">
                                            <Briefcase className="mr-3 h-4 w-4 text-orange-500" />
                                            Nhu cầu sử dụng
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-3">
                                        <div className="flex flex-col space-y-1">
                                            {MEGA_MENU_DATA.needs.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={`/products?category=${encodeURIComponent(item.category)}`}
                                                    className="flex items-center p-2 rounded-md hover:bg-background transition-colors"
                                                    onClick={handleLinkClick}
                                                >
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                                                        <item.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm">{item.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Prices */}
                                <AccordionItem value="prices" className="border rounded-lg px-3 data-[state=open]:bg-accent/50">
                                    <AccordionTrigger className="py-3 hover:no-underline">
                                        <span className="flex items-center font-medium">
                                            <Tag className="mr-3 h-4 w-4 text-green-500" />
                                            Mức giá
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-3">
                                        <div className="flex flex-col space-y-1">
                                            {MEGA_MENU_DATA.prices.map((price) => (
                                                <Link
                                                    key={price.label}
                                                    href={`/products?minPrice=${price.min}${price.max ? `&maxPrice=${price.max}` : ''}`}
                                                    className="block py-2 px-2 text-sm hover:text-primary hover:bg-background rounded-md transition-colors"
                                                    onClick={handleLinkClick}
                                                >
                                                    {price.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Screens */}
                                <AccordionItem value="screens" className="border rounded-lg px-3 data-[state=open]:bg-accent/50">
                                    <AccordionTrigger className="py-3 hover:no-underline">
                                        <span className="flex items-center font-medium">
                                            <Monitor className="mr-3 h-4 w-4 text-purple-500" />
                                            Màn hình
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            {MEGA_MENU_DATA.screens.map((screen) => (
                                                <Link
                                                    key={screen}
                                                    href={`/products?screen_size_label=${encodeURIComponent(screen)}`}
                                                    className="flex items-center justify-center p-2 text-sm border rounded-md hover:border-primary hover:text-primary bg-background transition-colors"
                                                    onClick={handleLinkClick}
                                                >
                                                    {screen}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-4 border-t bg-muted/20">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">Giao diện</span>
                        <div className="flex items-center bg-secondary rounded-full p-1 border">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`h-7 w-7 rounded-full ${theme === 'light' ? 'bg-background shadow-sm text-yellow-500' : 'text-muted-foreground'}`}
                                onClick={() => setTheme('light')}
                            >
                                <Sun className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`h-7 w-7 rounded-full ${theme === 'dark' ? 'bg-background shadow-sm text-blue-400' : 'text-muted-foreground'}`}
                                onClick={() => setTheme('dark')}
                            >
                                <Moon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {user && (
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => {
                                logout();
                                setOpen(false);
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Đăng xuất
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

