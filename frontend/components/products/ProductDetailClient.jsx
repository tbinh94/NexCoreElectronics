"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart, BarChart2, ShieldCheck, RotateCcw, Truck, Gift, ChevronRight, Check, ShoppingCart } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductDescription from "@/components/products/ProductDescription";
import ReviewSection from "@/components/products/ReviewSection";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductDetailClient({ product }) {
    const [selectedStorage, setSelectedStorage] = useState('256GB');
    const [selectedColor, setSelectedColor] = useState('Titan Tự Nhiên');

    // Mock images for colors - in a real app this would come from product variants
    const colorImages = {
        'Titan Tự Nhiên': product.image,
        'Titan Xanh': "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        'Titan Đen': "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    };

    const [selectedImage, setSelectedImage] = useState(product.image);

    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [buyingNow, setBuyingNow] = useState(false);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        if (colorImages[color]) {
            setSelectedImage(colorImages[color]);
        }
    };

    const handleBuyNow = async () => {
        if (!user) {
            toast.warning("Bạn cần đăng nhập để mua hàng");
            router.push('/login');
            return;
        }
        setBuyingNow(true);
        try {
            await addToCart(product._id);
            router.push('/cart');
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        } finally {
            setBuyingNow(false);
        }
    };

    const formattedPrice = formatPrice(product.price);
    const oldPrice = formatPrice(product.price * 1.1);
    const tradeInPrice = formatPrice(product.price * 0.85);

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
                        <ProductImageGallery
                            mainImage={product.image}
                            productName={product.name}
                            selectedImage={selectedImage}
                            onImageSelect={setSelectedImage}
                        />
                    </div>

                    {/* Product Commitments */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Bảo hành chính hãng</h4>
                                <p className="text-xs text-gray-500 mt-1">Bảo hành 12 tháng tại trung tâm ủy quyền.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <RotateCcw className="w-8 h-8 text-blue-600 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Đổi trả dễ dàng</h4>
                                <p className="text-xs text-gray-500 mt-1">1 đổi 1 trong 30 ngày nếu có lỗi nhà sản xuất.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <Truck className="w-8 h-8 text-blue-600 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Giao hàng siêu tốc</h4>
                                <p className="text-xs text-gray-500 mt-1">Giao hàng nội thành trong 2h, miễn phí toàn quốc.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <Gift className="w-8 h-8 text-blue-600 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Quà tặng hấp dẫn</h4>
                                <p className="text-xs text-gray-500 mt-1">Nhiều ưu đãi và quà tặng kèm theo sản phẩm.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Price Box */}
                    <div className="flex gap-4 items-stretch">
                        <div className="flex-1 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Giá sản phẩm</p>
                            <p className="text-3xl font-bold text-red-600 dark:text-red-500">{formattedPrice}</p>
                            <p className="text-sm text-gray-400 line-through mt-1">{oldPrice}</p>
                        </div>
                        <div className="flex-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-blue-500 transition-colors group">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Thu cũ lên đời chỉ từ</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700">{tradeInPrice}</p>
                            <p className="text-xs text-blue-500 mt-2 flex items-center">Trợ giá đến 2.000.000đ <ChevronRight className="w-3 h-3 ml-1" /></p>
                        </div>
                    </div>

                    {/* Variants */}
                    <div>
                        <h3 className="font-bold text-sm mb-3">Phiên bản</h3>
                        <div className="flex flex-wrap gap-3">
                            {['256GB', '512GB', '1TB'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedStorage(size)}
                                    className={`relative px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedStorage === size
                                        ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/10'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                                        }`}
                                >
                                    {size}
                                    {selectedStorage === size && (
                                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-[8px] text-white items-center justify-center">
                                                <Check className="w-2 h-2" />
                                            </span>
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm mb-3">Màu sắc</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { name: 'Titan Tự Nhiên', color: 'bg-stone-400' },
                                { name: 'Titan Xanh', color: 'bg-slate-700' },
                                { name: 'Titan Đen', color: 'bg-zinc-800' }
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    onClick={() => handleColorSelect(item.name)}
                                    className={`relative p-2 rounded-lg border cursor-pointer transition-all flex flex-col items-center gap-2 ${selectedColor === item.name
                                        ? 'border-red-500 ring-1 ring-red-500 bg-red-50/50 dark:bg-red-900/10'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-full shadow-sm ${item.color}`}></div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold">{item.name}</p>
                                        <p className="text-[10px] text-gray-500">{formattedPrice}</p>
                                    </div>
                                    {selectedColor === item.name && (
                                        <div className="absolute top-2 right-2 text-red-500">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Promotions */}
                    <div className="rounded-xl border border-red-200 dark:border-red-900 overflow-hidden">
                        <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 flex items-center gap-2">
                            <Gift className="w-5 h-5 text-red-600" />
                            <span className="font-bold text-red-700 dark:text-red-400 text-sm">Ưu đãi thêm</span>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 space-y-3">
                            <div className="flex gap-2 text-sm">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs font-bold shrink-0">1</span>
                                <span>Giảm thêm <span className="font-bold text-red-600">300.000đ</span> khi thanh toán qua VNPAY-QR.</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs font-bold shrink-0">2</span>
                                <span>Tặng gói bảo hành vàng 12 tháng (trị giá 1.500.000đ).</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs font-bold shrink-0">3</span>
                                <span>Giảm 50% khi mua kèm phụ kiện (ốp lưng, cường lực).</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-bold text-sm flex items-center gap-2 mb-3">
                            <Truck className="w-4 h-4" /> Thông tin vận chuyển
                        </h4>
                        <div className="text-sm space-y-2">
                            <p>Giao hàng đến <span className="font-bold text-blue-600 cursor-pointer">Hồ Chí Minh</span> (Thay đổi)</p>
                            <p className="text-green-600 flex items-center gap-1"><Check className="w-3 h-3" /> Có hàng tại kho gần nhất</p>
                            <p className="text-gray-500 text-xs">Freeship nội thành bán kính 10km.</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <Button
                                onClick={handleBuyNow}
                                disabled={buyingNow}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 shadow-lg shadow-red-200 dark:shadow-none"
                            >
                                <span className="text-lg font-bold uppercase">Mua ngay</span>
                                <span className="text-[10px] font-normal opacity-90">Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
                            </Button>
                            <Button variant="outline" className="w-1/3 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20">
                                <span className="text-sm font-bold uppercase">Trả góp 0%</span>
                                <span className="text-[10px] font-normal opacity-90">Duyệt hồ sơ trong 5 phút</span>
                            </Button>
                        </div>

                        <AddToCartButton
                            productId={product._id}
                            className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="font-bold">Thêm vào giỏ</span>
                        </AddToCartButton>
                    </div>
                </div>
            </div>

            <ProductDescription product={product} />
            <ReviewSection productId={product._id} />
        </div>
    );
}
