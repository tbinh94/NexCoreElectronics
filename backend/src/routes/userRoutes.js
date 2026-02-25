import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, addToWishlist);
router.delete("/wishlist/:id", protect, removeFromWishlist);

export default router;
