import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Faq from "./models/Faq.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import faqs from "./data/faqs.js";
import productsData from "./data/products.js";

dotenv.config();

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
    if (cpu.includes("celeron") || cpu.includes("pentium")) return "Laptop Core i3"; // Group low end
    return "Khác";
};

const inferScreenSize = (specs) => {
    const screen = (specs?.screen || "").toLowerCase();
    if (screen.includes("13.") || screen.includes("13 inch") || screen.includes("13.3") || screen.includes("13.4") || screen.includes("13.5") || screen.includes("13.6")) return "13 inch";
    if (screen.includes("14.") || screen.includes("14 inch") || screen.includes("14.2")) return "14 inch";
    if (screen.includes("15.") || screen.includes("15.3") || screen.includes("15.6")) return "15.6 inch";
    if (screen.includes("16.") || screen.includes("16 inch") || screen.includes("16.1") || screen.includes("16.2")) return "16 inch";
    if (screen.includes("17.") || screen.includes("18.")) return "16 inch"; // Group large to 16 inch for filtering simplicity or leave raw
    if (screen.includes("11.") || screen.includes("12.")) return "13 inch"; // Group small
    return "15.6 inch"; // Default
};

const inferUsage = (p, category) => {
    const uses = [];
    const lowerCat = category.toLowerCase();
    const name = p.name.toLowerCase();
    // const gpu = (p.specs?.gpu || "").toLowerCase();

    // Map Category to Usage
    if (lowerCat.includes("gaming")) uses.push("Gaming", "Đồ họa - kỹ thuật");
    if (lowerCat.includes("học tập") || lowerCat.includes("văn phòng")) uses.push("Văn phòng", "Sinh viên");
    if (lowerCat.includes("lập trình") || lowerCat.includes("it")) uses.push("Văn phòng", "Đồ họa - kỹ thuật");
    if (lowerCat.includes("mỏng nhẹ") || lowerCat.includes("di động") || lowerCat.includes("ultrabook")) uses.push("Mỏng nhẹ");
    if (lowerCat.includes("đồ họa") || lowerCat.includes("thiết kế")) uses.push("Đồ họa - kỹ thuật", "Thiết kế");
    if (lowerCat.includes("doanh nghiệp") || lowerCat.includes("business")) uses.push("Doanh nghiệp", "Văn phòng");

    // Check specific specs
    if (name.includes("touch") || name.includes("xoay") || name.includes("flip") || name.includes("2-in-1") || p.specs?.screen?.toLowerCase().includes("touch")) {
        uses.push("Cảm ứng");
    }
    if (name.includes("ai") || p.description?.toLowerCase().includes("ai")) {
        uses.push("Laptop AI");
    }

    return [...new Set(uses)];
};

const categorizeProduct = (p) => {
    // Return explicit category if it matches the new system
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

    // Fallback logic
    const getRamDiff = (ramStr) => {
        const match = ramStr?.match(/(\d+)GB/);
        return match ? parseInt(match[1]) : 4;
    };
    const getWeight = (wStr) => {
        const match = wStr?.match(/(\d+(\.\d+)?)\s*kg/);
        return match ? parseFloat(match[1]) : 2.0;
    };

    const name = p.name.toLowerCase();
    const brand = p.brand.toLowerCase();
    const gpu = p.specs?.gpu?.toLowerCase() || "";
    // const cpu = p.specs?.cpu?.toLowerCase() || "";
    // const ram = getRamDiff(p.specs?.ram);
    const weight = getWeight(p.specs?.weight);

    if (name.includes("macbook")) return "Macbook";

    if (
        brand === "alienware" || name.includes("rog") || name.includes("tuf") || name.includes("nitro") ||
        name.includes("legion") || name.includes("predator") || name.includes("omen") ||
        ((gpu.includes("rtx") || gpu.includes("gtx")) && !gpu.includes("iris"))
    ) return "Gaming";

    if (name.includes("thinkpad") || name.includes("elitebook") || name.includes("zbook")) return "Doanh nghiệp – Doanh nhân";

    if (weight <= 1.5 || name.includes("air") || name.includes("swift") || name.includes("gram")) return "Mỏng nhẹ – Di động";

    return "Học tập – Văn phòng";
};


console.log("Starting seed script...");

const importData = async () => {
    try {
        await connectDB();

        // Transform data
        const processedProducts = productsData.map(p => {
            const category = categorizeProduct(p);
            const cpuType = p.cpu_type || inferCpuType(p.specs, p.name);
            const screenSizeLabel = p.screen_size_label || inferScreenSize(p.specs);
            const usage = p.usage || inferUsage(p, category);

            // Ensure numeric fields
            const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price;

            return {
                ...p,
                price: price,
                category: category,
                usage: usage,
                cpu_type: cpuType,
                screen_size_label: screenSizeLabel,
                specs: p.specs || {},
                countInStock: p.countInStock || 20,
                rating: p.rating || 4.5,
                reviews: p.reviews || 10,
            };
        });

        console.log(`Processing ${processedProducts.length} products...`);

        // Log distribution
        const Distribution = {};
        processedProducts.forEach(p => {
            Distribution[p.category] = (Distribution[p.category] || 0) + 1;
        });
        console.log("Category Distribution:", Distribution);

        await Product.deleteMany(); // Clear old data
        await Product.insertMany(processedProducts); // Insert new data
        console.log(`Imported ${processedProducts.length} products.`);

        await User.deleteMany();
        await User.insertMany(users);
        console.log("Imported Users.");

        await Faq.deleteMany();
        await Faq.insertMany(faqs);
        console.log("Imported FAQs.");

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
