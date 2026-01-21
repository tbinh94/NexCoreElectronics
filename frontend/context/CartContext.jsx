'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchCart = async () => {
        if (!user) {
            setCartCount(0);
            return;
        }
        try {
            const res = await fetch(`/api/cart/${user._id}`);
            if (!res.ok) throw new Error("Failed to fetch cart");
            const data = await res.json();
            const count = data.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;
            setCartCount(count);
        }
        catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
    useEffect(() => {
        fetchCart();
    }, [user]);

    const addToCart = async (productId, type = 'new') => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, userId: user._id, type }),
            });
            if (!res.ok) {
                let errorMessage = "Failed to add to cart";
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    // If response is not JSON, read as text
                    const errorText = await res.text();
                    console.error("Non-JSON error response:", res.status, errorText);
                    errorMessage = `Server Error (${res.status}): ${errorText}`;
                }
                throw new Error(errorMessage);
            }
            await fetchCart();
        }
        catch (error) {
            console.error("Error adding to cart:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart, loading }}>
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
