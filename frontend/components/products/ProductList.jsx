import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { MEGA_MENU_DATA } from "@/data/menuData";

export default function ProductList({ products }) {
    // Calculate Brand of the Week
    const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const brandIndex = currentWeek % MEGA_MENU_DATA.brands.length;
    const brandOfTheWeek = MEGA_MENU_DATA.brands[brandIndex];

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16 bg-white dark:bg-card rounded-lg shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Vui lòng thử lại với bộ lọc khác.</p>
            </div>
        )
    }
    return (
        <div className="w-full grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
                const isBrandOfTheWeek = product.brand === brandOfTheWeek.value;

                return (
                    <div
                        className='group flex bg-white dark:bg-card shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl flex-col gap-y-4 h-full overflow-hidden border border-gray-100 dark:border-border'
                        key={product._id}
                    >
                        <div className='p-3 md:p-4 flex-1 flex flex-col'>
                            {/* Phần Ảnh Sản Phẩm */}
                            <Link href={`/products/${product.slug || product._id}`} className="aspect-4/3 w-full relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 block">
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
                                <Link href={`/products/${product.slug || product._id}`}>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                                        {product.name}
                                    </h2>
                                </Link>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                                    {product.description}
                                </p>
                            </div>

                            {/* Phần Giá & Nút Mua */}
                            <div className='flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto gap-4'>
                                <div className="flex flex-col">
                                    {isBrandOfTheWeek ? (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm md:text-lg font-bold text-red-600 dark:text-red-400">
                                                    {formatPrice(product.price * 0.7)}
                                                </p>
                                                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                    -30%
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 line-through">
                                                {formatPrice(product.price)}
                                            </p>
                                        </>
                                    ) : product.originalPrice && product.originalPrice > product.price ? (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm md:text-lg font-bold text-red-600 dark:text-red-400">
                                                    {formatPrice(product.price)}
                                                </p>
                                                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 line-through">
                                                {formatPrice(product.originalPrice)}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                            {formatPrice(product.price)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    );
}
