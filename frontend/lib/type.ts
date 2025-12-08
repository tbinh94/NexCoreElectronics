// lib/types.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number; // Dấu ? nghĩa là có thể có hoặc không (cho sản phẩm giảm giá)
    image: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    category: string;
}