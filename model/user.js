let connection = require("../database/connection");

const addUser = async (data) => {

    let insertId = null;

    try {

        const result = await connection.query(
            "INSERT INTO `user` (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)",
            [data.name, data.email, data.password, data.role]
        );
        console.log('Inserted a new user with ID:',result[0].insertId);
        return result[0].insertId;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 
}

const getUser = async (email) => {

    try {
        const result = await connection.query("SELECT * FROM user where email=?", email);
            console.log('Users:', result[0]);
            return result[0].length > 0 ? result[0] : null;
    } catch (error) {
        throw error;
    }

}

module.exports = { addUser, getUser }