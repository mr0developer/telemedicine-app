// app.js
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// Middleware to protect routes
function authMiddleware(req, res, next) {
    if (!req.session.patientId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

module.exports = authMiddleware;

const adminRoutes = require('./routes/adminRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

app.use('/admin', adminRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/doctors', doctorRoutes);
