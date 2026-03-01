import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    // 1. Check for Admin Passcode Bypass (Special access for admin UI)
    const adminPasscode = req.headers["x-admin-passcode"];
    if (adminPasscode && adminPasscode === process.env.ADMIN_PASSCODE) {
        req.user = { isAdmin: true, name: "Admin UI Session" };
        return next();
    }

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Handle null/undefined strings from localStorage
            if (!token || token === "null" || token === "undefined") {
                return res.status(401).json({ message: "Not authorized, token missing" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token && !adminPasscode) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as an admin" });
    }
};

export const optionalProtect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            if (token && token !== "null" && token !== "undefined") {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select("-password");
            }
        } catch (error) {
            console.error("Optional Auth Middleware Error:", error.message);
        }
    }
    next();
};
