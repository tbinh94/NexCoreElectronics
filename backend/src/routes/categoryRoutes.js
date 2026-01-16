import express from "express";
import {
    createCategory,
    getCategories,
    deleteCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createCategory).get(getCategories);
router.route("/:id").delete(protect, admin, deleteCategory);

export default router;
