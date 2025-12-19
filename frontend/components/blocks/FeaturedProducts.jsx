import { fetchProducts } from "@/lib/api";
import ProductList from "@/components/products/ProductList";

export default async function FeaturedProducts({ limit }) {
    const { products } = await fetchProducts({ limit });

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Sản phẩm nổi bật
                </h2>
            </div>
            <ProductList products={products} />
        </section>
    );
}
