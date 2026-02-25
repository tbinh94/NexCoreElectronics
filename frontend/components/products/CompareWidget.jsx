'use client';
import { useCompare } from "@/context/CompareContext";
import { Button } from "@/components/ui/button";
import { X, BarChart2, Check, ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

export default function CompareWidget() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();
    const [isOpen, setIsOpen] = useState(false);
    const [showNeeds, setShowNeeds] = useState(false);

    if (compareList.length === 0) return null;

    const needs = [
        { id: 'office', label: 'Văn phòng', icon: '💼', desc: 'Ưu tiên pin, mỏng nhẹ, bàn phím tốt' },
        { id: 'graphics', label: 'Đồ họa', icon: '🎨', desc: 'Ưu tiên màn hình đẹp, GPU mạnh' },
        { id: 'gaming', label: 'Chơi game', icon: '🎮', desc: 'Ưu tiên tản nhiệt, FPS, CPU/GPU' },
    ];

    const handleAIConsult = (needLabel) => {
        if (compareList.length < 2) return;

        const p1 = compareList[0];
        const p2 = compareList[1];
        const need = needLabel || 'nhu cầu chung';

        const prompt = `Tôi đang phân vân giữa 2 sản phẩm cho nhu cầu **${need}**:
1. ${p1.name} (Giá: ${p1.price?.toLocaleString('vi-VN')}đ)
   - Cấu hình: ${JSON.stringify(p1.specs)}
2. ${p2.name} (Giá: ${p2.price?.toLocaleString('vi-VN')}đ)
   - Cấu hình: ${JSON.stringify(p2.specs)}

Hãy phân tích ưu nhược điểm của từng máy dựa trên nhu cầu **${need}** và tư vấn cho tôi nên chọn máy nào.`;

        window.dispatchEvent(new CustomEvent('chat-open', {
            detail: { message: prompt, open: true }
        }));

        setShowNeeds(false);
    };

    const allSpecKeys = Array.from(new Set(
        compareList.flatMap(p => Object.keys(p.specs || {}))
    ));

    return (
        <>
            {/* Floating Bubble */}
            <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl shadow-2xl p-4 w-72 sm:w-80 overflow-hidden ring-1 ring-black/5">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-sm">So sánh ({compareList.length}/2)</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            {compareList.length === 2 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                                    onClick={() => setShowNeeds(true)}
                                    title="Tư vấn so sánh bằng AI"
                                >
                                    <Sparkles className="w-4 h-4" />
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-red-500" onClick={clearCompare}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                        {compareList.map((product, idx) => (
                            <div key={product._id} className="relative flex-1 group">
                                <div className="aspect-square rounded-lg bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 flex items-center justify-center p-2 mb-2">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={60}
                                        height={60}
                                        className="object-contain"
                                    />
                                    <button
                                        onClick={() => removeFromCompare(product._id)}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                                <p className="text-[10px] font-medium line-clamp-1">{product.name}</p>
                            </div>
                        ))}
                        {compareList.length < 2 && (
                            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg aspect-square mb-2 opacity-50">
                                <span className="text-xl font-bold text-gray-400">+</span>
                                <p className="text-[10px] text-gray-400">Thêm SP</p>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={() => setIsOpen(true)}
                        disabled={compareList.length < 2}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95"
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                        {compareList.length < 2 ? `Cần 2 sản phẩm (Đã có ${compareList.length})` : "So sánh ngay"}
                    </Button>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl overflow-hidden border-none shadow-2xl">
                    <DialogHeader className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-row items-center justify-between">
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            <ArrowRightLeft className="w-6 h-6" /> So sánh chi tiết
                        </DialogTitle>
                        <Button
                            onClick={() => setShowNeeds(true)}
                            className="bg-white/20 hover:bg-white/30 text-white border-white/20 gap-2 font-bold px-4 h-10 rounded-xl"
                        >
                            <Sparkles className="w-4 h-4" />
                            Tư vấn bằng AI
                        </Button>
                    </DialogHeader>

                    <div className="p-0 bg-white dark:bg-gray-900">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b last:border-0 dark:border-gray-800">
                                    <th className="w-1/3 p-4 bg-gray-50/50 dark:bg-gray-800/50 text-left font-bold text-gray-500 uppercase tracking-wider text-xs">Đặc điểm</th>
                                    {compareList.map(product => (
                                        <th key={product._id} className="w-1/3 p-4 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 p-2 border dark:border-gray-700">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                                                    <p className="text-red-600 font-extrabold text-lg">{(product.price || 0).toLocaleString('vi-VN')}đ</p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="w-full bg-black text-white hover:bg-gray-800 rounded-lg h-9"
                                                    onClick={() => window.location.href = `/products/${product._id}`}
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {allSpecKeys.map(key => (
                                    <tr key={key} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                                        <td className="p-4 bg-gray-50/30 dark:bg-gray-800/30 font-bold text-gray-700 dark:text-gray-300 capitalize text-sm">{key}</td>
                                        {compareList.map(product => (
                                            <td key={product._id} className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                                                {product.specs?.[key] || <span className="text-gray-300 dark:text-gray-600">--</span>}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                                    <td className="p-4 bg-gray-50/30 dark:bg-gray-800/30 font-bold text-gray-700 dark:text-gray-300 text-sm">Đánh giá</td>
                                    {compareList.map(product => (
                                        <td key={product._id} className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
                                                <BarChart2 className="w-4 h-4 fill-amber-500" />
                                                <span>{product.rating || "N/A"}</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Needs Selection Modal */}
            <Dialog open={showNeeds} onOpenChange={setShowNeeds}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            Chọn nhu cầu của bạn
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <p className="text-sm text-gray-500">Để AI tư vấn chính xác nhất, vui lòng chọn nhu cầu chính khi sử dụng máy:</p>
                        <div className="grid gap-3">
                            {needs.map((need) => (
                                <button
                                    key={need.id}
                                    onClick={() => handleAIConsult(need.label)}
                                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left group"
                                >
                                    <span className="text-2xl group-hover:scale-110 transition-transform">{need.icon}</span>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400">{need.label}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{need.desc}</p>
                                    </div>
                                    <BarChart2 className="w-4 h-4 ml-auto text-gray-300 group-hover:text-blue-500" />
                                </button>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
