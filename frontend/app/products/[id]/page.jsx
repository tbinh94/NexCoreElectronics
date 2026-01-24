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
        <Container className="max-w-7xl py-6 space-y-8">
            {/* Breadcrumb */}
            <Breadcrumb>
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
                    <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Product Header */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight text-gray-900 dark:text-white mb-3">
                    {product.name}
                </h1>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-amber-500">
                            <Star className="w-5 h-5 fill-amber-500" />
                            <span className="ml-1 font-bold text-base">{realRating > 0 ? realRating : "Chưa có đánh giá"}</span>
                            <span className="text-gray-400 mx-2">|</span>
                            <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {realReviewCount} Đánh giá
                            </span>
                        </div>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-2">
                                <Heart className="w-4 h-4 mr-1.5" /> Yêu thích
                            </Button>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-2">
                                <BarChart2 className="w-4 h-4 mr-1.5" /> So sánh
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ProductDetailClient product={{ ...product, rating: realRating, reviews: realReviewCount }} />
            <RelatedProducts products={relatedProductsData.products} />
        </Container >
    );
}
