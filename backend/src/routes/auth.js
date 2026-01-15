import express from "express";
import { register, login, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", login);

// @route   PUT api/auth/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", protect, updateProfile);

export default router;
