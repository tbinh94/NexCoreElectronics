'use client';
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`/api/orders/${user._id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setOrders(data);
                    else console.error("Data is not an array:", data);
                });
        }
    }, [user]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Lịch sử đơn hàng</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order._id} className="bg-white border rounded-lg p-4 shadow-sm flex gap-4">
                        {/* Image Section */}
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                            {order.products.length > 0 && order.products[0].productId ? (
                                <Image
                                    src={order.products[0].productId.image}
                                    alt="Product"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-lg">Đơn hàng #{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                            year: 'numeric', month: 'long', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <p className="font-bold text-red-600 text-lg">{formatPrice(order.totalAmount)}</p>
                            </div>

                            <div className="mt-2 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <p><span className="font-medium">Số lượng:</span> {order.products.length} sản phẩm</p>
                                    <p><span className="font-medium">Trạng thái:</span> <span className="capitalize text-blue-600">{order.status}</span></p>
                                    <p><span className="font-medium">Thanh toán:</span> {order.paymentMethod === 'transfer' ? 'Chuyển khoản' : 'Tiền mặt'}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Giao tới:</p>
                                    <p>{order.shippingAddress?.name} - {order.shippingAddress?.phone}</p>
                                    <p className="truncate" title={order.shippingAddress?.address}>{order.shippingAddress?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}