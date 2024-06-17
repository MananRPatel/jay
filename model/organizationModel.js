let connection = require("../database/connection");

const addOrganization = async (data)=>{
    
    try {

        const result = await connection.query(
            "INSERT INTO `organization` (`managerID`, `name`, `location`, `description`) VALUES (?, ?, ?, ?)",
            [data.managerID, data.name, data.location, data.description]
        );
        console.log('Inserted a new organization with ID:',result[0].insertId);
        return result[0].insertId;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 


}

const getOrganizations = async ()=>{

    try {

        const result = await connection.query(
            "SELECT * FROM organization"
        );
        console.log('list of organizations:',result[0]);
        return result[0];

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 
    
}

const getOrganizationsByUser = async (id)=>{

    try {

        const result = await connection.query(
            "SELECT * FROM orgxusr JOIN organization ON orgxusr.orgID = organization.id where orgxusr.usrID=?;",[id]
        );
        console.log('list of organizations with user:',result[0]);
        return result[0];

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 
    
}

const getOrganizationsByManager = async (id)=>{

    try {
        const result = await connection.query(
            "SELECT * FROM organization where managerID=?;",[id]
        );
        console.log('mananger by org:',result[0]);
        return result[0];

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 
    
}



const joinOrganization = async (data)=>{
    
    try {

        const result = await connection.query(
            "INSERT INTO `orgxusr` (`orgID`, `usrID`) VALUES (?, ?)",
            [data.orgID, data.usrID]
        );
        console.log('joined a organization');
        return result[0].insertId;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 

}

const isOrganizationJointByUser = async (usrID,orgID) =>{
    try {
        const result = await connection.query(
            "SELECT * FROM orgxusr where orgID=? and usrID=?;",[orgID,usrID]
        );
        console.log('userxorg by org:',result[0]);
        return result[0].length > 0;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 
}

const isEventOrganizationJointByUser = async (usrID,eventID) =>{
    try {
        const result = await connection.query(
            "SELECT orgxusr.* FROM orgxusr where orgxusr.orgID= (select event.orgID from event where event.ID=?) and orgxusr.usrID=?;",[eventID,usrID]
        );
        console.log('userxorg by org:',result[0]);
        return result[0].length > 0;

    } catch (error) {
        throw error; // Throw any errors encountered during the query
    } 
}


module.exports = {addOrganization,getOrganizations,joinOrganization,getOrganizationsByUser,getOrganizationsByManager,isOrganizationJointByUser,isEventOrganizationJointByUser}