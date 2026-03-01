import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const adminEmail = "admin_ai@nexcore.com";
        const adminPassword = "AdminAIPassword123@";
        const adminName = "AI Administrator";

        let admin = await User.findOne({ email: adminEmail });
        if (admin) {
            console.log("Admin account already exists. Updating to ensure isAdmin is true.");
            admin.isAdmin = true;
            await admin.save();
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            admin = await User.create({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true,
                isVip: true
            });
            console.log("Admin account created successfully.");
        }

        console.log("-----------------------------------------");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log("-----------------------------------------");

        process.exit();
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
