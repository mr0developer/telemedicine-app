
const express = require('express');
const { bookAppointment, getAppointmentsByPatient } = require('../controllers/appointmentController');
const { requireLogin } = require('../config/authMiddleware');
const router = express.Router();

router.post('/book', requireLogin, bookAppointment);  // Book appointment
router.get('/patient', requireLogin, getAppointmentsByPatient);  // Get patient appointments

module.exports = router;
