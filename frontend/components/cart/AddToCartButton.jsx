'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner"
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function AddToCartButton({ productId, className, children, showIcon = true }) {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleAddToCart = async (e) => {
        if (!user) {
            toast.warning("Bạn cần đăng nhập để thêm vào giỏ hàng");
            return;
        }
        e.preventDefault();
        setLoading(true);
        try {
            await addToCart(productId);
            toast.success("Thêm vào giỏ hàng thành công");
        }
        catch (error) {
            toast.error("Thêm vào giỏ hàng thất bại");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Button
            size="sm"
            className={`bg-black text-white hover:bg-gray-800 transition-colors h-10 rounded-lg px-4 shrink-0 ${className || ""}`}
            title="Thêm vào giỏ"
            onClick={handleAddToCart}
            disabled={loading}
        >
            {children ? children : (
                <>
                    {showIcon && <ShoppingCart className="h-5 w-5 mr-2" />}
                    <span className="font-medium">Thêm vào giỏ</span>
                </>
            )}
        </Button>
    );
}

