import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini
// Make sure GEMINI_API_KEY is in your .env file
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY?.trim();
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing in .env");
            return res.status(500).json({ message: "Server configuration error: API Key missing" });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-flash-latest for speed and efficiency
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        console.log("Chat Request Received:", message.substring(0, 100) + "...");

        // Optimized check: If this is a comparison prompt from CompareWidget, skip some steps
        const isComparison = message.includes("Tôi đang phân vân giữa 2 sản phẩm") ||
            message.includes("Cấu hình: {");

        let filters = {};
        let products = [];

        if (!isComparison) {
            // --- STEP 1: INTENT ANALYSIS ---
            const intentPrompt = `
            You are a search query parser for an electronics e-commerce store.
            Analyze the user's message and extract search filters into a JSON object.
            
            User Message: "${message}"
            
            Return ONLY a raw JSON object (no markdown formatting) with the following fields:
            - keyword: (string)
            - category: (string)
            - brand: (string)
            - minPrice: (number)
            - maxPrice: (number)
            - sort: (string)
            `;

            try {
                const intentResult = await model.generateContent(intentPrompt);
                const intentText = intentResult.response.text();
                const jsonString = intentText.replace(/```json|```/g, "").trim();
                filters = JSON.parse(jsonString);
                console.log("Parsed Filters:", filters);
            } catch (parseError) {
                console.warn("Failed to parse intent, falling back to keyword search:", parseError);
                filters = { keyword: message };
            }

            // --- STEP 2: DATA RETRIEVAL (Truy xuất dữ liệu) ---
            const query = { isActive: true };

            if (filters.category) query.category = { $regex: filters.category, $options: 'i' };
            if (filters.brand) query.brand = { $regex: filters.brand, $options: 'i' };
            if (filters.minPrice || filters.maxPrice) {
                query.price = {};
                if (filters.minPrice) query.price.$gte = filters.minPrice;
                if (filters.maxPrice) query.price.$lte = filters.maxPrice;
            }

            if (filters.keyword) {
                const escapedKeyword = filters.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                if (escapedKeyword.length < 200) {
                    query.$or = [
                        { name: { $regex: escapedKeyword, $options: 'i' } },
                        { description: { $regex: escapedKeyword, $options: 'i' } },
                        { highlights: { $regex: escapedKeyword, $options: 'i' } },
                        { category: { $regex: escapedKeyword, $options: 'i' } }
                    ];
                }
            }

            let sortOption = {};
            if (filters.sort === 'price_asc') sortOption.price = 1;
            else if (filters.sort === 'price_desc') sortOption.price = -1;
            else if (filters.sort === 'newest') sortOption.createdAt = -1;

            products = await Product.find(query)
                .sort(sortOption)
                .limit(5)
                .select("name price brand category image highlights specs description");
        } else {
            console.log("Comparison detected. Using provided data only.");
        }

        // --- STEP 3: GENERATE RESPONSE (Tư vấn) ---
        const contextStr = products.length > 0 ? products.map(p => {
            return `Sản phẩm: ${p.name}\nGiá: ${p.price || 0}\nThông số: ${p.specs ? JSON.stringify(p.specs) : "N/A"}`;
        }).join("\n---\n") : "Không có dữ liệu bổ sung.";

        const systemInstruction = `Bạn là trợ lý ảo bán hàng chuyên nghiệp của Nexcore Electronics.
Mọi câu trả lời phải thân thiện, chuyên nghiệp bằng tiếng Việt.
${isComparison ? "Dùng thông số chi tiết trong câu hỏi để so sánh." : "Dùng thông tin từ Context để tư vấn."}`;

        const finalPrompt = `
${systemInstruction}

CONTEXT SẢN PHẨM:
${contextStr}

YÊU CẦU KHÁCH HÀNG:
${message}

HÃY TRẢ LỜI NGAY:
`;

        const result = await model.generateContent(finalPrompt);
        const text = result.response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("CRITICAL: Chatbot Controller Error:", error);
        return res.status(500).json({
            message: "Rất tiếc, AI đang bận hoặc gặp lỗi kỹ thuật.",
            error: error.message,
            success: false
        });
    }
};
