
const express = require('express');
const { getAllDoctors } = require('../controllers/doctorController');
const router = express.Router();

router.get('/', getAllDoctors);  // Get list of all doctors

module.exports = router;
