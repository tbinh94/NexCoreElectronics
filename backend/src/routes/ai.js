import { Router } from "express";
import { generateProductDescription, summarizeReviews } from "../controllers/aiContentController.js";

const router = Router();

router.post("/generate-description", generateProductDescription);
router.post("/summarize-reviews", summarizeReviews);

export default router;
