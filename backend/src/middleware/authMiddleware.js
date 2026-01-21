import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Token received in middleware:", token); // Debug

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded); // Debug

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                console.log("User not found for token"); // Debug
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error.message); // Debug
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }


    if (!token) {
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
