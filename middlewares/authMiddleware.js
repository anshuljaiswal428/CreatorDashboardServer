const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // Extract token after 'Bearer'

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user; // Attach user to request
            next();
        } else {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ message: "Token failed", error: error.message });
    }
};

// Middleware for Admin-only access
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = { protect, adminOnly };
