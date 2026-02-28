import Product from "../models/Product.js";
import Settings from "../models/Settings.js";

/**
 * Tính số tuần hiện tại (Logic khớp 100% với frontend/lib/api.js)
 */
const getCurrentWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
};

/**
 * Logic xác định sản phẩm thuộc nhóm máy cũ trong tuần (Logic khớp 100% với frontend/lib/api.js)
 */
const isProductUsedWeekly = (productId, weekNum) => {
    const seed = productId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed + weekNum) % 5 === 0; // Nhóm 20%
};

export const updateWeeklyInventory = async () => {
    try {
        const currentWeek = getCurrentWeek();
        const currentYear = new Date().getFullYear();
        const settingsKey = `last_inventory_update_${currentYear}`;

        // Kiểm tra xem tuần này đã cập nhật chưa
        const lastUpdate = await Settings.findOne({ key: settingsKey });

        if (lastUpdate && lastUpdate.value === currentWeek) {
            return;
        }

        console.log(`[Inventory Job] Tuần ${currentWeek} - Đang làm mới kho laptop cũ...`);

        const products = await Product.find({ isActive: true });
        let updatedCount = 0;

        for (const product of products) {
            const isWeekly = isProductUsedWeekly(product._id, currentWeek);

            if (isWeekly) {
                // Thêm 15-20 máy cũ vào kho cho những sản phẩm trúng "Tuần lễ laptop cũ"
                const increment = Math.floor(Math.random() * (20 - 15 + 1)) + 15;
                product.countInStockOld = (product.countInStockOld || 0) + increment;
                await product.save();
                updatedCount++;
            }
        }

        // Lưu trạng thái đã cập nhật cho tuần này
        if (lastUpdate) {
            lastUpdate.value = currentWeek;
            await lastUpdate.save();
        } else {
            await Settings.create({ key: settingsKey, value: currentWeek });
        }

        console.log(`[Inventory Job] Hoàn tất! Đã cập nhật ${updatedCount} sản phẩm.`);
    } catch (error) {
        console.error("[Inventory Job] Lỗi khi cập nhật kho hàng:", error);
    }
};
