import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function OrderDetail({ products }) {
    return (
        <div className="gap-y-4">
            {products.map((item) => {
                const productInfo = item.productId;
                if (!productInfo) return null;
                return (
                    <div key={item._id} className="flex items-center mb-4 gap-4">
                        <div className="w-20 aspect-[4/3] relative rounded overflow-hidden">

                            <Image src={productInfo.image} alt={productInfo.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 flex-col">
                            <p className="font-medium">{productInfo.name}</p>
                            <p className="text-sm text-gray-500">{item.quantity} x {formatPrice(productInfo.price)}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">{formatPrice(productInfo.price * item.quantity)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}