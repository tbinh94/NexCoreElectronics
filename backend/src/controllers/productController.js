import fs from "fs";
import Product from "../models/Product.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getProducts = async (req, res) => {
    try {
        const { limit = 12, page = 1, category, brand, minPrice, maxPrice, sort, search, promotion, exclude } = req.query;
        const limitNum = Number(limit);
        const pageNum = Number(page);
        const skip = (pageNum - 1) * limitNum;

        let filter = {};

        // 1. Standard Filters (always apply if provided explicitly via UI filters)
        if (category) filter.category = category;
        if (brand) filter.brand = brand;
        if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
        if (promotion === 'true') {
            filter.originalPrice = { $exists: true, $ne: null };
        }
        if (exclude) {
            filter._id = { $ne: exclude };
        }

        // 2. Smart Search Logic
        if (search) {
            console.log(`Processing Smart Search for: "${search}"`);

            // Initialize Gemini Model
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            // Prompt for Intent Analysis & Semantic Expansion
            const prompt = `
            You are a smart search engine for an e-commerce store.
            Analyze the user's search query: "${search}"
            
            Tasks:
            1.  **Correct Spelling**: Fix any typos (e.g., "iphoe" -> "iphone").
            2.  **Extract Filters**: Identify category, brand, price range, or sort order from the query.
            3.  **Semantic Expansion**: Generate a list of related keywords/synonyms to capture the *meaning* (e.g., "áo đi chơi tết" -> ["áo dài", "đỏ", "thời trang", "lễ hội"]).
            
            Return ONLY a raw JSON object:
            {
              "corrected": "string (corrected query)",
              "keywords": ["string", "string"],
              "filters": {
                "category": "string or null",
                "brand": "string or null",
                "minPrice": number or null,
                "maxPrice": number or null,
                "sort": "price_asc" | "price_desc" | "newest" | null
              }
            }
            `;

            try {
                const result = await model.generateContent(prompt);
                const responseText = result.response.text();
                const jsonString = responseText.replace(/```json|```/g, "").trim();
                const analysis = JSON.parse(jsonString);

                console.log("Smart Search Analysis:", analysis);

                // Apply Extracted Filters (Merge with existing filters, giving precedence to explicit UI filters if conflict? 
                // Usually search query refines the current view, but here let's assume search query adds to filters)

                if (analysis.filters.category && !category) filter.category = { $regex: analysis.filters.category, $options: 'i' };
                if (analysis.filters.brand && !brand) filter.brand = { $regex: analysis.filters.brand, $options: 'i' };

                // Price logic: if user typed "under 10 million", use that.
                if (analysis.filters.minPrice || analysis.filters.maxPrice) {
                    filter.price = filter.price || {};
                    if (analysis.filters.minPrice) filter.price.$gte = analysis.filters.minPrice;
                    if (analysis.filters.maxPrice) filter.price.$lte = analysis.filters.maxPrice;
                }

                // Build Search Query using $or
                // We search in name, description, category, brand, and highlights
                const searchTerms = [analysis.corrected, ...analysis.keywords].filter(Boolean);

                if (searchTerms.length > 0) {
                    const regexConditions = searchTerms.map(term => ({
                        $or: [
                            { name: { $regex: term, $options: 'i' } },
                            { description: { $regex: term, $options: 'i' } },
                            { category: { $regex: term, $options: 'i' } },
                            { brand: { $regex: term, $options: 'i' } },
                            { highlights: { $regex: term, $options: 'i' } }
                        ]
                    }));

                    // Use $and to ensure at least one of the semantic concepts matches, 
                    // OR use $or to match ANY of the expanded terms. 
                    // Usually $or is safer for "expansion" to avoid zero results.
                    filter.$or = regexConditions.map(c => c.$or).flat();
                }

            } catch (error) {
                console.error("Smart Search Error (Gemini):", error);
                // Fallback to basic regex if AI fails
                filter.name = { $regex: search, $options: 'i' };
            }
        }

        // Create query with filters
        const productsQuery = Product.find(filter);

        // Apply sorting
        if (sort) {
            if (sort === 'price_asc') productsQuery.sort({ price: 1 });
            else if (sort === 'price_desc') productsQuery.sort({ price: -1 });
            else if (sort === 'newest') productsQuery.sort({ createdAt: -1 });
        }

        // Apply pagination
        productsQuery.skip(skip).limit(limitNum);

        // Execute query and count total
        const [products, total] = await Promise.all([
            productsQuery.exec(),
            Product.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(total / limitNum);

        res.json({
            products,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalPages,
                totalProducts: total
            }
        });

    } catch (error) {
        console.error("Get Products Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProductFilters = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        const brands = await Product.distinct("brand");
        res.json({ categories, brands });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const searchByImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const filePath = req.file.path;

        // Read file as base64
        const imageBuffer = fs.readFileSync(filePath);
        const base64Image = imageBuffer.toString("base64");

        // Initialize Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        Bạn là một chuyên gia về sản phẩm. Hãy phân tích hình ảnh này và xác định xem đây là sản phẩm gì.
        Trả về một JSON object duy nhất (không markdown) với trường 'searchQuery':
        {
            "searchQuery": "Tên sản phẩm ngắn gọn, chính xác để tìm kiếm"
        }
        Ví dụ: "iPhone 15 Pro Max", "Laptop Dell XPS 13", "Tai nghe Sony WH-1000XM5".
        `;

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: req.file.mimetype,
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        const jsonString = responseText.replace(/```json|```/g, "").trim();
        const analysis = JSON.parse(jsonString);

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json(analysis);

    } catch (error) {
        console.error("Search by Image Error:", error);
        // Clean up file if error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: "Failed to analyze image" });
    }
};


export const getDailyUsedProducts = async (req, res) => {
    try {
        // 1. Get all products
        const allProducts = await Product.find({ isActive: true }).select('-detailedDescription -specs');

        if (!allProducts || allProducts.length === 0) {
            return res.json([]);
        }

        // 2. Seed based on Date (YYYY-MM-DD)
        // Use UTC date to ensure consistency across timezones if needed, or just server local date
        const today = new Date().toISOString().slice(0, 10); // "2024-01-21"

        // 3. Deterministic Shuffle
        // Assign a hash score to each product based on "Date + ProductID"
        const shuffled = allProducts.map(p => {
            const uniqueString = today + p._id.toString();
            let hash = 0;
            for (let i = 0; i < uniqueString.length; i++) {
                hash = ((hash << 5) - hash) + uniqueString.charCodeAt(i);
                hash |= 0; // Convert to 32bit integer
            }
            return { product: p, sortKey: hash };
        }).sort((a, b) => a.sortKey - b.sortKey);

        // 4. Take top 15
        const selected = shuffled.slice(0, 15).map(item => {
            const p = item.product.toObject();
            return {
                ...p,
                _id: p._id, // Keep original ID
                isUsed: true,
                originalNewPrice: p.price, // Store original new price
                price: Math.round(p.price * 0.6), // The "Used" price (60%)
                name: `${p.name} (Cũ 99%)`, // Update name
                category: "Máy cũ giá rẻ" // Override category for UI grouping if needed
            };
        });

        res.json(selected);

    } catch (error) {
        console.error("Get Daily Used Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
