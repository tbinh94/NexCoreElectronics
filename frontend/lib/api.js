export async function fetchProducts(filters = {}) {
    const url = "http://localhost:5000/api/products";
    const params = new URLSearchParams();
    if (filters.limit) params.set("limit", filters.limit.toString());
    if (filters.page) params.set("page", filters.page.toString());
    if (filters.category) params.set("category", filters.category.toString());
    if (filters.brand) params.set("brand", filters.brand.toString());
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.sort) params.set("sort", filters.sort.toString());

    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
}

export async function fetchFilters() {
    const url = "http://localhost:5000/api/products/filters";
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error("Failed to fetch filters");
    }
    return response.json();
}
