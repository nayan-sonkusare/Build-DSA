import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sheetRoutes from "./routes/sheetRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Make sure you have required cors at the top: const cors = require('cors');

app.use(cors({
    origin: "https://build-dsa.vercel.app", // Your exact Vercel URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sheet", sheetRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
