'use client';
import { useState } from "react";

export default function useCart() {
    const [loading, setLoading] = useState(false);

    const addToCart = async (productId, userId) => {
        setLoading(true);
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, userId }),
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    return { addToCart, loading }
}
