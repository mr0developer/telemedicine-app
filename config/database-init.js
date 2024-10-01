// config/database-init.js (optional)
const pool = require('./database');

// SQL Schema creation queries
const createTables = async () => {
  const patientTable = `
    CREATE TABLE IF NOT EXISTS Patients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password_hash VARCHAR(255),
      phone VARCHAR(20),
      date_of_birth DATE,
      gender ENUM('Male', 'Female', 'Other'),
      address TEXT
    );`;

  const doctorTable = `
    CREATE TABLE IF NOT EXISTS Doctors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      specialization VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(20),
      schedule JSON
    );`;

  const appointmentTable = `
    CREATE TABLE IF NOT EXISTS Appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      patient_id INT,
      doctor_id INT,
      appointment_date DATE,
      appointment_time TIME,
      status ENUM('scheduled', 'completed', 'canceled'),
      FOREIGN KEY (patient_id) REFERENCES Patients(id),
      FOREIGN KEY (doctor_id) REFERENCES Doctors(id)
    );`;

  const adminTable = `
    CREATE TABLE IF NOT EXISTS Admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      password_hash VARCHAR(255),
      role ENUM('superadmin', 'admin')
    );`;

  // Execute queries
  await pool.execute(patientTable);
  await pool.execute(doctorTable);
  await pool.execute(appointmentTable);
  await pool.execute(adminTable);
};

// Run the table creation function
createTables()
  .then(() => console.log('Database tables created successfully'))
  .catch(err => console.error('Error creating tables:', err));
