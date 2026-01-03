'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ReviewSection({ productId }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews/${productId}`);
            if (!res.ok) throw new Error('Failed to fetch reviews');
            const data = await res.json();
            setReviews(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
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
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-bold mb-6">Đánh giá sản phẩm ({reviews.length})</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Review List */}
                <div className="space-y-6">
                    {loading ? (
                        <p>Đang tải đánh giá...</p>
                    ) : reviews.length === 0 ? (
                        <div className="bg-gray-50 p-6 rounded-xl text-center text-gray-500">
                            Chưa có đánh giá nào. Hãy là người đầu tiên!
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className="bg-white p-4 rounded-xl border shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-gray-100 p-2 rounded-full">
                                            <User size={16} className="text-gray-600" />
                                        </div>
                                        <span className="font-semibold">{review.user?.name || 'Người dùng ẩn danh'}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">
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
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Review Form */}
                <div>
                    <div className="bg-gray-50 p-6 rounded-xl border">
                        <h3 className="text-lg font-bold mb-4">Viết đánh giá của bạn</h3>
                        {user ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
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
                                        className="min-h-[100px] bg-white"
                                    />
                                </div>
                                <Button type="submit" disabled={submitting} className="w-full">
                                    {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-500 mb-4">Vui lòng đăng nhập để viết đánh giá</p>
                                <Button asChild variant="outline">
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
