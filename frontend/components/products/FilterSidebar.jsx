'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

export default function FilterSidebar({ category, brand, minPrice, maxPrice }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        brand: searchParams.get('brand') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sort: searchParams.get('sort') || '',
        search: searchParams.get('search') || '',
        cpu_type: searchParams.get('cpu_type') || '', // New
        screen_size_label: searchParams.get('screen_size_label') || '', // New
    });

    // Chips Data
    // Screens Data
    const SCREENS = [
        "13 inch", "14 inch", "15.6 inch", "16 inch"
    ];

    useEffect(() => {
        const queryString = Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        router.push(`${pathname}?${queryString}`, { scroll: false });
    }, [filters]);

    const resetFilters = () => {
        setFilters({
            category: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sort: "",
            search: filters.search,
            cpu_type: "",
            screen_size_label: ""
        });
    }

    const handleFilterChange = (key, value) => {
        const finalValue = value === "all" ? "" : value;
        setFilters(prev => ({ ...prev, [key]: finalValue }));
    };

    // Toggle logic: If clicked again, remove filter. If new, set filter. (Allows only single select per group for simplicity as per current backend logic, or we can make it multi-select if backend supports $in, but current req implies single 'is selected' state visually)
    const handleToggle = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key] === value ? "" : value
        }));
    };

    const handlePriceChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }

    return (
        <div className="flex flex-col gap-y-6 bg-white dark:bg-card p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Catalog */}
            <div className="space-y-3">
                <p className="text-base font-bold text-gray-900 dark:text-white">Danh mục</p>
                <Select value={filters.category || "all"} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Tất cả danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">Tất cả</SelectItem>
                            {category?.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            {/* Brand */}
            <div className="space-y-3">
                <p className="text-base font-bold text-gray-900 dark:text-white">Thương hiệu</p>
                <Select value={filters.brand || "all"} onValueChange={(value) => handleFilterChange('brand', value)}>
                    <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Tất cả thương hiệu" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">Tất cả</SelectItem>
                            {brand?.map((b) => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-3">
                <p className="text-base font-bold text-gray-900 dark:text-white">Khoảng giá</p>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Min"
                        type="number"
                        min="0"
                        value={filters.minPrice}
                        onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                        placeholder="Max"
                        type="number"
                        min="0"
                        value={filters.maxPrice}
                        onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    />
                </div>
            </div>

            {/* Screen Size - Toggle Buttons */}
            <div className="space-y-3">
                <p className="text-base font-bold text-gray-900 dark:text-white">Màn hình</p>
                <div className="grid grid-cols-2 gap-2">
                    {SCREENS.map((screen) => {
                        const isSelected = filters.screen_size_label === screen;
                        return (
                            <button
                                key={screen}
                                onClick={() => handleToggle('screen_size_label', screen)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 text-center
                                    ${isSelected
                                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
                                    }
                                `}
                            >
                                {screen}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Separator />

            <div className="pt-2">
                <Button
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 font-semibold"
                    onClick={() => resetFilters()}
                >
                    Xóa tất cả bộ lọc
                </Button>
            </div>
        </div>
    )
}
