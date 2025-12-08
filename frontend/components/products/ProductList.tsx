import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from "@/lib/utils";
import useCart from "@/hooks/useCart";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
                <p className="text-gray-400 text-sm mt-2">Vui lòng thử lại với bộ lọc khác.</p>
            </div>
        )
    }
    return (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <div
                    className='group flex bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl flex-col gap-y-4 h-full overflow-hidden border border-gray-100'
                    key={product._id}
                >
                    <div className='p-4 flex-1 flex flex-col'>
                        {/* Phần Ảnh Sản Phẩm */}
                        <Link href={`/products/${product._id}`} className="aspect-[4/3] w-full relative overflow-hidden rounded-lg bg-gray-100 mb-4 block">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </Link>

                        {/* Phần Thông Tin */}
                        <div className="flex-1">
                            <Link href={`/products/${product._id}`}>
                                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                    {product.name}
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                {product.description}
                            </p>
                        </div>

                        {/* Phần Giá & Nút Mua */}
                        <div className='flex justify-between items-center pt-4 border-t border-gray-100 mt-auto'>
                            <p className="text-lg font-bold text-gray-900">
                                {formatPrice(product.price)}
                            </p>
                            <AddToCartButton productId={product._id} />
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}
