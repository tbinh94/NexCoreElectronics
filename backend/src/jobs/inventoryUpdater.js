import Product from "../models/Product.js";
import Settings from "../models/Settings.js";

/**
 * Tính số tuần hiện tại trong năm
 */
const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

/**
 * Logic xác định sản phẩm thuộc nhóm máy cũ trong tuần
 */
const isProductUsedWeekly = (productId, weekNum) => {
    const seed = productId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed + weekNum) % 5 === 0; // Nhóm 20%
};

export const updateWeeklyInventory = async () => {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentWeek = getWeekNumber(now);
        const settingsKey = `last_inventory_update_${currentYear}`;

        // Kiểm tra xem tuần này đã cập nhật chưa
        const lastUpdate = await Settings.findOne({ key: settingsKey });

        if (lastUpdate && lastUpdate.value === currentWeek) {
            // console.log(`[Inventory Job] Tuần ${currentWeek} đã được cập nhật trước đó.`);
            return;
        }

        console.log(`[Inventory Job] Bắt đầu cập nhật kho hàng cũ cho Tuần ${currentWeek}...`);

        const products = await Product.find({ isActive: true });
        let updatedCount = 0;

        for (const product of products) {
            if (isProductUsedWeekly(product._id, currentWeek)) {
                // Tăng số lượng máy cũ thêm 15-20 máy ngẫu nhiên
                const increment = Math.floor(Math.random() * (20 - 15 + 1)) + 15;

                // Cập nhật vào DB
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
