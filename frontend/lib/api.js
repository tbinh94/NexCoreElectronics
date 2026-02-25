const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api`;
//console.log('API_URL configured as:', API_URL);

export async function fetchFilters() {
    try {
        const res = await fetch(`${API_URL}/products/filters`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error('Failed to fetch filters');
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching filters from ${API_URL}/products/filters:`, error);
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
        if (params.exclude) searchParams.set('exclude', params.exclude);
        if (params.cpu_type) searchParams.set('cpu_type', params.cpu_type);
        if (params.screen_size_label) searchParams.set('screen_size_label', params.screen_size_label);
        if (params.promotion) searchParams.set('promotion', params.promotion);

        const res = await fetch(`${API_URL}/products?${searchParams.toString()}`, {
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching products from ${API_URL}/products:`, error);
        return { products: [], pagination: {} };
    }
}

export async function fetchProductById(id) {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching product ${id} from ${API_URL}/products/${id}:`, error);
        return null;
    }
}

export async function fetchReviews(productId) {
    try {
        const res = await fetch(`${API_URL}/reviews/${productId}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return [];
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching reviews for ${productId}:`, error);
        return [];
    }
}

// Wishlist API
export async function getWishlist(token) {
    const res = await fetch(`${API_URL}/users/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
}

export async function addToWishlist(productId, token) {
    const res = await fetch(`${API_URL}/users/wishlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
    });
    return res.json();
}

export async function removeFromWishlist(productId, token) {
    const res = await fetch(`${API_URL}/users/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}
