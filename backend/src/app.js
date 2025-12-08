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
  origin: "http://localhost:3000", // frontend dev server
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
