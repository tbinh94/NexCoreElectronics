import { Router } from "express";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = Router();

// @route   GET api/reviews/:productId
// @desc    Get all reviews for a product
// @access  Public
router.get("/:productId", async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("user", "name")
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   POST api/reviews
// @desc    Create a review
// @access  Private (requires userId in body)
router.post("/", async (req, res) => {
    const { userId, productId, rating, comment } = req.body;

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if already reviewed
        const alreadyReviewed = await Review.findOne({ user: userId, product: productId });
        if (alreadyReviewed) {
            return res.status(400).json({ message: "Product already reviewed" });
        }

        // Create review
        const review = new Review({
            user: userId,
            product: productId,
            rating: Number(rating),
            comment,
        });

        await review.save();

        // Update Product rating
        const reviews = await Review.find({ product: productId });
        product.reviews = reviews.length;
        product.rating =
            reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await product.save();

        res.status(201).json({ message: "Review added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
