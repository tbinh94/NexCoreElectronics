'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import VietQRImage from "@/components/checkout/VietQRImage";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        paymentMethod: "cash"
    });
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Fetch cart to calculate total
    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;
            try {
                const res = await fetch(`/api/cart/${user._id}`);
                const data = await res.json();
                if (data && data.products) {
                    setCartItems(data.products);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [user]);

    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + (item.productId?.price || 0) * item.quantity;
    }, 0);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, paymentMethod: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    shippingAddress: {
                        name: formData.name,
                        address: formData.address,
                        phone: formData.phone
                    },
                    paymentMethod: formData.paymentMethod
                })
            });

            if (res.ok) {
                setOrderSuccess(true);
                // If cash, redirect or show success
                if (formData.paymentMethod === 'cash') {
                    alert("Đặt hàng thành công!");
                    router.push("/products");
                }
            } else {
                alert("Đặt hàng thất bại");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra");
        }
    };

    if (loading) return <p className="text-center py-10">Đang tải...</p>;

    if (orderSuccess && formData.paymentMethod === 'transfer') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <h2 className="text-2xl font-bold text-green-600">Đặt hàng thành công!</h2>
                <p>Vui lòng quét mã QR dưới đây để thanh toán</p>
                <div className="p-4 border rounded-lg shadow-sm bg-white text-center">
                    <p className="mb-4 font-semibold">Tổng tiền: {formatPrice(totalPrice)}</p>
                    <VietQRImage amount={totalPrice} />
                    <Button variant="link" onClick={() => router.push("/products")} className="mt-4">
                        Quay về trang chủ
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Thanh toán</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Info */}
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Họ tên</Label>
                            <Input id="name" value={formData.name} onChange={handleInputChange} required placeholder="Nguyễn Văn A" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input id="phone" value={formData.phone} onChange={handleInputChange} required placeholder="0901234567" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Địa chỉ nhận hàng</Label>
                            <Input id="address" value={formData.address} onChange={handleInputChange} required placeholder="Số 1, Đường ABC..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="paymentMethod">Phương thức thanh toán</Label>
                            <Select onValueChange={handleSelectChange} defaultValue={formData.paymentMethod}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn phương thức" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">Thanh toán khi nhận hàng (COD)</SelectItem>
                                    <SelectItem value="transfer">Chuyển khoản ngân hàng (QR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full mt-6 text-lg">
                            Xác nhận đặt hàng
                        </Button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h3 className="font-bold text-xl mb-4">Đơn hàng của bạn</h3>
                    <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex justify-between text-sm">
                                <span>{item.productId?.name} x {item.quantity}</span>
                                <span className="font-medium">{formatPrice((item.productId?.price || 0) * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between items-center">
                        <span className="font-bold text-lg">Tổng cộng</span>
                        <span className="font-bold text-xl text-red-600">{formatPrice(totalPrice)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}