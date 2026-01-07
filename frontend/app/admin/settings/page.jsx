"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
    const handleSave = (e) => {
        e.preventDefault();
        toast.success("Đã lưu cài đặt (Demo)");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Cài đặt</h1>
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
                                <Input id="storeName" defaultValue="NexCore Electronics" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="supportEmail">Email hỗ trợ</Label>
                                <Input id="supportEmail" type="email" defaultValue="support@nexcore.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input id="phone" defaultValue="+84 123 456 789" />
                            </div>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Lưu thay đổi</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Thanh toán & Vận chuyển</CardTitle>
                        <CardDescription>Cấu hình phí vận chuyển và phương thức thanh toán.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">Phí vận chuyển mặc định</p>
                                    <p className="text-sm text-gray-500">Áp dụng cho tất cả đơn hàng</p>
                                </div>
                                <Input className="w-32" defaultValue="30.000" />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">Miễn phí vận chuyển</p>
                                    <p className="text-sm text-gray-500">Cho đơn hàng trên</p>
                                </div>
                                <Input className="w-32" defaultValue="1.000.000" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
