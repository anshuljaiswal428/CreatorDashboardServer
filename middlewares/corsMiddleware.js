const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    // add more origins if needed
];

const corsMiddleware = cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

// 👉 just export this directly
module.exports = corsMiddleware;
