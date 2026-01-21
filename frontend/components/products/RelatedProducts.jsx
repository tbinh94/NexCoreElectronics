import ProductList from "./ProductList";

export default function RelatedProducts({ products }) {
    if (!products || products.length === 0) return null;

    return (
        <div className="space-y-6 pt-10 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold">Sản phẩm liên quan</h3>
            <ProductList products={products} />
        </div>
    );
}
