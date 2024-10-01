
const mysql = require('mysql2/promise');

// Create a connection pool to optimize database connection management
const pool = mysql.createPool({
  host: 'localhost',       // Database host
  user: 'root',            // Database username
  password: 'yourpassword',// Database password
  database: 'telemedicine',// Database name
  waitForConnections: true,// Wait for connections if none are available
  connectionLimit: 10,     // Limit the number of concurrent connections
  queueLimit: 0            // Disable limiting the number of queued requests
});

module.exports = pool;
