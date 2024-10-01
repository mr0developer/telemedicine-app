
const pool = require('../config/database');

// Create a new appointment
exports.createAppointment = async (patient_id, doctor_id, appointment_date, appointment_time) => {
    const [result] = await pool.execute(
        'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
        [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled']
    );
    return result.insertId;
};

// Get appointments for a specific patient
exports.getAppointmentsByPatient = async (patient_id) => {
    const [appointments] = await pool.execute('SELECT * FROM Appointments WHERE patient_id = ?', [patient_id]);
    return appointments;
};

// Get all appointments
exports.getAllAppointments = async () => {
    const [appointments] = await pool.execute('SELECT * FROM Appointments');
    return appointments;
};
