const userModel = require("../../model/userModel");

const isUserExist = async (email) => {
  return (await userModel.getUser(email)); 
};

const isAdmin = async (user) => {
  return user.role == "admin";
};

module.exports = { isUserExist,isAdmin };
