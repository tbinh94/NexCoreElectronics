"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Ensure you have this or use simple div
import { Loader2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchUsers();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Khách hàng</h1>
                <p className="text-gray-500 text-sm">Danh sách người dùng đã đăng ký</p>
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
                                            <TableHead className="font-semibold text-gray-900 border-r">Khách hàng</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Email</TableHead>
                                            <TableHead className="font-semibold text-gray-900 border-r">Vai trò</TableHead>
                                            <TableHead className="font-semibold text-gray-900">Ngày tham gia</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100">
                                        {users.map((user) => (
                                            <TableRow key={user._id} className="hover:bg-gray-50 transition-colors">
                                                <TableCell className="flex items-center gap-3 py-4 border-r">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                                        {user.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{user.name}</span>
                                                </TableCell>
                                                <TableCell className="border-r">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Mail className="h-4 w-4" />
                                                        {user.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="border-r">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${user.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                                                        {user.isAdmin ? "Admin" : "Khách hàng"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-500">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile View - Card List */}
                            <div className="md:hidden divide-y divide-gray-100 px-4">
                                {users.map((user) => (
                                    <div key={user._id} className="py-5 flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 text-lg">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 space-y-1.5 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                                                <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${user.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                                                    {user.isAdmin ? "Admin" : "Khách"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Mail className="h-3.5 w-3.5 shrink-0" />
                                                <span className="truncate">{user.email}</span>
                                            </div>
                                            <div className="flex items-center justify-between pt-1">
                                                <p className="text-[10px] text-gray-400 font-medium">Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
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
