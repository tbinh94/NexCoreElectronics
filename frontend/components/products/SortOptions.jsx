'use client';

import { useRouter, useSearchParams } from "next/navigation";
import SortBar from "./SortBar";
export default function SortOptions() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSortClick = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }
        router.push(`?${params.toString()}`);
    };


    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sắp xếp theo:</span>
            <SortBar />
        </div>
    )
}
