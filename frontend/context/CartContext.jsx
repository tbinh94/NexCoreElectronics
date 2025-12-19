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

    const addToCart = async (productId) => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, userId: user._id, }),
            });
            if (!res.ok) throw new Error("Failed to add to cart");
            await fetchCart();
        }
        catch (error) {
            console.error("Error adding to cart:", error);
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
