
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

// Admin login
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM Admin WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const admin = rows[0];
        const isMatch = await bcrypt.compare(password, admin.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Start admin session
        req.session.adminId = admin.id;
        res.json({ message: 'Admin login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Add a new doctor (admin only)
exports.addDoctor = async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, specialization, email, phone, JSON.stringify(schedule)]
        );
        res.status(201).json({ message: 'Doctor added successfully', doctorId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all appointments (admin only)
exports.getAllAppointments = async (req, res) => {
    try {
        const [appointments] = await pool.execute('SELECT * FROM Appointments');
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
