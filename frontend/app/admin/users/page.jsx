"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2, Mail, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchUsers = async () => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users`, {
                headers: {
                    'x-admin-passcode': adminPasscode
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            toast.error("Không thể tải danh sách khách hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleVipApproval = async (userId, status) => {
        setActionLoading(userId);
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users/${userId}/vip`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-passcode': adminPasscode
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                toast.success(status === 'active' ? "Đã phê duyệt VIP" : "Đã hủy yêu cầu VIP");
                fetchUsers();
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (error) {
            toast.error("Lỗi kết nối máy chủ");
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Khách hàng</h1>
                <p className="text-gray-500 text-sm">Quản lý người dùng và phê duyệt đặc quyền VIP</p>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0 sm:p-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    <TableRow>
                                        <TableHead className="font-semibold text-gray-900">Khách hàng</TableHead>
                                        <TableHead className="font-semibold text-gray-900 border-x">Email</TableHead>
                                        <TableHead className="font-semibold text-gray-900 border-x text-center">Trạng thái VIP</TableHead>
                                        <TableHead className="font-semibold text-gray-900 border-x">Vai trò</TableHead>
                                        <TableHead className="font-semibold text-gray-900 border-x">Ngày tham gia</TableHead>
                                        <TableHead className="font-semibold text-gray-900 text-right uppercase text-[10px] tracking-widest">Hành động</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <TableRow key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="flex items-center gap-3 py-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900">{user.name}</span>
                                            </TableCell>
                                            <TableCell className="border-x">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail className="h-4 w-4" />
                                                    {user.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-x text-center">
                                                {user.vipStatus === 'active' ? (
                                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-black text-yellow-700 border border-yellow-200 uppercase tracking-tighter">
                                                        ✨ VIP
                                                    </span>
                                                ) : user.vipStatus === 'pending' ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-[10px] font-black text-orange-700 border border-orange-200 uppercase tracking-tighter animate-pulse">
                                                        <Clock size={10} /> Chờ phê duyệt
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="border-x">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${user.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                                                    {user.isAdmin ? "Admin" : "Khách hàng"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="border-x text-gray-500">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                                            <TableCell className="text-right">
                                                {user.vipStatus === 'pending' && (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleVipApproval(user._id, 'active')}
                                                            disabled={actionLoading === user._id}
                                                            className="bg-green-600 hover:bg-green-700 h-8 px-3 rounded-lg text-[11px] font-bold"
                                                        >
                                                            {actionLoading === user._id ? <Loader2 className="animate-spin h-3 w-3" /> : <> <CheckCircle className="w-3 h-3 mr-1" /> Duyệt VIP</>}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleVipApproval(user._id, 'none')}
                                                            disabled={actionLoading === user._id}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-3 rounded-lg text-[11px] font-bold"
                                                        >
                                                            <XCircle className="w-3 h-3 mr-1" /> Hủy
                                                        </Button>
                                                    </div>
                                                )}
                                                {user.vipStatus === 'active' && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleVipApproval(user._id, 'none')}
                                                        disabled={actionLoading === user._id}
                                                        className="text-gray-400 hover:text-red-500 hover:bg-gray-50 h-8 px-3 rounded-lg text-[10px] font-medium"
                                                    >
                                                        Gỡ VIP
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
