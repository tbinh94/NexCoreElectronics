import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = "test_register2@example.com";
        await User.deleteOne({ email }); // clear

        const password = "testpassword123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name: "Test User 2", email, password: hashedPassword });
        console.log("User ID TYPE:", typeof user._id, user._id instanceof mongoose.Types.ObjectId);
        
        try {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            console.log("Token:", token);
        } catch (jwtError) {
            console.error("JWT ERROR:", jwtError.message);
        }
        
    } catch (e) {
        console.error("Error creating user:", e.message);
    } finally {
        await mongoose.disconnect();
    }
};

run();
