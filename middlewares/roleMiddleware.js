// /middlewares/roleMiddleware.js

const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        try {
            const userRole = req.user?.role;  // Assuming req.user is set by your auth middleware after decoding JWT

            if (!userRole) {
                return res.status(401).json({ message: "Unauthorized. No role assigned." });
            }

            if (userRole !== requiredRole) {
                return res.status(403).json({ message: `Access denied. Only ${requiredRole}s allowed.` });
            }

            next(); // role matches, continue
        } catch (error) {
            next(error);
        }
    };
};

module.exports = roleMiddleware;
