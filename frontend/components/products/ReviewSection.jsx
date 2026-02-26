'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Star, User, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { fetchReviews as getApiReviews } from '@/lib/api';


export default function ReviewSection({ productId, initialReviews = [] }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState(initialReviews);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(initialReviews.length === 0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // AI Summary State
    const [summary, setSummary] = useState(null);
    const [summarizing, setSummarizing] = useState(false);

    useEffect(() => {
        // Nếu đã có initialReviews thì không cần fetch lại ngay lập tức
        if (initialReviews.length === 0) {
            fetchReviewsData();
        } else {
            setLoading(false);
        }
    }, [productId]);

    const fetchReviewsData = async () => {
        try {
            const data = await getApiReviews(productId);
            setReviews(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleSummarize = async () => {
        setSummarizing(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/summarize-reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });
            const data = await res.json();
            setSummary(data);
        } catch (error) {
            console.error("Failed to summarize", error);
        } finally {
            setSummarizing(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id,
                    productId,
                    rating,
                    comment,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 404 && data.message === "User not found") {
                    throw new Error("Phiên đăng nhập không hợp lệ. Vui lòng đăng xuất và đăng nhập lại.");
                }
                throw new Error(data.message || 'Something went wrong');
            }

            setComment('');
            setRating(5);
            fetchReviews(); // Refresh reviews
            setSummary(null); // Reset summary when new review added
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div id="reviews" className="mt-16 border-t pt-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Đánh giá sản phẩm ({reviews.length})</h2>
                {reviews.length > 0 && !summary && (
                    <Button
                        variant="outline"
                        onClick={handleSummarize}
                        disabled={summarizing}
                        className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                        <Sparkles size={16} />
                        {summarizing ? "Đang phân tích..." : "Tóm tắt đánh giá bằng AI"}
                    </Button>
                )}
            </div>

            {/* AI Summary Card */}
            {summary && (
                <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
                        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">AI Tổng hợp đánh giá</h3>
                    </div>

                    {summary.message ? (
                        <p className="text-gray-600 dark:text-gray-400">{summary.message}</p>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/60 dark:bg-gray-800/40 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2 mb-2">
                                        <ThumbsUp size={16} /> Ưu điểm
                                    </h4>
                                    <ul className="space-y-1">
                                        {summary.pros?.map((pro, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                                <span className="text-green-500 mt-1">•</span>
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white/60 dark:bg-gray-800/40 p-4 rounded-lg">
                                    <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2 mb-2">
                                        <ThumbsDown size={16} /> Nhược điểm
                                    </h4>
                                    <ul className="space-y-1">
                                        {summary.cons?.map((con, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/60 p-4 rounded-lg border-l-4 border-blue-500">
                                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Kết luận</h4>
                                <p className="text-gray-700 dark:text-gray-200 text-sm italic">"{summary.verdict}"</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Review List */}
                <div className="space-y-6">
                    {loading ? (
                        <p className="text-gray-500 dark:text-gray-400">Đang tải đánh giá...</p>
                    ) : reviews.length === 0 ? (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-center text-gray-500 dark:text-gray-400">
                            Chưa có đánh giá nào. Hãy là người đầu tiên!
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 shadow-sm transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                                            <User size={16} className="text-gray-600 dark:text-gray-300" />
                                        </div>
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">{review.user?.name || 'Người dùng ẩn danh'}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <div className="flex mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={14}
                                            className={`${star <= review.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Review Form */}
                <div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border dark:border-gray-700">
                        <h3 className="text-lg font-bold mb-4 dark:text-gray-100">Viết đánh giá của bạn</h3>
                        {user ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border dark:border-red-900/30">
                                        {error}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Đánh giá sao</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={24}
                                                    className={`${star <= rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nhận xét</label>
                                    <Textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                                        required
                                        className="min-h-[100px] bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                                <Button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                                    {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Vui lòng đăng nhập để viết đánh giá</p>
                                <Button asChild variant="outline" className="dark:hover:bg-gray-700 transition-colors">
                                    <a href="/login">Đăng nhập ngay</a>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
