const userModel = require('../../model/user')

const isUserExist = (username) => {
  return userModel.getUser(username);
};


module.exports = { isUserExist };
