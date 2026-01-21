"use client";

import { useState, useEffect } from "react";
import ProductList from "@/components/products/ProductList";
import { PaginationControl } from "@/components/ui/usePagination";
import { Button } from "@/components/ui/button";
import { loadMoreProducts } from "@/app/actions/productActions";
import { Loader2 } from "lucide-react";

export default function HybridPaginationProductList({ initialProducts, initialPagination, searchParams }) {
    const [products, setProducts] = useState(initialProducts);
    const [pagination, setPagination] = useState(initialPagination);
    const [loading, setLoading] = useState(false);

    // Reset products when searchParams change (handled by parent re-rendering, but good updates here if key changes)
    // Actually, since this component is re-mounted or re-rendered with new props when URL changes, 
    // we should sync state if initialProducts changes differently from our current state (e.g. filter change).
    useEffect(() => {
        setProducts(initialProducts);
        setPagination(initialPagination);
    }, [initialProducts, initialPagination]);

    const handleLoadMore = async () => {
        if (loading || pagination.page >= pagination.totalPages) return;

        setLoading(true);
        try {
            const nextPage = pagination.page + 1;
            const currentParams = {
                ...searchParams,
                page: nextPage
            };

            const data = await loadMoreProducts(currentParams);

            if (data.products && data.products.length > 0) {
                setProducts(prev => [...prev, ...data.products]);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error("Failed to load more products", error);
        } finally {
            setLoading(false);
        }
    };

    const generatePageUrl = (pageNumber) => {
        const params = new URLSearchParams();
        if (searchParams.category) params.set('category', searchParams.category);
        if (searchParams.brand) params.set('brand', searchParams.brand);
        if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
        if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
        if (searchParams.sort) params.set('sort', searchParams.sort);
        params.set('page', pageNumber.toString());
        return `/products?${params.toString()}`;
    };

    return (
        <div className="space-y-8">
            <ProductList products={products} />

            {/* Desktop: Pagination */}
            <div className="hidden md:block">
                <PaginationControl
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    createPageUrl={generatePageUrl}
                />
            </div>

            {/* Mobile: Load More */}
            <div className="md:hidden flex justify-center pb-8">
                {pagination.page < pagination.totalPages ? (
                    <Button
                        onClick={handleLoadMore}
                        disabled={loading}
                        variant="outline"
                        className="w-full max-w-xs"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang tải thêm...
                            </>
                        ) : (
                            "Xem thêm sản phẩm"
                        )}
                    </Button>
                ) : products.length > 0 && (
                    <p className="text-gray-500 text-sm">Đã hiển thị tất cả sản phẩm</p>
                )}
            </div>
        </div>
    );
}
