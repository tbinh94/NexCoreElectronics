import mongoose from "mongoose";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "./models/Product.js";
import Review from "./models/Review.js";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const generateReviewsForProduct = async (product, users) => {
    const numReviews = Math.floor(Math.random() * 3) + 2; // 2 to 4 reviews
    // Pick random users
    const selectedUsers = [];
    const availableUsers = [...users].filter(u => !u.isAdmin); // Prefer non-admin

    for (let i = 0; i < numReviews; i++) {
        if (availableUsers.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableUsers.length);
        selectedUsers.push(availableUsers[randomIndex]);
        availableUsers.splice(randomIndex, 1); // Remove to avoid duplicates
    }

    if (selectedUsers.length === 0) return [];

    const prompt = `
    Bạn là một khách hàng đã mua và sử dụng sản phẩm này. Hãy viết ${selectedUsers.length} đánh giá ngắn gọn (dưới 50 từ), thực tế và tự nhiên bằng tiếng Việt cho sản phẩm:
    Tên: ${product.name}
    Mô tả: ${product.description}
    Highlights: ${product.highlights.join(", ")}

    Yêu cầu:
    - Đa dạng cảm xúc: Khen ngợi, hài lòng, hoặc góp ý nhẹ.
    - Đánh giá sao: Từ 3 đến 5 sao (phần lớn là 4-5 sao).
    - Trả về định dạng JSON Array thuần túy (không markdown):
    [
        { "rating": 5, "comment": "..." },
        { "rating": 4, "comment": "..." }
    ]
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonString = responseText.replace(/```json|```/g, "").trim();
        const reviewsData = JSON.parse(jsonString);

        return reviewsData.map((r, index) => ({
            user: selectedUsers[index]._id,
            product: product._id,
            rating: r.rating,
            comment: r.comment
        }));
    } catch (error) {
        console.error(`Failed to generate reviews for ${product.name}:`, error);
        return [];
    }
};

const seedReviews = async () => {
    try {
        await connectDB();
        console.log("Database connected.");

        // 1. Get Users and Products
        const users = await User.find({});
        const products = await Product.find({});

        if (users.length === 0 || products.length === 0) {
            console.log("No users or products found. Run seed.js first.");
            process.exit(1);
        }

        console.log(`Found ${users.length} users and ${products.length} products.`);

        // 2. Clear existing reviews
        await Review.deleteMany({});
        console.log("Cleared existing reviews.");

        // 3. Generate Reviews
        for (const product of products) {
            console.log(`Generating reviews for: ${product.name}...`);
            const reviews = await generateReviewsForProduct(product, users);

            if (reviews.length > 0) {
                await Review.insertMany(reviews);

                // Update Product stats
                const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
                const avgRating = (totalRating / reviews.length).toFixed(1);

                product.reviews = reviews.length;
                product.rating = avgRating;
                await product.save();
                console.log(`  -> Added ${reviews.length} reviews. New Rating: ${avgRating}`);
            } else {
                // Reset if no reviews generated
                product.reviews = 0;
                product.rating = 0;
                await product.save();
                console.log(`  -> No reviews generated.`);
            }

            // Small delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log("Review Seeding Completed Successfully!");
        process.exit();

    } catch (error) {
        console.error("Seeding Failed:", error);
        process.exit(1);
    }
};

seedReviews();
