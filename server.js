require("dotenv").config();
const express = require("express");
const cors = require("./middlewares/corsMiddleware");
const error = require("./middlewares/errorMiddleware");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feedRoutes");

const app = express();

app.use(cors);

connectDB();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/feed', feedRoutes); 
// app.use('/api/admin', adminRoutes);

app.use(error);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));