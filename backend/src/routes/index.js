import { Router } from "express";
import multer from "multer";
import path from "path";
import authRoutes from "./auth.js";
import cartRoutes from "./cart.js";
import faqRoutes from "./faqRoutes.js";
import orderRoutes from "./orders.js";
import reviewRoutes from "./reviewRoutes.js";
import adminRoutes from "./admin.js";
import uploadRoutes from "./upload.js";
import chatbotRoutes from "./chatbot.js";
import aiRoutes from "./ai.js";
import categoryRoutes from "./categoryRoutes.js";
import { getProducts, getProductFilters, getProductById, searchByImage } from "../controllers/productController.js";

const router = Router();

// Configure Multer for Image Search
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `search-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

router.use("/cart", cartRoutes);
router.use("/auth", authRoutes);
router.use("/faqs", faqRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/admin", adminRoutes);
router.use("/upload", uploadRoutes);
router.use("/chat", chatbotRoutes);
router.use("/ai", aiRoutes);
router.use("/categories", categoryRoutes);

router.get("/products", getProducts);
router.get("/products/filters", getProductFilters);
router.get("/products/:id", getProductById);
router.post("/products/search-image", upload.single("image"), searchByImage);

export default router;
