import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

dotenv.config();

// Connect to Database
connectDB();

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

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
