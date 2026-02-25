"use client";

import { useState, useEffect } from "react";
import { Bell, Package, ShoppingCart, Info, AlertTriangle, CheckCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";

export default function AdminHeader() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const adminPasscode = sessionStorage.getItem("admin_passcode");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/notifications`, {
                    headers: {
                        'x-admin-passcode': adminPasscode
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data);
                    setUnreadCount(data.length); // Assume all fetched are unread for simplicity or filter if needed
                }
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
            case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'info':
            default: return <Info className="h-4 w-4 text-blue-500" />;
        }
    };

    return (
        <header className="h-16 border-b bg-white sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Admin Navigation</SheetTitle>
                        </SheetHeader>
                        <AdminSidebar className="border-r-0" showLogo={true} onItemClick={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Notifications Only */}
            <div className="flex items-center gap-4 ml-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-blue-600 hover:bg-gray-100">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0 bg-white border-gray-200 mt-2 shadow-lg">
                        <div className="p-4 border-b border-gray-100">
                            <h4 className="font-semibold text-gray-900 leading-none">Thông báo</h4>
                            <p className="text-xs text-gray-500 mt-1">Bạn có {unreadCount} thông báo mới</p>
                        </div>
                        <ScrollArea className="h-[300px]">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-gray-100">
                                    {notifications.map((note) => {
                                        let href = "/admin";
                                        if (note.title.toLowerCase().includes("hàng") || note.title.toLowerCase().includes("stock")) {
                                            href = "/admin/products";
                                        }
                                        if (note.title.toLowerCase().includes("đơn") || note.title.toLowerCase().includes("order")) {
                                            href = "/admin/orders";
                                        }

                                        return (
                                            <Link key={note.id} href={href} className="block group">
                                                <div className="p-4 hover:bg-gray-50 transition-colors flex gap-3 items-start">
                                                    <div className={`p-2 rounded-full shrink-0 ${note.type === 'warning' ? 'bg-orange-50' : note.type === 'success' ? 'bg-green-50' : 'bg-blue-50'}`}>
                                                        {getIcon(note.type)}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{note.title}</p>
                                                        <p className="text-xs text-gray-500 line-clamp-2">{note.message}</p>
                                                        <p className="text-[10px] text-gray-400">{note.time}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                    <p className="text-sm">Không có thông báo nào</p>
                                </div>
                            )}
                        </ScrollArea>
                        <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                            <Link href="/admin/orders" className="text-xs font-medium text-blue-600 hover:underline">
                                Xem tất cả đơn hàng
                            </Link>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}