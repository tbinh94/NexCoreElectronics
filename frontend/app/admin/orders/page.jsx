"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you might have a Badge component or use standard HTML
import { MoreHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
const statusMap = {
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
    processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-800" },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-800" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
    cancelled: { label: "Đã huỷ", color: "bg-red-100 text-red-800" },
    "đang trả góp": { label: "Đang trả góp", color: "bg-amber-100 text-amber-800" },
};

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/orders`, {
                headers: {
                    'x-admin-passcode': adminPasscode
                }
            });
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            toast.error("Không thể tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const { token } = useAuth(); // Assuming useAuth provides token

    const updateStatus = async (id, newStatus) => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/orders/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    'x-admin-passcode': adminPasscode
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                toast.success("Cập nhật trạng thái thành công");
                fetchOrders();
            } else {
                const data = await res.json();
                toast.error(data.error || data.message || "Lỗi cập nhật");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi server");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Đơn hàng</h1>
                <p className="text-gray-500 text-sm">Quản lý và theo dõi đơn hàng</p>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-0 sm:p-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <>
                            {/* Desktop View - Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-gray-50">
                                        <TableRow>
                                            <TableHead className="font-semibold text-gray-900 border-r">Mã đơn</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Khách hàng</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Ngày đặt</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Dự kiến giao</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Tổng tiền</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Trạng thái</TableHead>
                                            <TableHead className="text-right pr-6 font-semibold text-gray-900">Hành động</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100">
                                        {orders.map((order) => (
                                            <TableRow key={order._id} className="hover:bg-gray-50 transition-colors">
                                                <TableCell className="font-medium text-blue-600">#{order._id.slice(-6).toUpperCase()}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">{order.shippingAddress?.name || "N/A"}</span>
                                                        <span className="text-xs text-gray-500">{order.userId?.email || "Khách vãng lai"}</span>
                                                        {order.cccd && (
                                                            <span className="text-xs font-bold text-amber-600 mt-0.5">CCCD: {order.cccd}</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-gray-600">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                                                <TableCell>
                                                    {order.estimatedDeliveryDate ? (
                                                        <span className={new Date(order.estimatedDeliveryDate) < new Date() && order.status !== 'completed' && order.status !== 'cancelled' ? "text-red-500 font-medium" : "text-gray-600"}>
                                                            {new Date(order.estimatedDeliveryDate).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 italic">--</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium text-gray-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</TableCell>
                                                <TableCell>
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMap[order.status]?.color || "bg-gray-100"}`}>
                                                        {statusMap[order.status]?.label || order.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-56">
                                                            <DropdownMenuLabel>Cập nhật trạng thái</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => updateStatus(order._id, 'processing')}>Đang xử lý</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => updateStatus(order._id, 'shipping')}>Đang giao</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => updateStatus(order._id, 'completed')}>Hoàn thành</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => updateStatus(order._id, 'cancelled')} className="text-red-600 focus:text-red-600 focus:bg-red-50">Huỷ đơn</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile View - Cards list */}
                            <div className="md:hidden space-y-4 px-4 pb-4">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-600 font-bold text-sm">#{order._id.slice(-6).toUpperCase()}</span>
                                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusMap[order.status]?.color || "bg-gray-100"}`}>
                                                        {statusMap[order.status]?.label || order.status}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-gray-900">{order.shippingAddress?.name || "N/A"}</h3>
                                                {order.cccd && (
                                                    <p className="text-xs font-bold text-amber-600">CCCD: {order.cccd}</p>
                                                )}
                                                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'processing')}>Đang xử lý</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'shipping')}>Đang giao</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'completed')}>Hoàn thành</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'cancelled')} className="text-red-600">Huỷ đơn</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Tổng tiền</p>
                                                <p className="text-base font-bold text-gray-900">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Dự kiến giao</p>
                                                <p className="text-sm font-medium text-gray-600">
                                                    {order.estimatedDeliveryDate ? new Date(order.estimatedDeliveryDate).toLocaleDateString('vi-VN') : "--"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
