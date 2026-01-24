'use client';

import { ShieldCheck, Truck, Clock, Headphones, CreditCard, RefreshCcw, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
    {
        icon: Truck,
        title: "Vận chuyển siêu tốc",
        description: "Giao hàng hỏa tốc trong 2h tại nội thành Hà Nội và TP. HCM. Miễn phí vận chuyển cho đơn hàng từ 10 triệu đồng.",
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
        icon: ShieldCheck,
        title: "Bảo hành tận nơi",
        description: "Đặc quyền VIP: Kỹ thuật viên sẽ đến tận nhà kiểm tra và bảo hành sản phẩm trong vòng 24h kể từ khi tiếp nhận yêu cầu.",
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
        icon: RefreshCcw,
        title: "Đổi trả 30 ngày",
        description: "Yên tâm mua sắm với chính sách đổi mới sản phẩm trong vòng 30 ngày nếu có lỗi từ nhà sản xuất. Thủ tục nhanh gọn.",
        color: "text-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
        icon: Headphones,
        title: "Hỗ trợ kỹ thuật 24/7",
        description: "Đội ngũ chuyên gia luôn sẵn sàng giải đáp mọi thắc mắc về phần cứng và phần mềm qua Hotline, Chatbot AI hoặc Zalo.",
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
        icon: CreditCard,
        title: "Trả góp 0% lãi suất",
        description: "Hỗ trợ trả góp qua thẻ tín dụng hoặc các công ty tài chính với lãi suất 0%. Xét duyệt hồ sơ online chỉ trong 15 phút.",
        color: "text-red-600",
        bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
        icon: Award,
        title: "Cam kết chính hãng",
        description: "NexCore Electronics cam kết 100% sản phẩm là hàng chính hãng, đầy đủ hóa đơn VAT và giấy tờ nhập khẩu.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4f46e5,transparent_50%)]"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Dịch Vụ <span className="text-primary">Tận Tâm</span>, Trải Nghiệm <span className="text-primary">Xứng Tầm</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
                        Tại NexCore Electronics, chúng tôi không chỉ bán sản phẩm công nghệ, chúng tôi mang đến giải pháp và sự an tâm tuyệt đối cho khách hàng.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="rounded-full px-8">Liên hệ ngay</Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8 border-white hover:text-blue-400 text-white bg-gray-500 hover:bg-gray-600/80">Xem chính sách bảo hành</Button>
                    </div>
                </div>
            </section>

            {/* Main Services Grid */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Đặc quyền dành riêng cho bạn</h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group p-8 rounded-3xl border border-border bg-card hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <service.icon className={`w-7 h-7 ${service.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* VIP Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center">
                        <div className="p-10 lg:p-20 lg:w-1/2 text-white">
                            <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 border border-yellow-500/30">
                                PREMIUM SERVICE
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Gói Đặc Quyền NexCore VIP</h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Trở thành khách hàng thân thiết của NexCore để nhận ngay những ưu đãi chưa từng có:
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    "Vệ sinh, bảo dưỡng laptop miễn phí trọn đời",
                                    "Ưu tiên xử lý bảo hành trong vòng 4h làm việc",
                                    "Mượn máy thay thế trong thời gian chờ sửa chữa",
                                    "Tặng voucher giảm giá 500k vào ngày sinh nhật"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-10 rounded-full">
                                Đăng ký ngay
                            </Button>
                        </div>
                        <div className="lg:w-1/2 h-full min-h-[400px] relative">
                            <img
                                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=1000"
                                alt="VIP Service"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 lg:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 lg:bg-gradient-to-r lg:from-slate-900 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-20 container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">Hệ thống cửa hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                    <div className="p-6 rounded-2xl border border-border bg-card flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                            <MapPin className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">NexCore Hà Nội</h4>
                            <p className="text-muted-foreground">Số 123, Phố Thái Hà, Quận Đống Đa, Hà Nội</p>
                            <p className="text-primary font-medium mt-2">Hotline: 1900 1234</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl border border-border bg-card flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                            <MapPin className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">NexCore TP. HCM</h4>
                            <p className="text-muted-foreground">Số 456, Đường Cách Mạng Tháng 8, Quận 3, TP. HCM</p>
                            <p className="text-primary font-medium mt-2">Hotline: 1900 5678</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
