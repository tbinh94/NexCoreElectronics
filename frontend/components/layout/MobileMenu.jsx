"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Package, ShoppingBag, User, LogOut, LogIn, UserPlus, ChevronRight, Sun, Moon, Laptop, Smartphone, Watch, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

export default function MobileMenu({ categories = [], user, logout }) {
    const [open, setOpen] = useState(false);
    const { setTheme, theme } = useTheme();

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                <SheetHeader className="p-4 bg-primary text-primary-foreground text-left">
                    <SheetTitle className="text-white text-lg font-bold">Menu</SheetTitle>
                    {user ? (
                        <div className="flex items-center gap-3 mt-4">
                            <Avatar className="h-10 w-10 border-2 border-white/20">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-white/20 text-white">
                                    {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col overflow-hidden">
                                <span className="font-semibold truncate">{user.name}</span>
                                <span className="text-xs text-white/80 truncate">{user.email}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2 mt-4">
                            <Button variant="secondary" size="sm" className="flex-1" asChild onClick={handleLinkClick}>
                                <Link href="/login">
                                    <LogIn className="mr-2 h-4 w-4" /> Đăng nhập
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                <Link href="/register">
                                    <UserPlus className="mr-2 h-4 w-4" /> Đăng ký
                                </Link>
                            </Button>
                        </div>
                    )}
                </SheetHeader>

                <ScrollArea className="flex-1 px-4 py-2">
                    <div className="space-y-4">
                        {/* Main Navigation */}
                        <div className="flex flex-col space-y-1">
                            <Button variant="ghost" className="justify-start font-medium" asChild onClick={handleLinkClick}>
                                <Link href="/">
                                    <Home className="mr-3 h-5 w-5 text-muted-foreground" />
                                    Trang chủ
                                </Link>
                            </Button>
                            <Button variant="ghost" className="justify-start font-medium" asChild onClick={handleLinkClick}>
                                <Link href="/products">
                                    <ShoppingBag className="mr-3 h-5 w-5 text-muted-foreground" />
                                    Sản phẩm
                                </Link>
                            </Button>
                            {user && (
                                <>
                                    <Button variant="ghost" className="justify-start font-medium" asChild onClick={handleLinkClick}>
                                        <Link href="/profile">
                                            <User className="mr-3 h-5 w-5 text-muted-foreground" />
                                            Tài khoản của tôi
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="justify-start font-medium" asChild onClick={handleLinkClick}>
                                        <Link href="/orders">
                                            <Package className="mr-3 h-5 w-5 text-muted-foreground" />
                                            Đơn hàng
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        <Separator />

                        {/* Categories Accordion */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-muted-foreground px-2">Danh mục sản phẩm</h4>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="categories" className="border-none">
                                    <AccordionTrigger className="py-2 px-2 hover:bg-accent hover:text-accent-foreground rounded-md">
                                        <span className="flex items-center">
                                            <Laptop className="mr-3 h-5 w-5 text-muted-foreground" />
                                            Tất cả danh mục
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pt-1">
                                        <div className="flex flex-col space-y-1 pl-4 border-l ml-4 border-border">
                                            {categories.map((category) => (
                                                <Link
                                                    key={category}
                                                    href={`/products?category=${category}`}
                                                    className="flex items-center py-2 px-2 text-sm text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                                                    onClick={handleLinkClick}
                                                >
                                                    {category}
                                                </Link>
                                            ))}
                                            <Link
                                                href="/products"
                                                className="flex items-center py-2 px-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
                                                onClick={handleLinkClick}
                                            >
                                                Xem tất cả <ChevronRight className="ml-1 h-3 w-3" />
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        <Separator />

                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between px-2 py-2">
                            <span className="text-sm font-medium">Giao diện</span>
                            <div className="flex items-center bg-secondary rounded-full p-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-7 w-7 rounded-full ${theme === 'light' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                                    onClick={() => setTheme('light')}
                                >
                                    <Sun className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-7 w-7 rounded-full ${theme === 'dark' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                                    onClick={() => setTheme('dark')}
                                >
                                    <Moon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer Actions */}
                {user && (
                    <div className="p-4 border-t bg-muted/30">
                        <Button
                            variant="destructive"
                            className="w-full justify-start"
                            onClick={() => {
                                logout();
                                setOpen(false);
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Đăng xuất
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
