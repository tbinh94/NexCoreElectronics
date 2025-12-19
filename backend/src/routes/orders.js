import { Router } from "express";
const router = Router();
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

router.post("/", async (req, res) => {
    console.log("Received order request:", req.body);
    try {
        const { userId, shippingAddress, paymentMethod } = req.body;
        const cart = await Cart.findOne({ userId });
        console.log("Found cart:", cart);

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let totalAmount = 0;
        const orderProducts = [];

        for (const item of cart.products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                console.log("Product not found:", item.productId);
                return res.status(404).json({ message: "Product not found" });
            }
            orderProducts.push({
                productId: item.productId,
                quantity: item.quantity
            });
            totalAmount += item.quantity * product.price;
        }

        console.log("Creating order with total:", totalAmount);
        const newOrder = new Order({
            userId,
            products: orderProducts,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        await newOrder.save();
        console.log("Order saved:", newOrder._id);

        await Cart.deleteOne({ userId });
        console.log("Cart cleared");

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate("products.productId").sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Order retrieval error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;