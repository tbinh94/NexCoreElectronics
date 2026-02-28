export const BASE_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, "");
export const API_URL = BASE_API_URL.endsWith('/api') ? BASE_API_URL : `${BASE_API_URL}/api`;


/**
 * Logic xác định sản phẩm có bản cũ hay không (xoay vòng 20% mỗi tuần)
 */
export function getIsProductUsedWeekly(productId) {
    if (!productId) return false;
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNum = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
    const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed + weekNum) % 5 === 0;
}

//console.log('API_URL configured as:', API_URL);

export async function fetchFilters() {
    try {
        const res = await fetch(`${API_URL}/products/filters`, {
            cache: 'no-store' // Không dùng cache để đảm cập nhật ngay lập tức
        });

        if (!res.ok) {
            throw new Error('Failed to fetch filters');
        }

        const data = await res.json();
        // Đảm bảo categories luôn tồn tại
        if (!data.categories) data.categories = [];

        // Thêm danh mục Laptop cũ nếu chưa có
        if (!data.categories.includes('Laptop cũ')) {
            data.categories.unshift('Laptop cũ');
        }

        return data;

    } catch (error) {
        console.error(`Error fetching filters from ${API_URL}/products/filters:`, error);
        return { brands: [], categories: ['Laptop cũ'] }; // Trả về Laptop cũ ngay cả khi lỗi
    }
}

export async function fetchProducts(params = {}) {
    try {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.set('page', params.page);

        const isUsedCategory = params.category === 'Laptop cũ';

        // Tăng lượng sản phẩm lấy từ server lên gấp 10 lần 
        // để sau khi lọc 20% máy cũ vẫn còn ít nhất 15-20 máy
        const baseLimit = parseInt(params.limit) || 12;
        if (isUsedCategory) {
            searchParams.set('limit', baseLimit * 10);
        } else if (params.limit) {
            searchParams.set('limit', params.limit);
        }

        // Chỉ gửi category lên backend nếu nó KHÔNG PHẢI là "Laptop cũ"
        if (params.category && !isUsedCategory) {
            searchParams.set('category', params.category);
        }

        if (params.brand) searchParams.set('brand', params.brand);
        if (params.minPrice) searchParams.set('minPrice', params.minPrice);
        if (params.maxPrice) searchParams.set('maxPrice', params.maxPrice);
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.search) searchParams.set('search', params.search);
        if (params.exclude) searchParams.set('exclude', params.exclude);
        if (params.cpu_type) searchParams.set('cpu_type', params.cpu_type);
        if (params.screen_size_label) searchParams.set('screen_size_label', params.screen_size_label);
        if (params.promotion) searchParams.set('promotion', params.promotion);

        const res = await fetch(`${API_URL}/products?${searchParams.toString()}`, {
            cache: 'no-store' // Force refresh
        });


        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }


        const data = await res.json();

        // Logic xử lý Laptop cũ (Xoay vòng 20% sản phẩm mỗi tuần)
        // isUsedCategory đã được khai báo ở trên


        // Lấy seed dựa trên tuần hiện tại để sp cũ cố định trong 1 tuần
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const weekNum = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);

        if (isUsedCategory) {
            // Lọc ra 20% sản phẩm dựa trên ID và tuần
            data.products = data.products.filter(p => {
                const seed = p._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                return (seed + weekNum) % 5 === 0; // 20%
            }).map(p => ({
                ...p,
                name: `[Cũ] ${p.name}`,
                price: Math.round(p.price * 0.65), // Giảm 35% cho máy cũ
                oldPrice: p.price,
                isUsed: true
            }));

            // Cập nhật lại phân trang vì danh sách đã bị lọc ở Client
            data.pagination.totalProducts = data.products.length;
        }

        return data;

    } catch (error) {
        console.error(`Error fetching products from ${API_URL}/products:`, error);
        return { products: [], pagination: {} };
    }
}

export async function fetchProductById(id) {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching product ${id} from ${API_URL}/products/${id}:`, error);
        return null;
    }
}

const FAKE_COMMENTS = [
    { name: "Nguyễn Văn Hải", rating: 5, comment: "Sản phẩm dùng rất tốt, đáng đồng tiền bát gạo. Đóng gói rất kỹ." },
    { name: "Trần Thị Lan", rating: 5, comment: "Giao hàng nhanh, máy chạy mượt, màn hình sắc nét. Rất hài lòng!" },
    { name: "Lê Hoàng Nam", rating: 4, comment: "Thiết kế đẹp, sang trọng. Tuy nhiên pin dùng ở mức trung bình." },
    { name: "Phạm Minh Đức", rating: 5, comment: "Tuyệt vời, shop tư vấn nhiệt tình. Sẽ ủng hộ lần sau." },
    { name: "Đặng Thu Thảo", rating: 3, comment: "Máy dùng tốt nhưng hơi nóng khi chạy tác vụ nặng. Giao hàng hơi lâu." },
    { name: "Hoàng Anh Tuấn", rating: 5, comment: "Đã nhận hàng, đúng mô tả. Test thử thấy rất ổn định." },
    { name: "Vũ Phương Ly", rating: 4, comment: "Sản phẩm chất lượng, đóng gói cẩn thận. Shop uy tín." }
];

export async function fetchReviews(productId) {
    try {
        const res = await fetch(`${API_URL}/reviews/${productId}`, {
            cache: 'no-store'
        });

        let reviews = [];
        if (res.ok) {
            reviews = await res.json();
        }

        // Nếu không có review thật, tạo review giả để demo
        if (reviews.length === 0) {
            // Dùng productId để tạo seed ổn định cho mỗi sản phẩm (để load lại vẫn ra review cũ)
            const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

            // Lấy ngẫu nhiên từ 4-5 review từ bộ FAKE_COMMENTS
            const numFake = 4 + (seed % 2);
            const fakeReviews = [];

            for (let i = 0; i < numFake; i++) {
                const commentIndex = (seed + i) % FAKE_COMMENTS.length;
                const fake = FAKE_COMMENTS[commentIndex];

                fakeReviews.push({
                    _id: `fake_${productId}_${i}`,
                    productId: productId,
                    user: { name: fake.name },
                    rating: fake.rating,
                    comment: fake.comment,
                    createdAt: new Date(Date.now() - (i * 86400000 + (seed % 10) * 3600000)).toISOString() // Lùi ngày lại
                });
            }
            return fakeReviews;
        }

        return reviews;
    } catch (error) {
        console.error(`Error fetching reviews for ${productId}:`, error);
        return [];
    }
}


// Wishlist API
export async function getWishlist(token) {
    const res = await fetch(`${API_URL}/users/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
}

export async function addToWishlist(productId, token) {
    const res = await fetch(`${API_URL}/users/wishlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
    });
    return res.json();
}

export async function removeFromWishlist(productId, token) {
    const res = await fetch(`${API_URL}/users/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}
