'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube, Twitter, ShieldCheck, Lock, CreditCard, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data.slice(0, 5)); // Limit to 5
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <footer className="border-t bg-gray-50 dark:bg-gray-950 dark:border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {/* Brand & Contact */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">NextGenShop</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Trải nghiệm mua sắm công nghệ đỉnh cao với những sản phẩm mới nhất, chính hãng và giá tốt nhất thị trường.
                        </p>
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <span>123 Đường Công Nghệ, Q.1, TP.HCM</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <span>1900 123 456</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <span>support@nextgenshop.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Về chúng tôi
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">Giới thiệu</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Liên hệ</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Điều khoản dịch vụ</Link></li>
                            <li><Link href="/faq" className="hover:text-blue-600 transition-colors">Câu hỏi thường gặp (FAQ)</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Danh mục nổi bật
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            {categories.map((cat) => (
                                <li key={cat._id}>
                                    <Link href={`/products?category=${cat.name}`} className="hover:text-blue-600 transition-colors">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                            <li><Link href="/products" className="hover:text-blue-600 transition-colors font-medium">Xem tất cả &rarr;</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Kết nối với chúng tôi
                        </h4>
                        <div className="flex gap-4 mb-8">
                            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-sm hover:bg-blue-600 hover:text-white transition-all duration-300 text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-800">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-sm hover:bg-pink-600 hover:text-white transition-all duration-300 text-pink-600 dark:text-pink-400 border border-gray-100 dark:border-gray-800">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-sm hover:bg-red-600 hover:text-white transition-all duration-300 text-red-600 dark:text-red-400 border border-gray-100 dark:border-gray-800">
                                <Youtube className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-sm hover:bg-sky-500 hover:text-white transition-all duration-300 text-sky-500 dark:text-sky-400 border border-gray-100 dark:border-gray-800">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>

                        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Đăng ký nhận tin
                        </h4>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 transition-all"
                            />
                            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
                            © {new Date().getFullYear()} NextGenShop. All rights reserved.
                        </div>

                        {/* Security Badges */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400" title="Bảo mật SSL">
                                <Lock className="h-5 w-5" />
                                <span className="text-xs font-medium">SSL Secured</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400" title="Thanh toán an toàn">
                                <CreditCard className="h-5 w-5" />
                                <span className="text-xs font-medium">Safe Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400" title="Đảm bảo chất lượng">
                                <ShieldCheck className="h-5 w-5" />
                                <span className="text-xs font-medium">100% Authentic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
