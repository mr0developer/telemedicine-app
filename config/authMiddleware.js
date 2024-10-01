// config/authMiddleware.js

// Middleware to check if a user is logged in
exports.requireLogin = (req, res, next) => {
    if (!req.session.patientId && !req.session.adminId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
    next();
};

// Middleware to check if the logged-in user is an admin
exports.requireAdmin = (req, res, next) => {
    if (!req.session.adminId) {
        return res.status(403).json({ message: 'Forbidden. Admins only.' });
    }
    next();
};
