"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchWithSuggestions() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length >= 2) {
                fetchSuggestions(query);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSuggestions = async (searchTerm) => {
        setLoading(true);
        try {
            // Fetch top 5 matching products
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?search=${encodeURIComponent(searchTerm)}&limit=5`);
            if (res.ok) {
                const data = await res.json();
                setSuggestions(data.products || []);
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error("Failed to fetch suggestions", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl z-50">
            <form onSubmit={handleSearch} className="relative w-full flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (suggestions.length > 0) setShowSuggestions(true);
                    }}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full h-10 pl-4 pr-12 rounded-l-md border-none focus:ring-2 focus:ring-primary/50 text-black bg-white outline-none shadow-sm"
                />

                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}

                <Button
                    type="submit"
                    className="h-10 rounded-l-none rounded-r-md bg-white/10 hover:bg-white/20 border-l border-gray-200 text-white px-6 cursor-pointer"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                </Button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 text-xs font-semibold text-gray-500 bg-gray-50/50">
                        Gợi ý sản phẩm
                    </div>
                    <ul>
                        {suggestions.map((product) => (
                            <li key={product._id} className="border-b border-gray-50 last:border-none">
                                <Link
                                    href={`/products/${product._id}`}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                                    onClick={() => setShowSuggestions(false)}
                                >
                                    <div className="relative h-10 w-10 shrink-0 rounded-md overflow-hidden border border-gray-100 bg-white">
                                        <Image
                                            src={product.image || "https://placehold.co/100x100?text=No+Image"}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {product.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs font-bold text-red-600">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-[10px] text-gray-400 line-through">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="p-3 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm text-primary font-medium transition-colors"
                        onClick={handleSearch}
                    >
                        Xem tất cả kết quả cho "{query}"
                    </div>
                </div>
            )}
        </div>
    );
}
