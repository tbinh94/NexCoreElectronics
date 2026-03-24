"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        storeName: "",
        email: "",
        phone: "",
        address: "",
        shippingFee: "",
        freeShippingThreshold: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/settings`);
            if (res.ok) {
                const data = await res.json();
                if (data.general) {
                    setSettings(data.general);
                }
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
            toast.error("Lỗi khi tải cài đặt");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const adminPasscode = sessionStorage.getItem("admin_passcode");
            const res = await fetch(`${apiUrl}/api/settings`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-passcode": adminPasscode
                },
                body: JSON.stringify({
                    key: "general",
                    value: settings
                })
            });

            if (res.ok) {
                toast.success("Đã cài đặt thành công và áp dụng vào Cửa Hàng");
            } else {
                toast.error("Lưu cài đặt thất bại");
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Đã xảy ra lỗi");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Cài đặt chung</h1>
                <p className="text-gray-500 text-sm">Quản lý cấu hình cửa hàng của bạn</p>
            </div>

            <div className="grid gap-6">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Thông tin cửa hàng</CardTitle>
                        <CardDescription>Cập nhật tên cửa hàng, email liên hệ và địa chỉ.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="storeName">Tên cửa hàng</Label>
                                <Input id="storeName" value={settings.storeName} onChange={handleInputChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email hỗ trợ</Label>
                                <Input id="email" type="email" value={settings.email} onChange={handleInputChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input id="phone" value={settings.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Địa chỉ cửa hàng</Label>
                                <Input id="address" value={settings.address} onChange={handleInputChange} required />
                            </div>
                            
                            <Separator className="my-6" />
                            
                            <div className="space-y-4 mb-4">
                                <h3 className="text-lg font-medium">Thanh toán & Vận chuyển</h3>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Phí vận chuyển mặc định</p>
                                        <p className="text-sm text-gray-500">Áp dụng cho tất cả đơn hàng</p>
                                    </div>
                                    <Input id="shippingFee" className="w-32" value={settings.shippingFee} onChange={handleInputChange} />
                                </div>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Miễn phí vận chuyển</p>
                                        <p className="text-sm text-gray-500">Cho đơn hàng trên</p>
                                    </div>
                                    <Input id="freeShippingThreshold" className="w-32" value={settings.freeShippingThreshold} onChange={handleInputChange} />
                                </div>
                            </div>
                            
                            <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                Lưu cài đặt
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
