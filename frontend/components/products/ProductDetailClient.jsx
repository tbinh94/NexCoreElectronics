"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart, BarChart2, ShieldCheck, RotateCcw, Truck, Gift, ChevronRight, Check, ShoppingCart, Tag } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductDescription from "@/components/products/ProductDescription";
import ReviewSection from "@/components/products/ReviewSection";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { addToWishlist, removeFromWishlist, getWishlist, getIsProductUsedWeekly } from "@/lib/api";
import { useCompare } from "@/context/CompareContext";


export default function ProductDetailClient({ product, initialReviews }) {

    //console.log("ProductDetailClient product:", product);
    const { user, token } = useAuth();
    const { compareList, addToCompare } = useCompare();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loadingWishlist, setLoadingWishlist] = useState(false);

    const scrollToReviews = () => {
        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const checkWishlist = async () => {
            if (user && token) {
                try {
                    const wishlist = await getWishlist(token);
                    const isInWishlist = wishlist.some(item => (item._id || item) === product._id);
                    setIsWishlisted(isInWishlist);
                } catch (error) {
                    console.error("Error checking wishlist:", error);
                }
            }
        };
        checkWishlist();
    }, [user, token, product._id]);

    const handleWishlistToggle = async () => {
        if (!user || !token) {
            toast.warning("Vui lòng đăng nhập để lưu sản phẩm vào yêu thích");
            router.push('/login');
            return;
        }

        setLoadingWishlist(true);
        try {
            if (isWishlisted) {
                await removeFromWishlist(product._id, token);
                setIsWishlisted(false);
                toast.success("Đã xóa khỏi danh sách yêu thích");
            } else {
                await addToWishlist(product._id, token);
                setIsWishlisted(true);
                toast.success("Đã thêm vào danh sách yêu thích");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xử lý danh sách yêu thích");
        } finally {
            setLoadingWishlist(false);
        }
    };
    const searchParams = useSearchParams();
    const initialType = searchParams.get('type') === 'used' ? 'used' : 'new';

    const [selectedCondition, setSelectedCondition] = useState(initialType);
    const [selectedStorage, setSelectedStorage] = useState('256GB');
    const storageOptions = ['256GB', '512GB', '1TB'];

    // Mock images for colors
    const colorImages = {
        'Titan Tự Nhiên': product.image,
        'Titan Xanh': "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        'Titan Đen': "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    };

    const [selectedColor, setSelectedColor] = useState('Titan Tự Nhiên');
    const [selectedImage, setSelectedImage] = useState(product.image);

    const { addToCart } = useCart();
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

        // Direct checkout flow
        const query = new URLSearchParams({
            productId: product._id,
            type: selectedCondition,
            variant: selectedStorage
        });

        router.push(`/checkout?${query.toString()}`);
    };

    const handleAddToCart = async () => {
        if (!user) {
            toast.warning("Bạn cần đăng nhập để mua hàng");
            router.push('/login');
            return;
        }
        try {
            await addToCart(product._id, selectedCondition);
            toast.success("Đã thêm vào giỏ hàng");
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    const handleInstallment = async () => {
        if (!user) {
            toast.warning("Bạn cần đăng nhập để mua hàng");
            router.push('/login');
            return;
        }

        const query = new URLSearchParams({
            productId: product._id,
            type: selectedCondition,
            variant: selectedStorage,
            paymentMethod: 'installment'
        });

        router.push(`/checkout?${query.toString()}`);
    };

    // Pricing Logic (Rule-based)
    // New: Base + (Index * 1,000,000)
    // Used: (Base * 0.6) + (Index * 500,000)

    const storageIndex = storageOptions.indexOf(selectedStorage);

    const baseNewPrice = product.price;
    const currentNewPrice = baseNewPrice + (storageIndex * 1000000);

    const baseUsedPrice = Math.round(product.price * 0.6);
    const currentUsedPrice = baseUsedPrice + (storageIndex * 500000);

    const formattedPrice = formatPrice(currentNewPrice);
    const formattedUsedPrice = formatPrice(currentUsedPrice);

    // Chỉ sản phẩm nằm trong nhóm 20% mới hỗ trợ bản cũ và hiện "Giá niêm yết"
    const isUsedSupported = getIsProductUsedWeekly(product._id);
    const showOldPrice = isUsedSupported || product.oldPrice > 0;

    const oldPrice = showOldPrice
        ? formatPrice(currentNewPrice * 1.1)
        : null;

    const tradeInPrice = formatPrice(currentNewPrice * 0.85);


    return (
        <div className="space-y-6 sm:space-y-10">
            {/* Product Header - Integrated for better mobile response */}
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4 sm:pb-6">
                <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                    {product.name}
                </h1>
                <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                        <div className="flex items-center text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500" />
                            <span className="ml-1.5 font-bold text-sm sm:text-base">{product.rating > 0 ? product.rating : "Chưa có đánh giá"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                onClick={scrollToReviews}
                                className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                            >
                                {product.reviews} Đánh giá
                            </span>
                        </div>
                        <div className="hidden xs:block h-4 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleWishlistToggle}
                                disabled={loadingWishlist}
                                className={`h-8 px-2 transition-colors ${isWishlisted ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'}`}
                            >
                                <Heart className={`w-4 h-4 mr-1.5 ${isWishlisted ? 'fill-red-600' : ''}`} />
                                {isWishlisted ? 'Đã thích' : 'Yêu thích'}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => addToCompare(product)}
                                className="text-gray-500 hover:text-blue-600 hover:bg-gray-100 h-8 px-2"
                            >
                                <BarChart2 className="w-4 h-4 mr-1.5" /> So sánh
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
                {/* Left Column */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
                        <ProductImageGallery
                            mainImage={product.image}
                            images={product.images}
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
                    {/* Condition Selection */}
                    <div>
                        <h3 className="font-bold text-sm mb-3">Tình trạng máy</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* New Option */}
                            <div
                                onClick={() => setSelectedCondition('new')}
                                className={`relative p-4 rounded-xl border cursor-pointer transition-all ${selectedCondition === 'new'
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500'
                                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                    }`}
                            >
                                {selectedCondition === 'new' && (
                                    <div className="absolute top-2 right-2 text-blue-500">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Máy Mới 100%</p>
                                <p className="text-lg font-bold text-red-600 dark:text-red-500">{formattedPrice}</p>
                                <p className="text-xs text-gray-500 mt-1 mb-2">Nguyên seal, chưa active</p>
                                <p className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded w-max border border-green-200">
                                    Còn {product.countInStock || 0} máy mới
                                </p>
                            </div>

                            {/* Used Option - Chỉ hiện nếu sản phẩm này hỗ trợ bản cũ tuần này */}
                            {isUsedSupported && (
                                <div
                                    onClick={() => setSelectedCondition('used')}
                                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${selectedCondition === 'used'
                                        ? 'bg-red-50 dark:bg-red-900/20 border-red-500 ring-1 ring-red-500'
                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-red-300'
                                        }`}
                                >
                                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                                        -40%
                                    </div>
                                    {selectedCondition === 'used' && (
                                        <div className="absolute top-2 right-2 text-red-500">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> Máy Cũ 99%
                                    </p>
                                    <p className="text-lg font-bold text-red-600 dark:text-red-500">{formattedUsedPrice}</p>
                                    <p className="text-xs text-gray-500 mt-1 mb-2">Bảo hành 6 tháng <br />(Thường chỉ có 15-20 máy/tuần)</p>
                                    <p className="text-xs font-semibold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded w-max border border-orange-200">
                                        Còn {product.countInStockOld || 0} máy cũ
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Price Summary Box */}
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        {showOldPrice && (
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-500">Giá niêm yết:</span>
                                <span className="text-sm text-gray-400 line-through">{oldPrice}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <span className="text-base font-bold text-gray-900 dark:text-white">Giá thanh toán:</span>
                            <span className="text-3xl font-bold text-red-600 dark:text-red-500">
                                {selectedCondition === 'new' ? formattedPrice : formattedUsedPrice}
                            </span>
                        </div>
                        {selectedCondition === 'new' && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <div
                                    onClick={() => router.push('/trade-in')}
                                    className="flex justify-between items-center cursor-pointer group"
                                >
                                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">Thu cũ đổi mới</span>
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Chỉ từ {tradeInPrice}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Variants */}
                    <div>
                        <h3 className="font-bold text-sm mb-3">Phiên bản</h3>
                        <div className="flex flex-wrap gap-3">
                            {storageOptions.map((size) => (
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
                                        <p className="text-[10px] text-gray-500">
                                            {selectedCondition === 'new' ? formattedPrice : formattedUsedPrice}
                                        </p>
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
                            <Button
                                onClick={handleInstallment}
                                variant="outline"
                                className="w-1/3 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            >
                                <span className="text-sm font-bold uppercase">Trả góp 0%</span>
                                <span className="text-[10px] font-normal opacity-90">Duyệt hồ sơ trong 5 phút</span>
                            </Button>
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="font-bold">Thêm vào giỏ</span>
                        </Button>
                    </div>
                </div>
            </div>

            <ProductDescription product={product} />
            <ReviewSection productId={product._id} initialReviews={initialReviews} />

        </div>
    );
}
