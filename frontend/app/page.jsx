import FeaturedProducts from "@/components/blocks/FeaturedProducts";
import Container from "@/components/ui/container";
import HeroBanner from "@/components/blocks/HeroBanner";
import ServiceFeatures from "@/components/blocks/ServiceFeatures";
import CategoryGrid from "@/components/blocks/CategoryGrid";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandGrid from "@/components/blocks/BrandGrid";
import Link from "next/link";
import PromotionBanner from "@/components/blocks/PromotionBanner";
import Testimonials from "@/components/blocks/Testimonials";
import { fetchFilters } from "@/lib/api";

export default async function Home() {
    const filters = await fetchFilters();
    return (
        <div className="flex min-h-screen flex-col pb-10">
            <Container className="pt-6 space-y-16 md:space-y-24">
                {/* Mobile Quick Trade-in Banner */}
                <div className="md:hidden">
                    <Link href="/trade-in">
                        <div className="bg-linear-to-r from-green-600 to-emerald-500 rounded-xl p-4 flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top duration-500">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                                    <RotateCcw className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Thu Cũ Đổi Mới</h3>
                                    <p className="text-white/80 text-[10px]">Trợ giá lên đến 2 triệu đồng</p>
                                </div>
                            </div>
                            <Button size="sm" variant="secondary" className="h-8 px-3 text-[10px] font-bold">
                                Thử ngay
                            </Button>
                        </div>
                    </Link>
                </div>

                {/* 1. Banner */}
                <HeroBanner />

                {/* 2. Danh mục */}
                <CategoryGrid categories={[
                    "Gaming",
                    "Macbook",
                    "Học tập – Văn phòng",
                    "Thiết kế – Đồ họa",
                    "Mỏng nhẹ – Di động",
                    "Doanh nghiệp – Doanh nhân"
                ]} />

                {/* 3. Sản phẩm nổi bật / bán chạy */}
                <FeaturedProducts limit={8} />

                {/* 4. Khuyến mãi */}
                <PromotionBanner />

                {/* 5. Lý do chọn shop */}
                <ServiceFeatures />

                {/* 6. Review */}
                <Testimonials />

                {/* Extra: Brands (Keep it as it's good for credibility) */}
                <BrandGrid brands={filters.brands} />
            </Container>
        </div>
    );
}
