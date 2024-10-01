// controllers/appointmentController.js
exports.bookAppointment = async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
    await pool.execute(
        'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
        [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled']
    );
    res.status(201).json({ message: 'Appointment booked successfully' });
};
