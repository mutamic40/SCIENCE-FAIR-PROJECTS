// db.js

// 1. Load environment variables from .env file
require('dotenv').config();

// 2. Import the mysql2 library
const mysql = require('mysql2');

// 3. Configure the connection pool using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,      // e.g., '127.0.0.1' [cite: 47]
    user: process.env.DB_USER,      // e.g., 'root' [cite: 48]
    password: process.env.DB_PASSWORD, // e.g., '' [cite: 49]
    database: process.env.DB_NAME,  // e.g., 'Projects' [cite: 50]
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 4. Test the connection (Optional, but recommended for debugging)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        // Depending on the severity, you might want to exit the process
        // process.exit(1);
        return;
    }
    console.log('Successfully connected to the MySQL database!');
    connection.release(); // Release the connection back to the pool
});

// 5. Export the pool to be used by server.js for queries
module.exports = pool.promise(); // Use .promise() for async/await support