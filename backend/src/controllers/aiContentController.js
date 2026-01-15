import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateProductDescription = async (req, res) => {
    try {
        const { productId, productName, productSpecs, tone = 'professional' } = req.body;

        // Allow generating from ID (existing product) or raw data (new product being created)
        let productData = {};
        if (productId) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            productData = {
                name: product.name,
                brand: product.brand,
                category: product.category,
                specs: product.specs
            };
        } else {
            productData = {
                name: productName,
                specs: productSpecs
            };
        }

        if (!productData.name) {
            return res.status(400).json({ message: "Product name is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        You are an expert SEO Content Writer for an electronics e-commerce store.
        Your task is to generate compelling product descriptions based on the provided product information.

        Product Information:
        - Name: ${productData.name}
        - Brand: ${productData.brand || "N/A"}
        - Category: ${productData.category || "N/A"}
        - Specs: ${JSON.stringify(productData.specs || {})}

        Requirements:
        1.  **Tone**: ${tone} (Options: "youthful" - energetic/fun, "premium" - elegant/sophisticated, "technical" - detailed/precise, "professional" - balanced/trustworthy).
        2.  **SEO**: Use relevant keywords naturally.
        3.  **Language**: Vietnamese.

        Output Format (JSON Only):
        {
            "shortDescription": "A catchy 1-2 sentence summary for listing pages.",
            "detailedDescription": "A comprehensive, multi-paragraph description (HTML format allowed for bolding/paragraphs) covering features, benefits, and usage.",
            "highlights": ["Key feature 1", "Key feature 2", "Key feature 3", "Key feature 4"]
        }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonString = responseText.replace(/```json|```/g, "").trim();
        const generatedContent = JSON.parse(jsonString);

        res.json(generatedContent);

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ message: "Failed to generate content", error: error.message });
    }
};

export const summarizeReviews = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Fetch reviews
        const reviews = await Review.find({ product: productId }).select("comment rating");

        if (reviews.length === 0) {
            return res.json({ summary: null, message: "Chưa có đánh giá nào để phân tích." });
        }

        // Prepare text for AI
        const reviewText = reviews.map(r => `- Rating: ${r.rating}/5, Comment: "${r.comment}"`).join("\n");

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        Bạn là một chuyên gia phân tích phản hồi khách hàng.
        Hãy phân tích danh sách các đánh giá dưới đây về một sản phẩm và tạo ra một bản tóm tắt ngắn gọn.

        Danh sách đánh giá:
        ${reviewText}

        Yêu cầu đầu ra (JSON Only):
        {
            "pros": ["Điểm mạnh 1", "Điểm mạnh 2"],
            "cons": ["Điểm yếu 1", "Điểm yếu 2"],
            "verdict": "Kết luận chung về sản phẩm (1-2 câu).",
            "sentiment": "positive" | "neutral" | "negative"
        }
        Ngôn ngữ: Tiếng Việt.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonString = responseText.replace(/```json|```/g, "").trim();
        const summary = JSON.parse(jsonString);

        res.json(summary);

    } catch (error) {
        console.error("Review Summary Error:", error);
        res.status(500).json({ message: "Failed to summarize reviews", error: error.message });
    }
};
