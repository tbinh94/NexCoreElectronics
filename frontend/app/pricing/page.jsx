'use client';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, Zap, Laptop, Headphones, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import VietQRImage from "@/components/checkout/VietQRImage";

export default function PricingPage() {
    const { user, token, updateUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleRegisterVip = async () => {
        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }

        if (user.isVip) {
            toast.info("Bạn đã là thành viên VIP rồi!");
            return;
        }

        setShowPaymentModal(true);
    };

    const confirmPayment = async () => {
        setLoading(true);
        setShowPaymentModal(false);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/users/register-vip`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                const updatedUserData = await res.json();
                updateUser(updatedUserData);
                toast.success("Xin vui lòng chờ 1-2 phút để hệ thống cập nhật trạng thái VIP.");
                router.push("/profile");
            } else {
                toast.error("Đăng ký thất bại. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra kết nối đến máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    const tiers = [
        {
            name: "Basic",
            price: "Miễn phí",
            description: "Dành cho người mới bắt đầu",
            features: [
                "Hỗ trợ kỹ thuật cơ bản",
                "Xem lịch sử mua hàng",
                "Danh sách yêu thích",
                "Thông báo khuyến mãi"
            ],
            cta: "Sử dụng ngay",
            action: () => router.push("/"),
            featured: false,
            priceLabel: "Vĩnh viễn"
        },
        {
            name: "NexCore VIP",
            price: "50.000đ",
            description: "Trải nghiệm dịch vụ đẳng cấp nhất",
            features: [
                "Vệ sinh laptop miễn phí trọn đời",
                "Ưu tiên bảo hành trong 4h",
                "Mượn máy thay thế khi sửa chữa",
                "Voucher 500k ngày sinh nhật",
                "Giảm thêm 2% tất cả đơn hàng",
                "Hỗ trợ kỹ thuật 24/7 ưu tiên"
            ],
            cta: user?.isVip ? "Đã là VIP" : "Đăng ký VIP ngay",
            action: handleRegisterVip,
            featured: true,
            promo: "MIỄN PHÍ THÁNG ĐẦU",
            priceLabel: "/ tháng (sau tháng đầu)"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
                        Chọn Gói Dịch Vụ <span className="text-primary italic">Xứng Tầm</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Nâng cấp lên thành viên VIP để nhận ngay những đặc quyền chỉ có tại NexCore Electronics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {tiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`relative bg-white dark:bg-card rounded-[2.5rem] p-8 shadow-xl border-2 transition-all duration-500 hover:-translate-y-2 ${tier.featured
                                ? "border-primary scale-105 z-10 ring-4 ring-primary/10"
                                : "border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                                }`}
                        >
                            {tier.featured && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-black px-6 py-2 rounded-full shadow-lg animate-bounce">
                                    {tier.promo}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-2xl font-black mb-2 ${tier.featured ? "text-primary" : "text-gray-900 dark:text-white"}`}>
                                    {tier.name}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">{tier.description}</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-gray-900 dark:text-white">{tier.price}</span>
                                <span className="text-gray-500 font-medium">{tier.priceLabel}</span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {tier.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3">
                                        <div className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${tier.featured ? "bg-primary/20 text-primary" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={tier.action}
                                disabled={loading || (tier.featured && user?.isVip)}
                                className={`w-full py-8 text-lg font-black rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl ${tier.featured
                                    ? "bg-primary hover:bg-primary/90 text-white"
                                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-900 dark:text-white"
                                    }`}
                            >
                                {loading && tier.featured ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Đang xử lý...
                                    </div>
                                ) : tier.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: "Bảo mật", desc: "Thanh toán an toàn" },
                        { icon: Zap, title: "Tức thì", desc: "Kích hoạt trong 1s" },
                        { icon: Clock, title: "Linh hoạt", desc: "Hủy bất cứ lúc nào" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                            <item.icon className="h-10 w-10 text-primary mb-4" />
                            <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Confirmation Modal */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="sm:max-w-md rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-center">Thanh toán NexCore VIP</DialogTitle>
                        <DialogDescription className="text-center">
                            Vui lòng quét mã QR dưới đây để thanh toán phí duy trì dịch vụ.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center py-6 space-y-4">
                        <div className="p-4 bg-white rounded-2xl shadow-inner border">
                            <VietQRImage amount={50000} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Số tiền cần thanh toán:</p>
                            <p className="text-2xl font-black text-primary">50.000đ</p>
                            <p className="text-[10px] text-gray-400 mt-1 italic">(Nội dung: Đăng ký VIP [Tên tài khoản])</p>
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-center gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setShowPaymentModal(false)}
                            className="rounded-xl"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={confirmPayment}
                            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 rounded-xl"
                        >
                            Tôi đã chuyển khoản
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
