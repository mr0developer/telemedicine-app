
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Find admin by username
exports.findAdminByUsername = async (username) => {
    const [rows] = await pool.execute('SELECT * FROM Admin WHERE username = ?', [username]);
    return rows[0];
};

// Create a new admin (hash the password)
exports.createAdmin = async (username, password) => {
    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute('INSERT INTO Admin (username, password_hash, role) VALUES (?, ?, ?)', [username, password_hash, 'admin']);
    return result.insertId;
};
