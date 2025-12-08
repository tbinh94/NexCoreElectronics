'use client';
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalCheckout from "@/components/checkout/ModalCheckout";

interface CartItem {
    productId: {
        _id: string;
        name: string;
        image: string;
        price: number;
    },
    quantity: number;
    _id: string; // ID của item trong mảng products (do Mongo tạo
}

export default function CartPage() {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const fetchCart = async () => {
        if (!user) return;
        try {
            const res = await fetch(`/api/cart/${user._id}`);
            const data = await res.json();
            if (data && data.products) {
                setCartItems(data.products);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    const updateQuantity = async (productId: string, newQuantity: number) => {
        if (!user) return;
        if (newQuantity < 1) return;
        try {
            const res = await fetch(`/api/cart/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user._id, productId, quantity: newQuantity }),
            });
            if (!res.ok) throw new Error("Failed to update quantity");
            await fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = async (productId: string) => {
        if (!user) return;
        if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng?")) return;
        try {
            const res = await fetch(`/api/cart/${user._id}/${productId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error("Failed to remove item");
            await fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.productId.price * item.quantity;
    }, 0);
    const formattedTotalPrice = formatPrice(totalPrice);

    if (loading)
        return <p>Đang tải...</p>;
    if (cartItems.length === 0)
        return <p>Giỏ hàng trống</p>;

    return (
        <div className="container mx-auto px-4 py-6 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

            <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            {/* Image & Info */}
                            <div className="flex gap-4 flex-1 min-w-0">
                                <div className="w-24 h-24 aspect-[4/3] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                        src={item.productId.image}
                                        alt={item.productId.name}
                                        width={128}
                                        height={128}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-center min-w-0 flex-1">
                                    <h3 className="font-semibold text-lg truncate">{item.productId.name}</h3>
                                    <p className="text-gray-500 text-sm">{formatPrice(item.productId.price)}</p>
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-red-100"
                                    onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="h-4 w-4 text-red-600" />
                                </Button>
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-green-100"
                                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                >
                                    <Plus className="h-4 w-4 text-green-600" />
                                </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right min-w-[120px]">
                                <p className="font-bold text-lg text-red-600">
                                    {formatPrice(item.productId.price * item.quantity)}
                                </p>
                            </div>

                            {/* Remove Button */}
                            <Button
                                onClick={() => removeItem(item.productId._id)}
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-blue-700 hover:bg-red-50"
                            >
                                Xóa
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Section */}
            <div className="mt-6 bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Tổng tiền</p>
                        <p className="text-3xl font-bold text-red-600">{formattedTotalPrice}</p>
                    </div>
                    <ModalCheckout amount={totalPrice} />
                </div>
            </div>
        </div>
    );
}