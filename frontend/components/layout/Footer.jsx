'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <footer className="border-t bg-gray-50 dark:bg-gray-950 dark:border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">NextGenShop</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Trải nghiệm mua sắm công nghệ đỉnh cao với những sản phẩm mới nhất.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                            Mua sắm
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/products" className="hover:text-blue-600">Tất cả sản phẩm</Link></li>
                            {categories.map((cat) => (
                                <li key={cat._id}>
                                    <Link href={`/products?category=${cat.name}`} className="hover:text-blue-600">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                            Hỗ trợ
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/faq" className="hover:text-blue-600">Câu hỏi thường gặp</Link></li>
                            <li><Link href="/shipping" className="hover:text-blue-600">Vận chuyển</Link></li>
                            <li><Link href="/returns" className="hover:text-blue-600">Đổi trả</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                            Đăng ký nhận tin
                        </h4>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                            />
                            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-800">
                    © {new Date().getFullYear()} NextGenShop. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
