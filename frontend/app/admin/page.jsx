"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, RefreshCw } from "lucide-react";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0,
        tradeIn: 0,
        revenueGrowth: 0,
        recentOrders: [],
        revenueChart: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const adminPasscode = sessionStorage.getItem("admin_passcode");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/stats`, {
                    headers: {
                        'x-admin-passcode': adminPasscode
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
                // Fallback to zeros if fetch fails, to avoid crashing
                setStats({
                    revenue: 0,
                    orders: 0,
                    products: 0,
                    customers: 0,
                    tradeIn: 0,
                    revenueGrowth: 0,
                    recentOrders: [],
                    revenueChart: []
                });
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
            change: stats.revenueGrowth !== 0 ? `${stats.revenueGrowth >= 0 ? '+' : ''}${stats.revenueGrowth?.toFixed(1) || 0}%` : null,
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            iconBg: "bg-emerald-500",
            gradient: "from-emerald-50 to-white dark:from-emerald-950/20 dark:to-transparent",
            trend: stats.revenueGrowth >= 0 ? "up" : "down"
        },
        {
            title: "Đơn hàng",
            value: stats.orders,
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            iconBg: "bg-blue-500",
            gradient: "from-blue-50 to-white dark:from-blue-950/20 dark:to-transparent",
        },
        {
            title: "Sản phẩm",
            value: stats.products,
            icon: Package,
            color: "text-amber-600",
            bg: "bg-amber-50 dark:bg-amber-900/20",
            iconBg: "bg-amber-500",
            gradient: "from-amber-50 to-white dark:from-amber-950/20 dark:to-transparent",
        },
        {
            title: "Khách hàng",
            value: stats.customers,
            icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-50 dark:bg-indigo-900/20",
            iconBg: "bg-indigo-500",
            gradient: "from-indigo-50 to-white dark:from-indigo-950/20 dark:to-transparent",
        },
        {
            title: "Yêu cầu Thu cũ",
            value: stats.tradeIn || 0,
            icon: RefreshCw,
            color: "text-rose-600",
            bg: "bg-rose-50 dark:bg-rose-900/20",
            iconBg: "bg-rose-500",
            gradient: "from-rose-50 to-white dark:from-rose-950/20 dark:to-transparent",
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
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
                {statCards.map((stat, index) => (
                    <Card key={index} className={`border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-gradient-to-br ${stat.gradient} relative`}>
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 duration-500">
                            <stat.icon className="h-24 w-24" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2.5 rounded-xl ${stat.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10 p-6 pt-0">
                            <div className="text-2xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</div>
                            {stat.change ? (
                                <p className="text-xs flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/50 dark:bg-black/20 w-max border border-white/80 dark:border-white/10">
                                    <TrendingUp className={`h-3.5 w-3.5 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`} />
                                    <span className={`${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'} font-bold`}>{stat.change}</span>
                                    <span className="text-gray-400">vs hôm qua</span>
                                </p>
                            ) : (
                                <p className="text-xs text-gray-300 dark:text-gray-600 font-medium">Cập nhật lúc {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-6 lg:grid-cols-7">
                <Card className="lg:col-span-4 border-none shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
                    <CardHeader className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-black/5 p-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                Doanh thu 7 ngày gần nhất
                            </CardTitle>
                            <div className="flex items-center gap-4 text-xs font-semibold">
                                <span className="flex items-center gap-1 text-gray-500">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" /> Doanh thu
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.revenueChart || []} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        fontWeight={600}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        fontWeight={600}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => {
                                            if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
                                            if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                                            return value;
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value), "Doanh thu"]}
                                        cursor={{ fill: 'rgba(59, 130, 246, 0.05)', radius: 8 }}
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            padding: '12px'
                                        }}
                                        labelStyle={{ fontWeight: 'bold', marginBottom: '4px', color: '#1e293b' }}
                                    />
                                    <Bar dataKey="revenue" fill="url(#barGradient)" radius={[8, 8, 4, 4]} barSize={45} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3 border-none shadow-lg bg-white dark:bg-gray-900">
                    <CardHeader className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-black/5 p-6">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-between">
                            Hoạt động đơn hàng
                            <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-1 rounded-full uppercase tracking-tighter">Mới nhất</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order) => (
                                    <div key={order._id} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center font-black text-gray-500 dark:text-gray-400 shadow-inner group-hover:scale-110 transition-transform">
                                                {order.shippingAddress?.name
                                                    ? order.shippingAddress.name.charAt(0).toUpperCase()
                                                    : (order.userId?.name ? order.userId.name.charAt(0).toUpperCase() : 'K')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                    {order.shippingAddress?.name || order.userId?.name || 'Khách lẻ'}
                                                </p>
                                                <p className="text-[11px] text-gray-500 font-medium">
                                                    #{order._id.slice(-6).toUpperCase()} • {new Date(order.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-emerald-600 dark:text-emerald-500">
                                                +{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                                            </div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Thành công</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                    <ShoppingCart className="h-10 w-10 mb-2 opacity-20" />
                                    <p className="text-sm font-medium italic">Chưa có đơn hàng nào.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}