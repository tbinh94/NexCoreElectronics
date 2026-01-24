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

// @route   POST api/auth/google
// @desc    Google login
// @access  Public
router.post("/google", (req, res, next) => {
    import("../controllers/authController.js").then(module => {
        module.googleLogin(req, res, next);
    }).catch(next);
});

export default router;
