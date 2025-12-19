'use client';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
export default function Header() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
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
                            <Link href="/orders">Đơn hàng</Link>
                            <DropdownMenuContent>
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
