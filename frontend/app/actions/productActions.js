'use server';

import { fetchProducts } from "@/lib/api";

export async function loadMoreProducts(params) {
    try {
        const data = await fetchProducts(params);
        return data; // returns { products: [], pagination: {} }
    } catch (error) {
        console.error("Error loading more products:", error);
        return { products: [], pagination: {} };
    }
}
