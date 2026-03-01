import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

dotenv.config();

// Connect to Database
connectDB();

import fs from "fs";
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Created uploads directory");
}

const app = express();

// CORS cho phép frontend gọi API
app.use(cors({
  origin: "*", // Allow all origins for now to fix deployment issues
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// SECRET ROUTE TO SETUP ADMIN - DELETE THIS BLOCK AFTER RUNNING ON LIVE SERVER
import User from "./models/User.js";
import bcrypt from "bcryptjs";
app.get("/api/setup-admin-9981", async (req, res) => {
  try {
    const adminEmail = "admin_ai@nexcore.com";
    const adminPassword = "AdminAIPassword123@";
    const adminName = "Nexus AI Admin";

    let admin = await User.findOne({ email: adminEmail });
    if (admin) {
      admin.isAdmin = true;
      admin.isVip = true;
      await admin.save();
      return res.json({ message: "Admin AI already existed, updated to latest perms." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
      isVip: true
    });

    res.json({
      message: "Admin AI created successfully on Production!",
      email: adminEmail,
      password: adminPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api", router);

// Global Error Handler for JSON responses
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
