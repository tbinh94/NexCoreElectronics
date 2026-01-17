import { Truck, ShieldCheck, Headphones, RefreshCw } from "lucide-react";

export default function ServiceFeatures() {
    const features = [
        {
            icon: Truck,
            title: "Miễn phí vận chuyển",
            description: "Cho đơn hàng trên 500k"
        },
        {
            icon: ShieldCheck,
            title: "Thanh toán bảo mật",
            description: "100% an toàn"
        },
        {
            icon: Headphones,
            title: "Hỗ trợ 24/7",
            description: "Luôn sẵn sàng hỗ trợ"
        },
        {
            icon: RefreshCw,
            title: "Đổi trả dễ dàng",
            description: "Trong vòng 30 ngày"
        }
    ];

    return (
        <div className="w-100 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                        <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
