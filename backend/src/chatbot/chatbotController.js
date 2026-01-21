import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini
// Make sure GEMINI_API_KEY is in your .env file
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
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

        // --- STEP 1: INTENT ANALYSIS (Hiểu ý định) ---
        // Ask Gemini to parse the user's natural language into structured search filters
        const intentPrompt = `
        You are a search query parser for an electronics e-commerce store.
        Analyze the user's message and extract search filters into a JSON object.
        
        User Message: "${message}"
        
        Return ONLY a raw JSON object (no markdown formatting) with the following fields:
        - keyword: (string) Main product keyword (e.g., "laptop", "iphone", "mouse"). If generic, leave null.
        - category: (string) Product category if mentioned (e.g., "Laptop", "Smartphone", "Tablet", "Accessories").
        - brand: (string) Brand name if mentioned (e.g., "Apple", "Dell", "Samsung").
        - minPrice: (number) Minimum price in VND if mentioned.
        - maxPrice: (number) Maximum price in VND if mentioned.
        - sort: (string) "price_asc", "price_desc", or "newest" if implied.
        
        Example JSON: {"keyword": "gaming", "category": "Laptop", "minPrice": 10000000, "maxPrice": 20000000, "brand": "Asus"}
        If no specific criteria are found, return empty object {}.
        `;

        let filters = {};
        try {
            const intentResult = await model.generateContent(intentPrompt);
            const intentText = intentResult.response.text();
            // Clean up any potential markdown code blocks
            const jsonString = intentText.replace(/```json|```/g, "").trim();
            filters = JSON.parse(jsonString);
            console.log("Parsed Filters:", filters);
        } catch (parseError) {
            console.warn("Failed to parse intent, falling back to keyword search:", parseError);
            filters = { keyword: message };
        }

        // --- STEP 2: DATA RETRIEVAL (Truy xuất dữ liệu) ---
        // Build Mongoose query based on parsed filters
        const query = { isActive: true };

        if (filters.category) {
            query.category = { $regex: filters.category, $options: 'i' };
        }
        if (filters.brand) {
            query.brand = { $regex: filters.brand, $options: 'i' };
        }
        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = filters.minPrice;
            if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }

        // If there's a keyword, search in name, description, or highlights
        if (filters.keyword) {
            query.$or = [
                { name: { $regex: filters.keyword, $options: 'i' } },
                { description: { $regex: filters.keyword, $options: 'i' } },
                { highlights: { $regex: filters.keyword, $options: 'i' } },
                { category: { $regex: filters.keyword, $options: 'i' } } // Also check category
            ];
        }

        let sortOption = {};
        if (filters.sort === 'price_asc') sortOption.price = 1;
        else if (filters.sort === 'price_desc') sortOption.price = -1;
        else if (filters.sort === 'newest') sortOption.createdAt = -1;

        // Fetch products
        const products = await Product.find(query)
            .sort(sortOption)
            .limit(5) // Limit context size
            .select("name price brand category image highlights specs description");

        // --- STEP 3: GENERATE RESPONSE (Tư vấn) ---
        const productContext = products.length > 0 ? products.map(p => `
ID: ${p._id}
Name: ${p.name}
Price: ${p.price.toLocaleString('vi-VN')} VND
Brand: ${p.brand}
Category: ${p.category}
Image: ${p.image || ""}
Highlights: ${p.highlights && p.highlights.length > 0 ? p.highlights.join(", ") : "N/A"}
Specs: ${p.specs ? JSON.stringify(p.specs) : "N/A"}
Description: ${p.description ? p.description.substring(0, 150) + "..." : "N/A"}
`).join("\n---\n") : "Không tìm thấy sản phẩm nào khớp với tiêu chí tìm kiếm của bạn trong kho hàng.";

        const prompt = `
Bạn là trợ lý ảo bán hàng chuyên nghiệp (AI Sales Assistant) của cửa hàng NextGen Electronics.
Nhiệm vụ của bạn là tư vấn, giải đáp thắc mắc và hỗ trợ khách hàng chọn mua sản phẩm công nghệ phù hợp nhất.

Dưới đây là danh sách sản phẩm ĐÃ ĐƯỢC LỌC theo yêu cầu của khách (Context):
${productContext}

HƯỚNG DẪN TRẢ LỜI:

1.  **Phân tích & Tư vấn**:
    -   Dựa vào Context, hãy giới thiệu các sản phẩm phù hợp nhất với câu hỏi: "${message}".
    -   Nếu khách hỏi về giá, cấu hình, hãy trả lời chi tiết dựa trên thông tin có sẵn.
    -   Nếu không có sản phẩm nào trong Context, hãy xin lỗi và gợi ý khách tìm kiếm chung chung hơn.

2.  **Phong cách**:
    -   Thân thiện, chuyên nghiệp, ngắn gọn.
    -   Xưng hô: "mình" (hoặc "em") và "bạn" (hoặc "anh/chị").

3.  **Định dạng đầu ra (BẮT BUỘC)**:
    -   Phần trả lời text: Sử dụng Markdown (in đậm **tên sản phẩm**, gạch đầu dòng -).
    -   **Khối JSON sản phẩm**:
        -   Nếu có gợi ý sản phẩm từ Context, BẮT BUỘC phải đặt khối JSON ở **CUỐI CÙNG** câu trả lời.
        -   Cấu trúc JSON:
        \`\`\`json
        [
          {
            "id": "ID_LẤY_TỪ_CONTEXT",
            "name": "TÊN_CHÍNH_XÁC_TỪ_CONTEXT",
            "price": 12345678, // Số nguyên (Number)
            "image": "URL_ẢNH_TỪ_CONTEXT"
          }
        ]
        \`\`\`

Câu hỏi của khách hàng: "${message}"
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ message: "Failed to generate response", error: error.message });
    }
};
