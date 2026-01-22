import { CheckCircle2, Info } from "lucide-react";

export default function ProductDescription({ product }) {
    return (
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                        Chi tiết sản phẩm
                    </h2>
                </div>

                <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    {product.detailedDescription ? (
                        <div dangerouslySetInnerHTML={{ __html: product.detailedDescription }} />
                    ) : (
                        <p>Đang cập nhật thông tin chi tiết...</p>
                    )}
                </div>
            </div>

            {/* Highlights / Specs Column (1/3 width) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        <Info className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Đặc điểm nổi bật
                    </h3>

                    {product.highlights && product.highlights.length > 0 ? (
                        <ul className="space-y-4">
                            {product.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle2 className="mr-3 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">Chưa có thông tin nổi bật.</p>
                    )}

                    {/* Technical Specs Summary */}
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Thông số kỹ thuật</h4>
                        <dl className="space-y-3">
                            {product.specs && typeof product.specs === 'object' && !Array.isArray(product.specs) ? (
                                Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-200 capitalize">{key}</dt>
                                        <dd className="text-sm text-gray-600 dark:text-gray-400 text-right">{value}</dd>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">Thông số kỹ thuật đang cập nhật.</p>
                            )}
                        </dl>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 mt-6">
                            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                                <dt className="font-medium text-gray-900 dark:text-white text-sm">Thương hiệu</dt>
                                <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category}</dd>
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                                <dt className="font-medium text-gray-900 dark:text-white text-sm">Đánh giá</dt>
                                <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.rating} / 5 ({product.reviews} reviews)</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
