'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
const sortOptions = [
    { label: "Mặc định", value: "" },
    { label: "Giá: Thấp → Cao", value: "price_asc" },
    { label: "Giá: Cao → Thấp", value: "price_desc" },
    { label: "Mới nhất", value: "newest" },
];

export default function SortBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentSort = searchParams.get("sort") || "";

    const handleSortClick = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set("sort", value);
        else params.delete("sort");
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex gap-2 flex-wrap">
            {sortOptions.map(({ label, value }) => (
                <Button
                    key={value}
                    onClick={() => handleSortClick(value)}
                    className={`
            px-3 py-1.5 text-sm rounded-none cursor-pointer transition bg-transparent hover:bg-transparent
            ${currentSort === value
                            ? "text-blue-700"
                            : "text-gray-700"}
          `}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
}
