let userDB = require("../../database/user");

const addUser = (data)=>{
    userDB.push(data);
}

const getUser = (username)=>{
    return userDB.find(u => u.username === username);
}

module.exports = {addUser,getUser}