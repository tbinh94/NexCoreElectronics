'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProductById } from "@/lib/api";
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
    const searchParams = useSearchParams();
    const directProductId = searchParams.get('productId');
    const directVariant = searchParams.get('variant');
    const directType = searchParams.get('type');
    const initialPaymentMethod = searchParams.get('paymentMethod') || "cash";

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        customCity: "",
        phone: "",
        paymentMethod: initialPaymentMethod,
        cccd: ""
    });
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Fetch cart or direct product
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            if (directProductId) {
                try {
                    const product = await fetchProductById(directProductId);
                    if (product) {
                        setCartItems([{
                            productId: product,
                            quantity: 1,
                            variant: directVariant,
                            type: directType
                        }]);
                    }
                } catch (error) {
                    console.error("Error fetching direct product:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                const fetchCart = async () => {
                    try {
                        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                        const res = await fetch(`${apiUrl}/api/cart/${user._id}`);
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
            }
        };
        fetchData();
    }, [user, directProductId, directVariant, directType]);

    const totalPrice = cartItems.reduce((acc, item) => {
        let price = item.productId?.price || 0;
        const storageOptions = ['256GB', '512GB', '1TB'];

        // Handle variant price (Rule-based)
        if (item.variant) {
            const index = storageOptions.indexOf(item.variant);
            if (index !== -1) {
                if (item.type === 'used') {
                    // Used: (Base * 0.6) + (Index * 500,000)
                    const baseUsedPrice = Math.round(price * 0.6);
                    price = baseUsedPrice + (index * 500000);
                } else {
                    // New: Base + (Index * 1,000,000)
                    price = price + (index * 1000000);
                }
            }
        } else if (item.type === 'used') {
            // Fallback if no variant but type is used
            price = Math.round(price * 0.6);
        }

        return acc + price * item.quantity;
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

        const finalCity = formData.city === "Khác" ? formData.customCity : formData.city;
        if (!finalCity) {
            alert("Vui lòng chọn hoặc nhập Tỉnh/Thành phố");
            return;
        }

        if (formData.paymentMethod === 'installment') {
            if (!/^\d{12}$/.test(formData.cccd)) {
                alert("Số CCCD phải bao gồm 12 chữ số");
                return;
            }
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    shippingAddress: {
                        name: formData.name,
                        address: formData.address,
                        city: finalCity,
                        phone: formData.phone
                    },
                    paymentMethod: formData.paymentMethod,
                    cccd: formData.paymentMethod === 'installment' ? formData.cccd : undefined,
                    items: cartItems.map(item => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                        variant: item.variant,
                        type: item.type
                    }))
                })
            });

            if (res.ok) {
                if (!directProductId) {
                    await fetch(`${apiUrl}/api/cart/${user._id}`, {
                        method: "DELETE"
                    }).catch(console.error);
                }
                setOrderSuccess(true);
            } else {
                alert("Đặt hàng thất bại");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra");
        }
    };

    if (loading) return <p className="text-center py-10">Đang tải...</p>;

    if (orderSuccess) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-xl text-center">
                <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-xl border border-green-100 dark:border-green-900/30 animate-in zoom-in duration-300">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Đặt hàng thành công!</h2>

                    {formData.paymentMethod === 'transfer' ? (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30 mb-6">
                            <div className="flex justify-center mb-1 transform scale-90 sm:scale-75 origin-top -mt-2">
                                <VietQRImage amount={totalPrice} />
                            </div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1 -mt-4 sm:-mt-10">Scan QR để hoàn tất thanh toán</p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Tổng tiền: {formatPrice(totalPrice)}</p>
                        </div>
                    ) : formData.paymentMethod === 'installment' ? (
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30 text-left sm:text-center mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Phương thức:</span>
                                <span className="font-semibold text-amber-700 dark:text-amber-400 text-sm sm:text-right">Trả góp</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3">
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Tổng đơn hàng:</span>
                                <span className="font-bold text-red-600 text-sm sm:text-right">{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="border-t border-amber-200 dark:border-amber-800/50 pt-2 flex flex-col items-center">
                                <div className="flex justify-center transform scale-[0.80] sm:scale-75 origin-top -mt-2 -mb-8 sm:-mb-14">
                                    <VietQRImage amount={Math.round(totalPrice * 0.025)} />
                                </div>
                                <p className="text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Vui lòng quét QR để thanh toán tháng đầu (2.5%)</p>
                                <p className="text-base font-bold text-amber-600 dark:text-amber-400">Số tiền: {formatPrice(Math.round(totalPrice * 0.025))}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 dark:text-gray-400">Phương thức:</span>
                                <span className="font-semibold">Thanh toán khi nhận hàng (COD)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400">Tổng cộng:</span>
                                <span className="font-bold text-red-600">{formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => router.push("/orders")} className="bg-primary hover:bg-primary/90 px-8">
                            Xem đơn hàng
                        </Button>
                        <Button variant="outline" onClick={() => router.push("/")} className="px-8">
                            Tiếp tục mua sắm
                        </Button>
                    </div>
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
                            <Label htmlFor="city">Tỉnh/Thành phố</Label>
                            <Select
                                onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                                defaultValue={formData.city}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                                    <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                                    <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                                    <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
                                    <SelectItem value="Khác">Khác</SelectItem>
                                </SelectContent>
                            </Select>
                            {formData.city === "Khác" && (
                                <Input 
                                    id="customCity" 
                                    value={formData.customCity || ""} 
                                    onChange={handleInputChange} 
                                    required 
                                    placeholder="Nhập Tỉnh/Thành phố của bạn" 
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Địa chỉ nhận hàng</Label>
                            <Input id="address" value={formData.address} onChange={handleInputChange} required placeholder="Số 1, Đường ABC..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="paymentMethod">Phương thức thanh toán</Label>
                            <Select
                                onValueChange={handleSelectChange}
                                defaultValue={formData.paymentMethod}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn phương thức" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="cash">
                                        Thanh toán khi nhận hàng (COD)
                                    </SelectItem>
                                    <SelectItem value="transfer">
                                        Chuyển khoản ngân hàng (QR)
                                    </SelectItem>
                                    <SelectItem value="installment">
                                        Trả góp (CCCD)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.paymentMethod === 'installment' && (
                            <div className="grid gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label htmlFor="cccd">Số CCCD (12 số)</Label>
                                <Input
                                    id="cccd"
                                    value={formData.cccd}
                                    onChange={handleInputChange}
                                    required={formData.paymentMethod === 'installment'}
                                    placeholder="Nhập 12 số CCCD"
                                    maxLength={12}
                                />
                                <p className="text-xs text-gray-500">Vui lòng nhập chính xác 12 chữ số CCCD để làm thủ tục trả góp.</p>
                            </div>
                        )}

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
                            <div key={item.productId?._id || Math.random()} className="flex justify-between text-sm">
                                <span>
                                    {item.productId?.name}
                                    {item.variant && <span className="text-gray-500"> ({item.variant})</span>}
                                    {item.type === 'used' && <span className="text-red-500"> (Cũ)</span>}
                                    x {item.quantity}
                                </span>
                                <span className="font-medium">
                                    {(() => {
                                        let price = item.productId?.price || 0;
                                        const storageOptions = ['256GB', '512GB', '1TB'];

                                        // Handle variant price (Rule-based)
                                        if (item.variant) {
                                            const index = storageOptions.indexOf(item.variant);
                                            if (index !== -1) {
                                                if (item.type === 'used') {
                                                    // Used: (Base * 0.6) + (Index * 500,000)
                                                    const baseUsedPrice = Math.round(price * 0.6);
                                                    price = baseUsedPrice + (index * 500000);
                                                } else {
                                                    // New: Base + (Index * 1,000,000)
                                                    price = price + (index * 1000000);
                                                }
                                            }
                                        } else if (item.type === 'used') {
                                            // Fallback if no variant but type is used
                                            price = Math.round(price * 0.6);
                                        }
                                        return formatPrice(price * item.quantity);
                                    })()}
                                </span>
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