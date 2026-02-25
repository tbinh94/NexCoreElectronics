"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiTone, setAiTone] = useState("professional");
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        detailedDescription: "",
        highlights: "",
        image: "",
        category: "",
        brand: "",
        countInStock: "",
        specs: {
            screen: "",
            cpu: "",
            ram: "",
            storage: "",
            battery: "",
            os: "",
            gpu: "",
            weight: "",
        }
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminPasscode = sessionStorage.getItem("admin_passcode");
                // Fetch categories
                const catRes = await fetch('/api/categories', {
                    headers: {
                        'x-admin-passcode': adminPasscode
                    }
                });
                const catData = await catRes.json();
                setCategories(catData);

                // Fetch product data
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const productRes = await fetch(`${apiUrl}/api/admin/products/${productId}`, {
                    headers: {
                        'x-admin-passcode': adminPasscode
                    }
                });
                if (!productRes.ok) throw new Error("Không thể tải thông tin sản phẩm");

                const productData = await productRes.json();
                setFormData({
                    ...productData,
                    highlights: Array.isArray(productData.highlights) ? productData.highlights.join('\n') : "",
                    specs: {
                        ...formData.specs,
                        ...(productData.specs || {})
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error(error.message || "Lỗi khi tải dữ liệu");
                router.push("/admin/products");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("specs.")) {
            const specField = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                specs: { ...prev.specs, [specField]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerateContent = async () => {
        if (!formData.name) {
            toast.error("Vui lòng nhập tên sản phẩm trước khi tạo nội dung");
            return;
        }

        setAiLoading(true);
        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/generate-description`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-admin-passcode': adminPasscode
                },
                body: JSON.stringify({
                    productName: formData.name,
                    productSpecs: formData.specs,
                    tone: aiTone
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({
                    ...prev,
                    description: data.shortDescription,
                    detailedDescription: data.detailedDescription,
                    highlights: data.highlights.join('\n')
                }));
                toast.success("Đã tạo nội dung tự động thành công!");
            } else {
                toast.error("Không thể tạo nội dung. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi kết nối đến server AI");
        } finally {
            setAiLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const productData = {
                ...formData,
                highlights: typeof formData.highlights === 'string'
                    ? formData.highlights.split('\n').filter(line => line.trim() !== '')
                    : formData.highlights
            };

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/admin/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-passcode": adminPasscode
                },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                toast.success("Cập nhật sản phẩm thành công");
                router.push("/admin/products");
            } else {
                const error = await res.json();
                toast.error(error.message || "Lỗi khi cập nhật sản phẩm");
            }
        } catch (error) {
            toast.error("Lỗi server");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
                <p className="text-gray-500">Đang tải thông tin sản phẩm...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Chỉnh sửa sản phẩm</h1>
                    <p className="text-gray-500 text-sm">Cập nhật thông tin cho sản phẩm của bạn</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* General Info */}
                    <Card className="md:col-span-2 border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Thông tin chung</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Tên sản phẩm</Label>
                                <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Ví dụ: iPhone 15 Pro Max" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Giá (VNĐ)</Label>
                                    <Input id="price" name="price" type="number" required value={formData.price} onChange={handleChange} placeholder="30000000" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="countInStock">Số lượng tồn kho</Label>
                                    <Input id="countInStock" name="countInStock" type="number" required value={formData.countInStock} onChange={handleChange} placeholder="100" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Danh mục</Label>
                                    <Select value={formData.category} onValueChange={(val) => handleSelectChange("category", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn danh mục" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat._id} value={cat.name}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="brand">Thương hiệu</Label>
                                    <Input id="brand" name="brand" required value={formData.brand} onChange={handleChange} placeholder="Apple, Samsung..." />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Hình ảnh sản phẩm</Label>
                                <div className="flex gap-4 items-center">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const uploadFormData = new FormData();
                                                uploadFormData.append('image', file);
                                                try {
                                                    const adminPasscode = sessionStorage.getItem("admin_passcode");
                                                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                                                    const res = await fetch(`${apiUrl}/api/upload`, {
                                                        method: 'POST',
                                                        headers: {
                                                            'x-admin-passcode': adminPasscode
                                                        },
                                                        body: uploadFormData,
                                                    });
                                                    const data = await res.json();
                                                    if (data.image) {
                                                        const fullUrl = data.image.startsWith('http')
                                                            ? data.image
                                                            : `${apiUrl}${data.image}`;
                                                        setFormData(prev => ({ ...prev, image: fullUrl }));
                                                        toast.success("Upload ảnh thành công");
                                                    }
                                                } catch (err) {
                                                    toast.error("Lỗi upload ảnh");
                                                } finally {
                                                    setSubmitting(false);
                                                }
                                            }
                                        }}
                                    />
                                    {formData.image && (
                                        <div className="h-10 w-10 relative rounded overflow-hidden border">
                                            <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                                        </div>
                                    )}
                                </div>
                                <Input
                                    id="imageUrl"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Hoặc nhập link ảnh trực tiếp"
                                    className="mt-2"
                                />
                            </div>

                            {/* AI Content Generation Section */}
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                                        ✨ AI Content Generator
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <Select value={aiTone} onValueChange={setAiTone}>
                                            <SelectTrigger className="w-[140px] h-8 text-xs bg-white">
                                                <SelectValue placeholder="Tone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="professional">Chuyên nghiệp</SelectItem>
                                                <SelectItem value="youthful">Trẻ trung</SelectItem>
                                                <SelectItem value="premium">Cao cấp</SelectItem>
                                                <SelectItem value="technical">Kỹ thuật</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={handleGenerateContent}
                                            disabled={aiLoading}
                                            className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
                                        >
                                            {aiLoading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : "Tạo nội dung"}
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-xs text-blue-600">
                                    Nhập tên sản phẩm và thông số kỹ thuật, sau đó nhấn nút để AI tự động viết mô tả và đặc điểm nổi bật.
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Mô tả ngắn</Label>
                                <Textarea id="description" name="description" required value={formData.description} onChange={handleChange} className="min-h-[80px]" placeholder="Mô tả ngắn gọn về sản phẩm (hiển thị ở danh sách)" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="detailedDescription">Mô tả chi tiết</Label>
                                <Textarea id="detailedDescription" name="detailedDescription" value={formData.detailedDescription} onChange={handleChange} className="min-h-[150px]" placeholder="Mô tả đầy đủ tính năng, bài viết đánh giá..." />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="highlights">Đặc điểm nổi bật (Mỗi dòng một ý)</Label>
                                <Textarea id="highlights" name="highlights" value={formData.highlights} onChange={handleChange} className="min-h-[120px]" placeholder="- Chip A17 Pro mạnh mẽ&#10;- Khung titan bền bỉ&#10;- Camera zoom 5x" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Specs */}
                    <Card className="md:col-span-2 border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Thông số kỹ thuật</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="specs.screen">Màn hình</Label>
                                <Input id="specs.screen" name="specs.screen" value={formData.specs?.screen || ""} onChange={handleChange} placeholder='6.7" Super Retina XDR' />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specs.cpu">CPU</Label>
                                <Input id="specs.cpu" name="specs.cpu" value={formData.specs?.cpu || ""} onChange={handleChange} placeholder="A17 Pro" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specs.ram">RAM</Label>
                                <Input id="specs.ram" name="specs.ram" value={formData.specs?.ram || ""} onChange={handleChange} placeholder="8GB" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specs.storage">Bộ nhớ trong</Label>
                                <Input id="specs.storage" name="specs.storage" value={formData.specs?.storage || ""} onChange={handleChange} placeholder="256GB" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specs.battery">Pin</Label>
                                <Input id="specs.battery" name="specs.battery" value={formData.specs?.battery || ""} onChange={handleChange} placeholder="4422 mAh" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specs.os">Hệ điều hành</Label>
                                <Input id="specs.os" name="specs.os" value={formData.specs?.os || ""} onChange={handleChange} placeholder="iOS 17" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specs.gpu">GPU</Label>
                                <Input id="specs.gpu" name="specs.gpu" value={formData.specs?.gpu || ""} onChange={handleChange} placeholder="Apple GPU (6-core graphics)" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specs.weight">Trọng lượng</Label>
                                <Input id="specs.weight" name="specs.weight" value={formData.specs?.weight || ""} onChange={handleChange} placeholder="221g" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Huỷ bỏ</Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Cập nhật sản phẩm
                    </Button>
                </div>
            </form>
        </div>
    );
}
