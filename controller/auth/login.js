const axios = require("axios");
require("dotenv").config;

const login = (req,res)=>{
    req.send("login")
}

module.exports = login; 