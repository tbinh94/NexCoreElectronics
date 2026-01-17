'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner"
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function AddToCartButton({ productId }) {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    // console.log("Adding to cart:", { productId, user });
    const handleAddToCart = async (e) => {
        if (!user) {
            toast.warning("Bạn cần đăng nhập để thêm vào giỏ hàng");
            return;
        }
        e.preventDefault();
        try {
            await addToCart(productId); // must use _id
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
            className="bg-black text-white hover:bg-gray-800 transition-colors h-10 w-10 rounded-full p-0 md:w-auto md:px-4 md:rounded-lg shrink-0"
            title="Thêm vào giỏ"
            onClick={handleAddToCart}
            disabled={loading}
        >
            <ShoppingCart className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline font-medium">Thêm vào giỏ</span>
        </Button>
    );

}
