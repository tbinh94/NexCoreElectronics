import { Router } from "express";
const router = Router();
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

router.post("/", async (req, res) => {
    console.log("Received order request:", req.body);
    try {
        const { userId, shippingAddress, paymentMethod, items } = req.body;

        let orderItemsData = [];
        let isCartOrder = false;

        if (items && items.length > 0) {
            orderItemsData = items;
        } else {
            const cart = await Cart.findOne({ userId });
            if (!cart || cart.products.length === 0) {
                return res.status(400).json({ message: "Cart is empty" });
            }
            orderItemsData = cart.products;
            isCartOrder = true;
        }

        let totalAmount = 0;
        const orderProducts = [];

        for (const item of orderItemsData) {
            // item.productId might be an object if passed from frontend, or ID if from cart
            const productId = item.productId._id || item.productId;
            const product = await Product.findById(productId);

            if (!product) {
                console.log("Product not found:", productId);
                return res.status(404).json({ message: "Product not found" });
            }

            let price = product.price;

            // Variant pricing
            if (item.variant && product.variants && product.variants.length > 0) {
                const variant = product.variants.find(v => v.name === item.variant);
                if (variant) price = variant.price;
            }

            // Used pricing
            if (item.type === 'used') {
                if (product.variants && product.variants.length > 0) {
                    const index = product.variants.findIndex(v => v.name === item.variant);
                    // Fallback if variant not found but type is used?
                    if (index !== -1) {
                        const firstVariantPrice = product.variants[0].price;
                        const firstVariantUsedPrice = Math.round(firstVariantPrice * 0.6);
                        price = firstVariantUsedPrice + (index * 500000);
                    } else {
                        price = Math.round(price * 0.6);
                    }
                } else {
                    price = Math.round(price * 0.6);
                }
            }

            orderProducts.push({
                productId: productId,
                quantity: item.quantity
            });
            totalAmount += item.quantity * price;
        }

        console.log("Creating order with total:", totalAmount);

        // Calculate estimated delivery date
        const deliveryDate = new Date();
        const city = shippingAddress.city || "";
        if (city.includes("Hồ Chí Minh") || city.includes("HCM")) {
            deliveryDate.setDate(deliveryDate.getDate() + 2);
        } else {
            deliveryDate.setDate(deliveryDate.getDate() + 5);
        }

        const newOrder = new Order({
            userId,
            products: orderProducts,
            totalAmount,
            shippingAddress,
            paymentMethod,
            estimatedDeliveryDate: deliveryDate
        });

        await newOrder.save();
        console.log("Order saved:", newOrder._id);

        if (isCartOrder) {
            await Cart.deleteOne({ userId });
            console.log("Cart cleared");
        }

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