import mongoose from "mongoose";
import { updateWeeklyInventory } from "../jobs/inventoryUpdater.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Chạy job cập nhật kho hàng cũ hàng tuần sau khi kết nối DB thành công
        await updateWeeklyInventory();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

