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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you might have a Badge component or use standard HTML
import { MoreHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";

const statusMap = {
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
    processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-800" },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-800" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
    cancelled: { label: "Đã huỷ", color: "bg-red-100 text-red-800" },
};

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/orders`);
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

    const updateStatus = async (id, newStatus) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/orders/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                toast.success("Cập nhật trạng thái thành công");
                fetchOrders();
            } else {
                toast.error("Lỗi cập nhật");
            }
        } catch (error) {
            toast.error("Lỗi server");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Đơn hàng</h1>
                <p className="text-gray-500 text-sm">Quản lý và theo dõi đơn hàng</p>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mã đơn</TableHead>
                                    <TableHead>Khách hàng</TableHead>
                                    <TableHead>Ngày đặt</TableHead>
                                    <TableHead>Tổng tiền</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="font-medium">#{order._id.slice(-6).toUpperCase()}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.shippingAddress?.name || "N/A"}</span>
                                                <span className="text-xs text-gray-500">{order.userId?.email || "Guest"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                                        <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMap[order.status]?.color || "bg-gray-100"}`}>
                                                {statusMap[order.status]?.label || order.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'processing')}>Đang xử lý</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'shipping')}>Đang giao</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'completed')}>Hoàn thành</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(order._id, 'cancelled')} className="text-red-600">Huỷ đơn</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
