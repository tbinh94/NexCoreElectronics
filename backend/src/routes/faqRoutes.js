import express from "express";
const router = express.Router();
import { createFaq, getFaq } from "../controllers/faqController.js";

router.get("/", getFaq);
router.post("/", createFaq);

export default router;