import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const productSchema = new mongoose.Schema({ name: String });
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

const checkDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Product.countDocuments();
        console.log("Total products:", count);
        const products = await Product.find().limit(5).select('_id name slug');
        console.log("First 5 products:", JSON.stringify(products, null, 2));
        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkDB();
