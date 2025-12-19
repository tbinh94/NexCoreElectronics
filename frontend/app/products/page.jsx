import FilterSidebar from "@/components/products/FilterSidebar";
import ProductList from "@/components/products/ProductList";
import SortOptions from "@/components/products/SortOptions";
import { PaginationControl } from "@/components/ui/usePagination";
import { fetchProducts, fetchFilters } from "@/lib/api";

export default async function ProductsPage({
    searchParams,
}) {
    const resolvedParams = await searchParams;

    const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
    const brand = typeof resolvedParams.brand === 'string' ? resolvedParams.brand : undefined;
    const minPrice = typeof resolvedParams.minPrice === 'string' ? resolvedParams.minPrice : undefined;
    const maxPrice = typeof resolvedParams.maxPrice === 'string' ? resolvedParams.maxPrice : undefined;
    const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;

    const data = await fetchProducts({
        page,
        category,
        brand,
        minPrice,
        maxPrice,
        sort
    });

    const products = data.products || [];
    const pagination = data.pagination || { page: 1, totalPages: 1 };

    const { categories, brands } = await fetchFilters();

    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (brand) params.set('brand', brand);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        if (sort) params.set('sort', sort);
        params.set('page', pageNumber.toString());
        return `/products?${params.toString()}`;
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                    Tất cả sản phẩm
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <FilterSidebar category={categories} brand={brands} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500 font-medium">Hiển thị {products.length} sản phẩm</p>
                            <SortOptions />
                        </div>
                        <ProductList products={products} />

                        <div className="mt-8">
                            <PaginationControl
                                currentPage={pagination.page}
                                totalPages={pagination.totalPages}
                                createPageUrl={createPageUrl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
