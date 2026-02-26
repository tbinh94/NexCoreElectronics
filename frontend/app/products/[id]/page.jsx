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
import { Suspense } from "react";
import RelatedProductsWrapper from "@/components/products/RelatedProductsWrapper";


export default async function ProductPage({ params }) {
    const { id } = await params;
    const [product, reviews] = await Promise.all([
        fetchProductById(id),
        fetchReviews(id)
    ]);
    if (!product) {
        notFound();
    }


    // Calculate real stats
    const realReviewCount = reviews.length;
    const realRating = realReviewCount > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / realReviewCount).toFixed(1)
        : 0;



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

            <ProductDetailClient
                product={{ ...product, rating: realRating, reviews: realReviewCount }}
                initialReviews={reviews}
            />


            <Suspense fallback={
                <div className="space-y-4">
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-xl" />
                        ))}
                    </div>
                </div>
            }>
                <RelatedProductsWrapper category={product.category} excludeId={id} />
            </Suspense>

        </Container >
    );
}
