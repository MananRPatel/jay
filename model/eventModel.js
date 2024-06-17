let connection = require("../database/connection");

const addEvent = async (data) => {

    try {

        const result = await connection.query(
            "INSERT INTO `event` (`name`,`description`,`date`, `location`,`orgID` ) VALUES (?, ?, ?, ?,?)",
            [data.name, data.description, data.date, data.location, data.orgID]
        );
        console.log('Inserted a new event with ID:', result[0].insertId);
        return result[0].insertId;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    }


}

const getEvents = async (orgID) => {

    try {

        const result = await connection.query(
            "SELECT * FROM event where orgID =?",[orgID]);
        console.log('list of events:', result[0]);
        return result[0];

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    }

}





const joinEvent = async (data) => {

    try {

        const result = await connection.query(
            "INSERT INTO `eventxusr` (`eventID`, `usrID`) VALUES (?, ?)",
            [data.eventID, data.usrID]
        );
        console.log('joined a organization');
        return result[0].insertId;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    }


}

const isValidEventManager = async (eventID,usrID)=>{
    try {
        const result = await connection.query(
            "SELECT organization.managerID FROM organization where organization.ID = (select event.orgID from event where event.ID=?)",[eventID]
        );
        console.log('isValidEventManager by org:',result[0]);
        return result[0]==usrID;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 
}


module.exports = { addEvent,getEvents,joinEvent,isValidEventManager}