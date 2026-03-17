import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");
        const password = "testpassword123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const email = "test_register@example.com";
        await User.deleteOne({ email }); // clear

        const user = await User.create({ name: "Test User", email, password: hashedPassword });
        console.log("User created successfully:", user);
    } catch (e) {
        console.error("Error creating user:", e.message, e);
    } finally {
        await mongoose.disconnect();
    }
};

run();
