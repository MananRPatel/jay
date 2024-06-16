const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool
const mySQLpool  = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME
});

module.exports = mySQLpool