"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Filter, MoreHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const fetchProducts = async () => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/products`, {
                headers: {
                    'x-admin-passcode': adminPasscode
                }
            });
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            toast.error("Không thể tải danh sách sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/products/${deleteId}`, {
                method: "DELETE",
                headers: {
                    'x-admin-passcode': adminPasscode
                }
            });
            if (res.ok) {
                toast.success("Đã xoá sản phẩm");
                fetchProducts();
            } else {
                toast.error("Lỗi khi xoá sản phẩm");
            }
        } catch (error) {
            toast.error("Lỗi server");
        } finally {
            setDeleteId(null);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'x-admin-passcode': adminPasscode
                },
                body: JSON.stringify({ isActive: !currentStatus }),
            });
            if (res.ok) {
                toast.success(currentStatus ? "Đã dừng bán sản phẩm" : "Đã mở bán lại sản phẩm");
                fetchProducts();
            }
        } catch (error) {
            toast.error("Lỗi khi cập nhật trạng thái");
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sản phẩm</h1>
                    <p className="text-gray-500 text-sm">Quản lý danh mục sản phẩm của bạn</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
                    </Button>
                </Link>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Tìm kiếm sản phẩm..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <div className="w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Tên sản phẩm</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Trạng thái</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Giá</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Tồn kho</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {filteredProducts.map((item) => (
                                            <tr key={item._id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle font-medium">{item.name}</td>
                                                <td className="p-4 align-middle">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.isActive !== false
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                        }`}>
                                                        {item.isActive !== false ? "Đang bán" : "Dừng bán"}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                </td>
                                                <td className="p-4 align-middle">{item.countInStock}</td>
                                                <td className="p-4 align-middle text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item._id)}>
                                                                Copy ID
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <Link href={`/admin/products/${item._id}`}>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    Chỉnh sửa
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuItem onClick={() => toggleStatus(item._id, item.isActive !== false)}>
                                                                {item.isActive !== false ? "Dừng bán" : "Mở bán lại"}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600" onClick={() => setDeleteId(item._id)}>
                                                                Xoá sản phẩm
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc chắn muốn xoá?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này không thể hoàn tác. Sản phẩm sẽ bị xoá vĩnh viễn khỏi hệ thống.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Huỷ</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
                            Xoá
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}