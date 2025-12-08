// page.tsx
import FeaturedProducts from "@/components/blocks/FeaturedProducts";
import Container from "@/components/ui/container";
import HeroBanner from "@/components/blocks/HeroBanner"
import BrandSidebar from "@/components/blocks/BrandSidebar"
import { fetchFilters } from "@/lib/api";

export default async function Home() {
  const filters = await fetchFilters();
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Container className="py-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-stretch mb-4">
          {/* Brand Sidebar - Fixed width on desktop */}
          <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
            <BrandSidebar brand={filters.brands} />
          </div>

          {/* Hero Banner - Takes remaining space */}
          <div className="flex-1 lg:min-w-0 lg:flex">
            <HeroBanner />
          </div>
        </div>

        {/* Featured Products */}
        <FeaturedProducts limit={12} />
      </Container>
    </div>
  );
}