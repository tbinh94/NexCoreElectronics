import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars first
dotenv.config();

import Product from "./models/Product.js";
import User from "./models/User.js";
import Faq from "./models/Faq.js";
import Category from "./models/Category.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import faqs from "./data/faqs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, "data/products.json");

console.log(`Reading products from: ${jsonPath}`);

let productsData = [];

try {
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    productsData = JSON.parse(rawData).flat(Infinity);
    console.log(`Successfully parsed products.json. Found ${productsData.length} items.`);
} catch (err) {
    console.error("FATAL: Failed to read/parse products.json", err);
    process.exit(1);
}

const inferCpuType = (specs, name) => {
    const cpu = (specs?.cpu || "").toLowerCase();
    const n = (name || "").toLowerCase();

    if (cpu.includes("core i3")) return "Laptop Core i3";
    if (cpu.includes("core i5")) return "Laptop Core i5";
    if (cpu.includes("core i7")) return "Laptop Core i7";
    if (cpu.includes("core i9")) return "Laptop Core i9";
    if (cpu.includes("ultra 5")) return "Laptop Core U5";
    if (cpu.includes("ultra 7")) return "Laptop Core U7";
    if (cpu.includes("ultra 9")) return "Laptop Core U9";
    if (cpu.includes("ryzen")) return "AMD Ryzen";
    if (cpu.includes("m1") || cpu.includes("m2") || cpu.includes("m3") || cpu.includes("m4") || n.includes("macbook")) {
        if (cpu.includes("m4")) return "Apple M4 Series";
        if (cpu.includes("m3") && cpu.includes("max")) return "Apple M3 Max";
        if (cpu.includes("m3") && cpu.includes("pro")) return "Apple M3 Pro";
        if (cpu.includes("m3")) return "Apple M3";
        if (cpu.includes("m2")) return "Apple M2";
        if (cpu.includes("m1")) return "Apple M1";
        return "Apple M Series";
    }
    if (cpu.includes("celeron") || cpu.includes("pentium")) return "Laptop Core i3";
    return "Khác";
};

const inferScreenSize = (specs) => {
    const screen = (specs?.screen || "").toLowerCase();
    if (screen.includes("13.") || screen.includes("13 inch") || screen.includes("13.3") || screen.includes("13.4") || screen.includes("13.5") || screen.includes("13.6")) return "13 inch";
    if (screen.includes("14.") || screen.includes("14 inch") || screen.includes("14.2")) return "14 inch";
    if (screen.includes("15.") || screen.includes("15.3") || screen.includes("15.6")) return "15.6 inch";
    if (screen.includes("16.") || screen.includes("16 inch") || screen.includes("16.1") || screen.includes("16.2")) return "16 inch";
    if (screen.includes("17.") || screen.includes("18.")) return "16 inch";
    if (screen.includes("11.") || screen.includes("12.")) return "13 inch";
    return "15.6 inch";
};

const inferUsage = (p, category) => {
    const uses = [];
    const lowerCat = (category || "").toLowerCase();
    const name = (p.name || "").toLowerCase();

    if (lowerCat.includes("gaming")) uses.push("Gaming", "Đồ họa - kỹ thuật");
    if (lowerCat.includes("học tập") || lowerCat.includes("văn phòng")) uses.push("Văn phòng", "Sinh viên");
    if (lowerCat.includes("lập trình") || lowerCat.includes("it")) uses.push("Văn phòng", "Đồ họa - kỹ thuật");
    if (lowerCat.includes("mỏng nhẹ") || lowerCat.includes("di động") || lowerCat.includes("ultrabook")) uses.push("Mỏng nhẹ");
    if (lowerCat.includes("đồ họa") || lowerCat.includes("thiết kế")) uses.push("Đồ họa - kỹ thuật", "Thiết kế");
    if (lowerCat.includes("doanh nghiệp") || lowerCat.includes("business")) uses.push("Doanh nghiệp", "Văn phòng");

    if (name.includes("touch") || name.includes("xoay") || name.includes("flip") || name.includes("2-in-1") || p.specs?.screen?.toLowerCase().includes("touch")) {
        uses.push("Cảm ứng");
    }
    if (name.includes("ai") || p.description?.toLowerCase().includes("ai")) {
        uses.push("Laptop AI");
    }

    return [...new Set(uses)];
};

