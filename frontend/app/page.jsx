import FeaturedProducts from "@/components/blocks/FeaturedProducts";
import Container from "@/components/ui/container";
import HeroBanner from "@/components/blocks/HeroBanner";
import ServiceFeatures from "@/components/blocks/ServiceFeatures";
import CategoryGrid from "@/components/blocks/CategoryGrid";
import BrandGrid from "@/components/blocks/BrandGrid";
import PromotionBanner from "@/components/blocks/PromotionBanner";
import Testimonials from "@/components/blocks/Testimonials";
import { fetchFilters } from "@/lib/api";

export default async function Home() {
    const filters = await fetchFilters();
    return (
        <div className="flex min-h-screen flex-col pb-10">
            <Container className="pt-6 space-y-16 md:space-y-24">
                {/* 1. Banner */}
                <HeroBanner />

                {/* 2. Danh mục */}
                <CategoryGrid categories={filters.categories} />

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
