import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
    Star, Heart, BarChart2
} from "lucide-react";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import RelatedProducts from "@/components/products/RelatedProducts";
import { fetchProductById, fetchProducts, fetchReviews } from "@/lib/api";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = await fetchProductById(id);
    const reviews = await fetchReviews(id);

    if (!product) {
        notFound();
    }

    // Calculate real stats
    const realReviewCount = reviews.length;
    const realRating = realReviewCount > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / realReviewCount).toFixed(1)
        : 0;

    const relatedProductsData = await fetchProducts({
        category: product.category,
        exclude: product._id,
        limit: 4
    });

    return (
        <Container className="max-w-7xl py-4 sm:py-6 space-y-6 sm:space-y-8 px-4 sm:px-6">
            {/* Breadcrumb */}
            <div className="overflow-x-auto pb-2 scrollbar-none">
                <Breadcrumb className="whitespace-nowrap">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/products?category=${product.category}`}>{product.category}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage className="max-w-[200px] truncate">{product.name}</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <ProductDetailClient product={{ ...product, rating: realRating, reviews: realReviewCount }} />
            <RelatedProducts products={relatedProductsData.products} />
        </Container >
    );
}
