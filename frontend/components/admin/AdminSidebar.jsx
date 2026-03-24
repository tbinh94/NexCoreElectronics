'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Store,
    RefreshCw
} from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
    { icon: LayoutDashboard, label: "Tổng quan", href: '/admin' },
    { icon: Package, label: "Sản phẩm", href: '/admin/products' },
    { icon: LayoutDashboard, label: "Danh mục", href: '/admin/categories' },
    { icon: ShoppingCart, label: "Đơn hàng", href: '/admin/orders' },
    { icon: RefreshCw, label: "Thu cũ đổi mới", href: '/admin/trade' },
    { icon: Users, label: "Khách hàng", href: '/admin/users' },
    { icon: Settings, label: "Cài đặt", href: '/admin/settings' },
]

export default function AdminSidebar({ className, showLogo = true, onItemClick }) {
    const pathname = usePathname();

    const handleItemClick = () => {
        if (onItemClick) {
            onItemClick();
        }
    };

    return (
        <div className={cn("flex flex-col h-full bg-white border-r border-gray-200 text-gray-900 w-64 transition-colors duration-300", className)}>
            {showLogo && (
                <div className="p-6 border-b border-gray-200 flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Store className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">NexCore Admin</span>
                </div>
            )}

            <nav className="flex-1 py-6 space-y-1">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleItemClick}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors mx-2",
                                pathname === item.href
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-blue-600" : "text-gray-500")} />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <Button
                    variant="ghost"
                    onClick={() => {
                        sessionStorage.removeItem("admin_passcode");
                        sessionStorage.removeItem("admin_passcode_verified");
                        sessionStorage.removeItem("admin_passcode_verified_at");
                        localStorage.removeItem("admin_passcode");
                        window.location.href = '/admin';
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors shadow-none justify-start"
                >
                    <LogOut className="h-5 w-5" />
                    Đăng xuất
                </Button>
            </div>
        </div>
    )
}
