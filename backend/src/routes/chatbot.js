import { Router } from "express";
import { chatWithAI } from "../chatbot/chatbotController.js";
import rateLimit from "express-rate-limit";
import { optionalProtect } from "../middleware/authMiddleware.js";

const router = Router();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // limit each IP to 20 requests per windowMs
    skip: (req) => req.user && req.user.isAdmin,
    message: { message: "Too many requests, please try again later." }
});

router.post("/", optionalProtect, limiter, chatWithAI);

export default router;
