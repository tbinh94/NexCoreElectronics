import { Router } from "express";
const router = Router();
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import authRoutes from "./auth.js";

router.use("/auth", authRoutes);

router.post("/add", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
            await newCart.save();
            res.json(newCart);
        } else {
            const productIndex = cart.products.findIndex((product) => product.productId === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }
            await cart.save();
            res.json(cart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
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
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            if (quantity > 0)
                cart.products[productIndex].quantity = quantity;
            else
                cart.products.splice(productIndex, 1); // hàm thay thế 1 phần tử trong mảng
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
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        // Lọc bỏ sản phẩm có id tương ứng
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
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
export default router;