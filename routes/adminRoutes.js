
const express = require('express');
const { loginAdmin, addDoctor, getAllAppointments } = require('../controllers/adminController');
const { requireAdmin } = require('../config/authMiddleware');
const router = express.Router();

router.post('/login', loginAdmin);  // Admin login
router.post('/doctors', requireAdmin, addDoctor);  // Add doctor
router.get('/appointments', requireAdmin, getAllAppointments);  // View all appointments

module.exports = router;
