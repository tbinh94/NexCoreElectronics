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
            addToCart(productId); // must use _id
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
            className="bg-black text-white hover:bg-gray-800 transition-colors md:rounded-full w-24 md:w-10 h-10 p-0 flex items-center justify-center shrink-0"
            title="Thêm vào giỏ"
            onClick={handleAddToCart}
            disabled={loading}
        >
            <div className="flex flex-col">
                <p className='flex md:hidden'>Thêm vào giỏ</p>
                <p className='hidden md:flex'><ShoppingCart className="h-8 w-8" /></p>
            </div>
        </Button>
    );

}
