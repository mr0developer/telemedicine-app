// controllers/patientController.js
const pool = require('../config/database'); // Import the database connection pool

exports.registerPatient = async (req, res) => {
  const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10); // Hash the password

    // Insert patient data into the database
    const [result] = await pool.execute(
      'INSERT INTO Patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]
    );

    res.status(201).json({ message: 'Patient registered successfully', patientId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.execute('SELECT * FROM Patients WHERE email = ?', [email]);

  if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
  }

  const patient = rows[0];
  const isMatch = await bcrypt.compare(password, patient.password_hash);
  
  if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Start session
  req.session.patientId = patient.id;
  res.json({ message: 'Login successful' });
};