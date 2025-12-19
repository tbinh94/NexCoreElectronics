import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js"; // Import Model
import connectDB from "./config/db.js";
import products from "./data/products.js";
import users from "./data/users.js";
import Faq from "./models/Faq.js";
import faqs from "./data/faqs.js";
dotenv.config();


const importData = async () => {
    try {
        await connectDB();

        await Product.deleteMany(); // Xóa dữ liệu cũ
        await Product.insertMany(products); // Thêm dữ liệu mới

        await User.deleteMany(); // Xóa dữ liệu cũ
        await User.insertMany(users); // Thêm dữ liệu mới

        await Faq.deleteMany(); // Xóa dữ liệu cũ
        await Faq.insertMany(faqs); // Thêm dữ liệu mới
        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
