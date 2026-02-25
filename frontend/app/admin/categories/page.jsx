'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Trash2, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function CategoriesPage() {
    const { user, token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '' });
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchCategories = async () => {
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const res = await fetch('/api/categories', {
                headers: {
                    'x-admin-passcode': adminPasscode
                }
            });
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-admin-passcode': adminPasscode
                },
                body: JSON.stringify(newCategory),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to create category');
            }

            toast.success('Category created successfully');
            setNewCategory({ name: '', description: '', image: '' });
            setIsDialogOpen(false);
            fetchCategories();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'x-admin-passcode': adminPasscode
                }
            });

            if (!res.ok) throw new Error('Failed to delete category');

            toast.success('Category deleted successfully');
            fetchCategories();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Danh mục</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thêm danh mục mới</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateCategory} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Tên danh mục</Label>
                                <Input
                                    id="name"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    required
                                    placeholder="VD: Gaming, MacBook..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Mô tả</Label>
                                <Input
                                    id="description"
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    placeholder="Mô tả ngắn về danh mục"
                                />
                            </div>
                            <div>
                                <Label htmlFor="image">Link hình ảnh</Label>
                                <Input
                                    id="image"
                                    value={newCategory.image}
                                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Tạo danh mục</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow border overflow-hidden">
                {/* Desktop View - Table */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-semibold text-gray-900">Tên danh mục</TableHead>
                                <TableHead className="font-semibold text-gray-900">Slug</TableHead>
                                <TableHead className="font-semibold text-gray-900">Mô tả</TableHead>
                                <TableHead className="w-[120px] text-right pr-6 font-semibold text-gray-900">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">Đang tải...</TableCell>
                                </TableRow>
                            ) : categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">Chưa có danh mục nào</TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category) => (
                                    <TableRow key={category._id} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="font-medium text-gray-900">{category.name}</TableCell>
                                        <TableCell className="text-gray-500">{category.slug}</TableCell>
                                        <TableCell className="text-gray-500 max-w-[300px] truncate">{category.description || "--"}</TableCell>
                                        <TableCell className="text-right pr-4">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => window.location.href = `/admin/products/new?category=${encodeURIComponent(category.name)}`}
                                                    title="Thêm sản phẩm vào danh mục này"
                                                    className="text-blue-600 hover:bg-blue-50"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteCategory(category._id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    title="Xoá danh mục"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile View - Card List */}
                <div className="md:hidden divide-y divide-gray-100 px-4">
                    {loading ? (
                        <div className="py-8 text-center text-gray-500">Đang tải...</div>
                    ) : categories.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">Chưa có danh mục nào</div>
                    ) : (
                        categories.map((category) => (
                            <div key={category._id} className="py-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-gray-900">{category.name}</h3>
                                        <p className="text-xs text-gray-400 font-mono">{category.slug}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 text-blue-600 border-blue-100 bg-blue-50"
                                            onClick={() => window.location.href = `/admin/products/new?category=${encodeURIComponent(category.name)}`}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 border-red-100 bg-red-50"
                                            onClick={() => handleDeleteCategory(category._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                {category.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded-lg">
                                        {category.description}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
