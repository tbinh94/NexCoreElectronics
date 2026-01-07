"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Tổng doanh thu",
            value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.revenue),
            change: "+12.5%", // Placeholder for now
            icon: DollarSign,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "Đơn hàng",
            value: stats.orders,
            change: "+4.3%",
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Sản phẩm",
            value: stats.products,
            change: "+1.2%",
            icon: Package,
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
        {
            title: "Khách hàng",
            value: stats.customers,
            change: "+8.1%",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
    ];

    if (loading) {
        return <div className="p-6">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">Chào mừng trở lại! Đây là tổng quan cửa hàng của bạn hôm nay.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-green-600 font-medium">{stat.change}</span> so với tháng trước
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Biểu đồ doanh thu</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-md border border-dashed">
                            Biểu đồ sẽ được tích hợp tại đây
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Đơn hàng gần đây</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order) => (
                                    <div key={order._id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                                                {order.userId?.name ? order.userId.name.charAt(0).toUpperCase() : 'K'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{order.userId?.name || 'Khách lẻ'}</p>
                                                <p className="text-xs text-gray-500">vừa đặt đơn hàng</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-green-600">
                                            +{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Chưa có đơn hàng nào.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}