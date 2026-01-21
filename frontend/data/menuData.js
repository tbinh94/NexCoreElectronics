import { Briefcase, Gamepad2, Feather, PenTool, GraduationCap, Monitor, Zap, Laptop } from "lucide-react";

export const MEGA_MENU_DATA = {
    brands: [
        { label: "MacBook", value: "Apple" },
        { label: "ASUS", value: "Asus" },
        { label: "Lenovo", value: "Lenovo" },
        { label: "Dell", value: "Dell" },
        { label: "HP", value: "HP" },
        { label: "Acer", value: "Acer" },
        { label: "LG", value: "LG" },
        { label: "MSI", value: "MSI" },
        { label: "Gigabyte", value: "Gigabyte" },
        { label: "Samsung", value: "Samsung" }
    ],
    prices: [
        { label: "Dưới 10 triệu", min: 0, max: 10000000 },
        { label: "Từ 10 - 15 triệu", min: 10000000, max: 15000000 },
        { label: "Từ 15 - 20 triệu", min: 15000000, max: 20000000 },
        { label: "Từ 20 - 25 triệu", min: 20000000, max: 25000000 },
        { label: "Từ 25 - 30 triệu", min: 25000000, max: 30000000 },
        { label: "Trên 30 triệu", min: 30000000, max: null }
    ],
    needs: [
        { name: "Học tập, văn phòng", icon: Briefcase, category: "Học tập – Văn phòng" },
        { name: "Gaming, Đồ họa", icon: Gamepad2, category: "Gaming" },
        { name: "Mỏng nhẹ, Sang trọng", icon: Feather, category: "Mỏng nhẹ – Di động" },
        { name: "Thiết kế, Kỹ thuật", icon: PenTool, category: "Thiết kế – Đồ họa" },
        { name: "Sinh viên, Giá rẻ", icon: GraduationCap, category: "Học tập – Văn phòng" },
        { name: "Cảm ứng, 2 trong 1", icon: Monitor, category: "Ultrabook" },
        { name: "Laptop AI", icon: Zap, category: "Laptop AI", hot: true },
        { name: "Mac CTO", icon: Laptop, category: "Macbook", label: "Nâng cấp cấu hình" }
    ],
    chips: [
        "Core i3", "Core i5", "Core i7", "Core i9",
        "Core Ultra 5", "Core Ultra 7", "Ryzen 5", "Ryzen 7",
        "Apple M2", "Apple M3", "Apple M3 Pro", "Apple M3 Max"
    ],
    screens: [
        "13 inch", "14 inch", "15.6 inch", "16 inch"
    ]
};
