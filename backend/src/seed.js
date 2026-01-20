import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Faq from "./models/Faq.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import faqs from "./data/faqs.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getProductImage = (id) => {
    return `https://loremflickr.com/600/400/laptop,technology,computer?lock=${id}`;
};

const parseCSV = (filePath) => {
    const csvData = fs.readFileSync(filePath, "utf-8");
    const lines = csvData.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Handle commas inside quotes if necessary, but for this simple CSV a simple split might suffice
        // However, to be safe, let's use a regex that handles quoted fields
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        // Fallback to simple split if regex fails or for simple lines (this regex is imperfect)
        // Given the file view, it seems standard. Let's try a robust split.

        let row = {};
        let currentLine = lines[i];
        let values = [];
        let inQuote = false;
        let currentValue = "";

        for (let char of currentLine) {
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                values.push(currentValue.trim());
                currentValue = "";
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());

        if (values.length < headers.length) continue;

        headers.forEach((header, index) => {
            row[header] = values[index] ? values[index].replace(/^"|"$/g, '') : "";
        });
        result.push(row);
    }
    return result;
};


console.log("Starting seed script...");

const importData = async () => {
    try {
        console.log("Reading CSV data...");
        const csvPath = path.join(__dirname, "data", "laptop.csv");
        const rawProducts = parseCSV(csvPath);
        console.log(`Found ${rawProducts.length} products in CSV.`);

        await connectDB();

        const products = rawProducts.map((p, index) => {
            // Convert price from INR (assumed) to VND (approx x300)
            // Remove commas from price string if present
            const rawPrice = parseFloat(p["price"].replace(/,/g, "")) || 0;
            const priceVND = rawPrice * 300;

            const productImages = [
                getProductImage(index + 1),
                getProductImage(index + 1 + 10000),
                getProductImage(index + 1 + 20000),
                getProductImage(index + 1 + 30000)
            ];

            return {
                name: p["model_name"],
                brand: p["brand"],
                description: `${p["model_name"]} with ${p["processor_name"]}, ${p["ram(GB)"]}GB RAM, ${p["ssd(GB)"]}GB SSD.`,
                price: priceVND,
                originalPrice: priceVND * 1.1, // Fake original price
                image: productImages[0],
                images: productImages,
                category: "Laptop",
                countInStock: Math.floor(Math.random() * 50) + 5,
                rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
                reviews: Math.floor(Math.random() * 100),
                is_new_product: Math.random() < 0.2,
                specs: {
                    cpu: p["processor_name"],
                    ram: `${p["ram(GB)"]}GB`,
                    storage: `${p["ssd(GB)"]}GB SSD`,
                    screen: `${p["screen_size(inches)"]} inch ${p["resolution (pixels)"]}`,
                    gpu: p["graphics"],
                    os: p["Operating System"],
                    battery: "N/A",
                    weight: "N/A",
                },
                highlights: [
                    `${p["ram(GB)"]}GB RAM`,
                    `${p["ssd(GB)"]}GB SSD`,
                    p["processor_name"],
                    p["Operating System"]
                ],
                detailedDescription: `Experience the power of the ${p["model_name"]}. Featuring a ${p["processor_name"]} processor and ${p["graphics"]} graphics, this laptop is designed for performance. The ${p["screen_size(inches)"]} inch display with ${p["resolution (pixels)"]} resolution delivers stunning visuals.`
            };
        });

        await Product.deleteMany(); // Xóa dữ liệu cũ
        await Product.insertMany(products); // Thêm dữ liệu mới
        console.log(`Imported ${products.length} products.`);

        await User.deleteMany(); // Xóa dữ liệu cũ
        await User.insertMany(users); // Thêm dữ liệu mới
        console.log("Imported Users.");

        await Faq.deleteMany(); // Xóa dữ liệu cũ
        await Faq.insertMany(faqs); // Thêm dữ liệu mới
        console.log("Imported FAQs.");

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
