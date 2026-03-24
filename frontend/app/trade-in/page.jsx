"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/ui/container";
import { Upload, Loader2, DollarSign, CheckCircle, AlertCircle, Camera } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function TradeInPage() {
    const [formData, setFormData] = useState({
        modelName: "",
        modelCode: "",
        specs: "",
        operationStatus: "Hoạt động bình thường",
        repairHistory: "Chưa sửa",
        yearsUsed: "",
        fanNoise: "",
        batteryLife: "",
        overheating: "",
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        phone: "",
        address: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [clarifyAnswer, setClarifyAnswer] = useState("");

    const { user, token } = useAuth(); // Get auth context

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactInputChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            toast.error("Chỉ được tải lên tối đa 5 ảnh.");
            return;
        }
        setImages(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const stitchImages = async (imageFiles) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // Set canvas size (e.g., 1024x1024 for a 2x2 grid of 512x512 images)
            canvas.width = 1024;
            canvas.height = 1024;

            // Fill with white background
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, 1024, 1024);

            let loadedCount = 0;
            const imagesToLoad = imageFiles.slice(0, 4); // Take first 4

            imagesToLoad.forEach((file, index) => {
                const img = new window.Image();
                img.onload = () => {
                    // Calculate position
                    const x = (index % 2) * 512;
                    const y = Math.floor(index / 2) * 512;

                    // Draw image scaling to fit 512x512
                    ctx.drawImage(img, x, y, 512, 512);

                    loadedCount++;
                    if (loadedCount === imagesToLoad.length) {
                        canvas.toBlob((blob) => {
                            resolve(blob);
                        }, 'image/jpeg', 0.8);
                    }
                };
                img.onerror = reject;
                img.src = URL.createObjectURL(file);
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Vui lòng đăng nhập để sử dụng tính năng này.");
            return;
        }

        if (images.length < 2) {
            toast.error("Vui lòng tải lên ít nhất 2 ảnh (Mặt lưng và mặt đáy).");
            return;
        }

        setLoading(true);
        setResult(null);
        setShowContactForm(false);

        try {
            // Stitch images into one
            const stitchedImageBlob = await stitchImages(images);

            const data = new FormData();
            data.append("modelName", formData.modelName);
            data.append("modelCode", formData.modelCode);
            data.append("specs", formData.specs);
            data.append("operationStatus", formData.operationStatus);
            data.append("repairHistory", formData.repairHistory);
            data.append("yearsUsed", formData.yearsUsed);
            data.append("fanNoise", formData.fanNoise);
            data.append("batteryLife", formData.batteryLife);
            data.append("overheating", formData.overheating);
            // Append the single stitched image
            data.append("images", stitchedImageBlob, "stitched-laptop.jpg");

            console.log("Sending valuation request with token:", token); // Debug token

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api/ai/valuation`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}` // Add auth token
                },
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Có lỗi xảy ra");
            }

            const valuationResult = await response.json();

            if (valuationResult.error === 'NOT_A_LAPTOP') {
                toast.error(valuationResult.message);
                setResult(null); // Clear any previous result
                return;
            }

            if (valuationResult.needs_clarification) {
                setResult({
                    isClarifying: true,
                    question: valuationResult.clarification_question
                });
                toast.info("AI cần bạn cung cấp thêm thông tin để định giá chính xác.");
                return;
            }

            setResult(valuationResult);
            toast.success("Định giá thành công!");
        } catch (error) {
            console.error(error);
            if (error.message === "User not found") {
                toast.error("Phiên đăng nhập hết hạn hoặc người dùng không tồn tại. Vui lòng đăng nhập lại.");
                // Optionally: logout(); // If we have access to logout from useAuth
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTradeInSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api/ai/trade-in-submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    deviceInfo: formData,
                    valuationResult: result,
                    contactInfo: contactInfo
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Lỗi khi gửi yêu cầu");
            }

            toast.success("Yêu cầu đã được gửi! Nhân viên sẽ liên hệ với bạn sớm.");
            setResult(null);
            setShowContactForm(false);
            setFormData({
                modelName: "",
                modelCode: "",
                specs: "",
                operationStatus: "Hoạt động bình thường",
                repairHistory: "Chưa sửa",
                yearsUsed: "",
                fanNoise: "",
                batteryLife: "",
                overheating: "",
            });
            setImages([]);
            setContactInfo({ phone: "", address: "" });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <Container className="py-10 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Định Giá Laptop Cũ Thông Minh</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Chụp ảnh laptop của bạn và nhận báo giá thu cũ đổi mới ngay lập tức.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Form Section */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Camera className="w-5 h-5 text-blue-600" /> Thông tin máy
                        </h2>

                        {!user && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg mb-6 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-yellow-800 dark:text-yellow-400">Yêu cầu đăng nhập</h3>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                        Vui lòng <Link href="/login" className="underline font-bold hover:text-yellow-900">đăng nhập</Link> để sử dụng tính năng định giá AI.
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="modelName">Tên đầy đủ của máy</Label>
                                    <Input
                                        id="modelName"
                                        name="modelName"
                                        placeholder="VD: Dell XPS 13 9310 2-in-1 Core i7..."
                                        value={formData.modelName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!user}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="modelCode">Mã máy (Model Code)</Label>
                                        <Input
                                            id="modelCode"
                                            name="modelCode"
                                            placeholder="VD: XPS 9310"
                                            value={formData.modelCode}
                                            onChange={handleInputChange}
                                            required
                                            disabled={!user}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="operationStatus">Tình trạng hoạt động</Label>
                                        <select
                                            id="operationStatus"
                                            name="operationStatus"
                                            value={formData.operationStatus}
                                            onChange={handleInputChange}
                                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            required
                                            disabled={!user}
                                        >
                                            <option value="Hoạt động bình thường">Hoạt động bình thường</option>
                                            <option value="Có lỗi nhẹ">Có lỗi nhẹ</option>
                                            <option value="Không lên nguồn">Không lên nguồn</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specs">Cấu hình chi tiết</Label>
                                    <Textarea
                                        id="specs"
                                        name="specs"
                                        placeholder="VD: Core i7 1165G7, RAM 16GB, SSD 512GB, Màn hình 4K cảm ứng..."
                                        value={formData.specs}
                                        onChange={handleInputChange}
                                        required
                                        className="h-24"
                                        disabled={!user}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Lịch sử sửa chữa (Tùy chọn)</Label>
                                    <div className="flex flex-wrap gap-4">
                                        {["Chưa sửa", "Đã thay pin", "Đã sửa main / màn"].map((option) => (
                                            <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="repairHistory"
                                                    value={option}
                                                    checked={formData.repairHistory === option}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                    disabled={!user}
                                                />
                                                <span className="text-sm">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                                    <Label className="text-blue-700 dark:text-blue-300">Thông tin sử dụng</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="yearsUsed" className="text-xs font-normal">Đã dùng bao lâu (năm)?</Label>
                                            <Input
                                                id="yearsUsed"
                                                name="yearsUsed"
                                                placeholder="VD: 2.5"
                                                value={formData.yearsUsed}
                                                onChange={handleInputChange}
                                                className="h-8 text-sm"
                                                disabled={!user}
                                                type="number"
                                                step="0.5"
                                                min="0"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="fanNoise" className="text-xs font-normal">Quạt có ồn khi dùng lâu?</Label>
                                            <Input
                                                id="fanNoise"
                                                name="fanNoise"
                                                placeholder="VD: Hơi ồn..."
                                                value={formData.fanNoise}
                                                onChange={handleInputChange}
                                                className="h-8 text-sm"
                                                disabled={!user}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="batteryLife" className="text-xs font-normal">Pin dùng được bao lâu?</Label>
                                            <Input
                                                id="batteryLife"
                                                name="batteryLife"
                                                placeholder="VD: 2-3 tiếng..."
                                                value={formData.batteryLife}
                                                onChange={handleInputChange}
                                                className="h-8 text-sm"
                                                disabled={!user}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="overheating" className="text-xs font-normal">Có hay bị nóng không?</Label>
                                            <Input
                                                id="overheating"
                                                name="overheating"
                                                placeholder="VD: Bình thường..."
                                                value={formData.overheating}
                                                onChange={handleInputChange}
                                                className="h-8 text-sm"
                                                disabled={!user}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Hình ảnh thực tế (Tối thiểu 2 ảnh)</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {images.map((img, index) => (
                                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                            <Image
                                                src={URL.createObjectURL(img)}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                                            >
                                                <span className="sr-only">Xóa</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 5 && (
                                        <label className={`flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer bg-gray-50 dark:bg-gray-800/50 transition-colors ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                            <span className="text-[10px] text-gray-500">Thêm ảnh</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                disabled={!user}
                                            />
                                        </label>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">
                                    *Vui lòng chụp rõ: Mặt lưng và Mặt đáy (Bắt buộc), Màn hình và Bàn phím (Khuyên dùng).
                                </p>
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading || !user}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang phân tích...
                                    </>
                                ) : !user ? (
                                    "Vui lòng đăng nhập để định giá"
                                ) : (
                                    "Định giá ngay"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                    {result?.isClarifying ? (
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-blue-200 dark:border-blue-900 shadow-lg shadow-blue-100 dark:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">AI Câu Hỏi Làm Rõ</h3>
                                    <p className="text-sm text-gray-500">Cần thêm thông tin để định giá</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300 font-medium whitespace-pre-line">
                                    {result.question}
                                </p>
                                <div className="space-y-2">
                                    <Label htmlFor="clarifyAnswer">Phản hồi của bạn:</Label>
                                    <Textarea
                                        id="clarifyAnswer"
                                        placeholder="Ví dụ: Máy mình mua năm 2024, bản card RTX 4060..."
                                        className="h-24"
                                        value={clarifyAnswer}
                                        onChange={(e) => setClarifyAnswer(e.target.value)}
                                        disabled={!user}
                                    />
                                </div>
                                <Button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                                    onClick={() => {
                                        if(!clarifyAnswer.trim()) {
                                            toast.error("Vui lòng nhập câu trả lời"); return;
                                        }
                                        setFormData(prev => ({
                                            ...prev,
                                            specs: prev.specs ? prev.specs + `\n(Bổ sung: ${clarifyAnswer})` : `(Bổ sung: ${clarifyAnswer})`
                                        }));
                                        toast.success("Đã cập nhật thông tin. Vui lòng bấm 'Định giá ngay' lần nữa!");
                                        setResult(null);
                                        setClarifyAnswer("");
                                    }}
                                >
                                    Cập nhật & Yêu cầu định giá lại
                                </Button>
                            </div>
                        </div>
                    ) : result ? (
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-green-200 dark:border-green-900 shadow-lg shadow-green-100 dark:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Kết quả định giá</h3>
                                    <p className="text-sm text-gray-500">Dựa trên phân tích AI</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="text-sm text-gray-500">Độ mới (Grade)</span>
                                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${result.condition_grade === 'A' ? 'bg-green-100 text-green-700' :
                                        result.condition_grade === 'B' ? 'bg-blue-100 text-blue-700' :
                                            result.condition_grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {result.condition_grade}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-sm text-gray-500">Chi tiết ngoại hình:</span>
                                    <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                        {result.condition_details}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-sm text-gray-500">Lý do định giá:</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                                        "{result.reasoning}"
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-4">
                                        <span className="text-sm text-gray-500">Giá thị trường ước tính:</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100 text-lg md:text-base">
                                            {typeof result.market_price_estimate === 'object' ?
                                                `${formatCurrency(result.market_price_estimate.low)} - ${formatCurrency(result.market_price_estimate.high)}` :
                                                formatCurrency(result.market_price_estimate)
                                            }
                                        </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-1 mb-6">
                                        <span className="font-bold text-gray-900 dark:text-white">Giá thu mua đề xuất:</span>
                                        <span className="text-3xl md:text-4xl font-bold text-blue-600">
                                            {typeof result.trade_in_value === 'object' ?
                                                formatCurrency(result.trade_in_value.recommended) :
                                                formatCurrency(result.trade_in_value)
                                            }
                                        </span>
                                    </div>

                                    {/* Policies & Next Steps Information (Requested) */}
                                    <div className="space-y-4 text-sm bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100/50 dark:border-blue-800/50">
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2">
                                                <span>1️⃣</span> Về mức giá dự kiến
                                            </h4>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-7">
                                                Đây là mức giá dự kiến dựa trên thông tin quý khách cung cấp. Giá thực tế có thể giữ nguyên hoặc điều chỉnh tăng/giảm trong khoảng <strong>300.000 – 2.000.000 đồng</strong>, tùy theo tình trạng thực tế khi nhân viên đến kiểm tra trực tiếp.
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2">
                                                <span>2️⃣</span> Xác nhận thông tin để hẹn lịch
                                            </h4>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-7">
                                                Nếu quý khách cảm thấy mức giá phù hợp, vui lòng để lại số điện thoại và địa chỉ cụ thể để chúng tôi liên hệ xác nhận và sắp xếp lịch đến thu mua trong thời gian sớm nhất.
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2">
                                                <span>3️⃣</span> Phí đến tận nơi
                                            </h4>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-7">
                                                Chúng tôi miễn phí hoàn toàn chi phí đến thu mua trong <strong>bán kính 8km</strong>. Ngoài khu vực này, phí (nếu có) sẽ được thông báo trước để quý khách yên tâm.
                                            </p>
                                        </div>

                                        <div className="pt-3 mt-2 border-t border-blue-200 dark:border-blue-800 text-center">
                                            <p className="text-[12px] font-medium text-gray-600 dark:text-gray-400">
                                                Mọi thắc mắc cần hỗ trợ xin liên hệ hotline: <span className="font-bold text-red-600">1900 8888</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {showContactForm ? (
                                    <form onSubmit={handleTradeInSubmit} className="mt-6 space-y-4 pt-6 border-t border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <h4 className="font-bold text-blue-800 dark:text-blue-400">Thông tin liên hệ thu mua</h4>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Số điện thoại</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                required
                                                placeholder="Nhập số điện thoại của bạn"
                                                value={contactInfo.phone}
                                                onChange={handleContactInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Địa chỉ thu mua</Label>
                                            <Textarea
                                                id="address"
                                                name="address"
                                                required
                                                placeholder="Nhập địa chỉ của bạn để nhân viên đến thu máy"
                                                value={contactInfo.address}
                                                onChange={handleContactInputChange}
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full sm:flex-1 py-4 h-auto"
                                                onClick={() => setShowContactForm(false)}
                                            >
                                                Quay lại
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="w-full sm:flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 h-auto whitespace-normal"
                                                disabled={submitting}
                                            >
                                                {submitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                                <span className="hidden sm:inline">Gửi yêu cầu nhân viên gọi lại</span>
                                                <span className="sm:hidden font-bold">Gửi yêu cầu hỗ trợ ngay</span>
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <Button
                                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white h-auto py-3 whitespace-normal"
                                        onClick={() => setShowContactForm(true)}
                                    >
                                        <span className="hidden sm:inline">Tôi đồng ý với mức giá này - Liên hệ thu mua</span>
                                        <span className="sm:hidden font-bold">Chốt giá & Liên hệ thu mua ngay</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Quy trình đơn giản</h3>
                            <ul className="text-sm text-gray-500 space-y-2 text-left max-w-xs mx-auto">
                                <li className="flex gap-2"><span className="font-bold text-blue-500">1.</span> Điền thông tin máy</li>
                                <li className="flex gap-2"><span className="font-bold text-blue-500">2.</span> Chụp 4 góc độ của máy</li>
                                <li className="flex gap-2"><span className="font-bold text-blue-500">3.</span> AI phân tích và định giá</li>
                                <li className="flex gap-2"><span className="font-bold text-blue-500">4.</span> Nhận tiền mặt hoặc đổi máy mới</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
}
