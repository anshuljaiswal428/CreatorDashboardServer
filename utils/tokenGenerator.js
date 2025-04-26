const jwt = require("jsonwebtoken");

const tokenGenerator = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = tokenGenerator;
