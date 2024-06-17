let connection = require("../database/connection");

const addPost = async (data) => {

    try {

        const result = await connection.query(
            "INSERT INTO `post` (`eventID`,`name`,`description`) VALUES (?, ?, ?)",
            [data.eventID,data.name, data.description]
        );
        console.log('Inserted a new post with ID:', result[0].insertId);
        return result[0].insertId;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    }


}

const getPosts = async (eventID) => {

    try {

        const result = await connection.query(
            "SELECT * FROM post where eventID =?",[eventID]);
        console.log('list of events:', result[0]);
        return result[0];

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    }

}


module.exports = { addPost,getPosts}