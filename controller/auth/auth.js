const userModel = require("../../model/userModel");

const isUserExist = async (email) => {
  return (await userModel.getUser(email)); 
};

const isAdmin = (user) => {
  return user.role == "admin";
};

const isValidManager = (organization) => {
  return organization.length>0
}

module.exports = { isUserExist,isAdmin,isValidManager };
