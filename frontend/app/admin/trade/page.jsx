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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Loader2, RefreshCw, Phone, MapPin, Laptop, DollarSign, User, Mail, Calendar } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const statusMap = {
    pending: { label: "Chờ liên hệ", color: "bg-yellow-100 text-yellow-800" },
    contacted: { label: "Đã liên hệ", color: "bg-blue-100 text-blue-800" },
    completed: { label: "Đã thu mua", color: "bg-green-100 text-green-800" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
};

export default function TradeManagementPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchRequests = async () => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/trade-ins`, {
                headers: {
                    'x-admin-passcode': adminPasscode
                }
            });
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (error) {
            toast.error("Không thể tải danh sách yêu cầu thu cũ");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/trade-ins/${id}/status`, {
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
                fetchRequests();
            } else {
                toast.error("Lỗi cập nhật");
            }
        } catch (error) {
            toast.error("Lỗi server");
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-2 sm:px-0">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Yêu cầu Thu cũ</h1>
                    <p className="text-gray-500 text-xs sm:text-sm">Quản lý định giá và thu mua</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchRequests} disabled={loading} className="h-8 text-xs sm:text-sm">
                    <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
                    Làm mới
                </Button>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-transparent sm:bg-white">
                <CardContent className="p-0 sm:p-6">
                    {loading ? (
                        <div className="flex justify-center py-20 bg-white rounded-xl">
                            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 bg-white rounded-xl">
                            <RefreshCw className="h-12 w-12 mx-auto mb-4 text-gray-200" />
                            <p>Chưa có yêu cầu thu cũ nào</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop View - Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-gray-50">
                                        <TableRow>
                                            <TableHead className="font-semibold text-gray-900 border-r">Khách hàng</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Thiết bị định giá</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Giá dự kiến</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Liên hệ & Địa chỉ</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r text-center">Trạng thái</TableHead>
                                            <TableHead className="text-right pr-6 font-semibold text-gray-900">Hành động</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100">
                                        {requests.map((req) => (
                                            <TableRow key={req._id} className="hover:bg-gray-50 transition-colors bg-white">
                                                <TableCell className="max-w-[200px]">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0 overflow-hidden relative border border-gray-100">
                                                            {req.userId?.avatar ? (
                                                                <Image
                                                                    src={req.userId.avatar}
                                                                    alt={req.userId.name || "User"}
                                                                    fill
                                                                    className="object-cover"
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                (req.userId?.name || "K").charAt(0).toUpperCase()
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="font-medium text-gray-900 truncate">{req.userId?.name || "Khách hàng"}</span>
                                                            <span className="text-[10px] text-gray-500 truncate">{req.userId?.email}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold text-blue-700 flex items-center gap-1">
                                                            <Laptop className="w-4 h-4" /> {req.deviceInfo?.modelName}
                                                        </span>
                                                        <div className="flex gap-2">
                                                            <Badge variant="outline" className="text-[10px] py-0">{req.deviceInfo?.modelCode}</Badge>
                                                            <Badge variant="outline" className="text-[10px] py-0 bg-blue-50">Grade {req.valuationResult?.condition_grade}</Badge>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-green-600">
                                                            {formatCurrency(req.valuationResult?.trade_in_value?.recommended || 0)}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 italic">Dựa trên AI</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-[250px]">
                                                    <div className="flex flex-col gap-1 text-sm">
                                                        <div className="flex items-center gap-1.5 font-bold text-gray-800">
                                                            <Phone className="w-3.5 h-3.5 text-blue-500" /> {req.contactInfo?.phone}
                                                        </div>
                                                        <div className="flex items-start gap-1.5 text-xs text-gray-500 leading-tight">
                                                            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" /> {req.contactInfo?.address}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMap[req.status]?.color || "bg-gray-100"}`}>
                                                        {statusMap[req.status]?.label || req.status}
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
                                                            <DropdownMenuItem onClick={() => updateStatus(req._id, 'pending')}>Chờ liên hệ</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => updateStatus(req._id, 'contacted')}>Đã liên hệ</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => updateStatus(req._id, 'completed')}>Đã thu mua</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => updateStatus(req._id, 'cancelled')} className="text-red-600">Huỷ bỏ</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile View - Cards list (Stacked) */}
                            <div className="md:hidden space-y-4 px-2 pb-6">
                                {requests.map((req) => (
                                    <div key={req._id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-1">
                                            <span className={`px-2 py-0.5 rounded-bl-lg text-[10px] font-bold ${statusMap[req.status]?.color}`}>
                                                {statusMap[req.status]?.label}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-start pt-2">
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                                    <Laptop className="w-4 h-4 text-blue-600" /> {req.deviceInfo?.modelName}
                                                </h3>
                                                <div className="flex gap-2">
                                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{req.deviceInfo?.modelCode}</Badge>
                                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-200 text-blue-700">Giá: {formatCurrency(req.valuationResult?.trade_in_value?.recommended || 0)}</Badge>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => updateStatus(req._id, 'pending')}>Chờ liên hệ</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(req._id, 'contacted')}>Đã liên hệ</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(req._id, 'completed')}>Đã thu mua</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => updateStatus(req._id, 'cancelled')} className="text-red-600">Huỷ đơn</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-50">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-gray-400">Khách hàng</p>
                                                <div className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                                    <span className="text-xs font-medium truncate">{req.userId?.name || "Khách hàng"}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-gray-400">Số điện thoại</p>
                                                <div className="flex items-center gap-1.5">
                                                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                                                    <span className="text-xs font-bold text-gray-800">{req.contactInfo?.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1 bg-gray-50 p-2 rounded-lg">
                                            <p className="text-[10px] uppercase font-bold text-gray-400">Địa chỉ thu mua</p>
                                            <div className="flex items-start gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                                                <span className="text-[11px] text-gray-600 leading-tight line-clamp-2">{req.contactInfo?.address}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-[10px] text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(req.createdAt).toLocaleDateString('vi-VN')}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Badge variant="secondary" className="text-[9px] bg-gray-100 italic">Grade {req.valuationResult?.condition_grade}</Badge>
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
