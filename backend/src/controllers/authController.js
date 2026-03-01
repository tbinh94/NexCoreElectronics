import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(201).json({ token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //console.log("Login attempt:", req.body);
        let user = await User.findOne({ email });
        //console.log("User found:", user);
        if (!user) {
            return res.status(400).json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        //console.log("Password match:", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
        }
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            isVip: user.isVip,
            vipStatus: user.vipStatus || 'none'
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({ token, user: userData });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            if (req.body.avatar) {
                user.avatar = req.body.avatar;
            }
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                isAdmin: updatedUser.isAdmin,
                isVip: updatedUser.isVip,
                vipStatus: updatedUser.vipStatus || 'none',
                token: generateToken(updatedUser._id),
            });

        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                isVip: user.isVip,
                vipStatus: user.vipStatus || 'none',
                createdAt: user.createdAt
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const googleLogin = async (req, res) => {
    try {
        const { credential, clientId } = req.body;
        const { OAuth2Client } = await import('google-auth-library');
        const client = new OAuth2Client(clientId);

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });

        if (user) {
            // User exists, log them in
            const token = generateToken(user._id);
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                isVip: user.isVip
            };
            return res.status(200).json({ token, user: userData });
        } else {
            // User doesn't exist, create new user
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            user = await User.create({
                name,
                email,
                password: hashedPassword,
                avatar: picture
            });

            const token = generateToken(user._id);
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                isVip: user.isVip,
                vipStatus: user.vipStatus || 'none'
            };

            return res.status(201).json({ token, user: userData });
        }
    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(500).json({ message: "Google Login Failed" });
    }
};