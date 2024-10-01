// controllers/doctorController.js
exports.addDoctor = async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;
    const [result] = await pool.execute(
        'INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
        [first_name, last_name, specialization, email, phone, JSON.stringify(schedule)]
    );
    res.status(201).json({ message: 'Doctor added successfully', doctorId: result.insertId });
};
