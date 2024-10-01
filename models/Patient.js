
const pool = require('../config/database');

// Create a new patient
exports.createPatient = async (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) => {
    const [result] = await pool.execute(
        'INSERT INTO Patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]
    );
    return result.insertId;
};

// Update patient profile
exports.updatePatientProfile = async (patient_id, first_name, last_name, phone, date_of_birth, gender, address) => {
    await pool.execute(
        'UPDATE Patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE id = ?',
        [first_name, last_name, phone, date_of_birth, gender, address, patient_id]
    );
};
