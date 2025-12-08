import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductDescription from "@/components/products/ProductDescription";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const productData = await fetch(`http://localhost:5000/api/products/${id}`, { cache: 'no-store' });

    if (!productData.ok) {
        notFound();
    }

    const product = await productData.json();

    const formattedPrice = formatPrice(product.price);

    const isInStock = product.countInStock > 0;

    return (
        <Container className="max-w-7xl py-10">
            <div className="mb-8 px-4 sm:px-0">
                <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight text-gray-900">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                    <p className="text-lg text-gray-600 max-w-2xl">{product.description}</p>
                    {product.is_new_product && (
                        <span className="font-bold text-sm bg-red-600 text-white px-3 py-1 rounded-full shadow-md uppercase">
                            Mới
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-0">
                {/* Left Column: Image Gallery */}
                <div className="rounded-xl overflow-hidden shadow-2xl bg-white p-4">
                    <ProductImageGallery
                        mainImage={product.image}
                        productName={product.name}
                    />
                </div>

                {/* Right Column: Product Details */}
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <Button
                            variant="ghost"
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 p-0 h-auto"
                        >
                            {product.category}
                        </Button>
                        <div className="flex items-center mt-2 space-x-2 text-gray-700">
                            <div className="flex items-center text-amber-500">
                                <Star className="w-5 h-5 fill-amber-500" />
                                <span className="ml-1 font-bold text-base">{product.rating}</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <p className="text-sm">({product.reviews} Đánh giá)</p>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="space-y-2">
                        <p className="text-3xl font-bold text-gray-900">
                            {formattedPrice}
                        </p>
                        <p className={`text-base font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                            Tình trạng: {isInStock ? 'Còn hàng' : 'Hết hàng'} ({product.countInStock} sản phẩm)
                        </p>
                    </div>

                    {/* Add To Cart Section */}
                    <div className="pt-6 border-t border-gray-200">
                        <p className="text-lg font-semibold mb-3">Tùy chọn mua hàng:</p>
                        <div className="flex flex-col gap-4">
                            <AddToCartButton productId={product._id} />
                        </div>
                    </div>
                </div>
            </div>

            <ProductDescription product={product} />
        </Container>
    );
}