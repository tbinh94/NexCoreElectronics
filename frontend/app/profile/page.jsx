'use client';
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, LogOut, ShoppingBag, ShieldCheck, Camera, Edit2, Save, X, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { getWishlist, removeFromWishlist } from "@/lib/api";
import { Heart } from "lucide-react";
export default function ProfilePage() {
    const { user, token, logout, loading, updateUser } = useAuth();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    // Wishlist state
    const [wishlist, setWishlist] = useState([]);
    const [loadingWishlist, setLoadingWishlist] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            setNewName(user.name);
            setPreviewAvatar(user.avatar);

            // Fetch wishlist
            if (token) {
                const fetchWishlist = async () => {
                    try {
                        const data = await getWishlist(token);
                        setWishlist(data);
                    } catch (error) {
                        console.error("Failed to fetch wishlist", error);
                    } finally {
                        setLoadingWishlist(false);
                    }
                };
                fetchWishlist();
            }
        }
    }, [user, loading, router, token]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId, token);
            setWishlist(prev => prev.filter(item => item._id !== productId));
            toast.success("Đã xóa khỏi danh sách yêu thích");

            // Optionally update user context if needed
            if (user && user.wishlist) {
                const updatedUser = {
                    ...user,
                    wishlist: user.wishlist.filter(id => (id._id || id) !== productId)
                };
                updateUser(updatedUser);
            }
        } catch (error) {
            toast.error("Lỗi khi xóa sản phẩm");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewAvatar(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            let avatarUrl = user.avatar;

            // 1. Upload new avatar if selected
            if (avatarFile) {
                const formData = new FormData();
                formData.append("image", avatarFile);

                const uploadRes = await fetch(`/api/upload`, {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error("Tải ảnh đại diện thất bại");

                const uploadData = await uploadRes.json();
                avatarUrl = uploadData.image;
            }

            // 2. Update profile
            const res = await fetch(`/api/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newName,
                    avatar: avatarUrl
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error("Update profile failed:", res.status, errorData);
                throw new Error(errorData.message || `Cập nhật hồ sơ thất bại (${res.status})`);
            }

            const updatedUser = await res.json();

            // 3. Update local state
            updateUser(updatedUser);
            setIsEditing(false);
            toast.success("Cập nhật hồ sơ thành công!");

        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi cập nhật hồ sơ.");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white dark:bg-card rounded-2xl shadow-sm overflow-hidden border dark:border-border">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="px-4 md:px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="flex items-end relative group">
                                <div className="h-24 w-24 rounded-full ring-4 ring-white dark:ring-card bg-white dark:bg-card flex items-center justify-center shadow-lg overflow-hidden relative">
                                    <Image
                                        src={previewAvatar || user.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />

                                    {isEditing && (
                                        <div
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Camera className="text-white w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-2">
                                {isEditing ? (
                                    <>
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                            variant="ghost"
                                            className="text-gray-600 dark:text-gray-300"
                                            disabled={saving}
                                        >
                                            <X className="w-4 h-4 mr-2" /> Hủy
                                        </Button>
                                        <Button
                                            onClick={handleSaveProfile}
                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                            disabled={saving}
                                        >
                                            {saving ? "Đang lưu..." : <><Save className="w-4 h-4 mr-2" /> Lưu</>}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            variant="outline"
                                            className="border-gray-200 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                                        >
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Chỉnh sửa
                                        </Button>
                                        <Button
                                            onClick={logout}
                                            variant="outline"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Đăng xuất
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            {isEditing ? (
                                <Input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="text-2xl font-bold text-gray-900 dark:text-white h-10 w-full max-w-sm"
                                />
                            ) : (
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                            )}

                            <div className="flex items-center gap-3">
                                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <ShieldCheck className={`w-4 h-4 ${user.isAdmin ? 'text-blue-500' : 'text-green-500'}`} />
                                    {user.isAdmin ? 'Quản trị viên' : 'Thành viên'}
                                </p>
                                {user.isVip && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-yellow-200 animate-in zoom-in">
                                        <Award className="w-3 h-3" />
                                        NexCore VIP
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6 space-y-6 border dark:border-border">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-800 pb-4">Thông tin cá nhân</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Họ và tên</p>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Ngày tham gia</p>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6 space-y-6 border dark:border-border">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-800 pb-4">Hoạt động</h2>

                        <div className="space-y-4">
                            <Link href="/orders" className="block group">
                                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                            <ShoppingBag className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Đơn hàng của tôi</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Xem lịch sử mua hàng</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 group-hover:text-blue-500">→</span>
                                </div>
                            </Link>

                            <Link href="#wishlist" className="block group">
                                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Yêu thích của tôi</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Xem các sản phẩm đã lưu</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 group-hover:text-red-500">↓</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Wishlist Section */}
                <div id="wishlist" className="bg-white dark:bg-card rounded-2xl shadow-sm border dark:border-border overflow-hidden">
                    <div className="px-6 py-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/10">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                            Sản phẩm yêu thích
                        </h2>
                        <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                            {user.wishlist?.length || 0} sản phẩm
                        </span>
                    </div>

                    <div className="p-6">
                        {loadingWishlist ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                                <p className="text-sm text-gray-500">Đang tải danh sách...</p>
                            </div>
                        ) : wishlist.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {wishlist.map((item) => (
                                    <div key={item._id} className="group flex gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-red-100 dark:hover:border-red-900/50 hover:bg-red-50/10 transition-all relative">
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 shrink-0 border dark:border-gray-700">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                                            <div className="space-y-1">
                                                <Link href={`/products/${item.slug || item._id}`} className="block">
                                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white hover:text-red-600 transition-colors truncate">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-red-600 font-bold text-sm">
                                                    {item.price?.toLocaleString('vi-VN')}đ
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Link href={`/products/${item.slug || item._id}`} className="text-[10px] text-blue-600 font-bold uppercase tracking-wider hover:underline">
                                                    Xem chi tiết
                                                </Link>
                                                <button
                                                    onClick={() => handleRemoveFromWishlist(item._id)}
                                                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                                    title="Xóa khỏi yêu thích"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 space-y-4">
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
                                    <Heart className="w-8 h-8 text-gray-300" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-600 dark:text-gray-300 font-medium">Chưa có sản phẩm nào</p>
                                    <p className="text-sm text-gray-400">Hãy thêm các sản phẩm bạn yêu thích vào danh sách này.</p>
                                </div>
                                <Button
                                    onClick={() => router.push('/products')}
                                    variant="outline"
                                    className="mt-2"
                                >
                                    Khám phá sản phẩm
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
