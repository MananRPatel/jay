const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool
const pool  = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME
});

// Function to get a database connection
const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            console.log("done")
            resolve(connection);
        });
    });
};


const addUser = async (data) => {

    const connection = await userDB.getConnection();
    let insertId = null;

    try {

        const result = await connection.query(
            "INSERT INTO `user` (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)",
            [data.name, data.email, data.password, data.role]
        );

        insertId = result.insertId; // Assign insertId from result object
        console.log('Inserted a new user with ID:', insertId);

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } finally {
        connection.release(); // Always release the connection back to the pool
    }

    return insertId; // Return insertId after releasing the connection
}

const getUser = async (email) => {

    const connection = await getConnection();
    try {
        const results = await connection.query("SELECT * FROM `sonu.user`");
        if (results.length > 0) {
            console.log('Users:', results);
            return results[0]; // Return the first row if data exists
        } else {
            console.log('No users found for email:', results);
            return undefined; // Return undefined if no data found
        }
    } catch (error) {
        throw error;
    } finally {
        connection.release(); // Release the connection
    }

}

await getUser()