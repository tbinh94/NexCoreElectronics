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
    Store
} from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: '/admin' },
    { icon: Package, label: "Products", href: '/admin/products' },
    { icon: ShoppingCart, label: "Orders", href: '/admin/orders' },
    { icon: Users, label: "Customers", href: '/admin/users' },
    { icon: Settings, label: "Settings", href: '/admin/settings' },
]

export default function AdminSidebar({ className }) {
    const pathname = usePathname();

    return (
        <div className={cn("flex flex-col h-full bg-slate-900 text-white w-64", className)}>
            <div className="p-6 border-b border-slate-800 flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Store className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">NexCore Admin</span>
            </div>

            <nav className="flex-1 py-6 space-y-1">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-slate-800",
                                pathname === item.href
                                    ? "bg-slate-800 text-white"
                                    : "text-white hover:bg-slate-800"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors">
                    <LogOut className="h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    )
}