import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, addToWishlist);
router.delete("/wishlist/:id", protect, removeFromWishlist);
router.post("/register-vip", protect, async (req, res) => {
    try {
        const User = (await import("../models/User.js")).default;
        const user = await User.findById(req.user._id);
        if (user) {
            user.isVip = true;
            await user.save();
            const { password, ...userData } = user.toObject();
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
