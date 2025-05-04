require('dotenv').config();
const express = require("express");
const cors = require("cors"); // ✅ use the actual CORS package
const error = require("./middlewares/errorMiddleware");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feedRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Correct use of cors with options
app.use(cors({
  origin: "https://creatordashboardbyanshul.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

connectDB();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/admin", adminRoutes);

app.use(error);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
