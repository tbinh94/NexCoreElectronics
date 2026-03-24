'use client';
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import OrderDetail from "@/components/orders/OrderDetail";
import { Calendar, Phone, MapPin, Package, CreditCard, ShoppingBag, Truck } from 'lucide-react';
import { LocateFixed } from 'lucide-react';
import { useRouter } from "next/navigation";

const getStatusConfig = (status) => {
    const configs = {
        pending: { label: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
        completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800 border-green-300' },
        cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800 border-red-300' },
        shipping: { label: 'Đang giao', color: 'bg-blue-100 text-blue-800 border-blue-300' },
        "đang trả góp": { label: 'Đang trả góp', color: 'bg-amber-100 text-amber-800 border-amber-300' },
        "đã trả góp xong": { label: 'Đã trả góp xong', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    };
    return configs[status] || configs.pending;
};

export default function Orders() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }

        setLoading(true);
        fetch(`/api/orders/${user._id}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setOrders(data);
                else console.error("Dữ liệu không hợp lệ:", data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user, authLoading, router]);

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-xl h-48 border border-gray-200"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <ShoppingBag size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
                        <p className="text-gray-500 mb-6">Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!</p>
                        <a
                            href="/products"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            Khám phá sản phẩm
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Đơn hàng của tôi</h1>
                    <p className="text-gray-600">Quản lý và theo dõi đơn hàng của bạn</p>
                </div>

                {/* Orders List */}
                <Accordion type="single" collapsible className="space-y-4">
                    {orders.map(order => {
                        const statusConfig = getStatusConfig(order.status);

                        return (
                            <AccordionItem
                                key={order._id}
                                value={order._id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="w-full p-5 sm:p-6">
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                            {/* Product Image */}
                                            <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative border border-gray-200 shadow-sm group">
                                                {order.products.length > 0 && order.products[0].productId ? (
                                                    <Image
                                                        src={order.products[0].productId.image}
                                                        alt="Product"
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Package size={36} strokeWidth={1.5} />
                                                    </div>
                                                )}
                                                {order.products.length > 1 && (
                                                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg border-2 border-white">
                                                        +{order.products.length - 1}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Order Info */}
                                            <div className="flex-1 min-w-0">
                                                {/* Header Row */}
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                                                    <div className="flex-1">
                                                        <p className="font-bold text-lg sm:text-xl text-gray-900 mb-1">
                                                            Đơn hàng #{order._id.slice(-6).toUpperCase()}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <Calendar size={14} strokeWidth={2} />
                                                            <span>
                                                                {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                        {order.estimatedDeliveryDate && (
                                                            <div className="flex items-center gap-2 text-sm text-blue-600 mt-1">
                                                                <Truck size={14} strokeWidth={2} />
                                                                <span>
                                                                    Dự kiến giao: {new Date(order.estimatedDeliveryDate).toLocaleDateString('vi-VN', {
                                                                        day: 'numeric',
                                                                        month: 'numeric',
                                                                        year: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-left sm:text-right flex-shrink-0">
                                                        <p className="font-bold text-xl sm:text-2xl text-red-600 whitespace-nowrap mb-1.5">
                                                            {formatPrice(order.totalAmount)}
                                                        </p>
                                                        <span className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border-2 ${statusConfig.color} whitespace-nowrap`}>
                                                            {statusConfig.label}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>

                                                {/* Details Grid */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                                                    {/* Left Column */}
                                                    <div className="space-y-3">
                                                        {/* Số lượng */}
                                                        <div className="flex items-start gap-3 text-gray-700">
                                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                                <Package size={16} className="text-blue-600" strokeWidth={2} />
                                                            </div>
                                                            <div className="flex-1 pt-0.5">
                                                                <span className="text-gray-600">Số lượng: </span>
                                                                <span className="font-semibold text-gray-900">{order.products.length} sản phẩm</span>
                                                            </div>
                                                        </div>

                                                        {/* Thanh toán */}
                                                        <div className="flex items-start gap-3 text-gray-700">
                                                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                                                                <CreditCard size={16} className="text-green-600" strokeWidth={2} />
                                                            </div>
                                                            <div className="flex-1 pt-0.5">
                                                                <span className="text-gray-600">Thanh toán: </span>
                                                                <span className="font-semibold text-gray-900">
                                                                    {order.paymentMethod === 'transfer' ? 'Chuyển khoản' :
                                                                        order.paymentMethod === 'installment' ? `Trả góp${order.cccd ? ` (CCCD: ${order.cccd})` : ''}` :
                                                                            'Tiền mặt'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right Column - Địa chỉ */}
                                                    <div className="flex items-start gap-3 text-gray-700 ">
                                                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                                                            <MapPin size={16} className="text-purple-600" strokeWidth={2} />
                                                        </div>
                                                        <div className="flex-1 min-w-0 pt-0.5">
                                                            <p className="font-semibold text-gray-900 mb-2">Giao tới:</p>
                                                            <div className="space-y-1.5 text-gray-600">
                                                                <p className="font-medium text-gray-900">{order.shippingAddress?.name}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <Phone size={13} className="text-gray-400 flex-shrink-0" strokeWidth={2} />
                                                                    <span className="text-xs">{order.shippingAddress?.phone}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <LocateFixed size={13} className="text-gray-400 flex-shrink-0" strokeWidth={2} />
                                                                    <span className="text-xs leading-relaxed line-clamp-2 text-gray-500" title={order.shippingAddress?.address}>
                                                                        {order.shippingAddress?.address}
                                                                        {order.shippingAddress?.city && `, ${order.shippingAddress.city}`}
                                                                    </span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-5 sm:px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                                        <OrderDetail products={order.products} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </div>
    );
}
