import { fetchProducts } from "@/lib/api";
import RelatedProducts from "./RelatedProducts";

/**
 * RelatedProductsWrapper is a Server Component that fetches 
 * related products based on category and renders the RelatedProducts component.
 * This allows us to wrap it in Suspense for better performance.
 */
export default async function RelatedProductsWrapper({ category, excludeId }) {
    const data = await fetchProducts({
        category: category,
        exclude: excludeId,
        limit: 4
    });

    return <RelatedProducts products={data.products} />;
}
