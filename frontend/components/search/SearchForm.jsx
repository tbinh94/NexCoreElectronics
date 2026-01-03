import { Search, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ onSearchSubmit }) {
    const [search, setSearch] = useState("");
    const [history, setHistory] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const savedHistory = localStorage.getItem("searchHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const saveHistory = (term) => {
        if (!term.trim()) return;
        let newHistory = [term, ...history.filter(h => h !== term)];
        newHistory = newHistory.slice(0, 10); // Keep only top 5
        setHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            performSearch(search);
        }
    }

    const performSearch = (term) => {
        saveHistory(term);
        router.push(`/search?search=${encodeURIComponent(term)}`);
        if (onSearchSubmit) {
            onSearchSubmit();
        }
    };

    const removeHistoryItem = (term, e) => {
        e.stopPropagation();
        const newHistory = history.filter(h => h !== term);
        setHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };

    return (
        <div className="w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="pl-10 h-12 text-md w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>

            {history.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Lịch sử tìm kiếm</h3>
                    <ul className="space-y-2">
                        {history.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer group"
                                onClick={() => performSearch(item)}
                            >
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span>{item}</span>
                                </div>
                                <button
                                    onClick={(e) => removeHistoryItem(item, e)}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all"
                                    title="Xóa"
                                >
                                    <X className="w-3 h-3 text-gray-500" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}