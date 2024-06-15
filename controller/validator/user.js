const userDB = require('../../database/user')

const user = async (req,res)=>{
    res.status(201).json({ userDB });
}

module.exports = user; 