const categorizeProduct = (p) => {
    const validCategories = [
        "Gaming",
        "Học tập – Văn phòng",
        "Lập trình – IT",
        "Thiết kế – Đồ họa",
        "Mỏng nhẹ – Di động",
        "Doanh nghiệp – Doanh nhân",
        "Ultrabook",
        "Macbook",
        "Laptop AI"
    ];

    if (validCategories.includes(p.category)) return p.category;
    if (p.category === "Gaming Laptop") return "Gaming";
    if (p.category === "Business Laptop") return "Doanh nghiệp – Doanh nhân";
    if (p.category === "Office Laptop") return "Học tập – Văn phòng";
    if (p.category === "Workstation") return "Thiết kế – Đồ họa";

    const name = (p.name || "").toLowerCase();
    const brand = (p.brand || "").toLowerCase();
    const gpu = p.specs?.gpu?.toLowerCase() || "";
    // const weight = getWeight(p.specs?.weight); // Not strictly needed for logic below if simplified

    if (name.includes("macbook")) return "Macbook";

    if (
        brand === "alienware" || name.includes("rog") || name.includes("tuf") || name.includes("nitro") ||
        name.includes("legion") || name.includes("predator") || name.includes("omen") ||
        ((gpu.includes("rtx") || gpu.includes("gtx")) && !gpu.includes("iris"))
    ) return "Gaming";

    if (name.includes("thinkpad") || name.includes("elitebook") || name.includes("zbook")) return "Doanh nghiệp – Doanh nhân";

    if (name.includes("air") || name.includes("swift") || name.includes("gram")) return "Mỏng nhẹ – Di động";

    return "Học tập – Văn phòng";
};


const log = (msg) => console.log(msg);

const importData = async () => {
    try {
        await connectDB();
        log("Database connected.");

        // Transform data
        const processedProducts = productsData.map(p => {
            const category = categorizeProduct(p);
            const cpuType = p.cpu_type || inferCpuType(p.specs, p.name);
            const screenSizeLabel = p.screen_size_label || inferScreenSize(p.specs);
            const usage = p.usage || inferUsage(p, category);

            // Ensure numeric fields
            let price = typeof p.price === 'string' ? parseFloat(p.price) : p.price;
            if (isNaN(price)) price = 10000000; // 10 million default

            const originalPrice = typeof p.originalPrice === 'string' ? parseFloat(p.originalPrice) : p.originalPrice;

            // Log if description is missing
            if (!p.description) console.warn(`Warning: Product ${p.id} - ${p.name} missing description`);
            if (!p.detailedDescription) console.warn(`Warning: Product ${p.id} - ${p.name} missing detailedDescription`);

            // Fallbacks for required fields
            if (!p.image) console.log(`Notice: Product ${p.id || 'N/A'} - ${p.name} is missing 'image'. Using fallback.`);
            const image = p.image || "https://loremflickr.com/600/400/laptop?lock=100";

            if (!p.description) console.log(`Notice: Product ${p.id || 'N/A'} - ${p.name} is missing 'description'. Using fallback.`);
            const description = p.description || "Máy tính xách tay cấu hình cao, phù hợp cho nhiều nhu cầu sử dụng.";

            return {
                name: p.name || "Sản phẩm Laptop",
                price: price,
                originalPrice: isNaN(originalPrice) ? undefined : originalPrice,
                description: description,
                detailedDescription: p.detailedDescription || "",
                image: image,
                images: p.images && p.images.length > 0 ? p.images : [image],
                category: category,
                brand: p.brand || "Generics",
                countInStock: Number(p.countInStock) || 20,
                rating: Number(p.rating) || 4.5,
                reviews: Number(p.reviews) || 10,
                is_new_product: !!p.is_new_product,
                highlights: p.highlights || [],
                specs: p.specs || {},
                usage: usage,
                cpu_type: cpuType,
                screen_size_label: screenSizeLabel,
                variants: p.variants || []
            };
        });

        log(`Processing ${processedProducts.length} products...`);
        fs.writeFileSync("processed_products_debug.json", JSON.stringify(processedProducts.slice(0, 10), null, 2));

        // Perform Transactions
        await Product.deleteMany();
        log("Old products removed.");

        await Product.insertMany(processedProducts);
        log(`Imported ${processedProducts.length} new products.`);

        // 7. Seed Categories
        const uniqueCategories = [...new Set(processedProducts.map(p => p.category))];
        const categoryRecords = uniqueCategories.map(cat => ({
            name: cat,
            slug: cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            description: `Các sản phẩm thuộc dòng ${cat}`
        }));

        await Category.deleteMany();
        await Category.insertMany(categoryRecords);
        log(`Imported ${categoryRecords.length} categories.`);

        await User.deleteMany();
        await User.insertMany(users);
        console.log("Imported Users.");

        await Faq.deleteMany();
        await Faq.insertMany(faqs);
        console.log("Imported FAQs.");

        console.log("Data Import Completed Successfully!");
        process.exit();
    } catch (error) {
        console.error("Import Failed:", error);
        process.exit(1);
    }
};

importData();
