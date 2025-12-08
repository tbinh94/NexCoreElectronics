'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

interface FilterSidebarProps {
    category?: string[];
    brand?: string[];
    minPrice?: Number;
    maxPrice?: Number;
}

export default function FilterSidebar({ category, brand, minPrice, maxPrice }: FilterSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        brand: searchParams.get('brand') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sort: searchParams.get('sort') || '',
    });

    useEffect(() => {
        const queryString = Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        router.push(`${pathname}?${queryString}`, { scroll: false });
    }, [filters]);

    const resetFilters = () => {
        setFilters({
            category: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sort: ""
        })
    }
    const handleFilterChange = (key: string, value: string) => {
        const finalValue = value === "all" ? "" : value;

        setFilters(prev => ({
            ...prev,
            [key]: finalValue
        }));
    };

    const handlePriceChange = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <div className="flex flex-col gap-y-4 bg-white focus:ring-2 focus:ring-black p-4 rounded-lg shadow-md">
            <div className="space-y-2">
                <p className="text-sm font-semibold">Danh mục</p>
                <Select value={filters.category || "all"} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">Tất cả</SelectItem>
                            {category?.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator />
            <div className="space-y-2">
                <p className="text-sm font-semibold">Thương hiệu</p>
                <Select value={filters.brand || "all"} onValueChange={(value) => handleFilterChange('brand', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Thương hiệu" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">Tất cả</SelectItem>
                            {brand?.map((brand) => (
                                <SelectItem key={brand} value={brand}>
                                    {brand}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
                <p className="text-sm font-semibold">Khoảng giá</p>
                <Input placeholder="Giá tối thiểu" type="number" min="0" value={filters.minPrice} onChange={(e) => handlePriceChange('minPrice', e.target.value)} />
                <Separator />
                <Input placeholder="Giá tối đa" type="number" min="0" value={filters.maxPrice} onChange={(e) => handlePriceChange('maxPrice', e.target.value)} />
            </div>
            <Separator />
            <div className="flex justify-end">
                <Button className="bg-gray-300 hover:bg-gray-600 hover:text-white" variant="outline" onClick={() => resetFilters()}>Reset</Button>
            </div>
        </div>
    )
}