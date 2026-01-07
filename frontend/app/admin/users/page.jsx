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
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users`);
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
                                    <TableHead>Khách hàng</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Vai trò</TableHead>
                                    <TableHead>Ngày tham gia</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Mail className="h-4 w-4" />
                                                {user.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.isAdmin ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}>
                                                {user.isAdmin ? "Admin" : "Khách hàng"}
                                            </span>
                                        </TableCell>
                                        <TableCell>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>
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
