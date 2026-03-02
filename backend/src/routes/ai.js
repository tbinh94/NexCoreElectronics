import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import rateLimit from "express-rate-limit";
import { generateProductDescription, summarizeReviews } from "../controllers/aiContentController.js";
import { estimateLaptopValue, saveTradeInRequest } from "../controllers/valuationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Rate Limiter for Valuation (Expensive Operation)
const valuationLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 10, // Limit each IP to 10 valuation requests per 30 mins
    skip: (req) => req.user && req.user.isAdmin,
    message: { message: "Bạn đã vượt quá giới hạn định giá (10 lần/30 phút). Vui lòng thử lại sau." }
});

// Configure Multer for Valuation Images
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        cb(null, `valuation-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

router.post("/generate-description", protect, generateProductDescription);
router.post("/summarize-reviews", summarizeReviews);
router.post("/valuation", protect, valuationLimiter, upload.array("images", 5), estimateLaptopValue);
router.post("/trade-in-submit", protect, saveTradeInRequest);

export default router;
