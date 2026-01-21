import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const router = Router();

router.post("/add", async (req, res) => {
    try {
        console.log("Cart add request body:", req.body);
        const { userId, productId, type = 'new' } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: "Missing userId or productId" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = new Cart({ userId, products: [{ productId, quantity: 1, type }] });
            await newCart.save();
            res.json(newCart);
        } else {
            const productIndex = cart.products.findIndex((p) =>
                p.productId.toString() === productId && p.type === type
            );

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ productId, quantity: 1, type });
            }
            await cart.save();
            res.json(cart);
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
        res.json(cart ? cart : { products: [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/update", async (req, res) => {
    const { userId, productId, quantity, type = 'new' } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(p =>
            p.productId.toString() === productId && p.type === type
        );

        if (productIndex > -1) {
            if (quantity > 0)
                cart.products[productIndex].quantity = quantity;
            else
                cart.products.splice(productIndex, 1);
            await cart.save();
            res.json(cart);
        }
        else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

router.delete("/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { type = 'new' } = req.query;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(p =>
            p.productId.toString() === productId && p.type === type
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.json(cart);
        }
        else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

router.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        cart.products = [];
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})
export default router;