
const pool = require('../config/database');

// Add a new doctor
exports.addDoctor = async (first_name, last_name, specialization, email, phone, schedule) => {
    const [result] = await pool.execute(
        'INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
        [first_name, last_name, specialization, email, phone, JSON.stringify(schedule)]
    );
    return result.insertId;
};

// Get all doctors
exports.getAllDoctors = async () => {
    const [doctors] = await pool.execute('SELECT * FROM Doctors');
    return doctors;
};

// Update doctor schedule
exports.updateDoctorSchedule = async (doctor_id, schedule) => {
    await pool.execute('UPDATE Doctors SET schedule = ? WHERE id = ?', [JSON.stringify(schedule), doctor_id]);
};
