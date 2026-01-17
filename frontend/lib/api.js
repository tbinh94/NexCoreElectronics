const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api`;

export async function fetchFilters() {
    try {
        const res = await fetch(`${API_URL}/products/filters`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch filters');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching filters:', error);
        return { brands: [], categories: [] };
    }
}

export async function fetchProducts(params = {}) {
    try {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.set('page', params.page);
        if (params.limit) searchParams.set('limit', params.limit);
        if (params.category) searchParams.set('category', params.category);
        if (params.brand) searchParams.set('brand', params.brand);
        if (params.minPrice) searchParams.set('minPrice', params.minPrice);
        if (params.maxPrice) searchParams.set('maxPrice', params.maxPrice);
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.search) searchParams.set('search', params.search);

        const res = await fetch(`${API_URL}/products?${searchParams.toString()}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [], pagination: {} };
    }
}
