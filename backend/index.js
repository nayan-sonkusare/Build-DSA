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

const allowedOrigins = [
    "https://build-dsa.vercel.app", 
    "http://localhost:5173", // Allows your local dev environment
    // Add any other specific Vercel preview links here if needed
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
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
